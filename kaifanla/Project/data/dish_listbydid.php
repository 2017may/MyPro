<?php
/**
由detail.html调用
根据客户端提交的菜品编号，返回指定的菜品详情**/
header('Content-Type:application/json');
$output=[];
@$did=$_REQUEST['did'];//客户端提交的起始记录的序号
if(empty($did)){
	echo "[]";
	return;
}
//访问数据库
$conn=mysqli_connect('localhost','root','','kaifanla');
$sql='SET NAMES utf8';
mysqli_query($conn,$sql);
$sql="SELECT did,name,img_lg,material,detail,price FROM kf_dish WHERE did=$did";
$result=mysqli_query($conn,$sql);
//根据编号查询，结果集最多只有一行记录
if(($row=mysqli_fetch_assoc($result))!==NULL){
	$output[]=$row;
}

echo json_encode($output);
?>