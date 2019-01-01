$(document).ready(function(){
    //接收参数
    var $searchUrl = window.location.href;
    var $searchData = $searchUrl.split("="); //截取 url中的“=”,获得“=”后面的参数
    var $searchText = decodeURI($searchData[1]); //decodeURI解码
    //根据前端传递的信息显示不同的页面
    if($searchText==1){
        $(".login").css('display', 'block');
    }else if($searchText==2){
        $(".login").css('display', 'none');
        $(".reg").css('display', 'block');
    }else{
        $(".login").css('display', 'block');
    }
    //点击注册或者登录的时候显示对应的界面==>无限点击
        $("#go_reg").on("click",function(){
            $(".reg").css('display', 'block');
            $(".login").css('display', 'none');
           
    })
        $("#go_login").on("click",function(){
       
            $(".login").css('display', 'block');
            $(".reg").css('display', 'none');
    })
 
    //登录验证
    $("#btnLogin").on("click",function(event){
        var $username = $.trim($("#account").val());
        var $password = $.trim($("#password").val());
        event.preventDefault(); 
        //判断是否为空
         if($username == ""||$password == ""){
             $(".error_tips").css('display', 'block');
             return false;
         }
         //ajax去服务器端校验
        var data= {"username":$username,"password":$password};
        $.ajax({
             type:"get",
             url:"../api/login.php",
             data:data,
             dataType:'json',
             success:function(msg){
                 if(msg==true){
                        $.cookie('user', $username, { expires: 7, path: '/' });
                 }else{
                     alert("登录失败，请重试!");
                 }
             }
         })

    })
     //正则验证
     $(".username").on("blur",function(){
        var phoneReg=/^1[3-8]\d{9}$/;
        if($(this).val()==""){
            $(".error_tips").html('请输入手机号').css('display', 'block');
            return
        }else if(!phoneReg.test($(this).val())){
            $(".error_tips").html('您输入的手机号不正确').css('display', 'block');
            return false;
        }else{
            $(".error_tips").html('您输入的手机号可使用').css('display', 'block');
        }
     })
     $(".pwd").on("blur",function(){
        var pwdReg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
        if($(this).val()==""){
            $(".error_tips").html('请输入密码').css('display', 'block');
            return
        }else if(!pwdReg.test($(this).val())){
            $(".error_tips").html('您输入的密码不正确').css('display', 'block');
            return false;
        }else{
            $(".error_tips").html('您输入的密码可以使用').css('display', 'block');
        }
     })
    // //注册
        $("#btnRegister").on("click",function(event){
            var user=$(".username").val();
            var pwd=$(".password").val();
            event.preventDefault(); 
            var register=true;
            var data= {"username":user,"password": pwd,"register":true};
            $.ajax({
                 type:"get",
                 url:"../api/sign.php",
                 data:data,
                 dataType:'json',
                 success:function(msg){
                     if(msg==true){
                        window.location.href = "../html/login.html";   
                     }else if(msg==false){
                       $(".error_tips").html('用户已被注册').css('display', 'block');
                     }
                 }
            })

        })

  
});