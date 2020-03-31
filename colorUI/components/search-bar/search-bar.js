const app = getApp();
import {
  Request,
  MySetData
} from '../../../utils/util.js'
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的对外属性
   */
  properties: {},
  /**
   * 组件的初始数据
   */
  data: {
    searchContent: ""
  },
  /**
   * 组件的方法列表
   */
  methods: {
    search(e) {
      this.triggerEvent('searchDynamic', e.mark)
    },
    write(e) {
      let pattern = /[^\u4e00-\u9fa5\w]/g
      e.detail.value = e.detail.value.replace(pattern, "")
      MySetData({
        searchContent: e.detail.value
      }, this)
      console.log(this.data.searchContent)
    },
  }
})