<template>
  <div class="container main">
    <div class="head">
      <div>
        <span>今日收入</span>
      </div>
      <div>
        <div class="yestoday">
          <span>昨日收入</span>
        </div>
        <div class="month">
          <span>本月收入</span>
        </div>
      </div>
    </div>

    <div class="middle">
      <mt-field class="phone" label="手机号" placeholder="请输入手机号" v-model="searchForm.phone"></mt-field>
      <div>
        <mt-button type="primary">查询</mt-button>
        <mt-button class="scan" type="danger">扫描</mt-button>
      </div>
    </div>

    <div class="bottom"></div>

    <div class="navbar"></div>
  </div>
</template>

<script>
export default {
  name: 'Business',
  data(){
    return{
      searchForm:{
        phone:null
      }
    }
  },

  methods:{
  }
}
</script>

<style scoped>
  .main{
    padding: 8px 20px;
  }

  .head {
    box-sizing: border-box;
    height: 160px;
    padding: 30px;
    margin-top: 20px;
  }

  .head>div{
    width: 100%;
  }

  .head div span{
    border: 1px solid pink;
    display: block;
    width: 100px;
    margin: 0 auto;
    text-align: center;
  }

  .head>div:last-child{
    margin-top: 60px;
  }

  .head>div>div{
    display: inline-block;
  }

  .yestoday{
    float: left;
  }

  .month{
    float: right;
  }

  .middle{
    box-sizing: border-box;
    width: 100%;
    height: 165px;
    margin-top: 10px;
    padding: 0 10px;
  }

  .middle .phone{
    margin-top: 60px;
  }

  .middle>div{
    margin-top: 20px;
  }

  .middle>div button{
    width: 140px;
  }

  .middle .scan{
    margin-left: 20px;
  }

  .navbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: pink;
    height: 50px;
  }
</style>
