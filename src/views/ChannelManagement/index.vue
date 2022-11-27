<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" :offset="4">
        <el-card style="margin-top:15px">
          <el-image :src='channelForm.img' />
        </el-card>
        <el-card style="margin-top:15px">
          <div slot="header" class="clearfix">
            <span class="title">{{channelForm.channelName}}</span>
            <el-button type="primary" size="medium" round style="float: right;width:90px;padding: 8px 0" @click="editChannelDialog">编辑频道</el-button>
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
            <el-col :span="3" v-for="(item,index) in channelForm.tags" :key="index" >
              <el-tag>{{ updateTagsForm.tagList[channelForm.tags[index]-3].label }}</el-tag>
            </el-col>
            <el-col :span="4" :offset="20-3 * channelForm.tags.length">
              <el-button type="primary" size="medium" round style="float: right;width:90px;padding: 8px 0" @click="updateTagsDialog">新增标签</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card style="margin-top:15px">
          <div slot="header" class="clearfix">
            <span class="title">共有{{channelForm.planData.length}}种赞助计划</span>
            <el-button type="primary" size="medium" round style="float: right;width:120px;padding: 8px 0" @click="createPlanDialog">新增赞助计划</el-button>
          </div>
          <el-row v-if="channelForm.planData!==undefined && channelForm.planData.length > 0">
            <el-col :span="22" v-for="(item) in channelForm.planData" :key="item.amount" :offset="1" >
              <div style="margin-top:15px"  @click="goToOrder(item.id)">
                <el-card  class="in-card" :body-style="{ padding: '0px'}" shadow="hover">
                  <div slot="header">
                    <span class="post_name">
                      <el-row :gutter="20">
                        <el-col :span="12"><strong>{{item.name}}</strong></el-col>
                        <el-col :span="6" :offset="6"><strong>{{item.amount}}</strong>元/月</el-col>
                      </el-row>
                    </span>
                    <el-divider v-if="item.introduction!==null"></el-divider>
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
          <el-row v-if="tableData!==undefined && tableData.length > 0">
            <el-col :span="22" v-for="(item) in tableData" :key="item.date" :offset="1" >
              <div style="margin-top:15px"  @click="goToPost(item.id)">
                <el-card  class="in-card" :body-style="{ padding: '0px'}" shadow="hover">
                  <div slot="header">
                    <span class="post_name"><strong>{{item.name}}</strong></span>
                    <el-divider v-if="item.name!==null"></el-divider>
                    <div class="bottom clearfix">
                      <el-row>
                        <el-col :span="10">
                          <time class="time">{{ item.postTime }}</time>
                        </el-col>
                        <el-col :span="13">
                          <div class="time" style="text-align:right">{{ item.planName }}</div>
                        </el-col>
                      </el-row>
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

    <!--编辑简介的对话框-->
    <el-dialog title="编辑简介" :visible.sync="editChannelForm.editChannelDialogVisible" width="50%">
      <el-form ref="editChannelFormRef" :model="editChannelForm" label-width="100px">
        <el-form-item label="频道名" prop="channelName">
          <el-input v-model="editChannelForm.channelName" disabled></el-input>
        </el-form-item>
        <el-form-item label="频道简介" prop="planIntroduction">
          <el-input type="textarea" :autosize="{ minRows: 6}" v-model="editChannelForm.introduction" maxlength="200" show-word-limit>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editChannelForm.editChannelDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editChannel">确 定</el-button>
      </span>
    </el-dialog>

    <!--新建计划的对话框-->
    <el-dialog title="新建计划" :visible.sync="createPlanForm.createPlanDialogVisible" width="50%">
      <el-form ref="createPlanFormRef" :model="createPlanForm"  :rules="rules" label-width="110px">
        <el-form-item label="频道名">
          <el-input v-model="createPlanForm.channelName" disabled></el-input>
        </el-form-item>
        <el-form-item label="赞助计划名称" prop="planName">
          <el-input
            v-model="createPlanForm.planName"
            maxlength="20"
            show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="赞助计划简介" prop="planIntroduction">
          <el-input type="textarea"  :autosize="{ minRows: 6}" v-model="createPlanForm.planIntroduction" maxlength="200" show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="赞助计划金额" prop="planIntroduction">
          <el-row>
            <el-col :span="12">
              <el-input-number v-model="createPlanForm.amount" :min="0"  label="赞助计划金额"></el-input-number>
            </el-col>
            <el-col :span="2" :offset="10">
              <strong>元/月</strong>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createPlanForm.createPlanDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createPlan">确 定</el-button>
      </span>
    </el-dialog>

    <!--新建标签的对话框-->
    <el-dialog title="新建标签" :visible.sync="updateTagsForm.updateTagsDialogVisible" width="50%">
      <el-form>
        <el-form-item >
          <el-transfer v-model="channelForm.tags" :data="updateTagsForm.tagList" :titles="['可选标签', '已选标签']" :button-texts="['撤回', '选择']"></el-transfer>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateTagsForm.updateTagsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateTags">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getPostAndPlan} from '@/api/post'
import { getChannelInfo, getChannelPlan, getChannelTag, putChannelInfo, postPlan, updateTags } from '@/api/channel'

export default {
  name: 'ChannelManagement',
  methods: {
    init() {
      getPostAndPlan(this.channelForm.channelId).then((res) => {
        var data = res.data
        for (var i in data) {
          var tmp = {}
          tmp['id'] = data[i].id
          tmp['name'] = data[i].postName
          tmp['postTime'] = data[i].postTime
          tmp['planName'] = data[i].planName
          tmp['content'] = data[i].content
          this.tableData.push(tmp)
        }
      })
      getChannelInfo(this.channelForm.channelId).then((res) => {
        this.channelForm.channelName = res.data.name
        this.channelForm.introduction = res.data.introduction
        this.channelForm.creator_id = res.data.creatorId
        this.channelForm.img = res.data.img
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
          this.channelForm.tags.push(data[i].id)
        }
      })
    },

    //  编辑简介对话框
    editChannelDialog() {
      this.editChannelForm.editChannelDialogVisible = true
      this.editChannelForm.channelName = this.channelForm.channelName
      this.editChannelForm.introduction = this.channelForm.introduction
    },
    editChannel() {
      this.$refs.editChannelFormRef.validate(async valid => {
        if(!valid) {
          return
        }
        var params = {
          channelId: this.channelForm.channelId,
          img: this.channelForm.img,
          introduction: this.editChannelForm.introduction,
          name: this.channelForm.channelName
        }
        putChannelInfo(params).then(response => {
          this.$message.success('更新频道信息成功')
        }).catch(error => {
          this.$message.error('更新频道信息失败')
        })
        //  隐藏编辑简介的对话框
        this.editChannelForm.editChannelDialogVisible = false
        setTimeout(function() { location.reload() }, 500)
      })
    },

    //  新建赞助计划对话框
    createPlanDialog() {
      this.createPlanForm.createPlanDialogVisible = true
      this.createPlanForm.channelName = this.channelForm.channelName
    },
    createPlan() {
      this.$refs.createPlanFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        var params = {
          amount: this.createPlanForm.amount,
          channelId: this.channelForm.channelId,
          introduction: this.createPlanForm.planIntroduction,
          name: this.createPlanForm.planName
        }
        postPlan(params).then(response => {
          this.$message.success('新建赞助计划成功')
        }).catch(error => {
          this.$message.error('新建赞助计划失败')
        })
        //  隐藏编辑简介的对话框
        this.createPlanForm.createPlanDialogVisible = false
        setTimeout(function() { location.reload() }, 500)
      })
    },

    //  新建标签对话框
    updateTagsDialog() {
      this.updateTagsForm.updateTagsDialogVisible = true
    },
    updateTags() {
      var params = []
      for (var i in this.channelForm.tags) {
        var param = {
          channelId: this.channelForm.channelId,
          tagId: this.channelForm.tags[i]
        }
        params.push(param)
      }
      updateTags(params).then(response => {
        this.$message.success('更新频道标签成功')
      }).catch(error => {
        this.$message.error('更新频道标签失败')
      })
      //  隐藏编辑简介的对话框
      this.updateTagsForm.updateTagsDialogVisible = false
      setTimeout(function() { location.reload() }, 500)
    },

    createPost() {
      this.$router.push({ path: 'PostCreation', query: { channelId: this.channelForm.channelId }})
    },
    goToOrder(id) {
      this.$router.push({ path: '/OrderCreation', query: { planId: id }})
    },
    goToPost(id) {
      this.$router.push({ path: '/PostDetail', query: { postId: id }})
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
        img: null,
        planData: [],
        tags: []
      },
      editChannelForm: {
        channelName: null,
        introduction: null,
        editChannelDialogVisible: false
      },
      createPlanForm: {
        channelName: null,
        amount: null,
        planName: null,
        planIntroduction: null,
        createPlanDialogVisible: false
      },
      updateTagsForm: {
        channelName: null,
        amount: null,
        planName: null,
        planIntroduction: null,
        updateTagsDialogVisible: false,
        tagList: [{
          key: 3,
          label: '游戏'
        }, {
          key: 4,
          label: '绘画'
        }, {
          key: 5,
          label: '音乐'
        }, {
          key: 6,
          label: '视频'
        }, {
          key: 7,
          label: '播客'
        }, {
          key: 8,
          label: '技术'
        }, {
          key: 9,
          label: '漫画'
        }, {
          key: 10,
          label: '动画'
        }, {
          key: 11,
          label: '美食'
        }, {
          key: 12,
          label: '时尚'
        }, {
          key: 13,
          label: '数码'
        }, {
          key: 14,
          label: '科普'
        }
        ]
      },
      rules: {
        planName: [{ required: true, message: '赞助计划名称不能为空', trigger: 'blur' }]
      },
      tableData: [],

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
