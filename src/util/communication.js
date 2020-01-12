/**
 * 跟后台通讯基础
 */
import axios from 'axios';

const sendServer=function(params){
  let url=params.url;
  return new Promise((resolve, reject) => {
    let send=params.send;
    axios.post(url, send).then(
      res=>{
        if (res.status === 200) {
          if (res.data.code && res.data.code === 200) {
            resolve(res.data.result);
          }else{
            reject(res.data.message);
          }
        }else {
          reject('后台系统错误！');
        }
      }
    ).catch('前台系统错误!');
  });
}

export default sendServer;
