<template>
  <div class="container main">
    <div class="head" v-show="showFlag===1">
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
        <mt-button type="primary" @click="queryTap">查询</mt-button>
        <mt-button class="scan" type="danger">扫描</mt-button>
      </div>
    </div>

    <div style="border: 1px solid gray;" class="memberInfo" v-show="showFlag===2">
      <mt-field class="user" label="用户名" v-model="memberInfo.name" :disabled="true"></mt-field>
      <mt-field class="phone" label="余额" v-model="memberInfo.bal" :disabled="true"></mt-field>
    </div>

    <div class="operate" v-show="showFlag===2">
      <mt-button type="primary" class="operate-button" @click="saleTap">消费</mt-button>
      <mt-button type="primary" class="operate-button" @click="chargeTap">充值</mt-button>
      <mt-button type="primary" class="operate-button" @click="returnTap">返回</mt-button>
    </div>

    <div>
      <ul v-show="showFlag===2"
          class="vouchers"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="100">
        <li v-for="item in tableData" :key="item.voucher">
          <div class="div1">
            <img src="../../../static/img/business-4-voucher-img-1.jpg">
          </div>
          <div class="div2">
            <div>{{item.txnName}}</div>
            <div>{{item.createDate}}</div>
          </div>
          <div class="div3">
            <span>{{item.amt}}</span>
          </div>
          <div class="div4">
            <mt-button v-if="item.txnName==='消费'&&item.refundStatus===0" type="danger" @click="refundTap(item)">退货</mt-button>
            <span v-if="item.txnName==='消费'&&item.refundStatus===2">已经退货</span>
          </div>
        </li>
      </ul>
    </div>

    <!--<div class="navbar"></div>-->
  </div>
</template>

<script>
  import { memberDetailsQueryByCon, voucherQuery, memberSale, memberCharge, memberRefund} from '@/tool/module.js'
  import { MessageBox } from 'mint-ui';
  import {nextSeq} from '../../router/sequence'

  export default {
    name: 'Business',
    data () {
      return {
        searchForm: {
          phone: null,
          memId: null
        },
        tableData: [],
        issuInstInfo: {},
        acqInstInfo: {},
        instInfo: {},
        memberInfo: {},
        page: 1,
        pageSize: 10,
        AllCount: 0,
        showFlag: 1,//界面标志 1:未查询界面   2:会员界面
        loading: false,
        saleForm: {
          amt: null,
        },
        chargeForm: {},
        username:null,
      }
    },

    created () {
      this.issuInstInfo = JSON.parse(localStorage.getItem('issuInstInfo'))
      this.acqInstInfo = JSON.parse(localStorage.getItem('acqInstInfo'))
      this.instInfo = JSON.parse(localStorage.getItem('instInfo'))
      this.username = localStorage.getItem("username")
      this.searchForm.issuId = this.issuInstInfo.isntId
      this.searchForm.acqId = this.acqInstInfo.instId
      this.searchForm.mch = this.instInfo.instId

    },

    methods: {
      queryTap () {
        let params = {
          amt: null
        }
        params.issuId = this.issuInstInfo.instId
        params.phone = this.searchForm.phone
        memberDetailsQueryByCon(params).then(
          (res) => {
            this.memberInfo = res
            console.log('memberInfo', this.memberInfo)//debug

            //查询订单
            this.searchForm.issuId = this.memberInfo.issuId
            this.searchForm.memId = this.memberInfo.memId
            //删除以前订单
            this.tableData.length=0;
            this.page=1;
            this.getVoucher()
            this.showFlag=2;
          },
          (res) => {
          }
        ).catch()
      },

      getVoucher () {
        let params = {
          page: this.page,
          pageSize: this.pageSize,
          issuId: this.searchForm.issuId,
          acqId: this.searchForm.acqId,
          memId: this.searchForm.memId,
          account: this.searchForm.account,
          flag: this.searchForm.flag,
          mch: this.searchForm.mch,
          pos: this.searchForm.pos
        }
        voucherQuery(params).then(
          (res) => {
            console.log('订单查询res', res)//debug
            this.tableData.push(...res.rows);
            this.AllCount = res.allCount
            this.loading = false
          },
          (res) => {
            this.loading = false
          }
        ).catch(
          ()=>{
            this.loading = false
          }
        )
      },

      loadMore () {
        console.log("加载------------------")
        this.loading = true
        if (this.AllCount / this.pageSize > this.page) {
          this.page++;
          this.getVoucher();
        }
      },

      saleTap() {
        MessageBox.prompt('请输入金额', '消费').then(({ value, action }) => {
          this.saleForm.amt=parseFloat(value);
          this.sale();
        });
      },

      sale(){
        let params = {};
        params.issuId = this.issuInstInfo.instId;
        params.acqId = this.acqInstInfo.instId;
        params.transId = nextSeq();
        params.memId = this.memberInfo.memId;
        params.amt = this.saleForm.amt;
        params.mch = this.instInfo.instId;
        params.mchName = this.instInfo.instName;
        params.createTellerId = this.username;
        memberSale(params).then(
          (res) => {
            this.$message('消费成功');
            this.queryTap();
          },
          (res) => {
            this.$message('消费失败');
          }
        ).catch();
      },

      chargeTap(){
        MessageBox.prompt('请输入金额', '充值').then(({ value, action }) => {
          this.chargeForm.amt=parseFloat(value);
          this.charge();
        });
      },

      charge(){
        let params = {};
        params.issuId = this.issuInstInfo.instId;
        params.acqId = this.acqInstInfo.instId;
        params.transId = nextSeq();
        params.memId = this.memberInfo.memId;
        params.amt = this.chargeForm.amt;
        params.mch = this.instInfo.instId;
        params.mchName = this.instInfo.instName;
        params.createTellerId = this.username;
        memberCharge(params).then(
          (res) => {
            this.$message('充值成功');
            this.queryTap();
          },
          (res) => {
            this.$message('充值失败');
          }
        ).catch();
      },

      refundTap(item){
        this.$messageBox.confirm('此操作将全部退货', '退货').then(action=>{
          this.refund(item);
        });
      },

      refund(item){
        let params = {};
        params.issuId = this.issuInstInfo.instId;
        params.acqId = this.acqInstInfo.instId;
        params.voucher = nextSeq();
        params.orgVoucher=item.voucher;
        params.memId = this.memberInfo.memId;
        params.refoundAmt = item.amt-item.refundAmt;
        params.mid = this.instInfo.instId;
        params.mchName = this.instInfo.instName;
        params.createTellerId = this.username;
        memberRefund(params).then(
          (res) => {
            this.$message('退货成功');
            this.queryTap();
          },
          (res) => {
            this.$message('退货失败');
          }
        ).catch();
      },

      returnTap(){
        this.searchForm.phone=null;
        this.showFlag=1;
      },
    }
  }
</script>

<style scoped>
  .main {
    padding: 0 20px;
  }

  .head {
    box-sizing: border-box;
    height: 160px;
    padding: 30px;
    margin-top: 20px;
    margin-bottom: 70px;
  }

  .head > div {
    width: 100%;
  }

  .head div span {
    border: 1px solid pink;
    display: block;
    width: 100px;
    margin: 0 auto;
    text-align: center;
  }

  .head > div:last-child {
    margin-top: 60px;
  }

  .head > div > div {
    display: inline-block;
  }

  .yestoday {
    float: left;
  }

  .month {
    float: right;
  }

  .middle {
    box-sizing: border-box;
    padding: 0 10px;
  }

  .middle > div {
    margin-top: 0px;
  }

  .middle > div button {
    width: 140px;
  }

  .middle .scan {
    margin-left: 20px;
  }

  /*memberInfo*/
  .memberInfo {
    margin-top: 20px;
  }

  /*operate*/
  .operate {
    border: 1px solid gray;
    margin-top: 10px;
    padding: 5px 0;
  }

  .operate-button {
    margin-left: 10px;
  }

  /*vouchers*/
  .vouchers{
    border: 1px solid gray;
    /*margin-bottom: 50px;*/
    overflow-y: auto;
    padding: 4px 10px;
    font-size: 14px;
  }

  .vouchers li{
    display:flex;
    border-bottom: 1px solid gray;
    list-style-type: none;
  }

  .vouchers li .div1{
    flex: 4;
  }

  .vouchers li .div1 img{
    width: 40px;
    height: 40px;
  }

  .vouchers li .div2{
    flex: 10;
  }

  .vouchers li .div3{
    flex: 6;
  }

  .vouchers li .div3 span{
    float: right;
    margin-right: 5px;
  }

  .vouchers li .div4{
    flex: 4;
  }

  .vouchers li .div4 span{
    color: red;
  }

  .vouchers li .div4 .mint-button{
    font-size: 10px;
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
