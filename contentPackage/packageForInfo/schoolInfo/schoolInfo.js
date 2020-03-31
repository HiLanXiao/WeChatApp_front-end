

// contentPackage/packageForInfo/schoolInfo/schoolInfo.js
import {
  Request,
  Throttole,
  CheckLogin,
  MySetData
} from '../../../utils/util.js'

import {
  schoolInfoData
} from '../../../utils/mock/information.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerDegree: ['本科', '硕士', '博士'],
    pickerGrade: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2023, 2024],
    dataChange: false,
    schoolInfo: {
      university: "",
      college: "",
      major: "",
      gradeIndex: "",
      degreeIndex: ""
    },
    webSchoolInfo: null
  },

  degreePickerChange(e) {
    MySetData({
      'schoolInfo.degreeIndex': parseInt(e.detail.value) + 1
    }, this)
  },

  gradePickerChange(e) {
    MySetData({
      'schoolInfo.gradeIndex': parseInt(e.detail.value) + 1
    }, this)
  },

  checkAndInput(type, e) {
    let pattern = /[^\u4e00-\u9fa5\w]/g
    e.detail.value = e.detail.value.replace(pattern, "")
    MySetData({
      [type]: e.detail.value
    }, this)
  },
  blurUniversity(e) {
    this.checkAndInput('schoolInfo.university', e)
  },
  blurCollege(e) {
    this.checkAndInput('schoolInfo.college', e)
  },
  blurMajor(e) {
    this.checkAndInput('schoolInfo.major', e)
  },

  saveInfo() {
    // let data = {
    //   university: this.data.schoolInfo.university,
    //   college: this.data.schoolInfo.college,
    //   major: this.data.schoolInfo.major,
    //   grade: this.data.schoolInfo.gradeIndex ? this.data.pickerGrade[this.data.schoolInfo.gradeIndex - 1] : "",
    //   degree: this.data.schoolInfo.degreeIndex ? this.data.pickerDegree[this.data.schoolInfo.degreeIndex - 1] : ""
    // }
    // let options = {
    //   url: 'http://localhost:3000/information/saveSchoolInfo',
    //   method: "POST",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   data: data
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
    wx.setStorageSync('schoolInfo', this.data.schoolInfo)
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
    //     url: 'http://localhost:3000/information/getSchoolInfo',
    //     method: "GET"
    //   },
    //   that = this
    // Request(options).then(res => {
    //   MySetData({
    //     schoolInfo: res.data.data
    //   }, that)
    // }).catch(res => {
    //   console.log('hapi')
    // })
    if (wx.getStorageSync('schoolInfo')) {
      MySetData({
        schoolInfo: wx.getStorageSync('schoolInfo')
      }, this)
    } else {
      wx.setStorageSync('schoolInfo', schoolInfoData)
      MySetData({
        schoolInfo: schoolInfoData
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