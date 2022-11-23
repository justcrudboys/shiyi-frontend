<template>
  <el-row :gutter="20">
    <el-col :span="6" :offset="4">
      <el-card style="margin-top:15px">
        <el-image :src='channelForm.img' />
      </el-card>
      <el-card style="margin-top:15px">
        <div slot="header" class="clearfix">
          <span class="title">{{channelForm.channelName}}</span>
          <el-button type="primary" size="medium" round style="float: right;width:90px;padding: 8px 0" @click="createPost()">编辑频道</el-button>
        </div>
        <el-row :gutter="20">
          <el-col :span="24">
            <div>
              <div class="small-text" v-html="channelForm.introduction" />
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-card style="margin-top:15px">
        <el-row :gutter="20">
          <el-col :span="3" v-for="(item) in channelForm.tagNameData" :key="item.id" >
            <el-tag>{{ item.name }}</el-tag>
          </el-col>
          <el-col :span="4" :offset="20-3 * channelForm.tagNameData.length">
            <el-button type="primary" size="medium" round style="float: right;width:90px;padding: 8px 0" @click="createPost()">新增标签</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card style="margin-top:15px">
        <div slot="header" class="clearfix">
          <span class="title">共有{{channelForm.planData.length}}个赞助方案</span>
          <el-button type="primary" size="medium" round style="float: right;width:120px;padding: 8px 0" @click="createPost()">新增赞助方案</el-button>
        </div>
        <el-row v-if="channelForm.planData!==undefined && channelForm.planData.length > 0">
          <el-col :span="22" v-for="(item) in channelForm.planData" :key="item.amount" :offset="1" >
            <div style="margin-top:15px">
              <el-card  class="in-card" :body-style="{ padding: '0px'}" shadow="hover">
                <div slot="header">
                  <span class="post_name">
                    <el-row :gutter="20">
                      <el-col :span="12"><strong>{{item.name}}</strong></el-col>
                      <el-col :span="6" :offset="6"><strong>{{item.amount}}</strong>元/月</el-col>
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
    </el-col>
  </el-row>
</template>

<script>
import { getPost } from '@/api/post'
import { getChannelInfo, getChannelPlan, getChannelTag } from '@/api/channel'

export default {
  name: 'ChannelManagement',
  methods: {
    init() {
      getPost(this.channelForm.channelId).then((res) => {
        var data = res.data
        for (var i in data) {
          var tmp = {}
          tmp['name'] = data[i].postName
          tmp['content'] = data[i].content
          tmp['postTime'] = data[i].postTime
          this.tableData.push(tmp)
        }
      })
      getChannelInfo(this.channelForm.channelId).then((res) => {
        this.channelForm.introduction = res.data.introduction
        this.channelForm.creator_id = res.data.creator_id
      })
      getChannelPlan(this.channelForm.channelId).then((res) => {
        var data = res.data
        for (var i in data) {
          var tmp = {}
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
    }
  },
  data() {
    return {
      channelForm: {
        channelId: null,
        channelName: null,
        introduction: null,
        creator_id: null,
        img: 'https://shiyi-1312401854.cos.ap-shanghai.myqcloud.com/c6671b1d5f4c440a9fbdb9d260599a52QQ图片20221112142736.jpg',
        planData: [],
        tagNameData: []
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
  font-size: 24px;
}
.post_name{
  font-size: 18px;
}
</style>
