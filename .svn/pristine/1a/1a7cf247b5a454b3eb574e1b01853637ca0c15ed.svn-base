<template>
  <div class="login-page">
    <div class="logo"></div>
    <div>
      <ul class="login-manner">
        <li>
          <p>天职工作平台用户入口：</p>
          <a :href="login1">
            <img src="@/assets/img/manner1.png" alt="">
          </a>
        </li>
        <li>
          <p>咨询云平台用户入口：</p>
          <a :href="login2">
            <img src="@/assets/img/manner2.png" alt="">
          </a>
        </li>
      </ul>
      <!-- <div class='form'>
        <h3>用户登录</h3>
        <el-form :model="user" :rules="rules" ref="ruleForm">
          <el-form-item prop="username" class="delu-box">
            <el-input v-model.trim="user.username" placeholder="请输入用户名/手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-password delu-box">
            <el-input v-model.trim="user.password" placeholder="请输入密码" type="password" @keyup.enter.native='userSearch2(user)'></el-input>
          </el-form-item>
          <el-form-item class="delu-box">
            <router-link :to="'/forgetPassword'" tag="span">忘记密码?</router-link>
            <el-button type="primary" @click="login(user)" v-if="!loading">登录</el-button>
            <el-button type="info" v-else>登录</el-button>
            <div class="text">
              <span>还没有账号?</span>
              <a href="javascript:;">立即注册</a>
            </div>
          </el-form-item>
        </el-form>
      </div> -->
    </div>
    <div class="login-footer">© 2016-2019 青矩技术股份有限公司 All Rights Reserved</div>
  </div>
</template>

<script>
import api from '@/fetch/api.js'
export default {
  computed: {
    login1() {
      if (this.$route.query.redirectUrl) {
        return process.env.VUE_APP_LOGIN_ROOT + 'login/index?subsystemUrl=' + this.$route.query.redirectUrl
      }
      return process.env.VUE_APP_LOGIN_ROOT + 'login/index?subsystemUrl=' + window.location.origin + '/cloudPlatform'
    }
  },
  data() {
    let checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名/手机号不能为空'))
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 5 || value.length > 16) {
        callback(new Error('请输入密码6-15位'))
      } else {
        callback()
      }
    }
    return {
      // login1: process.env.VUE_APP_LOGIN_ROOT + 'login/index?subsystemUrl=' + window.location.origin + '/cloudPlatform',
      login2: process.env.VUE_APP_LOGIN_ROOT2 + 'Login/Index?system=tzeccData',
      user: {
        username: '',
        password: ''
      },
      loading: false,
      rules: {
        username: [{ validator: checkTel, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    login(user) {
      const that = this
      this.loading = true
      if (user.username) {
        if (user.password) {
          api
            .publishPeopleLogin({
              authentication: user.username
            })
            .then(function(res) {
              that.$message({
                showClose: true,
                message: '恭喜你，登录成功',
                type: 'success'
              })
              localStorage.setItem('userName', user.username)
              localStorage.setItem('userId', res.data.userId)
              that.$router.go(-1)
              that.loading = false
              // window.location.href = document.referrer
            })
            .catch(function(err) {
              that.loading = false
            })
        } else {
          that.$message({
            showClose: true,
            message: '请输入密码',
            type: 'error'
          })
        }
      } else {
        that.$message({
          showClose: true,
          message: '请输入用户名',
          type: 'error'
        })
      }
    },
    userSearch2(user) {
      let that = this
      that.login(user)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login-page {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url('~@/assets/img/loginbg.png') no-repeat center;
  background-size: cover;
  .logo {
    width: 291px;
    position: absolute;
    top: 15px;
    left: 19px;
    height: 41px;
    background: url(~@/assets/logo.png) no-repeat;
  }
}
.login-manner {
  display: flex;
  justify-content: center;
  margin-top: 228px;
  > li {
    > p {
      font-size: 16px;
      color: #fff;
      text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.35);
      margin-bottom: 20px;
    }
    & + li {
      margin-left: 20px;
    }
    > a {
      display: block;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.01);
        box-shadow: 0px 0px 25px 0px #aaa;
      }
    }
  }
}
.form {
  width: 800px;
  height: 400px;
  background: #fff;
  padding: 60px 61px;
  box-sizing: border-box;
  position: relative;
  h3 {
    font-size: 16px;
    color: #444444;
  }
}

.text {
  padding-top: 14px;
  font-size: 14px;
  color: #666666;
  float: left;
}

.text > a {
  color: #4474cf;
  padding-left: 20px;
}
.login-footer {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  position: absolute;
  bottom: 60px;
  right: 62px;
}
</style>
<style lang='less'>
.login-page {
  .el-form {
    padding-top: 9px;
  }
  .login-password {
    margin-bottom: 12px;
  }

  .el-button {
    width: 100%;
    margin-top: 40px;
    font-size: 16px;
  }
  .el-form-item__content {
    position: relative;
    > span {
      position: absolute;
      right: 0;
      color: #4474cf;
      font-size: 14px;
      line-height: 14px;
    }
  }
}
</style>
