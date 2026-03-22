export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/test/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Mini TestBridge Demo',
    navigationBarTextStyle: 'black'
  }
})

function defineAppConfig(config: any) {
  return config
}