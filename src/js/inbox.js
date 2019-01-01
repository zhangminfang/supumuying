$(document).ready(function(){
//导航栏显示
$(".navCon-cate").on("mouseover",function(){
    $(this).find('.cateMenu').removeClass('hide');
    });
$(".navCon-cate").on("mouseout",".cateMenu",function(){
    $(this).addClass('hide');
        // console.log(666);
    })
//请求数据渲染页面 
var specials=true;
var page = document.querySelector(".pagination-pages");
var qty = 8;
var currentPage = 1;
    $.ajax({
        url: '../api/inbox.php?specials='+specials+'&qty='+qty+'&currentPage='+currentPage,
        type: 'get',
        success:function(msg){
            render(msg);
            $("#goodsCount").html(JSON.parse(msg).len);
            //加减
             var num=1;
                $("#ul_content li").on("click",".list_good_upnum",function(){
                    num=$(this).closest('li').find('.list_good_num').val();
                    num++;
                    $(this).closest('li').find('.list_good_num').val(num);
                })
                $("#ul_content").on("click",".list_good_downnum",function(){
                    num=$(this).closest('li').find('.list_good_num').val();
                    if(num==1){
                        return
                    } 
                    num--;
                    $(this).closest('li').find('.list_good_num').val(num);
                })
//加入购物车
            $("#ul_content").on("click",".addcar",function(){
                var userID=$(".user").html();
                var datailsId=$(this).closest('li').data('idx');
                var datailsname=$(this).closest('li').find('.list_good_des').text();
                var datailsPrice=parseInt($(this).closest('li').find('.list_good_price_new').children('span').html());
                var datailsNum=parseInt($(this).closest('li').find('.list_good_num').val());
                var datailsOldPrice=parseInt($(this).closest('li').find('.list_good_price_old').children('span').html());
                var dataisImg=$(this).closest('li').find($("img")).attr("src");
                    $.ajax({
                        url: "../api/shop.php?datailsID="+datailsId+"&datailsname="+datailsname+"&datailsPrice="+datailsPrice+"&datailsNum="+datailsNum+"+&datailsOldPrice="+datailsOldPrice+"&userID="+userID+"&dataisImg="+dataisImg,
                        type: 'get',
                       success:function(str){
                            console.log(str);
                        }
                    })
                }) 
//排序

        }
    })

//分页切换
$(".pagination-pages").on("click",".topPage",function(){
    var str="";
    page.innerHTML = "";
    currentPage=$(this).html();
    console.log($.type(currentPage));
    $.ajax({
        url: '../api/inbox.php?specials='+specials+'&qty='+qty+'&currentPage='+currentPage,
        type: 'get',
        success:function(good){
                render(good);
            }
        })
    })

var type; 
var status=true;
//时间排序和价格排序
    $("#sor_count").on("click",function(){
        event.preventDefault();
        type="time";
        $.ajax({
            url: '../api/time.php?type='+type+'&status='+status+'&specials='+specials,
            type: 'get',
            success:function(msg){
                $("#ul_content").html("");
                renderSort(msg);
            }
        })
        status=!status;
    })
    var sort=true;
    $("#sor_price").on("click",function(){
        event.preventDefault();
        type="SaveUSD";
        $.ajax({
            url: '../api/price.php?type='+type+'&sort='+sort+'&specials='+specials,
            type: 'get',
            success:function(msg){
                $("#ul_content").html("");
                renderSort(msg);
            }
        })
        sort=!sort;
    })




//传输数据
    $("#ul_content,li").on("click",".list_good_des,.list_good_img",function(event){
        event.preventDefault(); 
        var $goodId=$(this).closest("li").data("idx");
        location.href="../html/datails.html?goodId="+$goodId;
    })
    //渲染页面
        function render(good){
            var str="";
            $.each(JSON.parse(good).data, function(idx,item){
                str+=
                    `<li data-idx="${item.idx}">
                            <div class="ac_list fl">
                                <div class="list_good_img">
                                    <a href="javascript:;">
                                        <img src="${item.img}" alt="" />
                                    </a>
                                </div>
                                <div style="height:20px;width:100%"></div>
                                <div class="list_good_des ellipsis">
                                    <a href="javascript:;"><span>${item.Redirection}</span>${item.name}</a>
                                </div>
                            <div class="list_good_price">
                                <div class="list_good_price_new fl">￥
                                    <span>${item.SaveUSD}</span>
                                </div>
                                <div class="list_good_price_old fl">￥
                                    <span>${item.USD}</span>
                                </div>
                                <div class="fr" style="color:#e5004b;font-size:14px">
                                    <span>满额立减</span>
                                </div>
                                <div class="clear"></div>
                            </div>
                            <div class="list_good_addbox">
                                <div class="list_good_sumbox fl">
                                    <input type="text" value="1" class="list_good_num ellipsis fl" />
                                    <a href="javascript:;" class="list_good_upnum fr">+</a>
                                    <a href="javascript:;" class="list_good_downnum fr">-</a>
                                </div>
                                <a href="javascript:;"class="btn list_good_addcart fl addcar">
                                    <span>加入购物车</span>
                                </a>
                                <a href="javascript:;" class="list_good_addfav fl">收藏</a>
                            </div>
                            </div>
                        </li>`;
                })
                  $("#ul_content").html(str);
                  //分页
                    var totalPage = Math.ceil(JSON.parse(good).len/JSON.parse(good).qty);
                    for(var i=1;i<=totalPage;i++){
                    var a=document.createElement("a");
                    var span = document.createElement("span");
                    span.innerHTML = i;
                    span.className="topPage";
                    a.appendChild(span);
                    if(i == JSON.parse(good).currentPage){
                        span.classList.add("active");
                    }
                    page.appendChild(a);
                }
        }

        function renderSort(good){
            var str="";
            $.each(JSON.parse(good), function(idx,item){
                str+=
                    `<li data-idx="${item.idx}">
                            <div class="ac_list fl">
                                <div class="list_good_img">
                                    <a href="javascript:;">
                                        <img src="${item.img}" alt="" />
                                    </a>
                                </div>
                                <div style="height:20px;width:100%"></div>
                                <div class="list_good_des ellipsis">
                                    <a href="javascript:;"><span>${item.Redirection}</span>${item.name}</a>
                                </div>
                            <div class="list_good_price">
                                <div class="list_good_price_new fl">￥
                                    <span>${item.SaveUSD}</span>
                                </div>
                                <div class="list_good_price_old fl">￥
                                    <span>${item.USD}</span>
                                </div>
                                <div class="fr" style="color:#e5004b;font-size:14px">
                                    <span>满额立减</span>
                                </div>
                                <div class="clear"></div>
                            </div>
                            <div class="list_good_addbox">
                                <div class="list_good_sumbox fl">
                                    <input type="text" value="1" class="list_good_num ellipsis fl" />
                                    <a href="javascript:;" class="list_good_upnum fr">+</a>
                                    <a href="javascript:;" class="list_good_downnum fr">-</a>
                                </div>
                                <a href="javascript:;"class="btn list_good_addcart fl addcar">
                                    <span>加入购物车</span>
                                </a>
                                <a href="javascript:;" class="list_good_addfav fl">收藏</a>
                            </div>
                            </div>
                        </li>`;
                })
                  $("#ul_content").html(str);
                  //分页
                    var totalPage = Math.ceil(JSON.parse(good).len/JSON.parse(good).qty);
                    for(var i=1;i<=totalPage;i++){
                    var a=document.createElement("a");
                    var span = document.createElement("span");
                    span.innerHTML = i;
                    span.className="topPage";
                    a.appendChild(span);
                    if(i == JSON.parse(good).currentPage){
                        span.classList.add("active");
                    }
                    page.appendChild(a);
                }
        }






})






