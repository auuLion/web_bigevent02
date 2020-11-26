$(function () {
    //1.统一对路径进行处理
    $.ajaxPrefilter(function (options) {
        options.url = 'http://ajax.frontend.itheima.net' + options.url
        //2.对有请求权限的/my/统一配置请求头
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        //3.登录请求失败 而且是身份认证失败时强制跳转到login页，并清空token值
        options.complete = function (res) {
            if (res.responseJSON.status !== 0 && res.responseJSON.message == "身份认证失败！") {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    })

})