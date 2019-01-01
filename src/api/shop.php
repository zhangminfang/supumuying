<?php
    $userID = isset($_GET["userID"])? $_GET["userID"]: null;
    $datailsID = isset($_GET["datailsID"])? $_GET["datailsID"]: null;
    $datailsname = isset($_GET["datailsname"])? $_GET["datailsname"]: null;
    $datailsPrice = isset($_GET["datailsPrice"])? $_GET["datailsPrice"]: null;
    $datailsNum = isset($_GET["datailsPrice"])? $_GET["datailsNum"]: null;
    $datailsOldPrice = isset($_GET["datailsOldPrice"])? $_GET["datailsOldPrice"]: null;
    $dataisImg=isset($_GET["dataisImg"])? $_GET["dataisImg"]: null;
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
        // var_dump(  $datailsID);
//2.查询前设置编码，防止输出乱码
    $conn->set_charset('utf8');
    $res = $conn->query('insert into shoping (idx,goodIDX,goodName,goodPrice,goodNum,goodOldPrice,goodImg) values ("'.$userID.'","'.$datailsID.'","'.$datailsname.'","'.$datailsPrice.'","'.$datailsNum.'","'.$datailsOldPrice.'","'.$dataisImg.'")');
    if($res){
        echo "true";
    }else{
        echo "false";
    }
    // var_dump('insert into shoping (idx,goodIDX,goodName,goodPrice,goodNum,goodOldPrice,goodImg) values ("'.$userID.'","'.$datailsID.'","'.$datailsname.'","'.$datailsPrice.'","'.$datailsNum.'","'.$datailsOldPrice.'","'.$dataisImg.'")');
?>

