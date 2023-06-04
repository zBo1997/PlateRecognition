// index.js
// 获取应用实例
const app = getApp()

Page({
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        var that = this;
        this.setData({
          src: res.tempImagePath
        }),
        wx.uploadFile({
            filePath: res.tempImagePath,
            method: 'POST',
            name: 'file',
            // 这里写入你本机的ip地址以及对应的端口号
            url: 'http://192.168.3.5:8084/ocrTest/tbk/feedback/plate',
            success(res){
                that.setData({
                  platNo: res.data
                })
                console.log(res);     
            }
          })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
})
