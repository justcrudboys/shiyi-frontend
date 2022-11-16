<template>
  <el-card class="card" shadow="always">
    <div v-if="creator">
      <div v-if="channelList.length==0">
        <div class="notice">您还没有频道哦</div>
      </div>
      <div v-else>
        <div class="notice" v-html="'您已经有' + channelList.length + '个频道了'" />
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
                    <div class="text">频道简介：</div>
                    <div class="small-text" v-html="channel['introduction']" />
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="button">
        <el-button round type="primary" @click="createChannel">新建频道</el-button>
      </div>
    </div>
    <div v-else>
      <div class="notice">您还不是创作者哦</div>
      <div class="button">
        <el-button round type="primary" @click="beCreator">前往个人信息页面</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
// import PanThumb from '@/components/PanThumb'
import { getPesonalCreatorInfo, isCreator } from '@/api/creator'
import { getCreatorChannel } from '@/api/channel'
import { mapGetters } from 'vuex'
export default {
  name: 'MyChannel',
  data() {
    return {
      creator: null,
      channelList: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    isCreator().then(res => {
      if (res.data === true) {
        getPesonalCreatorInfo().then(response => {
          // console.log(response.data)
          this.creator = response.data
          // console.log(this.creator['id'])
          getCreatorChannel(this.creator['id']).then(response1 => {
            // console.log(response1)
            this.channelList = response1.data
            console.log(this.channelList)
          })
        })
      }
    })
  },
  methods: {
    beCreator() {
      this.$router.push({ path: '/profile' })
    },
    createChannel() {
      this.$router.push({ path: '/ChannelCreation' })
    },
    getChannelId(index) {
      console.log(this.channelList[index]['id'])
      this.$router.push({ path: '/ChannelManagement', query: { channelId: this.channelList[index]['id'], channelName: this.channelList[index]['name'] }})
    }
  }
}
</script>

<style scoped>
.button {
  text-align: center;
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
