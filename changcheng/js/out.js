$(document).ready(function(){

    var _nHeight = $(window).height();
    var _nWidth = $(window).width();
    var sBg = $('.img_width .s_bg');
    var sign = $('.top_bg .sign li');
    var n = 0;
    var iPage = 0;
    var iPage2 = 0;
    var _safeWidth = 1000;
    var _safeHeight = 845;
    var _isMove = false;
    var oPrev = $('.index_prev');
    var oNext = $('.index_next');
    var bgMax = sBg.length;
    var botScLi = $('.homePicBox .w1w a').length;
    var autoPlay = null;
    $('.img_width').append($('.img_width').html());
    $('.homePicBox .w1w').append($('.homePicBox .w1w').html());
    if(botScLi >4){
        $('.homePicBox .prev').show();
        $('.homePicBox .next').show();
        $('.homePicBox .prev').bind('click', function () {
            n--;
            movePro();
        });

        $('.homePicBox .next').bind('click', function () {
            n++;
            movePro();
        });

    }else{
        $('.homePicBox .prev').hide();
        $('.homePicBox .next').hide();
    }
    if(browser.versions.iPad &&  browser.versions.mobile){
        /*触摸开始*/
        function kvMove(direction){
            if(direction=="left"){
                iPage++;
                iPage2++;
                movePageImg(function(){ startAutoPlay() });
            }else if(direction=="right"){
                iPage--;
                iPage2--;
                movePageImg(function(){ startAutoPlay() })
            }
        }
        if(oPrev.length > 0)
        {
            oPrev.swipe( {
                tap:function(event, target) {
                    stopAutoPlay();
                    kvMove("right")
                }
            });
            oNext.swipe( {
                tap:function(event, target) {
                    stopAutoPlay();
                    kvMove("left")
                }
            });
        }
        if($("#track1_banner").length > 0)
        {
            $("#track1_banner").swipe( { swipeStatus:kvSwipe, allowPageScroll:"vertical" } );
        }
        function kvSwipe(event, phase, direction, distance) {
            //$(this).text( phase +" you have swiped " + distance + "px in direction:" + direction );
            if(phase=="end"){
                kvMove(direction)
            }
            //else{if(direction=="left"){}else if(direction=="right"){}}
        }
        /*触摸结束*/
    }else{
        startAutoPlay();
        oPrev.bind('click', function(){
            stopAutoPlay();
            iPage--;
            iPage2--;
            movePageImg(function(){ startAutoPlay() });
        });
        oNext.bind('click', function(){
            stopAutoPlay();
            iPage++;
            iPage2++;
            movePageImg(function(){ startAutoPlay() });
        });
    }


    //背景图片滚动
    $(window).bind('resize', function(){
        homeResize();
    });
    $('.index_top').hover(function(){
        resetHomeBtn(0, 0);
        oPrev.stop(true).animate({opacity: "1"});
        oNext.stop(true).animate({opacity: "1"});
        //clearInterval(tClick);
    }, function(){
        resetHomeBtn(-70, -70);
        oPrev.stop(true).animate({opacity: "1"});
        oNext.stop(true).animate({opacity: "1"});
        //setInterval(timeClick, 10000);
    });
    function resetHomeBtn(ol, or){
        oPrev.stop(true).animate({opacity: "1"});
        oNext.stop(true).animate({opacity: "1"});
    }
    function timeClick(){
        oNext.click();
    }
    function startAutoPlay(){
        stopAutoPlay();
        autoPlay = setInterval(function(){
            iPage++;
            iPage2++;
            movePageImg();
        }, 4000);
    }
    function stopAutoPlay(){
        clearInterval(autoPlay);
    }
    //var tClick = setInterval(timeClick, 10000);
    /**
     * 页面resize，结构高度重置
     */

    function homeResize(){
        sBg = $('.img_width .s_bg');
        //_nHeight = $(window).height() < _safeHeight ? _safeHeight : $(window).height();
        //_nWidth = $(window).width() < _safeWidth ? _safeWidth : $(window).width();

        if(browser.versions.iPad ){
            _nWidth = $(window).width();


            /*		if($(window).width() > 1024){
             $(".homePic").css("zoom","1.36");
             $(".header").css("zoom","1.36");
             $(".footer").css("zoom","1.36");



             $(".CarToolBox").css("width","auto");
             $(".CarToolBox").css("zoom","1.36");
             $(".CarToolBox").css("left","0");
             $(".CarToolBox").css("right","0");

             }else {

             $(".homePic").css("zoom","1");
             $(".header").css("zoom","1");
             $(".CarToolBox").css("width","100%");
             $(".CarToolBox").css("zoom","1");
             $(".CarToolBox").css("left","auto");
             $(".CarToolBox").css("right","auto");
             $(".footer").css("zoom","1");
             }*/

            //alert($(window).width())

        }else{
            if($(window).width() >=1440){_nWidth = 1440;}else {
                _nWidth = $(window).width() < _safeWidth ? _safeWidth : $(window).width();
            }
            if($(window).width() >= 1440){$(".top_bg").width(1440)}else{$(".top_bg").width('auto')}
            if($(window).width() >= 1440){$(".footer").width(1440)}else{$(".footer").width('auto')}
            if($(window).width() >= 1440){$(".index_top").width(1440)}else{$(".index_top").width('auto')}
            if($(window).width() >= 1440){$(".homePic").width(1440)}else{$(".homePic").width('auto')}
        }
        //console.log(_nWidth)
        //$('#indexTop').height(_nHeight-244-72).width(_nWidth);
        //$('.footer').height(_nHeight-731);
        sBg.css({
            width: _nWidth
            //width: _nWidth,
            //height: _nHeight
        });



        resizeImgRoll();
    }
    homeResize();
    /**
     * 首页大图、主文字视觉切换方法
     */
    function movePageImg(fn){
        if(iPage2 < 0) iPage2 = bgMax-1;
        if(iPage2 > bgMax-1) iPage2 = 0;
        if(iPage < 0) {
            iPage=bgMax-1;
            $('.img_width').css({left: -bgMax*_nWidth});

            // _isMove = true;
        }else{
            //_isMove = false;
        }
        if(iPage > bgMax) {
            $('.img_width').css({left: 0});
            iPage = 1;
            //_isMove = true;
        }else{
            // _isMove = false;
        }
        //if(_isMove) return;
        sign.eq(iPage2).addClass('on').siblings().removeClass('on');
        $('.roll_box .ve').stop(true).animate({opacity: 0}, {duration: 500});
        $('.roll_box .ve').eq(iPage2).stop(true).animate({opacity: 1}, {duration: 1500});
        $('.img_width').stop(true).animate({left: -iPage*_nWidth},  {duration: 990, easing: "easeInOutCubic"});
        $('.roll_box').stop(true).animate({left: -iPage2*990}, {duration: 1300, easing: "easeInOutCubic"});
        if(fn)fn();
    }
    /**
     * 页面resize，更新主视觉部分left值。
     */
    function resizeImgRoll(){
        $('.img_width').stop(true).css({left: -iPage*_nWidth});
        $('.roll_box').stop(true).css({left: -iPage*990});
    }
    /**
     * 底部推荐切换
     */
    function movePro() {
        if (n < 0) {
            $('.homePicBox .w1w').css({left: -(botScLi ) * 237});
            n = botScLi-1;
            // alert(n)
        }
        if (n > botScLi) {
            $('.homePicBox .w1w').css({left: 0});
            n = 1;
        }
        $('.homePicBox .w1w').stop(true).animate({left: -n * 237});
    }




});

