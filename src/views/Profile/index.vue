<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs>
              <el-tab-pane label="Activity" name="activity">
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'

export default {
  name: 'Profile',
  components: { UserCard },
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
