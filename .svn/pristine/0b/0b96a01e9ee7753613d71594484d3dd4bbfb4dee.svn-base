<template>
  <div>
    <transition name="el-zoom-in-top">
      <el-tooltip effect="dark" content="我要反馈" placement="left">
        <i class="float-icon" @click="showFloatWindow=!showFloatWindow" v-show="!showFloatWindow"></i>
      </el-tooltip>
    </transition>
    <transition name="el-zoom-in-bottom">
      <div class="float-window" v-show="showFloatWindow">
        <div class="title">
          <span>我要反馈</span>
          <i class="el-icon-close" style="cursor: pointer;" @click="showFloatWindow=!showFloatWindow"></i>
        </div>
        <div class="content">
          <div class="require">反馈内容：</div>
          <textarea placeholder="请输入您的反馈内容（不超过500字）" maxlength="500" v-model="content"></textarea>
          <div class="annex">
            <el-upload with-credentials accept="image/*" multiple name="feedbackFile" :file-list='fileList' :action="httpHeader + 'feedback/uploadFeedbackFile'" :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError">
              <span class="upload-button">上传图片 <em style="color:#999999;">（<i style="color: #CD2525;">*</i>可上传png/jpg/bmp/jpeg/tiff文件）</em></span>
            </el-upload>
          </div>
          <div class="contact">
            <input type="text" placeholder="留个 邮箱/手机号 吧~ 我们将尽快答复您的反馈。" v-model="emailOrTel">
          </div>
          <div class="send-button">
            <el-button type="primary" size="mini" @click="saveFeedback">发送</el-button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import api from '@/fetch/api'

export default {
  data () {
    return {
      httpHeader: process.env.VUE_APP_API,
      showFloatWindow: false,
      content: '',
      emailOrTel: '',
      storagePath: [],
      fileName: [],
      fileList: []
    }
  },
  methods: {
    // 上传附件
    handleSuccess (res, file, fileList) {
      if (res.errorCode === '200') {
        this.fileList = fileList
      } else {
        fileList.splice(-1)
        this.$message({ showClose: true, type: 'error', message: res.errorMsg })
      }
    },
    handleError (err, file, fileList) {
      this.$message({ showClose: true, type: 'error', message: err.errorMsg })
    },
    handleRemove (file, fileList) {
      this.fileList = fileList
    },
    saveFeedback () {
      if (!this.content) return this.$message({ showClose: true, type: 'error', message: '请输入您的反馈内容' })
      let params = {
        realName: window.localStorage.realName,
        userName: window.localStorage.userName,
        feedbackUrl: window.location.href,
        content: this.content,
        emailOrTel: this.emailOrTel,
        newsPicList: this.fileList.map(item => item.response.dataList[0])
      }
      api.saveFeedback(params).then(res => {
        this.showFloatWindow = false
        this.$message({ showClose: true, type: 'success', message: '感谢您的反馈，我们将尽快与您联系' })
        this.content = ''
        this.emailOrTel = ''
        this.fileList = []
      })
    }
  }
}
</script>
<style lang="less" scoped>
.float-icon {
  cursor: pointer;
  width: 38px;
  height: 38px;
  background: url(~@/assets/img/feedback.png) #4474cf no-repeat center;
  box-shadow: 0px 0px 10px 0px rgba(37, 107, 241, 0.6);
  border-radius: 6px;
  position: fixed;
  bottom: 80px;
  right: 10px;
  z-index: 9;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.1);
    background-color: #4c7fe0;
  }
}
.float-window {
  box-sizing: border-box;
  width: 600px;
  background-color: #fff;
  border: 1px solid rgba(229, 229, 229, 1);
  box-shadow: 0px 0px 10px 0px rgba(178, 181, 185, 0.6);
  position: fixed;
  bottom: 80px;
  right: 10px;
  z-index: 9;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    height: 30px;
    background-color: #4474cf;
    padding-left: 20px;
    padding-right: 10px;
  }
  .content {
    padding: 18px 19px 27px;
    font-size: 12px;
    textarea {
      display: block;
      box-sizing: border-box;
      font-size: 12px;
      width: 100%;
      height: 141px;
      margin-top: 8px;
      border: 1px solid #e7eaee;
      padding: 9px 11px;
      &::placeholder {
        color: #999999;
      }
    }
    .annex {
      box-sizing: border-box;
      border: 1px solid #e7eaee;
      border-top: 0;
      width: 100%;
      padding: 6px 11px;
      .upload-button {
        cursor: pointer;
        display: inline-block;
        padding-left: 20px;
        color: #4474cf;
        background: url(~@/assets/img/annex.png) no-repeat left;
      }
    }
    .contact {
      width: 100%;
      margin-top: 10px;
      > input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        font-size: 12px;
        border: 1px solid #e7eaee;
        padding-left: 11px;
        &::placeholder {
          color: #999999;
        }
      }
    }
    .send-button {
      margin-top: 10px;
      .el-button--mini {
        border-radius: 0;
        background-color: #4474cf;
      }
    }
  }
}
</style>
