<template>
  <div class="components-container">
    <aside>
      <a
        target="_blank"
        class="link-type"
        href="https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html"
        >Documentation</a
      >
    </aside>
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <el-button type="primary" round @click="createPost">发布动态</el-button>
    <div v-html="content"></div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import { createPost } from "@/api/post";
export default {
  name: "TinymceDemo",
  components: { Tinymce },
  data() {
    return {
      content: `<h1 style="text-align: center;">在这里新建动态!</h1><p style="text-align: center; font-size: 15px;"><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li>
      </ul>`,
    };
  },

  methods: {
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =(date.getMonth() + 1 < 10? "0" + (date.getMonth() + 1): date.getMonth() + 1) + "-";
      var D =(date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =(date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =(date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
      var s =date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },

    createPost() {
      var date = this.timestampToTime(new Date().getTime());
      createPost(1,this.content,date)
      this.$message({
        message: "动态已发布",
        type: "success",
      });
    },
  },
};
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>
