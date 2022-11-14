<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <el-input v-model="channelId" />
    <el-button @click="onSubmit">aa</el-button>
    <el-button @click="createPost">createPost</el-button>
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

    createPost() {
      this.$router.push({ path: 'createPost' })
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
