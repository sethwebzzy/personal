<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../db_connection.php';

$student_id = $_GET['student_id'] ?? null;

if (!$student_id) {
  echo json_encode(["success" => false, "message" => "Missing student ID."]);
  exit;
}

try {
  // Fetch student profile
  $stmt = $pdo->prepare("SELECT id, full_name, email, student_number FROM students WHERE id = ?");
  $stmt->execute([$student_id]);
  $student = $stmt->fetch();

  if (!$student) {
    echo json_encode(["success" => false, "message" => "Student not found."]);
    exit;
  }

  // Fetch latest application
  $stmt2 = $pdo->prepare("SELECT * FROM applications WHERE student_id = ? ORDER BY id DESC LIMIT 1");
  $stmt2->execute([$student_id]);
  $application = $stmt2->fetch();

  if (!$application) {
    echo json_encode(["success" => false, "message" => "No application found."]);
    exit;
  }

  // Fetch document if exists
  $stmt3 = $pdo->prepare("SELECT * FROM documents WHERE application_id = ? LIMIT 1");
  $stmt3->execute([$application['id']]);
  $document = $stmt3->fetch();

  echo json_encode([
    "success" => true,
    "data" => [
      "student" => $student,
      "application" => $application,
      "document" => $document ?: null
    ]
  ]);

} catch (Exception $e) {
  echo json_encode(["success" => false, "message" => "Server error: " . $e->getMessage()]);
}
