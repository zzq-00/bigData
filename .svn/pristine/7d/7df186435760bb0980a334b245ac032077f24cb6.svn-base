<template>
  <div class="searchResult">
    <div class="base-container">
      <div class="upload">
        <el-button type="info" size="small" icon="el-icon-upload2" @click="gotoUpload">上传文档</el-button>
        <router-link to="/knowledgeBase/personalCenter">Jasmine</router-link>
      </div>

      <div style="width:791px;">
        <div class="search">
          <div class="clearfix">
            <el-input class="fl" placeholder="请输入内容" prefix-icon="el-icon-search" @keyup.enter.native="search(params.keyword)" v-model="params.keyword"></el-input>
            <el-button class="fl" type="primary" @click="search(params.keyword)">搜索</el-button>
          </div>
          <dl class="clearfix">
            <dt>搜索热词：</dt>
            <dd v-for="(item,index) in hotList" :key="index" @click="search(item)">{{item}}</dd>
          </dl>
        </div>
        <div class="total">为您搜索到相关文章约 {{total}} 篇</div>
        <div v-if="dataList.length">
          <ul class="files">
            <li v-for="(item,index) in dataList" :key="index">
              <h5>
                <a href="javascript:;" @click="handlePreview(item)" :class="{
                  'word':item.fileType === '.docx' || item.fileType === '.doc',
                  'pdf':item.fileType === '.pdf',
                  'excel':item.fileType === '.xlsx' || item.fileType === '.xls',
                  'ppt':item.fileType === '.ppt' || item.fileType === '.pptx',
                  'pic':item.fileType === '.jpg' || item.fileType === '.png',
                  }">{{item.title}}</a>
              </h5>
              <div>
                <span>下载次数：{{item.downNum}}</span>
                <i>&nbsp;&nbsp;|&nbsp;&nbsp;</i>
                <span>{{item.createAt}}</span>
              </div>
            </li>
          </ul>
          <div class="footer">
            <span class="demonstration">当前显示 {{dataList.length}} 条，共 {{total}} 条；</span>
            <el-pagination small @current-change="handleCurrentChange" layout="prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>

      <el-dialog :title="dialogTitle" :visible.sync="previewDialogVisible" @close="previewFileId=''" width="1000px" center>
        <documentDetail :previewFileId="previewFileId" />
      </el-dialog>

    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
import documentDetail from './components/documentDetail'

export default {
  components: {
    documentDetail
  },
  data () {
    return {
      params: {
        keyword: '',
        orderField: '',
        orderType: '',
        page: 1,
        size: 10
      },
      total: 0,
      dataList: [],
      hotList: [],
      previewDialogVisible: false,
      dialogTitle: '',
      previewFileId: ''
    }
  },
  watch: {
    '$route' (to, from) {
      this.params.keyword = this.$route.query.keyWord
      this.getKnowBaseHomeList()
    }
  },
  methods: {
    gotoUpload () {
      this.$router.push('/knowledgeBase/uploadfile')
    },
    getKnowBaseHomeList () {
      api.getKnowBaseHomeList(this.params).then(res => {
        this.total = res.data.count
        this.dataList = res.data.list
      })
    },
    handleCurrentChange (val) {
      this.params.page = val
      this.getKnowBaseHomeList()
    },
    search (keyword) {
      if (!keyword) return this.$router.push('/knowledgeBase/recommend')
      this.$router.push('/knowledgeBase/searchResult/?keyWord=' + keyword)
      this.params.page = 1
    },
    // 获取搜索热词
    getNewSearchList () {
      api.getNewSearchList().then(res => {
        this.hotList = res.data
      })
    },
    // 文件预览
    handlePreview (item) {
      this.previewFileId = item.id
      this.dialogTitle = item.title
      this.previewDialogVisible = true
    }
  },
  mounted () {
    if (!this.$route.query.keyWord) return this.$router.go(-1)
    this.params.keyword = this.$route.query.keyWord
    this.getKnowBaseHomeList()
    this.getNewSearchList()
  }
}
</script>
<style lang="less" scoped>
.searchResult {
  background-color: #fff;
  padding: 20px 0 135px;
  .upload {
    text-align: right;
    > a {
      display: inline-block;
      margin-left: 20px;
      text-decoration: underline;
    }
  }
  .search {
    padding: 40px 0;
    .el-input {
      width: 650px;
    }
    .el-button {
      padding: 12px 55px;
    }
    > dl {
      font-size: 12px;
      color: #999999;
      padding: 10px;
      > dt,
      > dd {
        float: left;
      }
      dd {
        cursor: pointer;
        margin-right: 15px;
      }
    }
  }
  .total {
    color: #999999;
    font-size: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dbdbdc;
  }
  .files {
    padding: 25px 0;
    > li {
      margin-bottom: 20px;
      > h5 {
        font-size: 16px;
        font-weight: normal;
        height: 24px;
        line-height: 24px;
        > a {
          display: inline-block;
          height: 24px;
          padding-left: 28px;
          background-repeat: no-repeat;
          background-image: url(~@/assets/img/file.png);
          &.word {
            background-image: url(~@/assets/img/word.png);
          }
          &.pdf {
            background-image: url(~@/assets/img/pdf.png);
          }
          &.excel {
            background-image: url(~@/assets/img/excel.png);
          }
          &.ppt {
            background-image: url(~@/assets/img/ppt.png);
          }
          &.pic {
            background-image: url(~@/assets/img/pic.png);
          }
        }
        & + div {
          padding-left: 26px;
          color: #999999;
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }
  }
  .footer {
    border-top: 1px solid #dbdbdc;
    display: flex;
    align-items: center;
    padding-top: 15px;
    .demonstration {
      margin-right: 150px;
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
