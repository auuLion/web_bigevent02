$(function () {
    //1.获取用户信息
    getUserInfo()
    //2.监听退出事件
    $('#btnLogout').on('click', function () {
        layer.confirm('是否退出登录！', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //清空token并且跳转到login页
            localStorage.removeItem('token')
            location.href = "/login.html"
            layer.close(index);
        });
    })
})
//封装获取用户数据函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}
//获取数据后渲染数据头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').html(text).show()
    }
}