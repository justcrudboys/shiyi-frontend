<template>
  <div class="taglist">
    <div class="dataNav">
      <button class="dataNavPrev" @click="navPrev"><</button>
      <ul class="dataNavList" ref="dataNavList">
        <li class="dataNavListItem" v-for="(item, index) in navList" :key="index" :style="{transform:'translateX(-'+move+'px)'}">
          {{item}}
        </li>
      </ul>
      <button class="dataNavNext" @click="navNext">></button>
    </div>
  </div>
</template>

<script>
const list = [
  '游戏',
  '音乐',
  '视频',
  '绘画',
  '杂谈',
  '杂谈',
  '杂谈',
  '杂谈',
  '杂谈',
  '杂谈',
  '视频',
  '游戏',
  '音乐',
  '视频',
  '绘画',
  '游戏',
  '音乐',
  '视频',
  '绘画'
]
export default {
  name: 'TagList',
  data() {
    return {
      navList: list,
      move: 0,
      dataNavListRealWidth: 0,
      dataNavListViewWidth: 0
    }
  },
  mounted() {
    // scrollWidth获取整个菜单实际宽度
    this.dataNavListRealWidth = this.$refs.dataNavList.scrollWidth
    // offsetWidth获取菜单在当前页面可视宽度
    this.dataNavListViewWidth = this.$refs.dataNavList.offsetWidth
    // 实际宽度减去可视宽度就是可移动的范围即move的范围
    // 窗口大小变化时触发。实时更新可视宽度
    window.onresize = () => {
      return (() => {
        this.dataNavListViewWidth = this.$refs.dataNavList.offsetWidth
        // 注1，详见下方
        if (this.move > this.dataNavListRealWidth - this.dataNavListViewWidth - 100) {
          this.move = this.dataNavListRealWidth - this.dataNavListViewWidth
        }
      })()}
  },
  methods: {
    // 当菜单项向右的可移动距离大于单个菜单项的宽度时，move减去一个菜单项的宽度（即右移移动一个菜单项的宽度），
    // 当菜单项向右的可移动距离小于单个菜单项的宽度时，move等于0（即回到最开始没有移动的状态）
    navPrev() {
      if (this.move > 100) {
        this.move = this.move - 100
      } else {
        this.move = 0
      }
    },
    // 当菜单项向左的可移动距离大于单个菜单项的宽度时，move减去一个菜单项的宽度（即左移移动一个菜单项的宽度），
    // 当菜单项向左的可移动距离小于单个菜单项的宽度时，move等于可以向左移动的最大值（即到最末尾）
    navNext() {
      if (this.move < this.dataNavListRealWidth - this.dataNavListViewWidth - 100) {
        this.move = this.move + 100
      } else {
        this.move = this.dataNavListRealWidth - this.dataNavListViewWidth
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.dataNav {
  display: flex;
  height: 36px;
  background: #ffffff;
  .dataNavList {
    display: flex;
    // 超出部分隐藏
    overflow: hidden;
    margin: 0;
    .dataNavListItem{
      display: inline-block;
      height: 35px;
      //每个菜单项的宽度要固定，不然move值无法计算，当然也可以通过其他方法来设置以适应自己的表格
      width: 100px;
      min-width: 100px;
      margin: auto 0;
      border-radius: 5px;
      font-size: 13px;
      text-align: center;
      color: #77361d;
      line-height: 35px;
      // 过渡效果
      transition:transform .2s;
    }
    :hover {
      color: #c27f42;
      background-color: #c7cede;
      cursor: pointer;
    }
  }
  // 按钮样式
  .dataNavPrev,
  .dataNavNext{
    display: inline-block;
    width: 35px;
    min-width: 35px;
    height: 35px;
    margin: auto 0;
    border: none;
    border-radius: 5px;
    text-align: center;
    line-height:35px;
    background-color: rgba(0,0,0,0);
    &:focus{
      outline: none;
    }
    &:hover{
      color: #1D4190;
      background-color: #c7cede;
      cursor: pointer;
    }
  }
  .dataNavNext{
    margin-left: auto;
  }

}
</style>
