<template>
  <div id="article-comment"
       style="padding: 10px">
    <p class="text">评论</p>
    <CreateComment
        :postId="postId"
        @refresh="refresh"/>
    <p class="text">热门评论</p>
    <a-empty :description="false" v-if="comments.length === 0"/>
    <ChildComment v-else
                  v-for="(item, index) of comments"
                  :data="item"
                  :key="index"
                  @getReply="getReply"/>
  </div>
</template>

<script>
  import { getReply } from "@/api/post"
  import CreateComment from "@/views/PostDetail/CreateComment";
  import ChildComment from "@/views/PostDetail/ChildComment";

  export default {
    components: {CreateComment,ChildComment},
    props:['postId'],//接收
    data() {
      return {
        comments: {},
      };
    },

    methods: {
      // 获取文章的评论信息
      getReply() {
        getReply(this.postId)
        .then((res) => {
          this.comments = res.data
        })
        .catch(err => {
          this.$message.error(err.desc);
        });
      },

      // 刷新
      refresh() {
        this.getReply();
      },
    },

    mounted() {
      this.getReply();
    },

  }
</script>

<style scoped>
  #article-comment .text {
    font-size: 18px;
    line-height: 30px;
    font-weight: 600;
    color: #252933;
  }
</style>