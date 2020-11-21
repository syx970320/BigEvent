var form = layui.form;
// 获取用户信息
get();
function get() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            layer.msg(res.message)
            if (res.status == 0) {
                // 快速赋值
                form.val('user', res.data);
            }
        }
    });
};

// 修改信息
$('form').on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/my/userinfo',
        data: data,
        success: function (res) {
            layer.msg(res.message);
            if (res.status == 0) {
                window.parent.getInfo();
            }
        }
    });
});

// 重置
$('.myreset').on('click', function (e) {
    e.preventDefault();
    // 重新获取数据
    get();
})