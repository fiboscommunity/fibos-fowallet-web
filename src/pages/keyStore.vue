<template>
  <div class="keyStore">
    <div class="container">
      <div class="tipsArea">
        <div class="tip">{{'1、获取 Keystore 和密码等于拥有钱包资产所有权'}}</div>
        <div class="tip">{{'2、请妥善保管此二维码，并在安全情况下使用'}}</div>
        <div class="tipsTitle">{{'温馨提示'}}</div>
        <div class="payBtn" @click="this.checkEnv">{{'立即导入'}}</div>
      </div>
    </div>
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
    <div class="wxtip" v-show="showWx">
      <span class="wxtip_icon"></span>
      <p class="wxtip_txt">
        点击右上角
        <br />选择在浏览器中打开
      </p>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "keyStore",
  data() {
    return {
      appUrl: `fowallet://${encodeURIComponent(window.location.href)}`,
      isIos: false,
      isAndroid: false,
      showWx: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      const ua = navigator.userAgent;
      const isAndroid = /(?:Android)/.test(ua);
      const isFireFox = /(?:Firefox)/.test(ua);
      const isTablet =
        /(?:iPad|PlayBook)/.test(ua) ||
        (isAndroid && !/(?:Mobile)/.test(ua)) ||
        (isFireFox && /(?:Tablet)/.test(ua));
      const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
      const isIpad = /(?:iPad)/.test(ua);
      const isWeixin = !!/MicroMessenger/i.test(ua);
      const isWeibo = !!/WeiBo/i.test(ua);
      if (isWeixin) {
        this.$set(this, "showWx", true);
      }
      if (isWeibo) {
        this.$set(this, "showWx", true);
      }
      if (isAndroid) {
        this.$set(this, "isAndroid", true);
        this.$set(this, "isIos", false);
      }
      if (isPhone || isIpad) {
        this.$set(this, "isIos", true);
        this.$set(this, "isAndroid", false);
      }
    });
  },
  methods: {
    checkEnv: function() {
      window.location.href = this.appUrl;
      setTimeout(() => {
        if(!document.hidden) {
            window.location.href = "";
        } else {
            return false
        }
      }, 1000);
    }
  }
};
</script>
<style scoped>
.keyStore {
  height: 100vh;
  width: 100%;
  position: relative;
}
.container {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-image: url("../assets/keystore.png");
  padding: 0;
}

.payBtn {
  width: 180px;
  height: 68px;
  background-size: 100% 100%;
  background-image: url("../assets/payBtn.png");
  position: absolute;
  bottom: -34px;
  left: 0;
  transform: translateX(60px);
  text-align: center;
  font-size: 22px;
  color: #ffffff;
  letter-spacing: -0.53px;
  line-height: 60px;
}

.tipsArea {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 180px;
  background: #ffffff;
  box-shadow: 0 2px 10px 0 rgba(190, 180, 232, 0.15);
  border-radius: 6px;
  padding: 19px 15px 0 15px;
}

.tip {
  width: 270px;
  height: 42px;
  margin-top: 20px;
  font-size: 15px;
  color: #333333;
}

.tipsTitle {
  width: 145px;
  height: 38px;
  background-image: url("../assets/keystore_tips.png");
  background-size: 100% 100%;
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  line-height: 38px;
  font-size: 17px;
  color: #ffffff;
  letter-spacing: 0;
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
</style>
