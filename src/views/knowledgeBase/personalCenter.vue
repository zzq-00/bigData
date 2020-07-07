<template>
  <div class="base-container">
    <searchBar />

    <div class="personalCenter">
      <div>
        <div class="info">
          <div>
            <img src="@/assets/img/header-pic.png" alt="">
            <span>{{userName}}</span>
          </div>
          <div>
            <span>
              <b>{{downloadCount}}</b>
              <br>
              <em>下载</em>
            </span>
            <span>
              <b>{{uploadCount}}</b>
              <br>
              <em>上传</em>
            </span>
          </div>
        </div>
        <el-button type="primary" icon="el-icon-upload" @click="gotoUpload">上传文件</el-button>
        <div class="navs">
          <ul>
            <li>
              <a href="javascript:;" :class="{'active': activeNav==='up'}" @click="activeNav = 'up'">我的贡献</a>
            </li>
            <li>
              <a href="javascript:;" :class="{'active': activeNav==='down'}" @click="activeNav = 'down'">我的下载</a>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="activeNav === 'up'">
        <h4>我的贡献</h4>
        <el-table class="contribution-table" :data="uploadList" height="700" header-row-class-name="knowledge-table-headerBGC">
          <el-table-column label="名称">
            <template slot-scope="scope">
              <a href="javascript:;"  @click="handlePreview(scope.row)" class="file-link" :class="{
                'word':scope.row.fileType === '.docx' || scope.row.fileType === '.doc',
                'pdf':scope.row.fileType === '.pdf',
                'excel':scope.row.fileType === '.xlsx' || scope.row.fileType === '.xls',
                'ppt':scope.row.fileType === '.ppt' || scope.row.fileType === '.pptx',
                'pic':scope.row.fileType === '.jpg' || scope.row.fileType === '.png',
                }">{{scope.row.title}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="fileServiceName" label="类型" width="180">
          </el-table-column>
          <el-table-column prop="createAt" label="提交日期" width="180">
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <a class="icon el-icon-edit-outline" href="javascript:;" @click="handleEdit(scope.row)"></a>
              <a class="icon el-icon-delete" href="javascript:;" @click="handleDelete(scope.row.id)"></a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="activeNav === 'down'">
        <h4>我的下载</h4>
        <el-table class="contribution-table" :data="downloadList" height="700" header-row-class-name="knowledge-table-headerBGC">
          <el-table-column label="名称">
            <template slot-scope="scope">
              <a href="javascript:;" @click="handlePreview(scope.row)" class="file-link" :class="{
                'word':scope.row.fileType === '.docx' || scope.row.fileType === '.doc',
                'pdf':scope.row.fileType === '.pdf',
                'excel':scope.row.fileType === '.xlsx' || scope.row.fileType === '.xls',
                'ppt':scope.row.fileType === '.ppt' || scope.row.fileType === '.pptx',
                'pic':scope.row.fileType === '.jpg' || scope.row.fileType === '.png',
                }">{{scope.row.title}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="uploadUserName" label="上传用户" width="180">
          </el-table-column>
          <el-table-column prop="downloadAt" label="下载日期" width="180">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 预览浮窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="previewDialogVisible" @close="previewFileId=''" width="1000px" center>
      <documentDetail :previewFileId="previewFileId"/>
    </el-dialog>
    <!-- 编辑浮窗 -->
    <el-dialog :title="dialogTitle" :visible.sync="editDialogVisible" width="600px">
      <documentEdit :editFileId="editFileId" @refresh="refresh" />
    </el-dialog>
  </div>
</template>
<script>
import api from '@/fetch/api'
import searchBar from './components/searchBar'
import documentEdit from './components/documentEdit'
import documentDetail from './components/documentDetail'

export default {
  components: {
    searchBar,
    documentEdit,
    documentDetail
  },
  data () {
    return {
      userName: localStorage.userName,
      activeNav: 'up',
      uploadList: [],
      uploadCount: '',
      downloadList: [],
      downloadCount: '',
      tableData: [],
      dialogTitle: '',
      previewDialogVisible: false,
      previewFileId: '',
      editDialogVisible: false,
      editFileId: ''
    }
  },
  methods: {
    gotoUpload () {
      this.$router.push('/knowledgeBase/uploadfile')
    },
    // 个人中心获取我的贡献列表
    getKnowUploadList () {
      api.getKnowUploadList().then(res => {
        this.uploadList = res.data.list
        this.uploadCount = res.data.count
      })
    },
    // 个人中心获取已下载列表
    getKnowDownloadList () {
      api.getKnowDownloadList().then(res => {
        this.downloadList = res.data.list
        this.downloadCount = res.data.count
      })
    },
    // 个人中心编辑文档
    handleEdit (item) {
      this.editFileId = item.id
      this.dialogTitle = item.title
      this.editDialogVisible = true
    },
    refresh () {
      this.getKnowUploadList()
      this.editDialogVisible = false
    },
    // 个人中心删除文档
    handleDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteKnowById(id).then(res => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getKnowUploadList()
        })
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
    this.getKnowUploadList()
    this.getKnowDownloadList()
  }
}
</script>
<style lang="less" scoped>
.base-container {
  margin-top: 16px;
  margin-bottom: 20px;
  .search {
    padding: 16px 225px 0;
    background-color: #fff;
    border: 1px solid #dbdbdc;
  }
  .personalCenter {
    display: flex;
    justify-content: space-between;
    margin-top: 19px;
    > div {
      &:first-child {
        width: 300px;
        .info {
          padding: 22px 0 15px;
          border: 1px solid #dbdbdc;
          background-color: #fff;
          > div {
            &:first-child {
              display: flex;
              flex-direction: column;
              align-items: center;
              > span {
                font-size: 18px;
                margin-top: 15px;
              }
            }
            &:last-child {
              margin-top: 15px;
              display: flex;
              justify-content: center;
              > span {
                padding: 0 20px;
                text-align: center;
                & + span {
                  border-left: 1px solid #dbdbdc;
                }
                > b {
                  font-size: 24px;
                }
                > em {
                  color: #999999;
                }
              }
            }
          }
          & + button {
            width: 100%;
            margin: 20px 0;
          }
        }
        .navs {
          background-color: #fff;
          border: 1px solid #dbdbdc;
          padding: 10px 17px;
          > ul {
            li {
              height: 45px;
              line-height: 45px;
              > a.active {
                color: #4574d0;
              }
            }
          }
        }
      }
      &:last-child {
        width: 880px;
        box-sizing: border-box;
        padding: 20px;
        border: 1px solid #dbdbdc;
        background-color: #fff;
        > h4 {
          font-size: 16px;
          font-weight: normal;
          margin-bottom: 15px;
        }
        .file-link {
          display: inline-block;
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
        .icon {
          font-size: 18px;
          margin-right: 25px;
        }
      }
    }
  }

}
</style>
<style lang="less">
.knowledge-table-headerBGC {
  color: #999999;
  th {
    background-color: #f7f8fa;
  }
}
</style>
