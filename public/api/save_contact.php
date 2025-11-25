<?php
// Direct contact form handler - saves to database
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration
$host = 'localhost';
$dbname = 'wnl_db';
$username = 'root';
$password = '';

try {
    // Create database connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    // Log received data for debugging
    error_log("Received input: " . $input);
    error_log("Decoded data: " . print_r($data, true));
    
    // If JSON decode failed, try to get from POST
    if ($data === null && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = $_POST;
        error_log("Using POST data: " . print_r($_POST, true));
    }
    
    // Check if data is null or empty
    if ($data === null || empty($data)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'No data received',
            'debug' => [
                'input' => $input,
                'post' => $_POST,
                'method' => $_SERVER['REQUEST_METHOD']
            ]
        ]);
        exit();
    }
    
    // Validate required fields
    if (empty($data['name']) || empty($data['email']) || empty($data['subject']) || empty($data['message'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'All fields are required: name, email, subject, and message',
            'received' => $data
        ]);
        exit();
    }
    
    // Sanitize input
    $name = trim($data['name']);
    $email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
    $subject = trim($data['subject']);
    $message = trim($data['message']);
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid email format'
        ]);
        exit();
    }
    
    // Prepare SQL statement
    $stmt = $pdo->prepare("INSERT INTO emails (name, email, subject, message) VALUES (:name, :email, :subject, :message)");
    
    // Bind parameters
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':subject', $subject, PDO::PARAM_STR);
    $stmt->bindParam(':message', $message, PDO::PARAM_STR);
    
    // Execute the statement
    $result = $stmt->execute();
    
    if (!$result) {
        throw new Exception('Failed to execute INSERT statement');
    }
    
    // Get the inserted ID
    $insertId = $pdo->lastInsertId();
    
    // Log success
    error_log("Successfully saved contact form - ID: $insertId, Name: $name, Email: $email");
    
    // Return success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Contact form submitted successfully',
        'id' => $insertId,
        'data' => [
            'name' => $name,
            'email' => $email,
            'subject' => $subject
        ]
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error: ' . $e->getMessage()
    ]);
}
?>

