<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-input v-model="channelId" />
    <el-button @click="onSubmit">aa</el-button>
    <el-button @click="ChannelSearch">ChannelSearch</el-button>

    <el-button @click="createOrder">createOrder</el-button>

    <el-button @click="ChannelExploration">ChannelExploration</el-button>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
      channelId: null
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    onSubmit() {
      this.$router.push({ path: 'ChannelDetail', query: { channelId: this.channelId }})
    },

    ChannelSearch() {
      this.$router.push({ path: 'ChannelSearch', query: { key: '频道' }})
    },

    createOrder() {
      this.$router.push({ path: 'OrderCreation', query: { planId: 1 } })
    },
    ChannelExploration() {
      this.$router.push({ path: 'ChannelExploration', query: { tagId: 14 }})
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
