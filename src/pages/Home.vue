<template>
  <div>
    <Header></Header>
    <section>
      <div class="container">
        <h3 class="update-content-head">
          {{$t("update")}}
          <div class="modal fade bs-example-modal-lg"
               tabindex="-1"
               role="dialog"
               aria-labelledby="myLargeModalLabel"
               style="text-align: left">
            <div class="modal-dialog modal-lg"
                 role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <h2 class="modal-title"
                      id="myModalLabel">{{$t("version")}}</h2>
                </div>
                <div class="modal-body">
                  <div v-for="(item, index) in versionList"
                       :key="index">
                    <h4>
                      {{item.version}}
                      <span style="color: #999999; float: right; font-weight: 300">{{item.time}}</span>
                    </h4>
                    <ul style="list-style: none;padding-left: 0px;font-size: 14px;color: #333333; font-weight: normal">
                      <li v-for="(item2, index2) in language === 'zh-cn' ? versionList[index].content.split('*') : versionList[index].content_en.split('*')"
                          :key="index2"
                          style="margin-bottom: 5px">
                        <span>{{ item2 }}</span>
                      </li>
                    </ul>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </h3>
        <div class="row update-content">
          <div class="version-button">
            <button type="button"
                    class="btn"
                    style="height: 30px; background-color: #3574FA; color: #ffffff; outline: none; margin-bottom: 10px;padding: 4px 18px;min-width: 100px;"
                    data-toggle="modal"
                    data-target=".bs-example-modal-lg">{{$t("version")}}</button>
            <br />
            <span style="font-size: 14px; color: #aaaaaa">V {{versionList[0] ? versionList[0].version : ''}}</span>
          </div>
          <ul class="update-content-ul">
            <li v-for="(item, index) in language === 'zh-cn' ? versionList[0].content.split('*') : versionList[0].content_en.split('*')"
                :key="index">
              <span v-if="index > 4 && !showMoreList"
                    class="hide">{{ item }}</span>
              <span v-else>{{ item }}</span>
            </li>
          </ul>
          <div v-if="language === 'zh-cn'"
               class="zh-cn">
            <div v-if="versionList[0].content.split('*').length <= 5"
                 class="hide seemore"
                 v-on:click="changeList(showMoreList ? false : true)">
              {{showMoreList ? $t("stop") : $t("seemore")}}
              <img :src="showMoreList ? up : down"
                   style="width: 21px;" />
            </div>
            <div v-else
                 v-on:click="changeList(showMoreList ? false : true)"
                 class="seemore">
              {{showMoreList ? $t("stop") : $t("seemore")}}
              <img :src="showMoreList ? up : down"
                   style="width: 21px;" />
            </div>
          </div>
          <div v-if="language === 'en-us'"
               class="en-us">
            <div v-if="versionList[0].content_en.split('*').length <= 5"
                 class="hide seemore"
                 v-on:click="changeList(showMoreList ? false : true)">
              {{showMoreList ? $t("stop") : $t("seemore")}}
              <img :src="showMoreList ? up : down"
                   style="width: 21px;" />
            </div>
            <div v-else
                 v-on:click="changeList(showMoreList ? false : true)"
                 class="seemore">
              {{showMoreList ? $t("stop") : $t("seemore")}}
              <img :src="showMoreList ? up : down"
                   style="width: 21px;" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="download-area">
      <div class="container">
        <a name="download-content"
           id="#download-content"></a>
        <div class="row download_content">
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 download-right"
               v-show="isAndroid">
            <h3>{{ $t("android_version") }}</h3>
            <div class="row">
              <div class="hidden-xs hidden-sm col-md-6 col-lg-6 googlePlay-qrcode-div">
                <a id="googlePlay-download"
                   href="https://play.google.com/store/apps/details?id=com.fowallet"
                   class="download-qrcode"
                   rel="nofollow"
                   target="_blank">
                  <div id="googlePlay-qrcode"
                       class="qrcode">
                    <img :src="google_play_qrcode"
                         style="width: 140px;" />
                  </div>
                </a>
                <br />
                <span>Google Play</span>
              </div>
              <div class="col-xs-12 col-sm-12 hidden-md hidden-lg btn-googlePlay">
                <a href="https://play.google.com/store/apps/details?id=com.fowallet"
                   rel="nofollow"
                   target="_blank">
                  <button type="button"
                          class="btn btn-info">
                    <img :src="google_play" />
                    <span>{{ $t("download_google_play") }}</span>
                  </button>
                </a>
              </div>
              <div class="hidden-xs hidden-sm col-md-6 col-lg-6 androidAPK-qrcode-div">
                <a id="androidAPK-download"
                   :href="apkDownloadUrl"
                   class="download-qrcode"
                   rel="nofollow"
                   onclick="_hmt.push(['_trackEvent', '下载', 'Android APK 下载']);ga('send', 'event', 'Android APK', '下载', 'FO钱包');">
                  <div id="androidAPK-qrcode"
                       class="qrcode">
                    <img :src="android_qrcode"
                         style="width: 140px;" />
                  </div>
                </a>
                <br />
                <span>Android APK</span>
              </div>
              <div class="col-xs-12 col-sm-12 hidden-md hidden-lg btn-apk">
                <a :href="apkDownloadUrl"
                   rel="nofollow"
                   onclick="_hmt.push(['_trackEvent', '下载', 'Android APK 下载']);ga('send', 'event', 'Android APK', '下载', 'FO钱包');">
                  <button type="button"
                          class="btn btn-info">
                    <img :src="android" />
                    <span>{{ $t("download_apk") }}</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 download-left"
               v-show="isIos">
            <h3>
              <span>{{ $t("ios_version") }}</span>
            </h3>
            <div class="row">
              <div class="hidden-xs hidden-sm col-lg-6 col-md-6">
                <a id="ios-download"
                   href="https://itunes.apple.com/hk/app/fo-%E9%92%B1%E5%8C%85/id1435072563"
                   class="download-qrcode"
                   rel="nofollow">
                  <div id="telegram-qrcode"
                       class="qrcode">
                    <img :src="ios_qrcode"
                         style="width:140px;" />
                  </div>
                </a>
                <br />
                <span>App Store</span>
                <br />
                <span style="font-size: 12px;color: #999999;font-weight:300">{{ $t("ios_tips") }}</span>
                <a href="http://forum.fo/index.php?app=forums&module=forums&controller=topic&id=333"
                   style="font-size: 12px;color: rgb(53, 116, 250)"
                   target="_blank">{{ $t("ios_tips2") }}</a>
              </div>
              <div class="hidden-xs hidden-sm col-lg-6 col-md-6">
                <a id="ios-download"
                   href="https://itunes.apple.com/us/app/testflight/id899247664?mt=8"
                   class="download-qrcode"
                   rel="nofollow">
                  <div id="telegram-qrcode"
                       class="qrcode">
                    <img :src="testflight"
                         style="width:140px;" />
                  </div>
                </a>
                <br />
                <span>testFlight</span>
                <br />
                <span style="font-size: 12px;color: #999999;font-weight:300"
                      class="testflight-tips">{{ $t("testflight_tips") }}</span>
              </div>
              <div class="col-sm-12 col-xs-12 hidden-md hidden-lg btn-telegram"
                   style="margin-bottom: 20px;">
                <a id="ios-download"
                   href="https://itunes.apple.com/hk/app/fo-%E9%92%B1%E5%8C%85/id1435072563"
                   rel="nofollow">
                  <button type="button"
                          class="btn btn-info">
                    <img :src="ios" />
                    <span>{{ $t("download_ios") }}</span>
                  </button>
                </a>
                <br />
                <div style="margin-right:10%;margin-left:10%">{{ $t("ios_tips") }}</div>
                <a href="http://forum.fo/index.php?app=forums&module=forums&controller=topic&id=333"
                   style="margin-right:10%;margin-left:10%;color: rgb(53, 116, 250)"
                   target="_blank">{{ $t("ios_tips2") }}</a>
              </div>
              <div class="col-sm-12 col-xs-12 hidden-md hidden-lg btn-telegram"
                   style="margin-bottom: 20px">
                <div id="testflight-download"
                     rel="nofollow"
                     @click="this.checkTestflight">
                  <button type="button"
                          class="btn btn-info">
                    <span>{{ 'testflight' }}</span>
                  </button>
                </div>
                <br />
                <div style="margin-right:10%;margin-left:10%">{{ $t("testflight_tips") }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
    <div class="wxtip"
         v-show="showWx && isAndroid">
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
import Header from "@/components/header/index.vue";
import Footer from "@/components/footer/index.vue";
import axios from "axios";
export default {
  name: "Home",
  components: { Header, Footer },
  data () {
    return {
      google_play_qrcode: require("../assets/google-play-qrcode.png"),
      google_play: require("../assets/google-play.svg"),
      android_qrcode: require("../assets/android-qrcode.png"),
      android: require("../assets/android.svg"),
      ios_qrcode: require("../assets/ios-qrcode.png"),
      apple_ipa_qrcode: require("../assets/apple-ipa-qrcode.png"),
      ios: require("../assets/ios.svg"),
      testflight: require("../assets/testflight.png"),
      up: require("../assets/up.svg"),
      down: require("../assets/down.svg"),
      isAndroid: true,
      isIos: true,
      apkDownloadUrl:
        window.location.protocol +
        "//" +
        window.location.host +
        "/app/fo_wallet_v4.4.13.apk",
      showWx: false,
      versionList: [
        {
          version: "",
          content: "",
          content_en: ""
        }
      ],
      showMoreList: false,
      language: ""
    };
  },
  watch: {
    $route (to, from) {
      var array = to.path.split("/");
      this.$set(this, "language", array[1]);
    }
  },
  mounted: function () {
    window.removeEventListener("blur", {});
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      var ua = navigator.userAgent;
      var isAndroid = /(?:Android)/.test(ua);
      var isFireFox = /(?:Firefox)/.test(ua);
      var isTablet =
        /(?:iPad|PlayBook)/.test(ua) ||
        (isAndroid && !/(?:Mobile)/.test(ua)) ||
        (isFireFox && /(?:Tablet)/.test(ua));
      var isPhone = /(?:iPhone)/.test(ua) && !isTablet;
      var isIpad = /(?:iPad)/.test(ua);
      var isWeixin = !!/MicroMessenger/i.test(ua);
      if (isAndroid) {
        // window.location.href = this.apkDownloadUrl
        this.$set(this, "isAndroid", true);
        this.$set(this, "isIos", false);
        var src = this.apkDownloadUrl;
        var iframe = document.createElement("iframe");
        iframe.style.display = "none";
        // eslint-disable-next-line
        iframe.src = src;
        document.getElementsByTagName("body")[0].appendChild(iframe);
      }
      if (isPhone || isIpad) {
        this.$set(this, "isIos", true);
        this.$set(this, "isAndroid", false);
      }
      if (isWeixin) {
        this.$set(this, "showWx", true);
      }
      var language = this.$i18n.locale;
      this.$set(this, "language", language);
    });
    this.getVersionList();
  },
  methods: {
    checkTestflight () {
      window.location.href = "itms-beta://testflight.apple.com/join/nFfb3Jfv";
      setTimeout(() => {
        if (!document.hidden) {
          window.location.href = "https://testflight.apple.com/join/nFfb3Jfv";
        } else {
          return false;
        }
      }, 300);
    },
    getVersionList () {
      axios.get("/version.json?v4.4.13").then(res => {
        var result = res.data.version;
        this.$nextTick(function () {
          this.$set(this, "versionList", result);
        });
      });
    },
    changeList (value) {
      this.$nextTick(function () {
        this.$set(this, "showMoreList", value);
      });
    }
  }
};
</script>

<style scoped>
.update-content-head {
  font-weight: 300;
  margin-bottom: 25px;
}

.update-content-ul {
  list-style: none;
  padding-left: 15px;
  font-size: 14px;
  font-weight: 300;
}

.update-content-ul > li {
  margin-bottom: 5px;
}

.version-button {
  float: right;
  text-align: center;
}

.seemore {
  margin-top: -30px;
  margin-bottom: 85px;
  margin-right: 6px;
  float: right;
  color: #3574fa;
  font-size: 16px;
  position: relative;
}

.seemore > img {
  margin-left: 13px;
}

.second-row {
  height: 718px;
}

.second-row-img {
  margin-left: 19%;
  margin-top: 150px;
  width: 81%;
}

.second-row-text {
  margin-left: 34%;
  margin-top: calc(25% + 150px);
}

.second-row-text > h1 {
  color: #666666;
}

.second-row-text > h2 {
  font-weight: 300;
  margin-top: 50px;
  color: #666666;
}

.third-row {
  background: #fff url(../assets/pc-background-second.png) top no-repeat;
  background-size: cover;
  height: 789px;
}

.third-row-img {
  margin-left: 21%;
  margin-top: 222px;
}

.third-row-text {
  margin-left: 20%;
  margin-top: calc(25% + 222px);
}

.third-row-text > h1 {
  color: #666666;
}

.third-row-text > h2 {
  font-weight: 300;
  margin-top: 50px;
  color: #666666;
}

.download-right > h3 {
  margin-top: 50px;
  margin-bottom: 50px;
  font-weight: 300;
}
.download-left > h3 {
  margin-top: 50px;
  margin-bottom: 50px;
  font-weight: 300;
}

.download_content {
  text-align: center;
  margin-bottom: 60px;
}

@media screen and (max-width: 991px) {
  .download-right > h3 {
    margin-top: 50px;
    font-size: 1.75rem;
    margin-bottom: 20px;
  }
  .download-left > h3 {
    margin-top: 50px;
    font-size: 1.75rem;
    margin-bottom: 20px;
  }
  .second-row {
    height: 0px;
  }
  .third-row {
    height: 0px;
  }
}

@media screen and (max-width: 767px) {
  .update-content-ul {
    list-style: none;
    padding-left: 15px;
    font-size: 13px;
    font-weight: 300;
  }

  .update-content-head {
    font-size: 1.75rem;
    text-align: center;
    font-weight: bolder;
  }

  .version-button {
    float: none;
    margin-bottom: 20px;
  }

  .seemore {
    float: none;
    margin-top: 0px;
    margin-left: 15px;
  }
}

.btn-info {
  width: 80%;
  padding: 12px;
  border: none;
  background-image: -webkit-linear-gradient(right, #abdbfc 0, #1667d8 100%);
  background-image: -o-linear-gradient(right, #abdbfc 0, #1667d8 100%);
  background-image: -webkit-gradient(
    linear,
    left,
    right,
    from(#abdbfc),
    to(#1667d8)
  );
  background-image: linear-gradient(to right, #abdbfc 0, #1667d8 100%);
  outline: none;
}

.btn-info:focus,
.btn-info:hover {
  background-color: rgba(132, 87, 234, 0.7) !important;
  outline: none !important;
}

.btn-info > img {
  width: 1.5rem;
}

.btn-info:hover {
  background-position: 0;
}

.download-qrcode > div {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

a.download-qrcode {
  outline: none;
  text-decoration: none;
  overflow: hidden;
  display: inline-block;
  padding: 10px;
  background: linear-gradient(to left, #b5b5b5, #b5b5b5) left top no-repeat,
    linear-gradient(to bottom, #b5b5b5, #b5b5b5) left top no-repeat,
    linear-gradient(to left, #b5b5b5, #b5b5b5) right top no-repeat,
    linear-gradient(to bottom, #b5b5b5, #b5b5b5) right top no-repeat,
    linear-gradient(to left, #b5b5b5, #b5b5b5) left bottom no-repeat,
    linear-gradient(to bottom, #b5b5b5, #b5b5b5) left bottom no-repeat,
    linear-gradient(to left, #b5b5b5, #b5b5b5) right bottom no-repeat,
    linear-gradient(to left, #b5b5b5, #b5b5b5) right bottom no-repeat;
  background-size: 1px 20px, 20px 1px, 1px 20px, 20px 1px;
  color: #6766b6;
  margin-bottom: 20px;
}

.googlePlay-qrcode-div {
  padding-right: 0px;
  padding-left: 30px;
}

.btn-googlePlay {
  margin-top: 10px;
  margin-bottom: 10px;
}

.androidAPK-qrcode-div {
  padding-left: 30px;
  padding-right: 30px;
}

.btn-apk {
  margin-top: 10px;
  margin-bottom: 10px;
}

button {
  height: 50px;
}

.wxtip {
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
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
.download-area {
  background: #f4f4f4;
}
</style>
