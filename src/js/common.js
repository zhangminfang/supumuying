$(document).ready(function(){
//顶部下拉列表效果
$('#supuy_app,#supuy_service,#supuy_user').hover(function(){
    var hover_id=this.id.split('_')[1];
    $(this).find('.top_nav_menu').addClass('top_nav_hover');
    $('#'+hover_id+'_con').show();
},function(){
    var hover_id=this.id.split('_')[1];
    $(this).find('.top_nav_menu').removeClass('top_nav_menu');
    $('#'+hover_id+'_con').hide();
});

//右侧导航栏部分
$(".nav_right").css("height",($(window).height()));
$(window).resize(function(){
    $(".nav_right").css("height",($(window).height()));
});
//右侧导航滑动效果
$(".nav_right ul li").hover(function(){
     $(this).find('span').stop().animate({"left":-$(this).find('span').width()},700);
     $(this).find('span').prev("i").css({
         background: '#9381f4',
         color: '#fff'
     });
},function(){
    $(this).find('span').stop().animate({"left":"60px"},700);
      $(this).find('span').prev("i").css({
         background: '#e5004b',
         color: '#fff'
     });
});
//返回顶部效果
$(".scroll_top").click(function(){
    $('html,body').animate({scrollTop:0},700);
});
//搜索框验证
$("#search_btn").click(function(){
    var seach=$("#search_text").val();
    if(seach ==''){
        return false;
    }else{
        return true;
    }
});
//导航栏
$(".cateMenu").on("mouseover","li",function(){
    $(this).find('.cate-tag').addClass('on');
    $(this).find('.list-item').stop().show();
});
$(".cateMenu").on("mouseout","li",function(){
    $(this).find('.cate-tag').removeClass('on');
    $(this).find('.list-item').stop().hide();
})
$(".cateMenu li").hover(function(){
    $(this).find(".cate-tag a").css("color","#e5004a");
    $(this).find(".icon_1").css("background-position","-35px -152px");
    $(this).find(".icon_2").css("background-position","-35px -180px");
    $(this).find(".icon_3").css("background-position","-35px -210px");
    $(this).find(".icon_4").css("background-position","-35px -237px");
    $(this).find(".icon_5").css("background-position","-35px -267px");
    $(this).find(".icon_6").css("background-position","-35px -296px");
    $(this).find(".icon_7").css("background-position","-35px -328px");
    $(this).find(".icon_8").css("background-position","-35px -356px");
    $(this).find(".icon_9").css("background-position","-35px -385px");
    $(this).find(".icon_10").css("background-position","-35px -418px");
},function(){
    $(this).find(".cate-tag a").css("color","#ffffff");
    $(this).find(".icon_1").css("background-position","0 -152px");
    $(this).find(".icon_2").css("background-position","0 -180px");
    $(this).find(".icon_3").css("background-position","0 -210px");
    $(this).find(".icon_4").css("background-position","0 -237px");
    $(this).find(".icon_5").css("background-position","0 -267px");
    $(this).find(".icon_6").css("background-position","0 -296px");
    $(this).find(".icon_7").css("background-position","0 -328px");
    $(this).find(".icon_8").css("background-position","0 -356px");
    $(this).find(".icon_9").css("background-position","0 -385px");
    $(this).find(".icon_10").css("background-position","0 -418px");
    });

// 读取cookie
        if($.cookie('user')!=null){
            var zhanghao=$.cookie('user');
                $(".login_box").html(
                    `Hi <a href="#" class="user">${zhanghao}</a> 欢迎来到速普商城！  
                    [ <a href="#" class="out">退出</a> ]`
                    )
            }
// 删除cookie
        $(".out").on("click",function(){
            $.cookie('user', null, { expires: 0, path: '/' });
            $(".login_box").html(
                    `欢迎来到速普商城！ 请 [<a href="" class="login" > 登录 </a>] [<a href="#"class="sign"> 免费注册 </a>]`
                )
         })

//点击购物车，跳转购物车页面
        $(".shopcar").on("click",function(){
                var userID=$(".user").html();
                event.preventDefault(); 
                location.href="shoppingcar.html?user="+userID;
           
        })
        
})
