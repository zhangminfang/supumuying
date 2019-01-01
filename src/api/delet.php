<?php
    // $user = isset($_GET["user"])? $_GET["user"]: null;
    $all = isset($_GET["all"])? $_GET["all"]: null;   
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
    // $sql = 'delete  from shoping where goodIDX="'.$goodId.'"';
    // $result = $conn->query($sql);
    if($goodId){
        $sql = 'delete  from shoping where goodIDX="'.$goodId.'"';
    }else if($all){
         $sql = 'delete  from shoping';
    }
    $result = $conn->query($sql);
    if($result){
        echo "true";  //删除成功，则跳转回显示页面
    }else{
        echo "false";
    }

?>