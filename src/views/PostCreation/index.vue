<template>
  <div>
    channelId:{{channelId}}
  </div>

</template>

<script>
export default {
  name: 'PostCreation',
  data() {
    return {
      channelId: null
    }
  },
  created() {
    this.channelId = this.$route.query.channelId
  }
}

</script>

<style scoped>

</style>
