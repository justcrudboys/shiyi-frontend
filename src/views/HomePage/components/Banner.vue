<template>
  <div class="banner">
    <div class="inner-box">
      <div class="sec-1">
        <h1 class="slogan">不止于创作 </h1>
      </div>
      <div class="sec-2">
        <span style="color: #dc3b0c;font-size: 25px">拾艺</span>
        <a-divider type="vertical" style="height: 25px; background-color: #868685" />
        连接创作者与粉丝的按月赞助平台
      </div>
      <h2 class="sec-3"> 发起自己的创作方案，获得持续的资金支持，让创作从此更自由 </h2>
      <a-button style="margin-top: 20px" type="primary" @click="toProfile">成为创作者</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data() {
    return {
      bannerImg: require('../../../assets/banner.png')
    }
  },
  methods:{
    toProfile(){
      this.$router.push('/Profile')
    }
  }
}
</script>

<style lang="scss" scoped>
.inner-box{
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  .sec-1{
    display: flex;
    margin: 0 auto;
    background: #fff;
  }
}
.slogan {
  background-image: linear-gradient(to right, orange, purple);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 40px;
}
.sec-3 {
  margin-top: 7px;
  font-size: 7px;
  color: rgba(0,0,0,.5);
  font-weight: 400;
}
.bg-img-2{
  -o-object-fit: cover;
  object-fit: cover;
  position: absolute;
  left: 0;
  top: 24px;
  transform: translateY(-30%) translateX(70%);
  z-index: 0;
  display: block;
}
</style>
