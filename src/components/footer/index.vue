<template>
    <footer>
        <section class="links">
        <div>
            <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" style="padding-bottom: 20px;">
                <h4>{{ $t("fo_wallet") }}</h4>
                <span>
                {{ $t("fo_wallet_span_first") }}
                </span>
                <br />
                <br />
                <span>
                {{ $t("fo_wallet_span_second") }}
                </span>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 hidden-xs">
                <h4>{{ $t("friendly_links") }}</h4>
                <ul>
                <li>
                    <a href="https://fibos.io/" rel="nofollow">FIBOS</a>
                </li>
                <li>
                    <a href="https://dev.fo/" rel="nofollow">{{ $t("developer") }}</a>
                </li>
                <li>
                    <a href="https://dapp.fo/" rel="nofollow">DAPP</a>
                </li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 hidden-xs">
                <h4 id="Doc">{{ $t("help") }}</h4>
                <ul>
                <!-- <li>
                    <a :href="language === 'zh-cn' ? foexchange : foexchangeEn" id="DEV_Guides1" rel="nofollow">{{ $t("foexchange") }}</a>
                </li> -->
                <li>
                    <a href="https://fibos.io/zh-cn/faq" id="Built_in_Objects1" rel="nofollow">FAQ</a>
                </li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" :style="{display: ($i18n.locale === 'zh-cn' ? 'block' : 'none')}">
                <h4>{{ $t("contact_us") }}</h4>
                <ul class="social-media">
                <li>
                    <a class="qrcodeContainer" href="javascript:void(0)" rel="nofollow">
                    <img class="qrcodeImg" :src="qrcode" v-show="showqrcode"/>
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/fibos_io" target="_blank" rel="nofollow">
                    <img :src="twitter" class="twitterImg" />
                    </a>
                </li>
                <li>
                    <a href="https://t.me/FIBOSIO" target="_blank" rel="nofollow">
                    <img :src="telegram" class="telegramImg" />
                    </a>
                </li>
                <li>
                    <a href="https://github.com/FIBOSIO" target="_blank" rel="nofollow">
                    <img class="githubImg" :src="github" />
                    </a>
                </li>
                </ul>
            </div>
            </div>
        </div>
        </section>
        <section class="copyright">
        <div>
            <p class="text-center">
              <span>©{{new Date().getFullYear()}} FIBOS FOUNDATION 版权所有</span>
            </p>
        </div>
        </section>
  </footer>
</template>

<style scoped>
@import "index.css";
</style>

<script>
export default {
  name: 'Footer',
  data () {
    var array = window.location.pathname.split('/')
    return {
      twitter: require('../../assets/twitter.svg'),
      telegram: require('../../assets/telegram.svg'),
      github: require('../../assets/github.svg'),
      showqrcode: false,
      language: array[1] ? array[1] : 'zh-cn',
      foexchange: 'https://fibos.io/zh-cn/newsdetail/fo-qian-bao-dui-huan-jiao-cheng',
      foexchangeEn: 'https://fibos.io/en-us/foexchange',
      hasSiteRocord: window.location.hostname === 'fowallet.net'
    }
  },
  watch: {
    $route (to, from) {
      var array = to.path.split('/')
      var locale = array[1] ? array[1] : 'zh-cn'
      this.$set(this, 'language', locale)
    }
  },
  methods: {
    enter: function () {
      this.$set(this, 'showqrcode', true)
    },
    leave: function () {
      this.$set(this, 'showqrcode', false)
    }
  }
}
</script>
