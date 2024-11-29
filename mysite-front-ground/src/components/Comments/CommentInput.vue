<template>
  <div class="comment-input-container">
    <form class="comment-form-container" @submit.prevent="handleSubmit">
      <div class="nickname-area">
        <div class="nickname">
          <input
            type="text"
            placeholder="请输入昵称"
            maxlength="10"
            class="input"
            v-model="comment.nickname"
          />
          <span class="info">0/10</span>
        </div>
        <div class="error">{{ error.nickname }}</div>
      </div>
      <div class="content-area">
        <div class="content">
          <textarea
            type="textarea"
            placeholder="请输入评论内容"
            maxlength="300"
            class="input"
            v-model="comment.content"
          />
          <span class="info">0/300</span>
        </div>
        <div class="error">{{ error.content }}</div>
      </div>
      <button class="submit" :disabled="!loaded">
        {{ loaded ? '提交' : '提交中' }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comment: {
        nickname: '',
        content: '',
      },
      error: {
        nickname: '',
        content: '',
      },
      loaded: true,
    }
  },
  methods: {
    handleSubmit() {
      this.error.nickname = this.comment.nickname ? '' : '请输入您的昵称'
      this.error.content = this.comment.content ? '' : '请输入内容'
      if (!this.comment.nickname || !this.comment.content) {
        return
      }
      this.loaded = false
      this.$emit('submit', this.comment, (...args) => {
        this.comment.nickname = ''
        this.comment.content = ''
        this.$showMessage(...args)
        this.loaded = true
      })
    },
  },
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';
.comment-input-container {
  text-align: left;
  .comment-form-container {
    padding: 20px 0;
    .nickname-area,
    .content-area {
      margin-bottom: 20px;
      .error {
        height: 20px;
        line-height: 20px;
        color: @danger;
        font-size: 14px;
        margin-top: 5px;
      }
    }
    button {
      border: none;
      background-color: @primary;
      color: #fff;
      height: 30px;
      width: 100px;
      border-radius: 5px;
      cursor: pointer;
      letter-spacing: 7px;
      padding-left: 10px;
    }
    button[disabled] {
      background-color: @gray;
    }
    .nickname,
    .content {
      border: 1px dashed @gray;
      position: relative;
      border-radius: 10px;
      width: 90%;
      height: 100px;
      .input {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 10px;
        background-color: transparent;
        text-indent: 1em;
        resize: none;
        padding-top: 5px;
        &:focus {
          outline: none;
        }
        &::-webkit-input-placeholder,
        &::-moz-placeholder,
        &::placeholder {
          font-size: 14px;
        }
      }
      .info {
        position: absolute;
        width: 50px;
        height: 20px;
        bottom: 0;
        right: 0;
        color: @gray;
        font-size: 12px;
        text-align: center;
      }
    }
    .nickname {
      width: 200px;
      height: 35px;
    }
  }
}
</style>
