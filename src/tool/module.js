import sendServer from '../util/communication'
import functions from './functions'

const loginCheck = (params) => {
  return new Promise((resolve, reject) => {
    let urlParams = {}
    let send = {}
    let singArray = {}
    let header = {}
    urlParams.url = functions.loginCheck.url

    if (params.userInfo != null) {
      send.userInfo = params.userInfo
    }

    urlParams.send = send
    urlParams.noSing = true
    urlParams.singArray = singArray
    urlParams.header = header

    sendServer(urlParams).then((res) => {
        resolve(res)
      }, (res) => {
        reject(res)
      }
    )
  })
}

/**
 * 2.1.19	查询会员详细信息
 * @param params
 * @returns {Promise<any>}
 */
const memberDetailsQueryByCon = ( params) => {
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = functions.memberDetailsQueryByCon.url

    if(params.issuId!=null){
      send.issuId=params.issuId;
    }

    if(params.memId!=null){
      send.memId=params.memId;
    }else{
      send.phone=params.phone;
    }

    if(params.flag!=null){
      send.flag=params.flag;
    }

    urlParams.send = send;
    urlParams.noSing = true;
    urlParams.singArray = singArray;

    sendServer(urlParams).then((res) => {
        resolve(res)
      }, (res) => {
        reject(res)
      }
    );
  })
};

/**
 * 2.26	 会员充值
 * @param me
 * @param params
 * @param Toast
 * @returns {Promise<any>}
 */
const memberCharge = (params) => {
  console.log("memberCharge", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = functions.memberCharge.url;

    if(params.issuId!=null){
      send.issuId=params.issuId;
    }
    if(params.acqId!=null){
      send.acqId=params.acqId;
    }
    if(params.transId !=null){
      send.transId =params.transId ;
    }
    if(params.memId!=null){
      send.memId=params.memId;
    }
    if(params.amt!=null){
      send.amt=params.amt;
    }
    if(params.mch!=null){
      send.mch=params.mch;
    }
    if(params.mchName!=null){
      send.mchName=params.mchName;
    }
    if(params.pos!=null){
      send.pos=params.pos;
    }
    if(params.posName!=null){
      send.posName=params.posName;
    }
    if(params.createTellerId!=null){
      send.createTellerId=params.createTellerId;
    }

    urlParams.send = send;
    urlParams.noSing = true;
    urlParams.singArray = singArray;

    sendServer(urlParams).then((res) => {
        resolve(res)
      }, (res) => {
        reject(res)
      }
    );
  })
};

/**
 * 2.27	 会员消费
 * @param params
 * @returns {Promise<any>}
 */
const memberSale = (params) => {
  console.log("memberCharge", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = functions.memberSale.url;

    if(params.issuId!=null){
      send.issuId=params.issuId;
    }
    if(params.acqId!=null){
      send.acqId=params.acqId;
    }
    if(params.transId !=null){
      send.transId =params.transId ;
    }
    if(params.memId!=null){
      send.memId=params.memId;
    }
    if(params.amt!=null){
      send.amt=params.amt;
    }
    if(params.mch!=null){
      send.mch=params.mch;
    }
    if(params.mchName!=null){
      send.mchName=params.mchName;
    }
    if(params.pos!=null){
      send.pos=params.pos;
    }
    if(params.posName!=null){
      send.posName=params.posName;
    }
    if(params.createTellerId!=null){
      send.createTellerId=params.createTellerId;
    }

    urlParams.send = send;
    urlParams.noSing = true;
    urlParams.singArray = singArray;

    sendServer(urlParams).then((res) => {
        resolve(res)
      }, (res) => {
        reject(res)
      }
    );
  })
};

/**
 * 2.28	 会员退货
 * @param params
 * @returns {Promise<any>}
 */
const memberRefund = (params) => {
  console.log("memberRefund", params);//debug
  return new Promise((resolve, reject) => {
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url = functions.memberRefund.url;

    if(params.issuId!=null){
      send.issuId=params.issuId;
    }
    if(params.acqId!=null){
      send.acqId=params.acqId;
    }
    if(params.voucher !=null){
      send.voucher =params.voucher ;
    }
    if(params.orgVoucher !=null){
      send.orgVoucher =params.orgVoucher ;
    }
    if(params.memId!=null){
      send.memId=params.memId;
    }
    if(params.refoundAmt!=null){
      send.refoundAmt=params.refoundAmt;
    }
    if(params.mid!=null){
      send.mid=params.mid;
    }
    if(params.mchName!=null){
      send.mchName=params.mchName;
    }
    if(params.pid!=null){
      send.pid=params.pid;
    }
    if(params.posName!=null){
      send.posName=params.posName;
    }
    if(params.createTellerId!=null){
      send.createTellerId=params.createTellerId;
    }

    urlParams.send = send;
    urlParams.noSing = true;
    urlParams.singArray = singArray;

    sendServer(urlParams).then((res) => {
        resolve(res)
      }, (res) => {
        reject(res)
      }
    );
  })
};

/**
 * 2.29	 订单查询（分页查询）
 * @param params
 * @returns {Promise<any>}
 */
const voucherQuery = (params) => {
  return new Promise((resolve, reject) => {
    console.log("订单查询params", params);//debug
    let urlParams = {};
    let send = {};
    let singArray = {};
    urlParams.url =  functions.voucherQuery.url

    if(params.page!=null){
      send.page=params.page;
    }

    if(params.pageSize!=null){
      send.pageSize=params.pageSize;
    }

    if(params.issuId!=null){
      send.issuId=params.issuId;
    }
    if(params.acqId!=null){
      send.acqId=params.acqId;
    }
    if(params.memId!=null){
      send.memId=params.memId;
    }
    if(params.account!=null){
      send.account=params.account;
    }
    if(params.flag!=null){
      send.flag=params.flag;
    }
    if(params.mch!=null){
      send.mch=params.mch;
    }
    if(params.pos!=null){
      send.pos=params.pos;
    }

    urlParams.send = send;
    urlParams.noSing = true;
    urlParams.singArray = singArray;

    sendServer(urlParams).then((res) => {
        resolve(res)
      }, (res) => {
        reject(res)
      }
    );
  })
};

export {
  loginCheck,
  memberDetailsQueryByCon,
  voucherQuery,
  memberSale,
  memberCharge,
  memberRefund
}
