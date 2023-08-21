<template>
  <div>
    <button @click="pay">微信支付</button>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk';

export default {
  methods: {
    pay() {
      // 构建支付请求参数
      const params = {
        appId: 'your_appid',
        timestamp: 'timestamp',
        nonceStr: 'nonceStr',
        package: 'package',
        signType: 'signType',
        paySign: 'paySign'
      };

      // 调用微信支付接口
      wx.chooseWXPay({
        ...params,
        success(res) {
          // 支付成功回调
        },
        fail(res) {
          // 支付失败回调
        }
      });
    }
  }
}
</script>
