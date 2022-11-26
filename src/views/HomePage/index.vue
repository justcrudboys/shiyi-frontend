<template>
  <div class="homepage">
    <a-card>

      <Recommends></Recommends>
    </a-card>
  </div>
</template>

<script>

import Recommends from '@/views/HomePage/components/Recommends'
export default {
  name: 'HomePage',
  components: { Recommends },
  data() {
    return {
    }
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .homepage{
    padding: 10px 200px
  }
</style>
