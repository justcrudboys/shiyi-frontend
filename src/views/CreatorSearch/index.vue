<template>
  <a-card class="card">
    <div v-if="creatorList.length==0">
      <div class="notice">没有找到符合要求的创作者哦</div>
    </div>
    <div v-else>
      <div class="notice" v-html="'一共有' + creatorList.length + '位符合要求的创作者'" />
      <el-row :gutter="20" class="row-box">
        <el-col v-for="(creator,index) in creatorList" :key="index" :span="6">
          <el-card class="small-card" shadow="hover" @click.native="getCreatorId(index)">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-image :src="creator.avatar" />
              </el-col>
              <el-col :span="12">
                <div class="text" v-html="creator.username" />
                <div class="small-text" v-html="creator.introduction" />
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="button">
      <a-button type="primary" size="large" @click="toHomePage">
        继续搜索
      </a-button>
    </div>
  </a-card>
</template>

<script>
import { getCreaterByName } from '@/api/creator'

export default {
  name: 'CreatorSearch',
  data() {
    return {
      key: 'y',
      creatorList: []
    }
  },
  created() {
    this.key = this.$route.query.key
    getCreaterByName(this.key).then(response => {
      console.log(response)
      this.creatorList = response.data
    })
  },
  methods: {
    toHomePage() {
      this.$router.push('/dashboard')
    },
    getCreatorId(index) {
      this.$router.push({ path: '/CreatorInfo', query: { searchid: this.creatorList[index]['id'] }})
    }
  }
}
</script>

<style>
.button {
  text-align: center;
}
.notice {
  text-align: center;
  font-size: xx-large;
  margin-top: 15px;
  margin-bottom: 15px;
}
.card {
  min-width: 80%;
  min-height: 38em;
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 20px;
  transition: all .5s;
  text-align: left;
  overflow-y: auto;
  border-radius: 5%;
}
.small-card {
  margin-top: 10px;
  margin-bottom: 10px;
}
.text {
  text-align: left;
  font-size: large;
  margin-top: 10px;
  margin-bottom: 10px;
}
.small-text {
  text-align: left;
  margin-top: 5px;
  margin-bottom: 5px;
}
.smaller-text {
  text-align: left;
  font-size: small;
  margin-top: 5px;
  margin-bottom: 5px;
}
.row-box {
  display: flex;
  flex-flow: wrap;
}
.row-box .small-card {
  min-width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
