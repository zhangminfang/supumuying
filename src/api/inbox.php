<?php
    $specials=isset($_GET["specials"])?$_GET["specials"]:null;
    $qty = isset($_GET["qty"])? $_GET["qty"]: 8;
    $currentPage = isset($_GET["currentPage"])? $_GET["currentPage"]:1;
     $type=isset($_GET["type"])?$_GET["type"]:null;
    $status=isset($_GET["status"])?$_GET["status"]:null;
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
    $sql='select * from goodslist where specials="true"';
    //获取查询结果集
    $result = $conn->query($sql);
    //使用查询结果集
    //得到数组
    $row = $result->fetch_all(MYSQLI_ASSOC);
    //释放查询结果集，避免资源浪费
    $result->close();
    $len = count($row);
    $data = array_slice($row,($currentPage-1)*$qty,$qty);
    $row = array(
        "data" => $data,
        "len" => $len,
        "qty" => $qty,
        "currentPage" => $currentPage
    );
    //把结果输出到前台
    echo json_encode($row);
    // 关闭数据库，避免资源浪费
    $conn->close();



?>