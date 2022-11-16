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
      <tinymce v-model="content" :height="400" />
    </div>
    <el-row type="flex" style="margin-top: 14px">
      <el-col>
        <el-upload
          class="upload-demo"
          action="#"
          :http-request="upload"
          :on-remove="handleRemove"
        >
          <el-button size="small" type="primary">附件上传</el-button>
          <div slot="tip" class="el-upload__tip">
            
          </div>
        </el-upload>
      </el-col>
      <el-col><el-button type="primary" round @click="createPost">发布动态</el-button></el-col>
    </el-row>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import { createPost } from "@/api/post";
import { uploadFile } from '@/api/post'
import { Message } from 'element-ui';
export default {
  name: "TinymceDemo",
  components: { Tinymce },
  data() {
    return {
      // content: `<h1 style="text-align: center;">在这里新建动态!</h1><p style="text-align: center; font-size: 15px;"><ul>
      //   <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li>
      // </ul>`,
      content: "",
      url: '',
      urlList: new Array(),
      nameList: new Array(),
      idList: new Array(),
    };
  },
  computed: {
    actionUrl() {
      return process.env.VUE_APP_BASE_API + '/api/post/file'
    }
  },
  methods: {
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },

    createPost() {
      var date = this.timestampToTime(new Date().getTime());
      createPost(1, this.content, date, this.nameList, this.urlList);
      Message({
        message: "动态已发布",
        type: "success",
      });
    },
    upload(data) {
      const that = this
      const formdata = new FormData()		// 新建一个FormData()对象
      formdata.append('file', data.file)
      uploadFile(formdata).then(res => {
        that.url = res.data
        that.idList.push(data.file.uid)
        that.nameList.push(data.file.name)
        that.urlList.push(that.url)
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      for (let i = 0, len = this.nameList.length; i < len; i++) {
        if (this.idList[i] === file.uid) {
          this.idList.splice(i,1)
          this.nameList.splice(i,1)
          this.urlList.splice(i,1)
        }
      }
      console.log(this.nameList)
    },
  },
};
</script>

<style scoped>
.editor-content {
  margin-top: 20px;
}
</style>
