<template>
  <div class="homepage">
    <a-card>
      <a-row>
        <a-col span="4"></a-col>
        <a-col span="8">
          <Banner></Banner>
        </a-col>
      </a-row>
      <a-row>
        <a-col span="1"></a-col>
        <a-col span="22">
          <Recommends class="rec"></Recommends>
        </a-col>
        <a-col span="1"></a-col>
      </a-row>

    </a-card>
  </div>
</template>

<script>

import Recommends from '@/views/HomePage/components/Recommends'
import Banner from '@/views/HomePage/components/Banner'
export default {
  name: 'HomePage',
  components: { Banner, Recommends },
  data() {
    return {
      bannerImg: require('../../assets/banner.png')
    }
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .homepage{
    padding: 10px 50px;
    .rec{
      margin-top: 50px;
    }
  }
  .bg-img-2{
    -o-object-fit: cover;
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 24px;
    transform: translateY(-50%);
    z-index: 0;
    display: block;
  }
</style>
