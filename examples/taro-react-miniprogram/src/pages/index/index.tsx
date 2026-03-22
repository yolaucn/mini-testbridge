import React, { useState } from "react"
import { Button, View } from "@tarojs/components"
import { IButton } from "@/components/IButton"
import { IInput } from "@/components/IInput"
import "./index.scss"

const Index: React.FC = () => {
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  return (
    <View className="container">
      <View>{message}</View>
      <IInput
        placeholder="请输入手机号码"
        testid="phone-input"
        value={phone}
        onInput={(e) => setPhone(e.detail.value)}
      />
      <IButton
        testid="login-btn"
        onClick={() => {
          if (phone.length < 11) {
            setMessage("请输入正确的手机号码")
          } else {
            setMessage("登录成功")
          }
        }}
      >
        登录
      </IButton>

      {process.env.NODE_ENV === "development" && (
        <Button
          onClick={() => {
            wx.testBridge.run([
              { input: { id: "phone-input", value: "13800000000" } },
              { tap: "login-btn" },
            ])
          }}
        >
          自动化测试
        </Button>
      )}
    </View>
  )
}

export default Index