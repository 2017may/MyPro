<?php
/**
由main.html调用
根据客户端提交在查询关键字，返回菜名或原材料包含指定关键字的菜品**/
header('Content-Type:application/json');
$output=[];
@$kw=$_REQUEST['kw'];//客户端提交的起始记录的序号
if(empty($kw)){
	echo "[]";
	return;
}
//访问数据库
$conn=mysqli_connect('localhost','root','','kaifanla');
$sql='SET NAMES utf8';
mysqli_query($conn,$sql);
$sql="SELECT did,name,img_sm,material,price FROM kf_dish WHERE name LIKE '%$kw%' OR material LIKE '%$kw%'";
$result=mysqli_query($conn,$sql);
while(($row=mysqli_fetch_assoc($result))!==NULL){
	$output[]=$row;
}

echo json_encode($output);
?>