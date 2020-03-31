const app = getApp();
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
  properties: {
    cards: Array
  },
  /**
   * 组件的初始数据
   */
  data: {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    cardSupportCountTap(e) {
      this.triggerEvent('cardSupportCountTap', e.mark)
    },
    cardCommentCountTap(e) {
      this.triggerEvent('cardCommentCountTap', e.mark)
    },
    commentSupportCountTap(e){
      this.triggerEvent('commentSupportCountTap', e.mark)
    },
    commentCommentCountTap() {
      this.triggerEvent('searchDynamic')
    },
    imageTap(e) {
      this.triggerEvent('viewProfile')
    }
  }
})