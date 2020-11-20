if (localStorage.getItem('token') == null) {
    location.href = '/login.html'
}

// ----------------------------------------------请求个人信息
$.ajax({
    url: "http://ajax.frontend.itheima.net/my/userinfo",
    // 设置请求头：
    headers: {
        "Authorization": localStorage.getItem("token"),
    },
    success: function (res) {
        console.log(res);
        if (res.status == 0) {
            // 名称：有昵称就昵称、不然就是用户名；
            var name = res.data.nickname || res.data.username;
            $(".username").text(name);

            // 测试代码：
            // res.data.user_pic = undefined;
            // name = "aaa";

            // 头像：如果有头像数据
            if (res.data.user_pic) {
                // 
                $(".layui-nav-img").show().attr("src", res.data.user_pic);
                $(".avatar").hide();
            }
            // 测试：没有头像数据的时候
            else {
                // 截取name名字上第一个字符；
                var t = name.charAt(0).toUpperCase();

                // show:会让元素变为行内元素；
                $(".avatar").show().css("display", "inline-block").text(t);
                $(".layui-nav-img").hide()
            }

        }
    },
    complete: function (xhr) {
        // xhr: 经过JQ封装后，xhr对象；
        // 原生xhr 找出返回的数据： xhr.reponseText;
        // xhr.responseJSON
        // console.log(xhr.responseJSON, 11111111111111);
        if (xhr.responseJSON.status == 1 || xhr.responseJSON.message == "身份认证失败！") {
            // 比较好的方式：就是清空
            localStorage.removeItem("token");
            location.href = "/login.html";
        }

    }
});

// ----------------------------------------------退出
$('#logout').on('click', function () {
    layer.confirm('您确定退出吗?', { icon: 3, title: '提示' }, function (index) {
        // 清除本地token
        localStorage.removeItem('token');
        location.href = '/login.html';

        layer.close(index);
    });
})
