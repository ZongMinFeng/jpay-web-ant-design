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

export {
  loginCheck
}
