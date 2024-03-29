<template>
  <main class="home" :aria-labelledby="data.heroText !== null ? 'main-title' : null" >
    <header class="hero">
      <link rel="stylesheet" href="https://cdn.mainnet.cash/icofont.min.css">

      <img v-if="data.heroImage" :src="$withBase(data.heroImage)" :alt="data.heroAlt || 'hero'">

      <h1 v-if="data.heroText !== null" id="main-title"> {{ data.heroText || $title || 'Hello' }} </h1>

      <p v-if="data.tagline !== null" class="description" >
        {{ data.tagline || $description || 'Welcome to your VuePress site' }}
      </p>


      <div class="action" style="display: flex; justify-content: center;">
        <div style="margin: 0 10px 0 10px;">
          <a href="/tutorial/" class="nav-link action-button">
            JavaScript →
          </a>
          <p style="font-size: 90%;">
            Non-custodial client-side wallets<br>in user's browser
          </p>
        </div>
        <div style="margin: 0 20px 0 10px;">
          <a href="/tutorial/rest.html" class="nav-link action-button">
            REST API →
          </a>
          <p style="font-size: 90%;">
            Enterprise wallet<br>on your own server
          </p>
        </div>
        <div style="margin: 0 20px 0 10px;">
          <a href="/tutorial/demo.html" class="nav-link action-button">
            Videos →
          </a>
          <p style="font-size: 90%;">
            Let's build<br> a web app
          </p>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; width: 10em; margin: 0 auto; font-size: 70%;">
        <div><a href="https://t.me/mainnetcash"><div class="icofont-telegram" style="font-size: 290%; margin-bottom: 0.2em;"></div>Telegram</a></div>
        <div><a href="http://github.com/mainnet-cash/"><div class="icofont-github" style="font-size: 290%; margin-bottom: 0.2em;"></div>GitHub</a></div>
      </div>
    </header>

    <div
      v-if="data.features && data.features.length"
      class="features"
    >
      <div
        v-for="(feature, index) in data.features"
        :key="index"
        class="feature"
      >
        <h2>
          <a :href="feature.url" v-if="feature.url">{{ feature.title }}</a>
          <span v-else>{{ feature.title }}</span>
        </h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>

    <Content class="theme-default-content custom" />

    <div
      v-if="data.footer"
      class="footer"
    >
      {{ data.footer }}
    </div>
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'Home',

  components: { NavLink },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block
  .hero
    text-align center
    img
      max-width: 100%
      max-height 280px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 3rem
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color lighten($textColor, 40%)
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)
      &:hover
        background-color lighten($accentColor, 10%)
  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>
