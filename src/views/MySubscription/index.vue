<template>
  <a-card class="card">
    <div v-if="planList.length==0">
      <div class="notice">您还没有订阅哦</div>
      <div class="button">
        <a-button type="primary" size="large" @click="toDiscoveryPage">
          前往主页
        </a-button>
      </div>
    </div>
    <div v-else>
      <el-row :gutter="20" class="row-box">
        <el-col v-for="(plan,index) in planList" :key="index" :span="8">
          <el-card class="small-card">
            <div slot="header" class="clearfix">
              <div class="text" v-html="plan.planName" />
            </div>
            <div class="small-text" v-html="'订阅简介：' + plan.planIntroduction" />
            <div class="small-text" v-html="'订阅金额：' + plan.amount + '（元/月）'" />
            <div class="small-text" v-html="'到期时间：' + plan.expireTime.replace('T', ' ')" />
            <div class="small-text" v-html="'所属频道：'" />
            <el-card class="small-card" shadow="hover" @click.native="getChannelId(index)">
              <div slot="header" class="clearfix">
                <div class="text" v-html="plan.channelName" />
              </div>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-image :src="plan.img" />
                </el-col>
                <el-col :span="16">
                  <div>
                    <div class="small-text">频道简介：</div>
                    <div class="smaller-text" v-html="plan.channelIntroduction" />
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </a-card>
</template>

<script>
import { getUserDetail } from '@/api/user'
import { getUserSubscriptions } from '@/api/subscription'

export default {
  data() {
    return {
      user: null,
      planList: []
    }
  },
  created() {
    getUserDetail().then(response => {
      // console.log(response)
      this.user = response.data
      getUserSubscriptions(this.user.id).then(response1 => {
        // console.log(response1)
        this.planList = response1.data
      })
    })
  },
  methods: {
    toDiscoveryPage() {
      this.$router.push('/HomePage')
    },
    getChannelId(index) {
      // console.log(this.planList[index]['channelId'])
      this.$router.push({ path: '/ChannelInfo', query: { channelId: this.planList[index]['channelId'], channelName: this.planList[index]['channelName'] }})
    }
  }
}
</script>

<style>
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
