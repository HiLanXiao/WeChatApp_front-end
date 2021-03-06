// contentPackage/packageForSqure/comment/comment.js
import {
  CheckLogin,
  Request,
  MySetData,
  showErrToast
} from '../../../utils/util.js'

import {
  cards
} from '../../../utils/mock/comment.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cards: cards
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(Options) {
    try {
      await CheckLogin()
      let options = {
        url: "http://localhost:3000/card/comments",
        method: "GET",
        data: {
          cardId: Options.cardId,
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

  commentSupportCountTap(e) {
    let that = this
    for (let item in this.data.cards[0].comments) {
      if (this.data.cards[0].comments[item].commentId === e.detail.commentId) {
        if (!this.data.cards[0].comments[item].commentSupportWhether) {
          this.data.cards[0].comments[item].commentSupportCount++
          this.data.cards[0].comments[item].commentSupportWhether = true
        } else {
          this.data.cards[0].comments[item].commentSupportCount--
          this.data.cards[0].comments[item].commentSupportWhether = false
        }
        MySetData({
          cards: this.data.cards
        }, that)
      }
    }
  },
  commentCommentCountTap(e) {
    // wx.navigateTo({
    //   url: '/contentPackage/packageForSquare/comment/comment',
    // })
  }

})