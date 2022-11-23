<template>
  <div id="create-comment">
    <div class="top">
      <a-form :form="form" @submit="handleSubmit" style="width: 100%">
        <a-form-item>
          <a-textarea allow-clear @keydown.enter.native="keyDown"
                      v-decorator="['content', validatorRules.comment]"
                      placeholder="输入评论（Enter换行、Ctrl + Enter发送）"
                      :auto-size="{ minRows: 3, maxRows: 10 }"/>
          <a-button class="button" type="primary" html-type="submit" style="float: right;">
            发表评论
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>

import { createReply } from "@/api/post";

export default {
  name: "CreateComment",
  props: ['postId'],
  data() {
    return {
      data: {},
      form: this.$form.createForm(this, {name: 'coordinated'}),
      // 表单验证
      validatorRules: {
        comment: {
          // 检验规则
          rules: [
            // 是否必须填写
            { required: true, message: '请输入评论' }
          ]
        }
      }
    };
  },

  methods: {
    // 用户点击了ctrl+enter触发
    keyDown(e) {
      if (e.ctrlKey && e.keyCode === 13) {
        this.handleSubmit(e);
      }
    },

    // 发表评论
    handleSubmit(e) {
      e.preventDefault();
      
      this.form.validateFields((err, values) => {
        if (!err) {
          this.data.postId = this.postId
          this.data.content = values.content
          this.data.replyTime = new Date()
          this.createReply()
        }
      });
      
    },

    // 添加评论
    createReply() {
      createReply(this.data)
      .then((res) => {
        this.form.resetFields();
        this.$emit("refresh");
      })
      .catch(err => {
        this.$message.error('create reply fault');
      });
    },
    
  },

}
</script>

<style lang="less" scoped>

#create-comment .top {
  display: flex;
  justify-content: center;
  align-items: center;

  .avatar {
    margin-right: 15px;
  }
}
</style>