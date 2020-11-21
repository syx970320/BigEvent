// 密码规范验证
var form = layui.form;
form.verify({
    // 规则名:[正则,不符合正则返回信息]
    changdu: [/^\S{6,12}$/, '长度6~12位,不能有空格'],
    same: function (val) {
        // 谁添加same方法 val 就是谁的值
        if ($('.newPwd').val() != val) {
            return '两次密码不一致呦~'
        }
    },
    // 新旧密码不能一样
    diff: function (val) {
        if ($('.oldPwd').val() == val) {
            return '新密码不能和旧密码一样!'
        }
    }
});

$('form').on('submit', function (e) {
    e.preventDefault();

    var data = $(this).serialize();
    $.post('/my/updatepwd', data, function (res) {
        // 无论修改成功还是失败，都给出提示
        layer.msg(res.message);
        if (res.status === 0) {
            // 修改成功，清空输入框的值
            $('form')[0].reset(); // DOM方法reset表示重置表单
        }
    });
})