<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>
    <div>
      <el-dialog title="上传头像" :visible.sync="dialogAvatarVisible" center>
        <AvatarUploader class="avatar-uploader" />
      </el-dialog>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div class="avatar-upload-button" @click="handleAvatarUpload">
            <el-avatar :size="60">上传头像</el-avatar>
          </div>
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><span>个性签名</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            <el-input v-model="user.signature" type="textarea" autosize @blur="updateSignature" />
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><span>绑定手机号</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>{{ user.phone }}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import { changeSignature, getUserDetail } from '@/api/user'
import AvatarUploader from '@/views/Profile/components/AvatarUploader'

export default {
  components: { AvatarUploader, PanThumb },
  data() {
    return {
      user: {},
      dialogAvatarVisible: false
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      getUserDetail().then(res => {
        const detail = res.data
        this.user = {
          name: detail.username,
          avatar: detail.avatar,
          signature: detail.signature,
          phone: detail.phone
        }
      })
    },
    updateSignature() {
      if (!(this.user.signature == null || this.user.signature === '')) { // 判断字符串是否为空
        changeSignature(this.user.signature)
      }
    },
    handleAvatarUpload() {
      this.dialogAvatarVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
  margin: auto;
}
.avatar-upload-button {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
