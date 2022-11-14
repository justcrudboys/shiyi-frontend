<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" style="margin-top:20px">
      <el-form-item label="频道名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="频道图片">
        <el-upload class="avatar-uploader" action="#" :http-request="upload" :show-file-list="false"
          :before-upload="beforeAvatarUpload">
          <img v-if="form.img" :src="form.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="频道介绍">
        <el-input v-model="form.introduction" type="textarea" :rows="6" />
      </el-form-item>
      <el-form-item style="margin-top:20px">
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
        creator_id:0
      }
    }
  },
  methods: {
    update() {
      
      createChannel(this.form.name,this.form.introduction,this.form.img,this.form.creator_id)
      this.$message('submit!')
      this.$router.go(-1)
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