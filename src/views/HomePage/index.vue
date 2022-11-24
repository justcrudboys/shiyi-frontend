<template>
  <div class="homepage">
    <a-card>

      <Recommends></Recommends>
    </a-card>
  </div>
</template>

<script>

import Recommends from '@/views/HomePage/components/Recommends'
const tags = [
  { id: 3, name: '绘画' },
  { id: 4, name: '游戏' },
  { id: 5, name: '视频' },
  { id: 6, name: '音乐' },
]
export default {
  name: 'HomePage',
  components: { Recommends, TagList, SearchBar },
  data() {
    return {
      tagList: tags
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
