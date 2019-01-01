$(document).ready(function(){
    //整点抢购区域
        var hot=true;
        $.ajax({
            url: 'api/index.php?hot='+hot,
            type: 'get',
            success:function(msg){
                var str="";
                $.each(JSON.parse(msg), function(idx, item){
                    str+=`<li data-id="${item.idx}">
                            <a href="javascript:;">
                                <div class="sprice_list_pergood effect-lei ">
                                <div class="sprice_list_good_img">
                                    <img class="lazy" src="${item.imgurl}" width="219" height="219"/>
                                    <div class="sprice_list_roundhover">
                                        <div class="sprice_list_saledsum"></div>
                                        <a href="#" class="btn sprice_buybtn">立即抢购</a>
                                    </div>                                            
                                    <i class="ltaghide_2"></i>
                                </div>
                                <div class="list_good_des_home ellipsis">
                                    <a href="javascript:;" >${item.shipping}${item.name}</a>
                                </div>
                                <div class="list_good_price fl">
                                    <div class="list_good_price_new">
                                         <span style="font-size: 18px;">￥</span>${item.SaveUSD}                                            
                                   </div>
                                    <div class="list_good_prcie_old">￥${item.USD}</div>
                                </div>
                                    <div class="new_goods">  </div>
                                </div>
                            </a>
                        </li>`
                });
                    $(".hot_li").html(str);
            }
        })
    //跳转至列表页
        $(".cateMenu,li").on("click",".first_menu",function(){
            event.preventDefault(); 
            var $content=$(this).find("a").text();
            console.log($content);
            location.href="html/inbox.html?content="+$content;
        })  
        
    //图片上移
    $(".floor_box").on("mouseover","li",function(){
                
    })
    //区域动画
    $(".floor_left").on("mouseover",".lazy",function(){
        $(this).stop().animate({height:"454px"},500);
    }).on("mouseout",".lazy",function(){
        $(this).stop().animate({height:"441px"},500);
    })
    //区域动画2
    $(".floor_right").on("mouseover",".lazy",function(){
        $(this).stop().animate({marginRight:"10px"},300);
    }).on("mouseout",".lazy",function(){
        $(this).stop().animate({marginRight:"0px"},300);
    })
//倒计时
function countDown(time,id){
        var day_elem = $(id).find('.day');
        var hour_elem = $(id).find('.hour');
        var minute_elem = $(id).find('.minute');
        var second_elem = $(id).find('.second');
        var end_time = new Date(time).getTime(),    //月份是实际月份-1
            sys_second = (end_time-new Date().getTime())/1000;
        var timer = setInterval(function(){
            if (sys_second > 1) {
                sys_second -= 1;
                var day = Math.floor((sys_second / 3600) / 24);
                var hour = Math.floor((sys_second / 3600) % 24);
                var minute = Math.floor((sys_second / 60) % 60);
                var second = Math.floor(sys_second % 60);
                day_elem && $(day_elem).text(day);//计算天
                $(hour_elem).text(hour<10?"0"+hour:hour);//计算小时
                $(minute_elem).text(minute<10?"0"+minute:minute);//计算分钟
                $(second_elem).text(second<10?"0"+second:second);//计算秒杀
            } else {
                clearInterval(timer);
            }
        }, 1000);
    }
     $(".deadline_time").each(function(i){
        var objid=$(this).attr("id");
        var endtime=$(this).attr("end");
        countDown(endtime,"#"+objid);
    });
     //整点抢购
     GetPromotion_start();

function GetPromotion_start(){
    GetTodaySale_taskId=setInterval(GetTodaySale_showtime,1000);
}
function GetTodaySale_showtime(){

    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    h = parseInt(h);
    var m = now.getMinutes();
    var minute = 59 - parseInt(m);
    if(minute<=9)
    {
        minute = "0"+minute;
    }
    var s = now.getSeconds();
    var second = 59 - parseInt(s);
    if(h<14 && h>=10)
    {
        var hour = 13 - h;
        hour = hour;
        var clock = '距本场结束:<span class="houn">'+hour+'</span>时<span class="min">'+minute+'</span>分<span class="sec">'+second+'</span>秒';
        $(".clock-con").html(clock);
        $("#tab10").parent().find("li").removeClass("now");
        $("#tab10").addClass("now");
    }
    else if(h<20 && h>=14)
    {
        hour = 19 - h;
        var clock = '距本场结束:<span class="houn">'+hour+'</span>时<span class="min">'+minute+'</span>分<span class="sec">'+second+'</span>秒';
        $(".clock-con").html(clock);
        $("#tab14").parent().find("li").removeClass("now");
        $("#tab14").addClass("now");
    }
    else if(h>=20 || h<10)
    {
        if(h<10)
        {
            var hour = 9 - h;
        }
        else{
            hour = 33 - h;
        }
        var clock = '距本场结束:<span class="houn">'+hour+'</span>时<span class="min">'+minute+'</span>分<span class="sec">'+second+'</span>秒';
        $(".clock-con").html(clock);
        $("#tab20").parent().find("li").removeClass("now");
        $("#tab20").addClass("now");
    }
}
 
 //登录注册数据传递
    $(".login").on("click",function(event){
        var $searchText = 1;
        event.preventDefault(); 
        var $searchUrl = encodeURI("html/login.html?searchText="+ $searchText);
        location.href = $searchUrl;
    })
    $(".sign").on("click",function(event){
        var $searchText = 2;
        event.preventDefault(); 
        var $searchUrl = encodeURI("html/login.html?searchText="+ $searchText);
        location.href = $searchUrl;
    })
     //首页商品进入详情页
        $(".bottom_rec_goodul").on("click",".sprice_list_good_img,.list_good_des_home",function(){
            console.log($(this))
            var $goodId=$(this).closest("li").data("id");
            location.href="html/datails.html?goodId="+$goodId;
        })
        
            
})