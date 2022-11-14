<template>
  <div>
    这是新建频道页面
    <el-button @click="goback">返回</el-button>
  </div>
</template>

<script>
export default {
  name: 'ChannelCreation',
  methods: {
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
