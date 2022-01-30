<?php
class Database
{

    // Prototypeing
    // private $db_host = 'localhost';
    // private $db_name = 'inside';
    // private $db_username = 'inside_admin';
    // private $db_password = 'admin1admin2';

    //Production
    private $db_host = '';
    private $db_name = '';
    private $db_username = '';
    private $db_password = '';

    public function dbConnection()
    {

        try {
            $conn = new PDO('mysql:host=' . $this->db_host . ';dbname=' . $this->db_name, $this->db_username, $this->db_password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            echo "Connection error " . $e->getMessage();
            exit;
        }
    }
}
