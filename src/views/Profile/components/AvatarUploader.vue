<template>
  <div class="uploader">
    <el-upload
      class="avatar-uploader"
      action="#"
      :http-request="upload"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button class="update-button" v-if="imageUrl" @click="update">保存</el-button>
  </div>
</template>

<script>
import { changeAvatar, uploadAvatar } from '@/api/user'

export default {
  name: 'AvatarUploader',
  data() {
    return {
      imageUrl: ''
    }
  },
  methods: {
    update() {
      changeAvatar(this.imageUrl)
      this.$router.go(0)
    },
    upload(data) {
      const formdata = new FormData()		// 新建一个FormData()对象
      formdata.append('file', data.file)
      uploadAvatar(formdata).then(res => {
        this.imageUrl = res.data
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

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

<style lang="scss" >
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
