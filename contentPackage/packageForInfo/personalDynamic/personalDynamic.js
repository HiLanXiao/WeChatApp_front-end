import {
  CheckLogin,
  Request,
  MySetData
} from '../../../utils/util.js'

import {
  personalDynamicData
} from '../../../utils/mock/personalDynamicData.js'

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
  onLoad: function () {


    MySetData({
      cards: personalDynamicData
    }, this)

  },
  cardCommentCountTap(e) {
    wx.navigateTo({
      url: '/contentPackage/packageForSquare/comment/comment',
    })
  }

})