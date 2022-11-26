<template>
  <div class="recommends">
    <div style="text-align: center">
      <h1>发现你的新世界</h1>
    </div>
    <a-row style="margin-top: 20px">
      <a-col span="20"></a-col>
      <a-col>热门频道</a-col>
    </a-row>
    <div class="card" shadow="always">
      <div>
        <div class="notice"/>
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
    </div>
  </div>
</template>

<script>
import { channelByRecommend } from '@/api/channel'
export default {
  name: 'Rec',
  data() {
    return {
      tagId: Number,
      channelList: []
    }
  },
  methods: {
    getChannelId(index) {
      this.$router.push({ path: '/ChannelInfo', query: { channelId: this.channelList[index]['id'], channelName: this.channelList[index]['name'] }})
    }
  },
  async created() {
    await channelByRecommend().then( res => {
      this.channelList = res.data
    })
  }
}

</script>

<style lang="scss" scoped>
  .recommends{
    margin: auto;
  }
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
