



var t = n = 0,count;
$(document).ready(function(){
    count=$('#banner_list a').length;
    $("#banner_list a:not(:first-child)").hide();
    $("#index li").css("color","transparent");
    $("#index li").click(function(){

        var i=$(this).text()-1;

        n=i;
        if(i>=count){
            i=1;
        }
        $("#banner_list a").filter(":visible").fadeOut(1000).parent().children().eq(i).fadeIn(1000);
        $(this).toggleClass("on");
        $(this).siblings().removeAttr("class");
    });


})
t = setInterval("showAuto()", 4000);
$("#banner").hover(function(){clearInterval(t)}, function(){t = setInterval("showAuto()", 4000);});

function showAuto()
{
    n = n >=(count -1) ?0 : ++n;
    $("#index li").eq(n).trigger('click');
}
//小广告轮播
$(function(){
    $(".picList").carouFredSel({
        prev:'.prev',
        next:'.back',
        //pagination:'#pager',
        scroll:1000
    });
});



