// contentPackage/packageForInfo/personalInfo/personalInfo.js

import {
  Request,
  Throttole,
  Debounce,
  CheckLogin,
  MySetData
} from '../../../utils/util.js'

import {
  personalInfoData
} from '../../../utils/mock/information.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    personalInfo: {
      name: "",
      telephone: "",
      email: "",
      personalSite: "",
      personalGit: "",
      introduction: ""
    }
  },

  checkAndInput(type, e) {
    let pattern = /[^\u4e00-\u9fa5\w\u002e\u003a\u002f\u0040]/g
    e.detail.value = e.detail.value.replace(pattern, "")
    MySetData({
      [type]: e.detail.value
    }, this)
  },
  blurName(e) {
    this.checkAndInput('personalInfo.name', e)
  },
  blurTelephone(e) {
    this.checkAndInput('personalInfo.telephone', e)
  },
  blurEmail(e) {
    this.checkAndInput('personalInfo.email', e)
  },
  blurPersonalSite(e) {
    this.checkAndInput('personalInfo.personalSite', e)
  },
  blurPersonalGit(e) {
    this.checkAndInput('personalInfo.personalGit', e)
  },
  blurIntroduction(e) {
    MySetData({
      'personalInfo.introduction': e.detail.value
    }, this)
  },
  saveInfo() {
    let e = {}
    e.detail = {}
    e.detail.value = this.data.personalInfo.introduction
    console.log(e)
    this.checkAndInput('personalInfo.introduction', e)
    // let options = {
    //   url: 'http://localhost:3000/information/savePersonalInfo',
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: this.data.personalInfo
    // }
    // Request(options).then((res) => {
    //   wx.showToast({
    //     title: '保存成功',
    //     icon: 'success',
    //     duration: 1500,
    //     mask: true
    //   })
    // }).catch((res) => {
    //   console.log(res)
    //   wx.showToast({
    //     title: '保存失败，请联系管理员',
    //     icon: 'none',
    //     duration: 2000,
    //     mask: true
    //   })
    // })
    wx.setStorageSync('personalInfo', this.data.personalInfo)
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1500,
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    // let options = {
    //     url: 'http://localhost:3000/information/getPersonalInfo',
    //     method: "GET"
    //   },
    //   that = this
    // Request(options).then(res => {
    //   MySetData({
    //     personalInfo: res.data.data
    //   }, that)
    // }).catch(res => {
    //   console.log('hapi')
    // })

    if (wx.getStorageSync('personalInfo')) {
      MySetData({
        personalInfo: wx.getStorageSync('personalInfo')
      }, this)
    } else {
      wx.setStorageSync('personalInfo', personalInfoData)
      MySetData({
        personalInfo: personalInfoData
      }, this)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})