<template>
<div style="background-color: white">
  <div id="article-detail" style="padding: 100px">
    <div v-if="isPostValid">
      <div class="article-title">
        <h1>{{ postName }}</h1>
      </div>
      <div class="article-user">
        <div class="author-info-box">
          <a-avatar class="avatar" :src="authorAvatar"
                    :size="46"/>
          <div class="author-name-meta" style="padding-left: 10px;">
            <div class="author-name">
              <a target="_blank" class="username">
                <span class="name" style="font-size: 17px;">{{ authorName }} </span>
              </a>
            </div>
            <div class="meta-box" style="color: #8a919f">
            <span class="time">
              {{ postTime }}
            </span>
              <span class="views-count">
               {{  }}
            </span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="article-content"
        style="width: 100%"
        v-html="content"
      ></div>     
      <li v-for="(v, i) in attachmentList">
        <a :href="v.url" :download="v.name">附件{{ i+1 }}: {{ v.name }}</a>
      </li>
      <br/>
      <PostComment :postId="postId" style="background: #fff"/>
    </div>
    <div v-else>
      <div class="article-title">
        <h1>您没有访问该动态的权限</h1>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { getPostById, getAttachment, isPostValid } from "@/api/post"
import PostComment from "@/views/PostDetail/PostComment"

export default {
  components: { PostComment },
  data() {
    return {
      isPostValid: false,
      authorName: '',
      authorAvatar: '',
      content: '',
      postName: '',
      postTime: '',
      postId: '',
      attachmentList: '',
    };
  },

  methods: {
    getPostById() {
      getPostById(this.postId).then((res) => {
        const post = res.data
        this.content = post.content
        this.postName = post.postName
        this.postTime = post.postTime
        this.authorName = post.authorName
        this.authorAvatar = post.authorAvatar
      });
    },
    getAttachment() {
      getAttachment(this.postId).then((res) => {
        this.attachmentList = res.data
      });
    },
    handlePreview(file) {
      console.log(file)
    },
  },

  async beforeMount() {
    this.postId = this.$route.query.postId;
    await isPostValid(this.postId).then((res) => {
        this.isPostValid = res.data 
    })
  },

  mounted() {
    this.getPostById()
    this.getAttachment()
  },
};
</script>

<style lang="less">
#article-detail .article-title {
  display: flex;
  //align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 32px;
    font-weight: 700;
    line-height: 1.31;
    color: #252933;
  }

  h2 {
    font-weight: 700;
  }
}

#article-detail .article-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#article-detail .author-info-box {
  display: flex;
}

#article-detail .avatar {
  cursor: pointer;
}

/* #article-detail .article-titleMap, .article-content 这样写会窜样式 */
#article-detail .article-titleMap {
  padding-top: 20px;
}
#article-detail .article-content {
  padding-top: 20px;
}

/* 代码高亮部分设置样式--start */
#article-detail .markdown-body .highlight pre,
.markdown-body pre {
  padding: 0 !important;
}

#article-detail .hljs {
  padding: 10px;
}

/* 代码高亮部分设置样式--end */

/* mavon-editor整体样式--start */
#article-detail .v-note-wrapper .v-note-panel .v-note-show .v-show-content,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  padding: 0;
}
#article-detail .v-note-wrapper {
  z-index: 900;
}
/* 设置mavon-editor的最小高度 */
#article-detail .v-note-wrapper.markdown-body.shadow {
  min-height: 0;
}
/* mavon-editor整体样式--end */


</style>