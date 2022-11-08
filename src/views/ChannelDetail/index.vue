<template>
  <div>
    channelId:{{channelId}}
    <el-button @click="goback">返回</el-button>
  </div>
</template>

<script>
export default {
  name: 'Channel',
  data() {
    return {
      channelId: null
    }
  },
  created() {
    this.channelId = this.$route.query.channelId
  },
  methods: {
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
