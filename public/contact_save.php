<?php
// contact_save.php - Saves contact form to wnl_db.emails table
// Make sure this file is accessible at: http://localhost/WNL-Web4/WNL-WEB-frontend/public/contact_save.php

// Set headers FIRST before any output
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Load DB config
$config = require __DIR__ . '/db_config.php';

$host     = $config['host'];
$dbname   = $config['dbname'];
$username = $config['username'];
$password = $config['password'];

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

} catch (PDOException $e) {
    $response['message'] = 'Database error: ' . $e->getMessage();
    error_log('Contact save PDO error: ' . $e->getMessage());
} catch (Exception $e) {
    $response['message'] = 'Error: ' . $e->getMessage();
    error_log('Contact save error: ' . $e->getMessage());
}

// Output JSON (make sure no HTML is output before this)
echo json_encode($response);
exit();
?>
