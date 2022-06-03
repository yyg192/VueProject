div<template>
    <div class="login_container">
        <!--头像区域-->
        <div class="login_box">
            <div class="avatar_box"><!--avatar_box里面放logo.png-->
                <img src="../assets/logo.png" alt="">
            </div>
            <!--登录表单区-->
            <el-form
                ref="loginFormRef"
                :model="loginForm"
                label-width="0px"
                :rules="loginFormRules"
                class="login_form"><!--因为我们想要拿到这个表单的实例对象,所以给一个ref-->
                <!--用户名-->
                <el-form-item
                    prop="username">
                    <el-input
                        style="margin-bottom:10px"
                        v-model="loginForm.username"
                        prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>
                <!--密码-->
                <el-form-item
                    prop="password">
                    <el-input
                        show-password
                        v-model="loginForm.password"
                        prefix-icon="el-icon-search">
                    </el-input>
                </el-form-item>
                <!--按钮区域-->
                <el-row class='btns'>
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    // 这是表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur' }
        ], // 验证用户名是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在6到10个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      // console.log(this)  这个this指向当前登录组件的实例
      this.$refs.loginFormRef.resetFields() // 重置表单内容
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        // validate接受一个回调函数,第一个形参是一个bool值,可以判断表单是否验证成功
        console.log(valid) // valid是验证结果bool值,箭头函数如果只有一个形参可以省略小括号
        if (!valid) { return }
        const { data: res } = await this.$http.post('login', this.loginForm) // 登陆请求login地址,然后请求的参数为this.loginForm,里面携带我们的username和password
        // // // s
        // $http.post返回的是一个Promise对象,如果某个方法的返回值是Promise
        // 我们可以用await和async来简化这次Promise操作,
        // await和async可以用一种简洁的方式写出基于Promise的异步行为,无需刻意地链式调用Promise
        // await只能用于async修饰地方法,所以我们要在valid之前加一个async关键字
        console.log(res)
        // post返回了很多对象,其中一个对象是data,就是我们需要的服务器返回的数据
        if (res.meta.status !== 200) { return this.$message.error('登录失败!') }
        this.$message.success('登录成功')
        // 1. 将登录成功之后的token,保存到客户端的sessionStorage中
        //  1.1 项目中除了登录之外的其他API接口必须在登录之后才能访问
        //  1.2 token只应在当前网站打开期间生效,所以将token保存在sessionStorage之中
        // 2. 通过编程式导航跳转到后台主页,路由地址是/home
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped> // 加scoped是因为我们不同的组件之间不会相互影响
.login_container{
    background-color: #2b356b;
    height: 100%;
}

.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;  //位置是绝对偏移
    left: 50%; //绝对位置上左边50%
    top: 50%;  //绝对位置上右边50%
    transform: translate(-50%, -50%); //视觉上自适应缩放位移，在横轴上移动-50%，纵轴上移动-50%
}
.login_form {
    position: absolute;
    bottom: 50%;
    width: 100%;
    padding: 0 20px;//距离左右边距
    box-sizing: border-box;
    transform:translate(0, 60%)
}
.avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;//搞一个边框
    border-radius: 50%;//把这个边框变成圆形的
    padding: 10px;//图片和边框之间增加一些间隙
    position: absolute;
    left: 50%;//距离左侧50%
    transform: translate(-50%, -50%);//让他移动图片自身的50%
    background-color: #fff;
    img{ //让img撑满avatar_box
        width: 100%;
        height: 100%;
        border-radius: 50%;//让logo也变成圆角的
        background-color: #eee;//logo的背景颜色变成灰色
    }
}
.btns {
    display:flex;//弹性模型
    justify-content: center;//尾部对齐
    height:30px;
}
.login_btn {
    background: #68b7f8;
    color: #ffffff;
    border: #ffffff;
}
.reset_btn {
    background: #abaaac;
    color: #ffffff;
    border: #ffffff;
}
</style>
