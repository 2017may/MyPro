<?php
/**
由main.html调用
根据客户端提交在记录序号，返回所对应的菜品**/
header('Content-Type:application/json');
$output=[];
$count=5;//一次最多返回的记录条数
@$start=$_REQUEST['start'];//客户端提交的起始记录的序号
if(empty($start)){
	$start=0;
}
//访问数据库
$conn=mysqli_connect('localhost','root','','kaifanla');
$sql='SET NAMES utf8';
mysqli_query($conn,$sql);
$sql="SELECT did,name,img_sm,material,price FROM kf_dish LIMIT $start,$count";
$result=mysqli_query($conn,$sql);
while(($row=mysqli_fetch_assoc($result))!==NULL){
	$output[]=$row;
}

echo json_encode($output);
?>