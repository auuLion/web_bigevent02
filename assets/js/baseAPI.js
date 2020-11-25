$(function () {
    //通过ajax对地址进行处理
    $.ajaxPrefilter(function (options) {
        options.url = 'http://ajax.frontend.itheima.net' + options.url
    })
})