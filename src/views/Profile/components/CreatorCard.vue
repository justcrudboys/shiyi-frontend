<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      作为创作者
    </div>
    <div v-if="creator">
      <div class="user-bio-section-header"><span>创作者简介</span></div>
      <el-input
        v-model="creator.introduction"
        :rows="6"
        @blur="updateIntroduction"
        placeholder="请输入创作者简介"
        type="textarea">
      </el-input>
    </div>
    <div v-else>
      <p style="text-align: center;font-size: xx-large">您还不是创作者哦</p>
      <el-button class="becreator-button" round type="primary" @click="beCreator">成为创作者</el-button>
    </div>
  </el-card>
</template>

<script>
import { becomeCreator, changeIntroduction, getPesonalCreatorInfo, isCreator } from '@/api/creator'

export default {
  name: 'CreatorCard',
  data() {
    return {
      creator: null
    }
  },
  methods: {
    updateIntroduction() {
      if (!(this.creator.introduction == null || this.creator.introduction === '')) { // 判断字符串是否为空
        changeIntroduction(this.creator.introduction)
      }
    },
    beCreator() {
      becomeCreator()
      this.$router.go(0)
    }
  },
  created() {
    isCreator().then(res => {
      if (res.data === true) {
        getPesonalCreatorInfo().then(response => {
          this.creator = response.data
        })
      }
    })
  }
}
</script>

<style scoped>
  .becreator-button {
    width: 100%;
    padding: 30px;
    font-size: xx-large;
  }
  .user-bio-section-header {
    border-bottom: 1px solid #dfe6ec;
    padding-bottom: 10px;
    margin-bottom: 10px;
    margin-top: 20px;
    font-weight: bold;
  }
</style>
