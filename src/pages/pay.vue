<template>
  <div class="pay">
    <div class="container">
      <div class="qrcode-container">
        <div class="qrcode-top">
          <div id="qrcode">
            <qrcode-vue :value="qrcodeText"
                        :size="qrcodeSize" />
          </div>
          <div class="price">
            {{this.amount}}
            <span class="unit">{{this.token}}</span>
          </div>
        </div>
        <div class="qrcode-bottom">
          <span class="payee-title">{{'收款账号'}}</span>
          <span class="payee-name">{{this.payee}}</span>
        </div>
        <div class="payBtn"
             @click="this.checkEnv">{{'确认付款'}}</div>
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
    <div class="wxtip"
         v-show="showWx">
      <span class="wxtip_icon"></span>
      <p class="wxtip_txt">点击右上角
        <br>选择在浏览器中打开
      </p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { pageResponse } from "../util/pageResponse.js";
import QrcodeVue from "qrcode.vue";
import { hostUri } from "../util/config";

export default {
  name: "Pay",
  data () {
    return {
      qrcodeSize: 138,
      qrcodeText: window.location.href,
      appUrl: `fowallet://${encodeURIComponent(window.location.href)}`,
      payee: "",
      token: "",
      contract: "",
      amount: "",
      memo: "",
      isIos: false,
      isAndroid: false,
      showWx: false,
    };
  },
  components: {
    QrcodeVue
  },
  mounted () {
    this.$nextTick(() => {
      this.getParams();
      const ua = navigator.userAgent;
      const isAndroid = /(?:Android)/.test(ua);
      const isFireFox = /(?:Firefox)/.test(ua);
      const isTablet =
        /(?:iPad|PlayBook)/.test(ua) ||
        (isAndroid && !/(?:Mobile)/.test(ua)) ||
        (isFireFox && /(?:Tablet)/.test(ua));
      const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
      const isIpad = /(?:iPad)/.test(ua);
      const isWeixin = !!/MicroMessenger/i.test(ua)
      const isWeibo = !!/WeiBo/i.test(ua)
      if (isWeixin) {
        this.$set(this, 'showWx', true)
      }
      if (isWeibo) {
        this.$set(this, 'showWx', true)
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
    getParams: function () {
      const reg = new RegExp(/params=/i);
      const tmp = window.location.search;
      if (tmp.match(reg)) {
        const params = [...tmp.split("=")[1].split(",")];
        this.payee = params[0] || "";
        this.token = params[1] || "";
        this.contract = params[2] || "";
        this.amount = params[3] || "";
        this.memo = params[4] || "";
      } else {
        return null;
      }
    },
    checkEnv: function () {
      console.log(this.appUrl)
      window.location.href = this.appUrl
      setTimeout(() => {
        window.addEventListener('blur', () => {
          return false
        })
        window.location.href = hostUri
      }, 300)
    }
  }
};
</script>

<style scoped>
.pay {
  width: 100%;
  height: 100vh;
  background: rgb(254, 175, 42);
  position: relative;
}
.container {
  position: relative;
  padding: 0;
  margin: 0;
  height: 100%;
  background-size: 100% 100%;
  background-image: url("../assets/pay_background.png");
}
.qrcode-container {
  display: block;
  background: #fff;
  width: 300px;
  height: 305px;
  margin: 25vh auto;
  box-shadow: 0 2px 10px 0 rgba(190, 180, 232, 0.15);
  border-radius: 6px;
  position: relative;
}
.qrcode-top {
  height: 237px;
  width: 280px;
  margin: 0 10px;
  border-bottom: 2px #e0e0e0 dashed;
}
.qrcode-bottom {
  height: 64px;
  text-align: center;
  padding: 10px 0;
}
.payee-title {
  font-size: 15px;
  color: #999999;
  letter-spacing: 0;
}

.payee-name {
  font-size: 15px;
  color: #333333;
  letter-spacing: 0;
}

#qrcode {
  display: block;
  position: absolute;
  width: 138px;
  height: 138px;
  left: 81px;
  top: 27px;
}
.price {
  position: absolute;
  top: 180px;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  font-size: 30px;
  color: #fdab27;
  letter-spacing: 0;
  text-align: center;
  line-height: 42px;
}
.payBtn {
  width: 180px;
  height: 68px;
  background-size: 100% 100%;
  background-image: url("../assets/payBtn.png");
  transform: translate(60px, -25px);
  text-align: center;
  padding: 13px 0;
  font-size: 24px;
  color: #ffffff;
  letter-spacing: -0.58px;
  text-align: center;
}
.unit {
  font-size: 15px;
  color: rgb(54, 54, 54);
  font-weight: bold;
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
