<template>
  <div class="dapp">
    <iframe class="red_packet"
            :src="toDappUrl"
            :frameborder="0"></iframe>
    <div class="download">
      <div class="wallet-qrcode">
        <img src="../assets/wallet_qrcode.png" />
      </div>
      <div class="discription">
        <div class="discription-title">{{'下载FO钱包'}}</div>
        <div class="discription-content">{{'您的智能合约钱包'}}</div>
      </div>
      <a href="/">
        <div class="downloadBtn">{{'下载'}}</div>
      </a>
    </div>
    <div class="wxtip"
         v-show="showWx">
      <span class="wxtip_icon"></span>
      <p class="wxtip_txt">
        点击右上角
        <br />选择在浏览器中打开
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dapp',
  data () {
    return {
      toDappUrl: '',
      payee: '',
      token: '',
      contract: '',
      amount: '',
      memo: '',
      isIos: false,
      isAndroid: false,
      showWx: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getParams()
      const ua = navigator.userAgent
      const isAndroid = /(?:Android)/.test(ua)
      const isFireFox = /(?:Firefox)/.test(ua)
      const isTablet =
        /(?:iPad|PlayBook)/.test(ua) ||
        (isAndroid && !/(?:Mobile)/.test(ua)) ||
        (isFireFox && /(?:Tablet)/.test(ua))
      const isPhone = /(?:iPhone)/.test(ua) && !isTablet
      const isIpad = /(?:iPad)/.test(ua)
      const isWeixin = !!/MicroMessenger/i.test(ua)
      const isWeibo = !!/WeiBo/i.test(ua)
      if (isWeixin) {
        this.$set(this, 'showWx', true)
      }
      if (isWeibo) {
        this.$set(this, 'showWx', true)
      }
      if (isAndroid) {
        this.$set(this, 'isAndroid', true)
        this.$set(this, 'isIos', false)
      }
      if (isPhone || isIpad) {
        this.$set(this, 'isIos', true)
        this.$set(this, 'isAndroid', false)
      }
    })
    this.decodeUrl()
  },
  methods: {
    decodeUrl () {
      // console.log(window.location.href)
      let str = window.location.href.split('?')[1].split('=')[1]
      console.log(str)
      this.toDappUrl = decodeURIComponent(str).split(',')[0]
      console.log(this.toDappUrl)
    },
    getParams: function () {
      const reg = new RegExp(/params=/i)
      const tmp = window.location.search
      if (tmp.match(reg)) {
        const params = [...tmp.split('=')[1].split(',')]
        this.payee = params[0] || ''
        this.token = params[1] || ''
        this.contract = params[2] || ''
        this.amount = params[3] || ''
        this.memo = params[4] || ''
      } else {
        return null
      }
    }
  }
}
</script>
<style scoped>
.dapp {
  width: 100%;
  height: 100vh;
}
.wxtip {
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: calc(100vh - 80px);
  z-index: 998;
}
.wxtip_icon {
  width: 52px;
  height: 67px;
  background: url(../assets/weixin-tip.png) no-repeat;
  display: block;
  position: absolute;
  right: 20px;
  top: 20px;
}

.wxtip_txt {
  margin-top: 107px;
  color: #fff;
  font-size: 16px;
  line-height: 1.5;
}
.download {
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  box-shadow: 0 -1px 5px 0 #f2efff;
  background: #ffffff;
}
.wallet-qrcode {
  display: block;
  float: left;
  width: 50px;
  height: 50px;
  margin: 16px 20px 14px 30px;
}
.discription {
  display: inline-block;
  margin: 19px 0;
}
.discription-title {
  margin-bottom: 8px;
  font-size: 13px;
  color: #333333;
  letter-spacing: 0;
}
.discription-content {
  font-size: 13px;
  color: #999999;
  letter-spacing: 0;
}
.downloadBtn {
  float: right;
  width: 56px;
  height: 24px;
  border-radius: 12px;
  background: #3574fa;
  text-align: center;
  font-size: 13px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 24px;
  margin: 28px 30px;
}
.red_packet {
  width: 100%;
  height: 100%;
}
</style>
