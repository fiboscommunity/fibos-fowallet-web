<template>
    <div>
        <Header2></Header2>
        <div class="container">
            <div class="row">
                <div class="col-md-3 hidden-xs hidden-sm col-lg-3">
                  <div class="sidebar">
                    <ul v-scroll-spy-active="{class: 'customActive'}" v-scroll-spy-link class="menu">
                        <li :key="item" v-for="item in titles" class="menu-item">
                          <a>{{ $t(item) }}</a>
                        </li>
                    </ul>
                  </div>
                </div>
                <div class="col-sm-12 hidden-md hidden-lg col-xs-12">
                    <ul class="nav nav-tabs nav-stacked" style="width: 100%;">
                        <li class="active"><a href="#section-1">{{ $t('doctitle1') }}</a></li>
                        <li><a href="#section-2">{{ $t('doctitle2') }}</a></li>
                    </ul>
                </div>
                <div class="col-xs-12 col-md-9 col-lg-9 col-sm-12" >
                  <div v-scroll-spy="{data: 'section'}" class="main">
                      <div>
                          <h3>{{ $t('doctitle1') }}</h3>
                          <div v-html="html1" class="center"></div>
                      </div>
                      <div>
                          <h3>{{ $t('doctitle2') }}</h3>
                          <div v-html="html2" class="center"></div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import showdown from 'showdown'
import Header2 from '@/components/header2/index.vue'
import Footer from '@/components/footer/index.vue'
import dappsdkDraft from '../docs/dappsdk_draft.md'
import login from '../docs/login.md'
import dappsdkDraftEn from '../docs/dappsdk_draft_en.md'
import loginEn from '../docs/login_en.md'
export default {
  name: 'Documentations',
  components: { Header2, Footer, showdown },
  data () {
    return {
      md2: dappsdkDraft,
      html2: '',
      md1: login,
      md1En: loginEn,
      md2En: dappsdkDraftEn,
      html1: '',
      section: 0,
      titles: [
        'doctitle1',
        'doctitle2'
      ]
    }
  },
  watch: {
    $route (to, from) {
      var array = to.path.split('/')
      if (array[1] === 'zh-cn') {
        let converter = new showdown.Converter()
        let text1 = this.md1.toString()
        let text2 = this.md2.toString()
        this.html1 = converter.makeHtml(text1)
        this.html2 = converter.makeHtml(text2)
      } else {
        let converter = new showdown.Converter()
        let text1 = this.md1En.toString()
        let text2 = this.md2En.toString()
        this.html1 = converter.makeHtml(text1)
        this.html2 = converter.makeHtml(text2)
      }
    }
  },
  mounted () {
    var language = this.$i18n.locale
    let converter = new showdown.Converter()
    if (language === 'zh-cn') {
      let text1 = this.md1.toString()
      let text2 = this.md2.toString()
      this.html1 = converter.makeHtml(text1)
      this.html2 = converter.makeHtml(text2)
    } else {
      let text1 = this.md1En.toString()
      let text2 = this.md2En.toString()
      this.html1 = converter.makeHtml(text1)
      this.html2 = converter.makeHtml(text2)
    }
  }
}
</script>

<style scoped>
  .sidebar {
    position: fixed;
    top: 100px;
  }

  .menu {
    padding: 0;
    list-style: none;
  }

  .current-section {
    padding-top: 50px;
  }

  .current-section input {
    max-width: 3em;
  }

  .menu-item {
    margin-bottom: 20px;
  }

  .menu-item a {
    cursor: pointer;
  }

  .customActive {
    color: #178ce6;
    border-left: 1px solid #178ce6;
    padding-left: 5px;
    transition: all 0.5s;
  }
</style>
