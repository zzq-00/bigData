<template>
  <div class="base-container">
    <div v-if="previewUrl">
      <iframe :src="previewUrl" width="100%" height="750px">
        This browser does not support PDFs. Please download the PDF to view it:
        <a :href="data">Download PDF</a>
      </iframe>
      <el-button type="primary" @click="downLoad">下载文档</el-button>
    </div>
    <div v-else-if="showDetail">
      <dl>
        <dt>文档详情</dt>
        <dd>
          <span>文档标题：</span>
          <span>{{data.title}}</span>
        </dd>
        <dd>
          <span>文件属性分类：</span>
          <span>{{data.fileServiceTypeValue}}</span>
        </dd>
        <dd v-show="data.label">
          <span>标签：</span>
          <span>{{data.label}}</span>
        </dd>
        <dd v-show="data.introduction">
          <span>简介：</span>
          <span>{{data.introduction}}</span>
        </dd>
        <dd>
          <span>提交人：</span>
          <span>{{data.updateUserName}}</span>
        </dd>
        <dd>
          <span>提交时间：</span>
          <span>{{data.createAt}}</span>
        </dd>
      </dl>
      <el-button type="primary" @click="downLoad">下载文档</el-button>
    </div>
    <div class="no-file" v-else-if="showNofile">
      <img src="@/assets/img/no-file.png" alt="">
      <p>抱歉，您所查看的文件已删除，请查看其它文章。</p>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'

export default {
  data () {
    return {
      httpHead: process.env.VUE_APP_API,
      previewUrl: '',
      showDetail: false,
      showNofile: false,
      data: {}
    }
  },
  methods: {
    getKnowBaseById () {
      api.getKnowBaseById(this.$route.params.id).then(res => {
        this.data = res.data
        this.data.fileId && this.filePreview()
      }).catch(err => {
        // 找不到该文件
        this.showNofile = true
      })
    },
    downLoad () {
      window.open(this.httpHead + 'knowledge/downloadFile/' + this.data.fileId)
    },
    filePreview () {
      api.filePreview(this.data.fileId).then(res => {
        this.previewUrl = res.data
      }).catch(res => {
        // 3005 文件不支持预览，显示文档详情
        this.showDetail = true
      })
    }
  },
  mounted () {
    this.getKnowBaseById()
  }
}
</script>
<style lang="less" scoped>
.base-container {
  min-height: 800px;
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 35px;
  margin-bottom: 35px;
  padding: 20px;
  > div {
    > dl {
      dt {
        font-size: 16px;
        margin-bottom: 60px;
      }
      dd {
        > span {
          display: inline-block;
          line-height: 46px;
          &:first-child {
            color: #aaaaaa;
            width: 100px;
            text-align: right;
          }
        }
      }
      & + button {
        margin-left: 105px;
        margin-top: 40px;
      }
    }
    &.no-file {
      text-align: center;
      margin-top: 160px;
      > p {
        color: #888888;
        margin-top: 20px;
      }
    }
  }
}
</style>
