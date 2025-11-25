<?php
// Simple contact form handler - SAVES TO DATABASE
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors, return JSON instead

// Set headers FIRST before any output
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database config
$host = 'localhost';
$dbname = 'wnl_db';
$username = 'root';
$password = '';

$response = ['success' => false, 'message' => '', 'debug' => []];

try {
    // Connect to database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get data
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);
    
    // If JSON failed, try POST
    if (!$data || empty($data)) {
        $data = $_POST;
    }
    
    // Log everything to file
    $logFile = __DIR__ . '/contact_log.txt';
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - Request received\n", FILE_APPEND);
    file_put_contents($logFile, "Method: " . $_SERVER['REQUEST_METHOD'] . "\n", FILE_APPEND);
    file_put_contents($logFile, "Raw input: " . $rawInput . "\n", FILE_APPEND);
    file_put_contents($logFile, "Data: " . print_r($data, true) . "\n", FILE_APPEND);
    file_put_contents($logFile, "POST: " . print_r($_POST, true) . "\n", FILE_APPEND);
    
    // Validate
    if (empty($data) || !is_array($data)) {
        $response['message'] = 'No data received';
        $response['debug'] = ['rawInput' => $rawInput, 'post' => $_POST, 'method' => $_SERVER['REQUEST_METHOD']];
        echo json_encode($response);
        exit();
    }
    
    if (empty($data['name']) || empty($data['email']) || empty($data['subject']) || empty($data['message'])) {
        $response['message'] = 'All fields required';
        $response['debug'] = ['received' => $data];
        echo json_encode($response);
        exit();
    }
    
    $name = trim($data['name']);
    $email = trim($data['email']);
    $subject = trim($data['subject']);
    $message = trim($data['message']);
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Invalid email format';
        echo json_encode($response);
        exit();
    }
    
    // Insert into database
    $stmt = $pdo->prepare("INSERT INTO emails (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $result = $stmt->execute([$name, $email, $subject, $message]);
    
    if (!$result) {
        throw new Exception('Failed to execute INSERT');
    }
    
    $id = $pdo->lastInsertId();
    
    if (!$id) {
        throw new Exception('Failed to get inserted ID');
    }
    
    // Log success
    file_put_contents($logFile, "✅ Saved with ID: $id, Name: $name, Email: $email\n\n", FILE_APPEND);
    
    $response['success'] = true;
    $response['message'] = 'Contact form submitted successfully';
    $response['id'] = $id;
    
} catch (PDOException $e) {
    $response['message'] = 'Database error: ' . $e->getMessage();
    $logFile = __DIR__ . '/contact_log.txt';
    file_put_contents($logFile, "❌ DATABASE ERROR: " . $e->getMessage() . "\n\n", FILE_APPEND);
} catch (Exception $e) {
    $response['message'] = 'Error: ' . $e->getMessage();
    $logFile = __DIR__ . '/contact_log.txt';
    file_put_contents($logFile, "❌ ERROR: " . $e->getMessage() . "\n\n", FILE_APPEND);
}

echo json_encode($response);
?>

