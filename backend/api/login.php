<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Step 1: Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Only POST method is allowed."]);
    exit;
}

// Step 2: Include the DB connection file (this connects to personal_dB)
require_once '../db_connection.php';

// Step 3: Get input from the frontend (React login form)
$data = json_decode(file_get_contents("php://input"), true);
$studentId = $data['studentId'] ?? '';
$password  = $data['password'] ?? '';

if (empty($studentId) || empty($password)) {
    echo json_encode(["success" => false, "message" => "Student ID and password are required."]);
    exit;
}

// Step 4: Check if user exists
try {
    // Match by student_number OR email
    $stmt = $pdo->prepare("SELECT * FROM students WHERE student_number = :id OR email = :id LIMIT 1");
    $stmt->execute(['id' => $studentId]);
    $user = $stmt->fetch();

    if ($user) {
        // If you're storing hashed passwords, use password_verify:
        if (password_verify($password, $user['password'])) {
            echo json_encode(["success" => true, "message" => "Login successful."]);
        } else {
            echo json_encode(["success" => false, "message" => "Incorrect password."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "User not found."]);
    }

} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}
