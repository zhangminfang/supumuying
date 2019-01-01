<?php
    $user = isset($_GET["username"])?$_GET["username"]:null;
    $mima=isset($_GET["password"])?$_GET["password"]:null;
    // 1.创建连接,测试是否连接成功
//创建连接数据库
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'supu';
// 1.创建连接,测试是否连接成功
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        var_dump($conn->connect_error);
    }
     //编写sql语句
    $res = $conn->query ('select * from user where uname="'.$user.'" and password="'.$mima.'"');
        if($res->num_rows > 0){
                echo "true";
            }else{
                echo "false";
            }
       
?>

    




    



