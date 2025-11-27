<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
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
    
    // Log for debugging (remove in production)
    error_log("Contact form submission received: " . print_r($data, true));
    
    // Validate required fields
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['subject']) || !isset($data['message'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields: name, email, subject, and message are required']);
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
        echo json_encode(['error' => 'Invalid email format']);
        exit();
    }
    
    // Validate non-empty fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required']);
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
        throw new Exception('Failed to execute insert statement');
    }
    
    // Get the inserted ID
    $insertId = $pdo->lastInsertId();
    
    // Verify the insert worked
    if (!$insertId) {
        throw new Exception('Failed to get inserted ID');
    }
    
    // Log success
    error_log("Contact form saved successfully with ID: " . $insertId);
    
    // Return success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Contact form submitted successfully',
        'id' => $insertId
    ]);
    
} catch (PDOException $e) {
    // Database error - log for debugging
    error_log("Database error in contact.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error: ' . $e->getMessage(),
        'details' => $e->getTraceAsString()
    ]);
} catch (Exception $e) {
    // General error - log for debugging
    error_log("General error in contact.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'error' => 'Server error: ' . $e->getMessage()
    ]);
}
?>

