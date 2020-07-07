<template>
  <div class="knowledgeBase">
    <div class="base-container">
      <div class="upload">
        <el-button type="info" size="small" icon="el-icon-upload2" @click="gotoUpload">上传文档</el-button>
        <router-link to="/knowledgeBase/personalCenter" v-if="userName">{{userName}}</router-link>
      </div>

      <searchBar />

      <div class="recommend" v-if="dataList.length">
        <div>
          <img :src="require('@/assets/img/hot.png')" alt="">
          <span>热门推荐</span>
        </div>
        <div class="files">
          <ul>
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
          <div class="line"></div>
        </div>
        <div>
          <a href="javascript:;" @click="changeItem">换一批</a>
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
import searchBar from './components/searchBar'
import documentDetail from './components/documentDetail'

export default {
  components: {
    searchBar,
    documentDetail
  },
  data () {
    return {
      userName: localStorage.userName,
      dataList: [],
      count: 0,
      params: {
        page: 1,
        size: 10
      },
      previewDialogVisible: false,
      dialogTitle: '',
      previewFileId: ''
    }
  },
  methods: {
    gotoUpload () {
      if (!localStorage.userId) return this.$router.push('/login')
      this.$router.push('/knowledgeBase/uploadfile')
    },
    changeItem () {
      if (this.params.page++ > 2) this.params.page = 1
      this.getKnowHotList()
    },
    getKnowHotList () {
      api.getKnowHotList(this.params).then(res => {
        this.dataList = res.data.list
        this.count = res.data.count
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
    this.getKnowHotList()
  }
}
</script>
<style lang="less" scoped>
.knowledgeBase {
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
    padding: 40px 225px;
  }
  .recommend {
    border: 1px solid #dbdbdc;
    > div {
      &:first-child {
        padding: 13px 20px;
        font-size: 16px;
        background-color: #f7f8fa;
        border-bottom: 1px solid #dbdbdc;
        > span {
          vertical-align: middle;
        }
      }
      &.files {
        box-sizing: border-box;
        // height: 450px;
        padding: 30px 0 30px 37px;
        position: relative;
        border-bottom: 1px solid #dbdbdc;
        > ul {
          display: flex;
          flex-wrap: wrap;
          > li {
            flex: 0 0 50%;
            width: 50%;
            margin-bottom: 20px;
            box-sizing: border-box;
            > h5 {
              font-size: 16px;
              font-weight: normal;
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
                padding-left: 30px;
                color: #999999;
                font-size: 12px;
                margin-top: 5px;
              }
            }
          }
        }
        .line {
          height: 86%;
          border-right: 1px solid #dbdbdc;
          position: absolute;
          top: 35px;
          left: 48%;
        }
      }
      &:last-child {
        padding: 15px 0;
        text-align: center;
        > a {
          color: #999;
          padding-left: 25px;
          background: url(../../assets/img/refresh.png) left no-repeat;
          margin-left: -68px;
        }
      }
    }
  }
}
</style>
