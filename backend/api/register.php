<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo json_encode(["success" => false, "message" => "Only POST requests allowed."]);
  exit;
}

require_once '../db_connection.php';

// Get raw POST data (FormData)
$student_number = $_POST['student_number'] ?? '';
$full_name = $_POST['full_name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$institution = $_POST['institution'] ?? '';
$course = $_POST['course'] ?? '';
$start_date = $_POST['start_date'] ?? '';
$end_date = $_POST['end_date'] ?? '';

if (!$student_number || !$full_name || !$email || !$password) {
  echo json_encode(["success" => false, "message" => "All fields are required."]);
  exit;
}

try {
  // Check for existing student
  $check = $pdo->prepare("SELECT id FROM students WHERE student_number = :sn OR email = :em LIMIT 1");
  $check->execute(['sn' => $student_number, 'em' => $email]);
  if ($check->fetch()) {
    echo json_encode(["success" => false, "message" => "Student already exists."]);
    exit;
  }

  // Insert into students
  $hashed_password = password_hash($password, PASSWORD_DEFAULT);
  $stmt = $pdo->prepare("INSERT INTO students (student_number, full_name, email, password) VALUES (?, ?, ?, ?)");
  $stmt->execute([$student_number, $full_name, $email, $hashed_password]);

  $student_id = $pdo->lastInsertId();

  // Insert into applications
  $stmt2 = $pdo->prepare("INSERT INTO applications (student_id, institution, course, start_date, end_date) VALUES (?, ?, ?, ?, ?)");
  $stmt2->execute([$student_id, $institution, $course, $start_date, $end_date]);

  $application_id = $pdo->lastInsertId();

  // Handle uploaded document
  if (isset($_FILES['document']) && $_FILES['document']['error'] === 0) {
    $file = $_FILES['document'];
    $uploadDir = '../../uploads/';
    $fileName = uniqid() . '_' . basename($file['name']);
    $targetPath = $uploadDir . $fileName;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
      // Save to documents table
      $stmt3 = $pdo->prepare("INSERT INTO documents (application_id, document_name, document_path) VALUES (?, ?, ?)");
      $stmt3->execute([$application_id, $file['name'], $targetPath]);
    }
  }

  echo json_encode(["success" => true, "message" => "Registration complete."]);

} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}
