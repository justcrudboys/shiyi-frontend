<template>
  <a-card class="card">
    <div v-if="user.iscreator==false">
      <div class="notice">该用户还不是创作者哦</div>
    </div>
    <div v-else>
      <div class="notice">创作者详情</div>
      <a-row :gutter="20">
        <a-col :span="6">
          <a-card class="small-card">
            <div slot="title" class="text">创作者简介</div>
            <a-card>
              <template #cover>
                <img :src="user.avatar">
              </template>
              <a-card-meta>
                <div slot="title" class="text" v-html="user.username" />
                <template #description>
                  <div class="small-text" v-html="user.signature" />
                </template>
              </a-card-meta>
            </a-card>
          </a-card>
        </a-col>
        <a-col :span="18">
          <a-card class="small-card">
            <div slot="title" class="text">创作者的频道</div>
            <div v-if="channelList.length==0">
              <div class="notice">该创作者还没有频道哦</div>
            </div>
            <div v-else>
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
                          <div v-if="channel['tagName'].length==0">
                            <el-row :gutter="10">
                              <a-tag color="blue">暂无标签</a-tag>
                            </el-row>
                          </div>
                          <div v-else>
                            <el-row :gutter="10">
                              <el-col v-for="(tag,tagIndex) in channel['tagName']" :key="tagIndex" :span="4">
                                <a-tag color="blue" v-html="tag" />
                              </el-col>
                            </el-row>
                          </div>
                          <div class="small-text">频道简介：</div>
                          <div class="smaller-text" v-html="channel['introduction']" />
                        </div>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div class="button">
      <a-button type="primary" size="large" @click="backToPrevious">
        返回
      </a-button>
    </div>
  </a-card>
</template>

<script>
import { searchUserInfo } from '@/api/user'
import { getCreatorChannel } from '@/api/channel'

export default {
  data() {
    return {
      searchid: 0,
      user: {},
      channelList: []
    }
  },
  created() {
    this.searchid = this.$route.query.searchid
    // console.log(this.searchid)
    searchUserInfo(this.searchid).then(response => {
      // console.log(response)
      this.user = response.data
      if (this.user.iscreator) {
        // console.log(this.user.id)
        getCreatorChannel(this.user.id).then(response1 => {
          // console.log(response1)
          this.channelList = response1.data
        })
      }
    })
  },
  methods: {
    getChannelId(index) {
      // console.log(this.channelList[index]['id'])
      this.$router.push({ path: '/ChannelInfo', query: { channelId: this.channelList[index]['id'], channelName: this.channelList[index]['name'] }})
    },
    backToPrevious() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.notice {
  text-align: center;
  font-size: xx-large;
  margin-top: 15px;
  margin-bottom: 15px;
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
  margin-top: 10px;
  margin-bottom: 10px;
}
.text {
  text-align: left;
  font-size: large;
  margin-top: 10px;
  margin-bottom: 10px;
}
.small-text {
  text-align: left;
  margin-top: 5px;
  margin-bottom: 5px;
}
.smaller-text {
  text-align: left;
  font-size: small;
  margin-top: 5px;
  margin-bottom: 5px;
}
.row-box {
  display: flex;
  flex-flow: wrap;
}
.row-box .small-card {
  min-width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
