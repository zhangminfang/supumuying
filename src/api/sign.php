<?php
    $uname = isset($_GET["username"])?$_GET["username"]:null;
    $pwd=isset($_GET["password"])?$_GET["password"]:null;
    // $confirm=isset($_GET["confirm"])?$_GET["confirm"]:null;
    $register = isset($_GET["register"])?$_GET["register"]:null;
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

//2.查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');
     //编写sql语句
    $res = $conn->query('select * from user where uname="'.$uname.'"');
    if($res->num_rows > 0){
        echo "false";
    }else{
        if($register){
            $res = $conn->query('insert into user (uname,password) values ("'.$uname.'","'.$pwd.'")');
            if($res){
                echo "true";
            }else{
                echo "false";
            }
        }else{
            echo "true";
        }
    }
 
?>

    



