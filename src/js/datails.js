
$(document).ready(function(){
    //导航栏显示
  $(".navCon-cate").on("mouseover",function(){
    $(this).find('.cateMenu').removeClass('hide');
    });
$(".navCon-cate").on("mouseout",".cateMenu",function(){
    $(this).addClass('hide');
    })  

//接收数据
var $url=decodeURI(location.search.slice(1));
var $goods=$url.split("=")[1];
$.ajax({
    url: '../api/datails.php?idx='+$goods,
    type: 'get',
    success:function(msg){
        var arr=JSON.parse(msg);
        var $jieyue=parseInt(arr[0].USD)-parseInt(arr[0].SaveUSD);
//图片
        $(".firstImg").html(
                `<img src="${arr[0].img}" />`
            );
//仓库
        $(".goods_from").html(
            `<div class="from">${arr[0].shipping}
            </div>`
            );
//名字/活动
        $(".good_d_des").html( 
            `<span class="goods_ac">
             <span style="color: #e5004b;">${arr[0].Redirection}
             </span><span style="color: #ccc;margin: 0 5px;"> | </span> 
             </span>${arr[0].name}`
        );
//现价/原价
        $(".good_d_pricenew").html(
            `<span style="font-size: 18px;">￥</span>${arr[0].SaveUSD}`
         )
        $(".good_d_priceold").html(
            `<span style="text-decoration: line-through;" >￥${arr[0].USD}</span>
            （为您节省：${$jieyue}元）           `
            )
        var _magnifier = magnifier(magnifierConfig);
//加减数量按钮
            var num=1;
           
            $(".good_d_mid").on("click",".good_d_upbtn",function(){
                num++;
                $(this).closest('.good_d_sumbox').find('.good_d_sum').val(num);
            })
            $(".good_d_mid").on("click",".good_d_downbtn",function(){
                num=$(".good_d_sum").val();
                if(num==1){
                    return
                } 
                num--;
                $(this).closest('.good_d_sumbox').find(".good_d_sum").val(num);
            })
//加入购物车
            var userID=$(".user").html();
            var datailsId=parseInt(arr[0].idx);
            var datailsname=arr[0].name;
            var datailsPrice=parseInt(arr[0].SaveUSD);
            var datailsNum=1;
            var datailsOldPrice=parseInt(arr[0].USD);
            var dataisImg=arr[0].img;
                $(".good_d_mid").on("click",".addcar",function(){
                //     console.log(666); 
                console.log(datailsNum);
                //     $.ajax({
                //         url: "../api/shop.php?datailsID="+datailsId+"&datailsname="+datailsname+"&datailsPrice="+datailsPrice+"&datailsNum="+datailsNum+"+&datailsOldPrice="+datailsOldPrice+"&userID="+userID+"&dataisImg="+dataisImg,
                //         type: 'get',
                //        success:function(str){
                //             console.log(str);
                //         }
                //     })
                }) 
           
           
        }  
})
//放大镜
var magnifierConfig = {
        magnifier : "#magnifier1",//最外层的大容器
        width : 420,//承载容器宽
        height : 420,//承载容器高
        moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
        zoom : 5//缩放比例
    };

// //table切换
//         $(".tab_trigger").find("li:first").show().addClass('active');     //为每个BOX的第一个元素显示  
//         $(".tab_trigger li").on("click",function(){
//             $(this).addClass('active').siblings().removeClass("active");
//         })
     

});