<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <a-layout-footer style="background: rgb(225,228,238)">
        <router-view :key="key" />
        <p style="text-align: center">Shiyi</p>
      </a-layout-footer>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background: rgb(18, 52, 105);
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
