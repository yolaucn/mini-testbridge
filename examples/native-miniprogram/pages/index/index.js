const { register } = require('mini-testbridge')

Page({
  onLoad(){
    register('login-btn',{
      tap:()=>{
        console.log('点击了登录')
      }
    })

    register('phone-input',{
      input:(v)=>{
        this.setData({phone:v})
        console.log('输入手机号:',v)
      }
    })

    register('submit-btn',{
      tap:()=>{
        console.log('提交成功')
        this.setData({success:true})
      }
    })
  },
  data:{
    phone:'',
    success:false
  }
})