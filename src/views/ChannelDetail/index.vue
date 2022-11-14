<template>
  <div style="padding: 10px 200px">

    <el-card>
      channelId:{{ channelId }}
      <el-button @click="goback">返回</el-button>
      <el-card style="margin-bottom:20px;">
        <div slot="header" class="clearfix">
          <span>标题</span>
        </div>
        <div>
          床前明月光，疑是地上霜。
          举头望明月，低头思故乡。
        </div>
      </el-card>
      <el-card style="margin-bottom:20px;">
        <div slot="header" class="clearfix">
          <span>标题</span>
        </div>
        <div>
          海客谈瀛洲，烟涛微茫信难求，

          越人语天姥，云霞明灭或可睹。

          天姥连天向天横，势拔五岳掩赤城。

          天台四万八千丈，对此欲倒东南倾。

          我欲因之梦吴越，一夜飞度镜湖月。

          湖月照我影，送我至剡溪。

          谢公宿处今尚在，渌水荡漾清猿啼。

          脚著谢公屐，身登青云梯。

          半壁见海日，空中闻天鸡。

          千岩万转路不定，迷花倚石忽已暝。

          熊咆龙吟殷岩泉，栗深林兮惊层巅。

          云青青兮欲雨，水澹澹兮生烟。
        </div>
      </el-card>
      <el-card style="margin-bottom:20px;">
        <div slot="header" class="clearfix">
          <span>标题</span>
        </div>
        <div>
          正文
        </div>
      </el-card>
    </el-card>
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
