import {
  CheckLogin,
  Request,
  MySetData,
  showErrToast
} from '../../utils/util.js'


// pages/square/square.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cards: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    await CheckLogin().catch(e => {
      showErrToast(e.message)
    })
    let options = {
        url: 'http://localhost:3000/square',
        method: "GET",
        data: {
          sessionId: wx.getStorageSync('sessionId')
        }
      },
      that = this
    Request(options).then(data => {
      MySetData({
        cards: data.payload
      }, that)
    }).catch(e => {
      showErrToast(e.message)
    })
  },
  cardSupportCountTap(e) {
    let that = this,
      squareData = that.data.cards
    for (let item in squareData) {
      if (squareData[item].cardId === e.detail.cardId) {
        if (!squareData[item].cardSupportWhether) {
          squareData[item].cardSupportCount++
          squareData[item].cardSupportWhether = true
        } else {
          squareData[item].cardSupportCount--
          squareData[item].cardSupportWhether = false
        }
        MySetData({
          cards: squareData
        }, that)
      }
    }
  },
  cardCommentCountTap(e) {
    wx.navigateTo({
      url: '/contentPackage/packageForSquare/comment/comment',
    })
  },
  searchDynamic(e) {
    wx.navigateTo({
      url: '/contentPackage/packageForSquare/searchResult/searchResult',
    })
  },
  viewProfile() {
    wx.navigateTo({
      url: '/contentPackage/packageForInfo/resume/resume',
    })
  }

})