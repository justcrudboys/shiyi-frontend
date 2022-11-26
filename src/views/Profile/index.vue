<template>
  <div>
    <div class="profile-container">
      <div v-if="user">
        <el-row :gutter="20">
          <el-col :span="8" :xs="24">
            <user-card :user="user" />
          </el-col>

          <el-col :span="16" :xs="24">
            <CreatorCard></CreatorCard>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import CreatorCard from '@/views/Profile/components/CreatorCard'

export default {
  name: 'Profile',
  components: { CreatorCard, UserCard },
  data() {
    return {
      user: {}
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  created() {
  }
}
</script>

<style scoped>
  .profile-container{
    padding: 30px 100px;
  }
</style>
