<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" style="margin-top:20px" :rules="rules">
      <el-form-item label="频道名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="频道图片" prop="img">
        <el-upload class="avatar-uploader" action="#" :http-request="upload" :show-file-list="false"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.img" :src="form.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item style="margin-top:20px" label="标签选择" prop="tags">
        <el-card>
        <el-transfer v-model="form.tags" :data="tagList" :titles="['可选标签', '已选标签']" :button-texts="['撤回', '选择']"></el-transfer>
        </el-card>
      </el-form-item>
       <el-form-item style="margin-top:20px" label="频道介绍" prop="introduction">
        <el-input v-model="form.introduction" type="textarea" :rows="6" />
      </el-form-item>
      <el-form-item style="margin-top:50px">
        <el-button type="primary" @click="update">创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { uploadImg, createChannel } from '@/api/channel'
import { getPesonalCreatorInfo } from '@/api/creator'

export default {
  data() {
    return {
      form: {
        name: '',
        introduction: '',
        img: '',
        creator_id:0,
        tags:[],
      },
      tagList: [{
          key:3,
          label:'游戏'
        },{
          key:4,
          label:'绘画'
        },{
          key:5,
          label:'音乐'
        },{
          key:6,
          label:'视频'
        },{
          key:7,
          label:'播客'
        },{
          key:8,
          label:'技术'
        },{
          key:9,
          label:'漫画'
        },{
          key:10,
          label:'动画'
        },{
          key:11,
          label:'美食'
        },{
          key:12,
          label:'时尚'
        },{
          key:13,
          label:'数码'
        },{
          key:14,
          label:'科普'
        }
      ],
      rules:{
        name: [
            { required: true, message: '请输入频道名称', trigger: 'blur' },
          ],
          img: [
            { required: true, message: '请输入频道图片', trigger: 'change' },
          ],  
          tags: [
            { required: true, message: '请加入频道标签', trigger: 'change' },
          ],
          introduction:[
            { required: true, message: '请加入频道介绍', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    update() {
      let that = this
      createChannel(this.form.name,this.form.introduction,this.form.img,this.form.creator_id,this.form.tags)
      .then(function(){that.$router.go(-1)})
    },
    upload(data) {
      const formdata = new FormData()		// 新建一个FormData()对象
      formdata.append('file', data.file)
      uploadImg(formdata).then(res => {
        this.form.img = res.data
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      getPesonalCreatorInfo().then(res =>{
        this.form.creator_id = res.data.id
      })
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}

.uploader{
  width: 178px;
}
.avatar-uploader .el-upload {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.update-button {
  width: 178px;
  margin: auto;
}
</style>