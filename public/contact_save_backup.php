<?php
// contact_save.php - Saves contact form to wnl_db.emails table

// Load DB config
$config = require __DIR__ . '/db_config.php';

$host     = $config['host'];
$dbname   = $config['dbname'];
$username = $config['username'];
$password = $config['password'];

// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$response = ['success' => false, 'message' => ''];

try {
    // Connect to database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get POST data
    $name    = isset($_POST['name'])    ? trim($_POST['name'])    : '';
    $email   = isset($_POST['email'])   ? trim($_POST['email'])   : '';
    $subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Validate
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        throw new Exception('All fields are required');
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }

    // Insert into emails table
    $stmt = $pdo->prepare(
        "INSERT INTO emails (name, email, subject, message) VALUES (:name, :email, :subject, :message)"
    );

    $result = $stmt->execute([
        ':name'    => $name,
        ':email'   => $email,
        ':subject' => $subject,
        ':message' => $message,
    ]);

    if (!$result) {
        throw new Exception('Failed to save to database');
    }

    $id = $pdo->lastInsertId();

    $response['success'] = true;
    $response['message'] = 'Contact form saved successfully';
    $response['id'] = $id;

} catch (Exception $e) {
    $response['message'] = 'Error: ' . $e->getMessage();
    error_log('Contact save error: ' . $e->getMessage());
}

echo json_encode($response);
?>
