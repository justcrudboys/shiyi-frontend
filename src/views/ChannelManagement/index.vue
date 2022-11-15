<template>
  <el-card class="box-card" style="margin-top:15px">
    <div slot="header" class="clearfix">
      <span class="title">{{item.channelName}}</span>
      <el-button type="primary" size="medium" round style="float: right;width:90px;padding: 8px 0" @click="createPost()">新建动态</el-button>
    </div>
<!--    <div slot="header" class="clearfix">-->
<!--      <span><div class="title">频道名称</div></span>-->
<!--      <el-button type="primary" round style="float: right;">新建动态</el-button>-->
<!--    </div>-->
    <el-row v-if="tableData!==undefined && tableData.length > 0">
      <el-col :span="22" v-for="(item) in tableData" :key="item.date" :offset="1" >
        <div style="margin-top:15px">
          <el-card  class="in-card" :body-style="{ padding: '0px'}" shadow="hover">
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
</template>

<script>
import { getPost } from '@/api/post'

export default {
  name: 'ChannelManagement',
  methods: {
    init() {
      getPost(this.channelId).then((res) => {
        var data = res.data
        for (var i in data) {
          var tmp = {}
          tmp['name'] = data[i].postName
          tmp['content'] = data[i].content
          tmp['postTime'] = data[i].postTime
          this.tableData.push(tmp)
        }
      })
    },
    createPost() {
      this.$router.push({ path: 'PostCreation', query: { channelId: this.channelId }})
    },
    goback() {
      this.$router.go(-1)
    }
  },
  data() {
    return {
      channelId: null,
      channelName: null,
      tableData: []
    }
  },

  async created() {
    this.channelId = this.$route.query.channelId
    this.channelName = this.$route.query.channelName
    this.init()
  }
}

</script>

<style>
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

  width: 50%;

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
  font-size: 24px;
}
.post_name{
  font-size: 18px;
}
</style>
