<template>
  <el-card class="card" shadow="always">
    <div>
      <div class="notice" v-html="tagName + ' 分类'" />
      <el-row :gutter="20" class="row-box">
        <el-col v-for="(channel,index) in channelList" :key="index" :span="12">
          <el-card class="small-card" shadow="hover" @click.native="getChannelId(index)">
            <div slot="header" class="clearfix">
              <div class="text" v-html="channel['name']" />
            </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-image :src="channel['img']" />
              </el-col>
              <el-col :span="16">
                <div>
                  <div v-if="channel['tagNames'].length==0">
                    <el-row :gutter="5">
                      <a-tag color="blue">暂无标签</a-tag>
                    </el-row>
                  </div>
                  <div v-else>
                    <el-row :gutter="5">
                      <el-col v-for="(tag,tagIndex) in channel['tagNames']" :key="tagIndex" :span="4">
                        <a-tag color="blue" v-html="tag" />
                      </el-col>
                    </el-row>
                  </div>
                  <div class="small-text" v-html="channel['introduction']" />
                  <div class="small-text" v-html="'浏览 ' + channel['views']" />
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import { channelByTagId, getTagName } from '@/api/channel'
export default {
  name: 'ChannelExploration',
  data() {
    return {
      tagId: Number,
      tagName: '',
      channelList: []
    }
  },
  methods: {
    getChannelId(index) {
      this.$router.push({ path: '/ChannelInfo', query: { channelId: this.channelList[index]['id'], channelName: this.channelList[index]['name'] }})
    }
  },
  watch: {
    $route: {
      async handler(newV,oldV){
        this.tagId = newV.query.tagId
        await getTagName(this.tagId).then(res =>{
          this.tagName = res.data.name
        })
        await channelByTagId(this.tagId).then(res=> {
          this.channelList = res.data
        })
      },
      deep: true
    }
  },
  async created() {
    this.tagId = this.$route.query.tagId
    await getTagName(this.tagId).then(res =>{
      this.tagName = res.data.name
    })
    await channelByTagId(this.tagId).then(res=> {
      this.channelList = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.notice {
  text-align: center;
  font-size: xx-large;
  margin-top: 15px;
  margin-bottom: 15px;
}
.text {
  text-align: left;
  font-size: large;
  margin-top: 10px;
  margin-bottom: 10px;
}
.small-text {
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
.card {
  min-width: 80%;
  min-height: 38em;
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 20px;
  transition: all .5s;
  text-align: left;
  overflow-y: auto;
  border-radius: 5%;
}
.small-card {
  margin-top: 20px;
  margin-bottom: 20px;
}
.row-box {
  display: flex;
  flex-flow: wrap;
}
.row-box .small-card {
  min-width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
