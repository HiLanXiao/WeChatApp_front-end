function Request({
  url,
  method,
  data,
  header
}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: header,
      success(res) {
        if (res.data.status) {
          resolve(res.data)
        } else {
          reject(new Error(res.data.message))
        }
      },
      fail(res) {
        reject(new Error(res.errMsg))
      }
    })
  })
}

function Throttole(func, interval) {
  let time = 0
  return function () {
    if (Date.now() - time > interval) {
      func.call(this, ...arguments)
      time = Date.now()
    } else {
      return false
    }
  }
}

function Debounce(func, waiting) {
  let timer = null,
    timeNow
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, [...arguments])
      }, waiting)
      timeNow = Date.now()
    } else {
      if (Date.now() - timeNow < waiting) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, [...arguments])
        }, waiting)
        timeNow = Date.now()
      }
    }
  }
}

function CheckLogin() {
  return new Promise((resolve, reject) => {
    if (!wx.getStorageSync('sessionId')) {
      wx.showToast({
        title: '正在登录',
        icon: 'loading',
        duration: 1500,
        mask: true
      })
      wx.login({
        success(res) {
          let options = {
            url: 'http://localhost:3000/login',
            method: "GET",
            data: {
              code: res.code
            }
          }
          Request(options).then(data => {
            wx.setStorageSync('sessionId', data.payload.sessionId)
            resolve()
          }).catch(e => {
            reject(e)
          })
        },
        fail(res) {
          reject(res.errMsg)
        }
      })
    } else {
      resolve()
    }
  })
}

let obj = {}

function setD(that) {
  that.setData(obj)
  obj = {}
}

function MySetData(newObj, that) {
  if (!Object.keys(obj).length) {
    let keys = Object.keys(newObj)
    for (let i of keys) {
      obj[i] = newObj[i]
    }
    return Promise.resolve().then(setD(that))
  } else {
    let keys = Object.keys(newObj)
    for (let i of keys) {
      obj[i] = newObj[i]
    }
  }
}

function showErrToast(errMsg) {
  wx.showToast({
    title: errMsg,
    icon: 'none',
    duration: 2000,
    mask: true
  })
}

export {
  Request,
  Throttole,
  Debounce,
  CheckLogin,
  MySetData,
  showErrToast
}