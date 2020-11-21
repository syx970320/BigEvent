// 需求:
$.ajaxPrefilter(function (data) {
    // data:每次ajax发出请求参数配置对象
    // 1.配置根路径
    var base = 'http://ajax.frontend.itheima.net';
    data.url = base + data.url;

    // 2.设置请求头
    // 判断url地址是否/my开头
    if (data.url.indexOf('/my/') != -1) {
        data.headers = {
            "Authorization": localStorage.getItem("token"),
        };
    };

    // 3.complete:验证token在后台的有效性
    // 完成后调用,不管成功还是失败
    data.complete = function (xhr) {
        if (xhr.responseJSON.status == 1 || xhr.responseJSON.message == "身份认证失败！") {
            localStorage.removeItem("token");
            location.href = "/login.html";
        }
    }

})