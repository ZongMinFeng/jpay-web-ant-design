<template>
  <div class="base">
    <div class="div1">
      <img src="../../static/img/vip.png">
      <span>会员系统</span>
    </div>
    <div>
      <input class="div2" type="text" placeholder="用户名">
    </div>
    <div>
      <input class="div2" type="password" placeholder="密码">
    </div>
    <button></button>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped>
  .base {
    /*border: 1px solid red;*/
    /*height: 667px;*/
    box-sizing: border-box;
    padding: 0px 60px;
  }

  .div1{
    display:flex;
    height: 65px;
    width: 151px;
    margin: auto;
    margin-top: 150px;
    margin-bottom: 20px;
  }

  .div1 img{
    display: inline-block;
    height: 65px;
  }

  .div1 span{
    display: inline-block;
    height: 65px;
    line-height: 65px;
    vertical-align: middle;
    font-weight: 700;
    color: rgb(13,128,235);
    margin-left: 10px;
  }

  .base .div2{
    width: 100%;
    height: 50px;
    border: 0;
    border-radius: 25px;
    font-size: large;
    text-align: center;
    background-color: rgb(242,240,246);
  }

  .base .div2:last-child{
    margin-top: 10px;
  }

  .div2 input{
    border: 0;
  }

  .base button{
    display: block;
    width: 70px;
    height:70px;
    margin: auto;
    margin-top: 50px;
    text-align: center;
    line-height: 70px;
    border-radius:50%;
    background-color: rgb(13,128,235);
    color: white;
    font-size: 20px;
    text-decoration:none;
    background-image: url('../../static/img/go.jpg');
    background-repeat:no-repeat;
    background-position: center center;
  }
</style>
