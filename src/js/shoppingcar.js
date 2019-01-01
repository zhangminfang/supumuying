$(document).ready(function(){
    var $url=decodeURI(location.search.slice(1));
    var $userID=$url.split("=")[1];
    //初始化界面
        $.ajax({
            url: '../api/shoppingcar.php?user='+$userID,
            type: 'get',
            success:function(goods){
                render(goods);
            //删除某个商品
                $(".cart_d_goodul,li").on("click",".RemoveGoods",function(){
                    var goodId=$(this).closest('li').data("id");
                    var remove=true;
                    $.ajax({
                        url: '../api/delet.php?goodId='+goodId,
                        type: 'get',
                        success:function(msg){
                            if(msg=="true"){
                                $(".cart_d_goodul").html("");
                                $.ajax({
                                    url: '../api/shoppingcar.php?user='+$userID,
                                    type: 'get',
                                    success:function(goods){
                                            render(goods);
                                        }
                                    })
                                }
                            }
                        })
                    })
            //删除全部商品".cart_d_goodul,li"
                $(".cart_d_delall").on("click",function(){
                    var all=true;
                    $.ajax({
                        url: '../api/delet.php?all='+all,
                        type: 'get',
                        success:function(msg){
                            if(msg=="true"){ 
                                $(".cart_d_goodul").html("");
                                $.ajax({
                                    url: '../api/shoppingcar.php?user='+$userID,
                                    type: 'get',
                                    success:function(goods){
                                                render(goods);
                                        }
                                    })
                                }
                            }
                        })
                    })
            //删除指定商品
                $(".cart_d_delchk").on("click",function(){
                    var goodId=$(".cart_d_goodul").children('li');
                    $.each($("input[class='selected']:checked"),function(idx,item){
                        var goodId=$(this).closest('li').data("id");
                        var remove=true;
                        $.ajax({
                            url: '../api/delet.php?goodId='+goodId,
                            type: 'get',
                            success:function(msg){
                                if(msg=="true"){
                                    $(".cart_d_goodul").html("");
                                    $.ajax({
                                        url: '../api/shoppingcar.php?user='+$userID,
                                        type: 'get',
                                        success:function(goods){
                                                render(goods);
                                            }
                                        })
                                    }
                                }
                            })
                        })
                    })    
            }

        })
               


//渲染函数封装
function render(goods){
 var str="";
    $.each(JSON.parse(goods), function(idx,item){
    var total=item.goodPrice*item.goodNum;
    //购物车页面渲染
    str+=
        `<li data-id="${item.goodIDX}"style="background-color: #fffbf0;border-bottom:1px solid #e9e9e9;">
            <span class="cart_d_fgd fl">
                <span class="cart_iblock">
                <label>
                    <input type="checkbox" checked="" class="selected">
                </label>
                <a href="javascript:;" class="cart_d_gdimg cart_iblock">
                    <img src="${item.goodImg}" width="72" height="72">
                    
                </a>
                    </span>
                <span class="cart_iblock">
                <span class="cart_d_gddes ellipsis">
                    <a href="" target="_blank">${item.goodName}</a>
                </span>
                </span>
            </span>
            <div class="good_edit " style="text-align: left;padding-left: 10px;margin:10px 0;min-height: 60px;position: relative">
                <div>产地: 常州</div>
                <div>规格: 300ml</div>
                <div>口味: 猕猴桃</div>                                 
            </div>
            <span class="cart_d_price">￥${item.goodPrice}</span>
            <span class="cart_d_price">
                <div class="price">
                    <a class="fl">-</a>
                    <input type="text" value="${item.goodNum}" class="cart_d_sum ellipsis fl txt_cart_goods_count">
                    <a href="javascript:;" class="cart_d_upbtn fl" >+</a>
                   <div class="clear"></div>
                </div>
            </span>
            <span class="cart_d_price"style="font-weight: bold;"> ￥${total}</span>
            <span class="cart_d_price fr"> 
                <a href="javascript:;" class="RemoveGoods">删除</a><br>
                <a href="javascript:;" class="goods_collect">收藏</a> 
            </span>
        </li> `;
    })
        $(".cart_d_goodul").html(str);
        var $all=$(":checkbox").filter(".allCheck");
        var $othercheck=$(":checkbox");
        $(".allCheck").on("click",function(){
        $othercheck.prop("checked",this.checked);
    })
}

          

});