<?php
// Simple test endpoint
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$response = [
    'status' => 'PHP is working!',
    'method' => $_SERVER['REQUEST_METHOD'],
    'timestamp' => date('Y-m-d H:i:s'),
    'received_data' => [
        'post' => $_POST,
        'input' => file_get_contents('php://input')
    ]
];

echo json_encode($response, JSON_PRETTY_PRINT);
?>


