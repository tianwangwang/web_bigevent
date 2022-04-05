$(function () {
    // 调用获取用户基本信息的函数
    getUserInfo()

    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 跳转登录页
            location.href = '/login.html'
            layer.close(index)
        })
    })


})


// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: {
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }

            // 调用渲染用户头像的函数
            renderAvatar(res.data)
        }
    })
    
    // 渲染用户头像
    function renderAvatar(user) {
        // 获取用户名称
        var name = user.nickname || user.username
        // 设置欢迎文本
        $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
        // 按需渲染用户头像
        if (user.user_pic !== null) {
            // 渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            // 渲染文字头像
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }

    
}