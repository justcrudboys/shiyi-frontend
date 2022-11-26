<template>
  <div class="search-bar">
    <a-input-group compact>
      <a-select default-value="creator" style="width: 25%;" v-model="searchOption">
        <a-select-option value="creator">
          创作者
        </a-select-option>
        <a-select-option value="channel">
          频道
        </a-select-option>
      </a-select>
      <a-input-search
        placeholder="输入要搜索的作者/频道名"
        enter-button
        style="width: 75%"
        size="default"
        @search="onSearch"
        v-model="key"
      />
    </a-input-group>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchOption: 'creator',
      key: ''
    }
  },
  methods: {
    onSearch() {
      if (this.searchOption === 'creator') {
        this.$router.push({ path: '/CreatorSearch', query: { key: this.key }})
      } else {
        this.$router.push({ path: '/ChannelSearch', query: { key: this.key }})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-bar{
    margin-top: 0px;
  }
  .search-selector{
  }
  .search-input{
  }
</style>
