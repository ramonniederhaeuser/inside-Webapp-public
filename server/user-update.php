<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function msg($success, $status, $message, $extra = [])
{
  return array_merge([
    'success' => $success,
    'status' => $status,
    'message' => $message
  ], $extra);
}

// INCLUDING DATABASE AND MAKING OBJECT
require __DIR__ . '/classes/Database.php';
$db_connection = new Database();
$conn = $db_connection->dbConnection();

// GET DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"), true);
$returnData = [];


// IF REQUEST METHOD IS NOT POST
if ($_SERVER["REQUEST_METHOD"] != "POST") :
  $returnData = msg(0, 404, 'Page Not Found!');


// IF EVERYTHING IS OK
else :
  $userId = intval($data[0]["userId"]);

  // fetch user data column
  try {
    $fetch_user_by_id = "SELECT `data` FROM `users` WHERE `id`=:id";

    $query_stmt = $conn->prepare($fetch_user_by_id);

    $query_stmt->bindValue(':id', $userId, PDO::PARAM_INT);
    $query_stmt->execute();

    //if data is here merge Array $mergedData
    $row = $query_stmt->fetch(PDO::FETCH_ASSOC);

    if ($row['data']) {
      $oldData = json_decode($row['data'], true);
    }
  } catch (PDOException $e) {
    $returnData = msg(0, 500, $e->getMessage());
  }

  //if new data is here merge array, otherwise save new entry
  if ($oldData) {
    $json_merge = json_encode(array_merge($oldData, array($data[0])));
  } else {
    $json_merge = json_encode(array($data[0]));
  }

  try {
    $update_query = "UPDATE `users` SET `data` =:data WHERE id=:userId";

    $update_stmt = $conn->prepare($update_query);

    // DATA BINDING
    $update_stmt->bindValue(':userId', $userId, PDO::PARAM_INT);
    $update_stmt->bindValue(':data', $json_merge);

    $update_stmt->execute();

    $returnData = msg(1, 202, 'Data successfully saved.');
  } catch (PDOException $e) {
    $returnData = msg(0, 500, $e->getMessage());
  }

endif;

echo json_encode($returnData);
