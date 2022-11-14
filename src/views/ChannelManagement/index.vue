<template>
  <div style="padding: 10px 200px">
    <el-card>
      channelId:{{ channelId }}
      <el-button @click="goback">返回</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ChannelManagement',
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
