<template>
  <div class="navbar">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%'}">
      <div class="logo" >
        <img :src="logoImg" style="width:100%;height:80%;">
      </div>
      <div class="nav-menu">
        <a-menu
          mode="horizontal"
          theme="dark"
          :style="{ lineHeight: '64px' }">
          <a-menu-item key="homepage" @click="toHomePage"> <a-icon type="bank" />首页 </a-menu-item>
          <a-menu-item key="dicovery" @click="toDiscoveryPage"> <a-icon type="appstore" />发现 </a-menu-item>
          <a-menu-item key="mychannel" @click="toMyChannel"> <a-icon type="appstore" />我的频道 </a-menu-item>
        </a-menu>
      </div>
      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/profile">
              <el-dropdown-item>
                Profile
              </el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </a-layout-header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      logoImg: require('../../assets/logo.png')
    }
  },
  components: {
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    toHomePage() {
      this.$router.push('/ChannelDetail')
    },
    toDiscoveryPage() {
      this.$router.push('/dashboard')
    },
    toMyChannel(){
      this.$router.push('/MyChannel')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 64px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .nav-menu {
    float: left;
    height: 100%;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.logo {
  width: 120px;
  height: 100%;
  float: left;
}
</style>
