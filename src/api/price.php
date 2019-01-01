<?php
    $specials=isset($_GET["specials"])?$_GET["specials"]:null;
    $type=isset($_GET["type"])?$_GET["type"]:null;
    $sort=isset($_GET["sort"])?$_GET["sort"]:null;
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
    if($sort=='true'){
            $res = $conn->query('select * from goodslist where specials="true" order by '.$type.' desc'); 
        }else{
            $res = $conn->query('select * from goodslist where specials="true" order by '.$type);
        }
    $row = $res->fetch_all(MYSQLI_ASSOC);
    // var_dump($row)
    echo json_encode($row,JSON_UNESCAPED_UNICODE);
    $conn->close();



?>