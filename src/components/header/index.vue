<template>
  <header class="header">
    <div class="container">
      <nav class="navbar navbar-default">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button"
                  class="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-3"
                  aria-expanded="false"
                  ref="openList"
                  @click="toggleNavShow"
                  v-show="!xsNavShow">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand"
             href="/"
             rel="nofollow">
            <span class="logo-default">
              <img :src="Logo" />
            </span>
            <span class="logo-mobile">
              <img :src="LogoMobile" />
            </span>
          </a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div :class="['collapse', 'navbar-collapse', xsNavShow ? 'show' : '']"
          id="bs-example-navbar-collapse-1">
          <div class="close-wrapper">
            <span class="glyphicon glyphicon-remove" @click="toggleNavShow"></span>
          </div>
          <ul class="nav navbar-nav navbar-left">
            <li :class="['nav-item', !pageName ? 'highlight' : '']">
              <router-link :to="'/' + language"
                           class="nav-link">
                {{ $t("index") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/' + language + '/fowallet'"
                           class="nav-link">
                {{ $t("plugin") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/' + language + '/documentation'"
                           class="nav-link">
                {{ $t("documentation") }}
              </router-link>
            </li>
            <li class="nav-item">
              <a href="https://fibos.io/"
                 rel="nofollow"
                 class="nav-link"
                 target="_blank">FIBOS</a>
            </li>
            <li class="nav-item">
              <a href="#"
                 class="dropdown-toggle nav-link language"
                 data-toggle="dropdown"
                 role="button"
                 aria-haspopup="true"
                 aria-expanded="false">
                {{ $t("language") }}
              </a>
              <ul class="dropdown-menu changeLanguage">
                <li>
                  <router-link :to="'/zh-cn/' + secondpath"><img :src="Zh"
                         v-on:click="language = 'zh-cn'" /></router-link>
                </li>
                <li>
                  <router-link :to="'/en-us/' + secondpath"><img :src="En"
                         v-on:click="language = 'en-us'" /></router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="collapse navbar-collapse hidden-xs"
             id="bs-example-navbar-collapse-2">
          <ul class="nav navbar-nav navbar-left">
            <li :class="['nav-item', !pageName ? 'highlight' : '']">
              <router-link :to="'/' + language"
                           class="nav-link">
                {{ $t("index") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/' + language + '/fowallet'"
                           class="nav-link">
                {{ $t("plugin") }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="'/' + language + '/documentation'"
                           class="nav-link">
                {{ $t("documentation") }}
              </router-link>
            </li>
            <li class="nav-item">
              <a href="https://fibos.io/"
                 rel="nofollow"
                 class="nav-link"
                 target="_blank">FIBOS</a>
            </li>
            <li class="nav-item">
              <a href="#"
                 class="dropdown-toggle nav-link language"
                 data-toggle="dropdown"
                 role="button"
                 aria-haspopup="true"
                 aria-expanded="false">
                <img :src="language === 'zh-cn' ? Zh : En" />
              </a>
              <ul class="dropdown-menu changeLanguage">
                <li>
                  <router-link :to="'/zh-cn/' + secondpath"><img :src="Zh"
                         v-on:click="language = 'zh-cn'" /></router-link>
                </li>
                <li>
                  <router-link :to="'/en-us/' + secondpath"><img :src="En"
                         v-on:click="language = 'en-us'" /></router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- /.navbar-collapse -->
        <!-- /.container-fluid -->
        <section class="secone">
          <div class="row">
            <div class="hidden-xs col-sm-6 col-md-6 col-lg-6 fo-logo-div">
              <div class="fo-logo">
                <img :src="language === 'zh-cn' ? FoLogo : FoLogoEn"
                     class="img-responsive" />
              </div>
              <a href="#download-content"><button type="button"
                        class="btn"><img :src="ios" /> iOS {{ $t("download") }}</button></a>
              <a href="#download-content"><button type="button"
                        class="btn"><img :src="android" /> Android {{ $t("download") }}</button></a>
            </div>

          </div>
        </section>
      </nav>
      <div class="col-xs-12 hidden-sm hidden-md hidden-lg bottom-content">
        <div>
          <div>{{ $t("header_secone_content_1")}}</div>
          <div>{{ $t("header_secone_content_2")}}</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    var array = window.location.pathname.split('/')
    return {
      Logo: require('../../assets/logo.png'),
      FoLogo: require('../../assets/fo_logo.png'),
      FoLogoEn: require('../../assets/fo_logo_en.png'),
      FoLogoMobile: require('../../assets/fo_logo_mobile.png'),
      FoLogoMobileEn: require('../../assets/fo_logo_mobile_en.png'),
      Zh: require('../../assets/zh.png'),
      En: require('../../assets/en.png'),
      language: array[1] ? array[1] : 'zh-cn',
      secondpath: array[2] ? array[2] : '',
      ios: require('../../assets/ios.svg'),
      android: require('../../assets/android.svg'),
      LogoMobile: require('../../assets/logo-mobile.png'),
      pageName: array[2] || '',
      xsNavShow: false
    }
  },
  methods: {
    toggleNavShow () {
      this.xsNavShow = !this.xsNavShow
    }
  },
  watch: {
    $route (to, from) {
      var array = to.path.split('/')
      this.$i18n.locale = array[1] ? array[1] : 'zh-cn'
      this.$set(this, 'language', this.$i18n.locale)
    }
  },
  mounted: function () {
    this.listbutton = this.$refs.openList
    this.mobileLogo = this.$refs.mobileLogo
    this.listbutton.addEventListener('click', () => {
      var show = this.listbutton.getAttribute('aria-expanded')
      if (show === 'false') {
        this.mobileLogo.style.filter = 'blur(9px)'
      } else {
        this.mobileLogo.style.filter = 'blur(0px)'
      }
    }, false)
  }
}
</script>

<style scoped>
@import "index.css";
</style>
