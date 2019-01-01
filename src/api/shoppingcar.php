<?php
    $user = isset($_GET["user"])? $_GET["user"]: null;
    $remove = isset($_GET["remove"])? $_GET["remove"]: null;   
    $goodId = isset($_GET["goodId"])? $_GET["goodId"]: null;
//创建连接数据库
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'supu';
// 1.创建连接,测试是否连接成功
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        // var_dump($conn->connect_error);
    }
//2.查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');
    if($user){
        $sql = 'select * from shoping where idx="'.$user.'"';
    }
        
    //获取查询结果集
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    // //释放查询结果集，避免资源浪费
    $result->close();
    // //把结果输出到前台
    echo json_encode($row);
    // 关闭数据库，避免资源浪费
    $conn->close();



?>