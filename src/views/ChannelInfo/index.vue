<template>
    <el-row :gutter="20">
      <el-col :span="6" :offset="4">
        <el-card style="margin-top:15px">
          <el-image :src='channelForm.img' />
          <el-row :gutter="20" type="flex" justify="center" style="text-align: center; margin-top:15px" >
            <el-col>
            <span class="channelTitle">{{channelForm.channelName}}</span>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="6"  v-for="(item) in channelForm.tagNameData" :key="item.id" style="text-align: center; margin-top:15px">
              <el-tag>{{ item.name }}</el-tag>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center" :gutter="20" style="text-align: center; margin-top:30px">
            <el-col>
              <div style="text-align: center" class="small-text" v-html="channelForm.introduction" />
            </el-col>
          </el-row>
          <el-row >
            <el-col  style="text-align: center;margin-top:30px">
              <div @click="goToUser"><el-avatar :src='creatorForm.avatar' style="cursor:pointer"></el-avatar></div>
              <div class="username" style="text-align: center; cursor:pointer" @click="goToUser">{{creatorForm.name}}</div>
            </el-col>
          </el-row>
        </el-card>
        
        <el-card style="margin-top:15px">
          <div slot="header" class="clearfix">
            <span class="title">共有{{channelForm.planData.length}}个赞助方案</span>
          </div>
          <el-row v-if="channelForm.planData!==undefined && channelForm.planData.length > 0">
            <el-col :span="22" v-for="(item) in channelForm.planData" :key="item.amount" :offset="1" >
              <div style="margin-top:15px" @click="goToOrder(item.id)">
                <el-card  class="in-card" :body-style="{ padding: '0px'}" shadow="hover" style="cursor:pointer" >
                  <div slot="header">
                    <span class="post_name">
                      <el-row :gutter="20">
                        <el-col :span="10"><strong>{{item.name}}</strong></el-col>
                        <el-col :span="8" :offset="6"><strong>{{item.amount}}</strong>元/月</el-col>
                      </el-row>
                    </span>
                    <el-divider v-if="item.name!==null"></el-divider>
                    <div class="bottom clearfix">
                      {{item.introduction}}
                    </div>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card" style="margin-top:15px">
          <div slot="header" class="clearfix">
            <span class="title">{{channelForm.channelName}}</span>
          </div>
          <!--    <div slot="header" class="clearfix">-->
          <!--      <span><div class="title">频道名称</div></span>-->
          <!--      <el-button type="primary" round style="float: right;">新建动态</el-button>-->
          <!--    </div>-->
          <el-row v-if="tableData!==undefined && tableData.length > 0">
            <el-col :span="22" v-for="(item) in tableData" :key="item.date" :offset="1" >
              <div style="margin-top:15px" @click="goToPost(item.id)">
                <el-card  class="in-card" :body-style="{ padding: '0px'}" shadow="hover" style="cursor:pointer">
                  <div slot="header">
                    <span class="post_name"><strong>{{item.name}}</strong></span>
                    <el-divider v-if="item.name!==null"></el-divider>
                    <div class="bottom clearfix">
                      <time class="time">{{item.content}}</time>
            <!--                <el-button type="text" class="button" @click="add(item)">查看</el-button>-->
            <!--                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">-->
                    </div>
                  </div>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col class="emptyChannel">频道下暂时还没有动态哦</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </template>
  
  <script>
  import { getPost } from '@/api/post'
  import { getChannelInfo, getChannelPlan, getChannelTag ,getUserInfoByChannel} from '@/api/channel'
  
  export default {
    name: 'ChannelManagement',
    methods: {
        init() {
        getPost(this.channelForm.channelId).then((res) => {
          var data = res.data
          for (var i in data) {
            var tmp = {}
            tmp['id'] = data[i].id
            tmp['name'] = data[i].postName
            tmp['content'] = data[i].content
            tmp['postTime'] = data[i].postTime
            this.tableData.push(tmp)
          }
        })
        getChannelInfo(this.channelForm.channelId).then( (res) => {
          this.channelForm.introduction =  res.data.introduction
          this.channelForm.creator_id =  res.data.creator_id
          this.channelForm.img = res.data.img
          this.creatorForm.id =  res.data.creator_id
        })
        getUserInfoByChannel(this.channelForm.channelId).then((res) => {
            this.creatorForm.name=res.data.username
            this.creatorForm.avatar=res.data.avatar
        })
        getChannelPlan(this.channelForm.channelId).then((res) => {
          var data = res.data
          for (var i in data) {
            var tmp = {}
            tmp['id'] = data[i].id
            tmp['amount'] = data[i].amount
            tmp['name'] = data[i].name
            tmp['introduction'] = data[i].introduction
            this.channelForm.planData.push(tmp)
          }
        })
        getChannelTag(this.channelForm.channelId).then((res) => {
          var data = res.data
          for (var i in data) {
            var tmp = {}
            tmp['name'] = data[i].name
            tmp['tagId'] = data[i].id
            this.channelForm.tagNameData.push(tmp)
          }
        })
      },
      createPost() {
        this.$router.push({ path: 'PostCreation', query: { channelId: this.channelForm.channelId }})
      },
      goback() {
        this.$router.go(-1)
      },
      goToUser() {
        this.$router.push({path: '/CreatorInfo', query:{searchid: this.creatorForm.id }})
      },
      goToOrder(id){
        this.$router.push({path: '/OrderCreation', query:{planId: id}})
      },
      goToPost(id){
        this.$router.push({path:'/PostDetail', query:{postId: id}})
      }
    },
    data() {
      return {
        channelForm: {
          channelId: null,
          channelName: null,
          introduction: null,
          creator_id: null,
          img: null,
          planData: [],
          tagNameData: []
        },
        creatorForm: {
            id: null,
            name: null,
            avatar: null
        },
        tableData: []
      }
    },
    created() {
      this.channelForm.channelId = this.$route.query.channelId
      this.channelForm.channelName = this.$route.query.channelName
      this.init()
    }
  }
  
  </script>
  
  <style scoped>
  .text {
    font-size: 14px;
  }
  
  .item {
    margin-bottom: 18px;
  }
  
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  
  .box-card {
    margin: auto;
  
    width: 100%;
  
  }
  .in-card {
    margin: auto;
  
    width: 100%;
  
  }
  .emptyChannel{
    font-size: 28px;
    text-align: center;
  }
  .title{
    font-size: 22px;
  }
  .channelTitle{
    font-size: 30px;
  }
  .post_name{
    font-size: 18px;
  }
  </style>
  