<template>
  <div class="body">
    <div class="page">
      <img :src="hongbao"
           class="redpacket" />
      <img :src="hongbaobtn"
           class="getredpacket"
           v-on:click="onClick" />
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
      <p class="wxtip_txt">
        点击右上角
        <br />选择在浏览器中打开
      </p>
    </div>
  </div>
</template>

<script>
// import { pageResponse } from '../util/pageResponse.js'
import '../util/flexible'
import { hostUri } from '../util/config'
export default {
  name: 'Redpacket',
  methods: {
    onClick: function () {
      var id = this.getParam('id')
      var rebateAccountName = this.getParam('rebate_account_name')
      if (rebateAccountName) {
        window.location.href =
          'fowallet://type=redpacket&id=' +
          id +
          '&rebate_account_name=' +
          rebateAccountName
        window.setTimeout(function () {
          if (!document.hidden) {
            alert('当前钱包版本暂不支持返利红包领取，请去官网下载最新版钱包！')
          }
        }, 2000)
      } else {
        window.location.href = 'smartoken://' + id
        window.setTimeout(function () {
          if (!document.hidden) {
            window.location.href = hostUri
          }
        }, 2000)
      }
    },
    getParam: function (paramName) {
      var reg = new RegExp('(^|&)' + paramName + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) {
        return unescape(r[2])
      } else {
        return null
      }
    }
  },
  data () {
    return {
      hongbao: require('../assets/hongbao.png'),
      hongbaobtn: require('../assets/btn-redpacket.png'),
      showWx: false
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      var ua = navigator.userAgent
      var isWeixin = !!/MicroMessenger/i.test(ua)
      var isWeibo = !!/WeiBo/i.test(ua)
      if (isWeixin) {
        this.$set(this, 'showWx', true)
      }
      if (isWeibo) {
        this.$set(this, 'showWx', true)
      }
      var env = this.getParam('env') || 'zh'
      if (env === 'zh') {
        this.$set(this, 'hongbao', require('../assets/hongbao.png'))
        this.$set(this, 'hongbaobtn', require('../assets/btn-redpacket.png'))
      } else {
        this.$set(this, 'hongbao', require('../assets/hongbao_en.png'))
        this.$set(
          this,
          'hongbaobtn',
          require('../assets/btn-redpacket_en.png')
        )
      }
    })
  }
}
</script>

<style scoped>
html {
  font-size: 10px;
}
.body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/bg-hongbao-repeat.png);
  background-repeat: repeat;
}

.redpacket {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 50px;
  /* width: 11.03rem; */
  /* height: 14.8rem; */
  height: 85%;
}

.getredpacket {
  position: absolute;
  top: 78%;
  transform: translate(-50%, -50%);
  left: 50%;
  /* width: 5.41rem; */
  /* height: 1.91rem; */
  height: 13%;
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
</style>
