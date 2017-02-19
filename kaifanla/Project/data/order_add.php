<?php
/**
由order.html调用
根据客户端提交的订单信息，向订单表中插入一条记录，获得数据库返回的订单编号**/
header('Content-Type:application/json');
$output=[];
@$user_name=$_REQUEST['user_name'];
@$sex=$_REQUEST['sex'];
@$phone=$_REQUEST['phone'];
@$addr=$_REQUEST['addr'];
@$did=$_REQUEST['did'];
$order_time=time()*1000;//php中time函数返回当前时间对应的整数值
if(empty($phone) || empty($user_name)|| empty($sex)|| empty($addr)||empty($did)){
	echo "[]";//若客户端提交的信息不足则返回空数组
	return;
}
//访问数据库
$conn=mysqli_connect('localhost','root','','kaifanla');
$sql='SET NAMES utf8';
mysqli_query($conn,$sql);
$sql="INSERT INTO kf_order VALUES(NULL,'$phone','$user_name','$sex','$order_time','$addr','$did')";
$result=mysqli_query($conn,$sql);
//根据编号查询，结果集最多只有一行记录
$arr=[];
if($result){
	$arr['msg']='succ';
	$arr['did']=mysqli_insert_id($conn);
}else{
	$arr['msg']='err';
	$arr['reason']="SQL语句执行失败：$sql";
}
$output[]=$arr;

echo json_encode($output);
?>