$(function () {
    //获取layui声明变量
    var form = layui.form
    var layer = layui.layer
    //设置校验规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称为1~6个字符'
            }
        }
    })
    initUserInfo()
    //获取用户数据
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    //重置数据
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    //修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })
})