<template>
  <div class="base">
    <div class="div1">
      <img src="../../static/img/vip.png">
      <span>会员系统</span>
    </div>
    <div>
      <input class="div2" type="text" v-model="loginForm.username" placeholder="用户名">
    </div>
    <div>
      <input class="div2" type="password" placeholder="密码" v-model="loginForm.password">
    </div>
    <button @click="handleLogin"></button>
  </div>
</template>

<script>
  import { SHA256 } from '@/util/jsonSha256.js'
  import { get32randString } from '@/Gw/GwString.js'
  import {loginCheck} from '@/tool/module.js'

  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          username: 'caiwu',
          password: '888888'
        }
      }
    },

    methods: {
      handleLogin () {
        //目前没有校验
        // this.$refs.loginForm.validate(valid => {
        //   if (valid) {
        //     this.login()
        //   }
        // });
        this.login()
      },

      login () {
        localStorage.removeItem('username')
        localStorage.removeItem('loginId')
        localStorage.removeItem('instInfo')
        localStorage.removeItem('issuInstInfo')
        localStorage.removeItem('acqInstInfo')
        localStorage.removeItem('transId')
        localStorage.removeItem('seq')
        localStorage.setItem('seq', '1')
        let params = {}
        let randKey = get32randString()
        let EncPwd = this.loginForm.username + this.loginForm.password.length + this.loginForm.password
        let EncPwdSha = SHA256(EncPwd)
        let EncPwdShaU = EncPwdSha.toUpperCase().substring(0, 32)
        params.userInfo = randKey + EncPwdShaU + this.loginForm.username
        loginCheck(params).then(
          result => {
            localStorage.setItem('randKey', randKey)
            localStorage.setItem('username', this.loginForm.username)
            localStorage.setItem('loginId', result.loginId)
            localStorage.setItem('instId', result.instInfo.id)
            localStorage.setItem('instInfo', JSON.stringify(result.instInfo))
            if (result.issuInstInfo !== null) {
              localStorage.setItem('issuInstInfo', JSON.stringify(result.issuInstInfo))
            }
            if (result.acqInstInfo !== null) {
              localStorage.setItem('acqInstInfo', JSON.stringify(result.acqInstInfo))
            }
            localStorage.setItem('transId', result.transId)
            this.$router.push('/business')
          }
        )
      }
    }
  }
</script>

<style scoped>
  .base {
    box-sizing: border-box;
    padding: 0px 60px;
  }

  .div1 {
    height: 65px;
    width: 151px;
    margin: auto;
    margin-top: 150px;
    margin-bottom: 20px;
  }

  .div1 img {
    display: inline-block;
    height: 65px;
    vertical-align: middle;
  }

  .div1 span {
    display: inline-block;
    height: 65px;
    line-height: 65px;
    font-weight: 700;
    color: rgb(13, 128, 235);
    margin-left: 10px;
  }

  .base .div2 {
    width: 100%;
    height: 50px;
    border: 0;
    border-radius: 25px;
    font-size: large;
    text-align: center;
    background-color: rgb(242, 240, 246);
  }

  .base .div2:last-child {
    margin-top: 10px;
  }

  .div2 input {
    border: 0;
  }

  .base button {
    display: block;
    width: 70px;
    height: 70px;
    margin: auto;
    margin-top: 50px;
    text-align: center;
    line-height: 70px;
    border-radius: 50%;
    background-color: rgb(13, 128, 235);
    color: white;
    font-size: 20px;
    text-decoration: none;
    background-image: url('../../static/img/go.jpg');
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>
