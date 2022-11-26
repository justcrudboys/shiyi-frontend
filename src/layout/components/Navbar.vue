<template>
  <div style="height: 90px">
    <div class="navbar">
      <a-layout-header   style="position : fixed; zIndex : 2; width : 100% ; background: #ffffff">
        <div id="top">
          <a-space>
            <div class="logo" @click="toHomePage" >
              <img :src="logoImg" style="width:100%;height:100%;">
            </div>
            <div class="nav-menu">
              <a-menu
                mode="horizontal"
                theme="light"
                style="lineHeight: 62px;background: #ffffff">
                <a-menu-item key="mychannel" @click="toMyChannel" class="nav-item"> <a-icon type="appstore" />我的频道</a-menu-item>
                <a-menu-item key="mysubscription" @click="toMySubscription" class="nav-item"> <a-icon type="appstore" />我的订阅</a-menu-item>
                <a-menu-item key="myorder" @click="toMyOrder" class="nav-item"> <a-icon type="appstore" />我的订单</a-menu-item>
              </a-menu>
            </div>
            <div class="search-bar">
              <SearchBar></SearchBar>
            </div>
          </a-space>
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
        </div>
      </a-layout-header>
    </div>
    <TagList style="height: 26px; border-radius: 15px;position : fixed; zIndex : 2; width : 100% ;"></TagList>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchBar from '@/layout/components/SearchBar'
import TagList from '@/layout/components/TagList'

export default {
  data() {
    return {
      logoImg: require('../../assets/logo.png')
    }
  },
  components: {
    TagList,
    SearchBar
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    toHomePage() {
      this.$router.push('/HomePage')
    },
    toDiscoveryPage() {
      this.$router.push('/dashboard')
    },
    toMyChannel() {
      this.$router.push('/MyChannel')
    },
    toCreatorInfo() {
      this.$router.push('/SearchCreator')
    },
    toMySubscription() {
      this.$router.push('/MySubscription')
    },
    toMyOrder() {
      this.$router.push('/MyOrder')
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
  box-shadow: #fff;
  .nav-menu {
    height: 100%;
    width: 100% ;
    .nav-item{
      color: tomato;
    }
  }
  .search-bar{
    width: 100%;
  }
  .right-menu {
    float: right;
    margin-left: 20px;
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
