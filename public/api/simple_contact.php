<?php
// Ultra-simple contact handler - NO CORS issues
// Handle both JSON and form submissions
header('Content-Type: text/html; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

// Handle OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database
$host = 'localhost';
$dbname = 'wnl_db';
$username = 'root';
$password = '';

$response = ['success' => false, 'message' => ''];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get data from POST (FormData) or JSON
    $data = $_POST;
    
    // If POST is empty, try JSON
    if (empty($data)) {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
    }
    
    // Validate
    if (empty($data['name']) || empty($data['email']) || empty($data['subject']) || empty($data['message'])) {
        $response['message'] = 'All fields required';
        echo json_encode($response);
        exit();
    }
    
    // Insert
    $stmt = $pdo->prepare("INSERT INTO emails (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->execute([
        trim($data['name']),
        trim($data['email']),
        trim($data['subject']),
        trim($data['message'])
    ]);
    
    $id = $pdo->lastInsertId();
    
    $response['success'] = true;
    $response['message'] = 'Saved successfully';
    $response['id'] = $id;
    
} catch (Exception $e) {
    $response['message'] = 'Error: ' . $e->getMessage();
}

// Return HTML page for form submission (works without CORS)
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Form Submitted</title>
    <script>
        // Notify parent window if in iframe
        if (window.parent !== window) {
            window.parent.postMessage({
                success: <?php echo $response['success'] ? 'true' : 'false'; ?>,
                message: '<?php echo addslashes($response['message']); ?>',
                id: <?php echo isset($response['id']) ? $response['id'] : 'null'; ?>
            }, '*');
        }
    </script>
</head>
<body>
    <h1><?php echo $response['success'] ? 'Success!' : 'Error'; ?></h1>
    <p><?php echo htmlspecialchars($response['message']); ?></p>
    <?php if ($response['success']): ?>
        <p>Your message has been saved. ID: <?php echo $response['id']; ?></p>
    <?php endif; ?>
</body>
</html>
<?php
// Also log to console for debugging
error_log("Contact form: " . ($response['success'] ? 'SUCCESS' : 'ERROR') . " - " . $response['message']);
?>

