const testBridge = require('mini-testbridge')

App({
  onLaunch() {
    wx.testBridge = testBridge
    console.log('Test Bridge ready', testBridge)
  },
  globalData: {
    userInfo: null
  }
})
