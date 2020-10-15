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
  async onLoad() {
    try {
      await CheckLogin()
      let options = {
        url: 'http://localhost:3000/getCards',
        method: "GET",
        data: {
          sessionId: wx.getStorageSync('sessionId')
        }
      }
      let data = await Request(options)
      MySetData({
        cards: data.payload
      }, this)
    } catch (e) {
      showErrToast(e.message)
    }
  },
  async cardSupportCountTap(e) {
    let cardId = e.detail.cardId,
      options = {
        url: 'http://localhost:3000/card/cardLike',
        method: "POST",
        data: {
          cardId: cardId,
          sessionId: wx.getStorageSync('sessionId')
        }
      },
      cards = this.data.cards
    await Request(options).catch(e => {
      showErrToast(e.message)
      return
    })
    for (let card of cards) {
      if (card.cardId === cardId) {
        if (card.cardSupportWhether = !card.cardSupportWhether) {
          card.cardSupportCount++
        } else {
          card.cardSupportCount--
        }
      }
    }
  },
  cardCommentCountTap(e) {
    wx.navigateTo({
      url: '/contentPackage/packageForSquare/comment/comment?cardId=' + e.detail.cardId,
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