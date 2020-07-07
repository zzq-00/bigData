<template>
  <div class="file-info">
    <div class="file-top" style="display: none;">
      <div class="file-down" @click="fileDown" v-has="['oZoaFH']">
        <img src="@/assets/img/load_ico.png" alt="">
        <span>点击下载</span>
      </div>
    </div>
    <div class="tree-title">
      <span>文件名称</span>
      <span>大小</span>
      <span>修改日期</span>
    </div>
    <el-tree show-checkbox node-key="id" :props="defaultProps" ref="tree" :default-expanded-keys="defaultExpandedKeys" :expand-on-click-node="false" :load="loadNode" lazy class="filetree">
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <span class="file-name" :class="{
            'bin': data.name==='回收箱',
            'nofile': !data.size,
            'hasfile': data.size,
            'file': data.originalName,
            'ysb': data.originalName&&origin(data.originalName, 'zip'),
            'pdf': data.originalName&&origin(data.originalName, 'pdf'),
            'png': data.originalName&&origin(data.originalName, 'png,jpg,jpeg'),
            'docx': data.originalName&&origin(data.originalName, 'docx,doc'),
            'xlsx': data.originalName&&origin(data.originalName, 'xlsx,xls'),
            'ppt': data.originalName&&origin(data.originalName, 'ppt'),
            'GBQ5': data.originalName&&origin(data.originalName, 'GBQ5'),
            'GBQ4': data.originalName&&origin(data.originalName, 'GBQ4'),
            'GBQ3': data.originalName&&origin(data.originalName, 'GBQ3'),
            'GGJ': data.originalName&&origin(data.originalName, 'GGJ'),
            'GCL': data.originalName&&origin(data.originalName, 'GCL'),
            'GTJ': data.originalName&&origin(data.originalName, 'GTJ'),
            'GQI': data.originalName&&origin(data.originalName, 'GQI'),
            'dwg': data.originalName&&origin(data.originalName, 'dwg'),
          }">{{ data.originalName || data.name }} <em v-if="data.childCount>=0">（{{data.childCount}}）</em> </span>
        <span>
          <img src="@/assets/img/view_ico.png" alt="查看" title="查看" @click="viewSee(data)" v-if="data.originalName&&origin(data.originalName, 'pdf,docx,doc,xlsx,xls,dwg')">
          <!-- <img src="../../generic/web/viewer.html?file=" alt=""> -->
        </span>
        <span>{{ (data.size/Math.pow(1024,2)).toFixed(2) }}M</span>
        <span>{{ data.updateAt }}</span>
      </div>
    </el-tree>

    <el-dialog :title="previewTitle" :visible.sync="previewDialogVisible" @close="previewUrl=''" width="1000px" center>
      <div style="height: 65vh;">
        <iframe :src="previewUrl" width="100%" height="100%"></iframe>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/fetch/api'
import { getPostfix } from '@/assets/js/Utils'

export default {
  data () {
    return {
      previewDialogVisible: false,
      previewUrl: '',
      previewTitle: '',
      defaultExpandedKeys: [],
      defaultProps: {
        isLeaf: 'leaf'
      },
      projectId: (() => this.$route.params.projectId)()
    }
  },
  methods: {
    loadNode (node, resolve) {
      if (node.level === 0) return this.getInitFolder4ProjectData(resolve)
      this.getFilesByFolderId(node.key, resolve)
    },
    // 初始化 为一个目录下 所有文件夹
    getInitFolder4ProjectData (resolve) {
      let data = this.$route.params.projectId
      api.getInitFolder4ProjectData(data).then(res => {
        // leaf为true，则表示当前节点为叶子节点，没有子节点。根据size是否为0判断不准确
        res.data.folderInfo.leaf = false
        res.data.folderInfo.name = '项目文件'
        this.defaultExpandedKeys = [res.data.folderInfo.id]
        // 根目录
        return resolve([res.data.folderInfo])
      })
    },
    // 获取文件夹子目录
    getFilesByFolderId (folderId, resolve) {
      api.getFilesByFolderId(folderId).then(res => {
        // 文件数组
        res.data.fileInfoList.forEach(item => {
          item.leaf = true
        })
        // 文件夹数组
        res.data.folderInfoList.forEach(item => {
          item.leaf = false
        })
        resolve([...res.data.fileInfoList, ...res.data.folderInfoList])
      })
    },
    origin (originName, type) {
      let arr = type.split(',')
      let res = arr.map(item => getPostfix(originName).startsWith('.' + item))
      return res.includes(true)
    },
    // 下载文件
    fileDown () {
      var checkArr = this.$refs.tree.getCheckedKeys()
      if (checkArr.length === 0) return this.$message({ showClose: true, type: 'warning', message: '请选择文件' })
      api.downloadFile(checkArr).then(res => {
        let arr = res.data.join(',').split(',')
        let norepeatArr = [...new Set(arr)]
        norepeatArr.forEach(item => window.open(item))
      })
    },
    getCheckedNodes () {},
    // 查看文件
    viewSee (data) {
      window.open('/filePreview/' + data.id)
      // this.previewTitle = data.originalName
      // this.previewDialogVisible = true
      // api.previewFile(data.id).then(res => {
      //   // this.previewUrl = res.data
      // })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.file-info {
  margin: 10px 18px 20px 19px;
  background-color: #fff;
  overflow: hidden;
  .file-top {
    height: 40px;
    background: #e7eaee;
    .file-down {
      width: 100px;
      height: 30px;
      line-height: 30px;
      background: #44cf96;
      text-align: center;
      cursor: pointer;
      img {
        width: 14px;
        height: 12px;
        margin-right: 2px;
      }
      span {
        font-size: 14px;
        color: #fff;
      }
    }
  }
  .tree-title {
    height: 30px;
    line-height: 30px;
    color: #666666;
    background-color: #fafafb;
    display: flex;
    font-size: 12px;
    > span {
      &:nth-child(1) {
        flex: 1;
        padding-left: 45px;
      }
      &:nth-child(2) {
        flex: 0 0 180px;
      }
      &:nth-child(3) {
        flex: 0 0 170px;
      }
    }
  }
  .filetree {
    height: calc(100vh - 190px);
    overflow-x: hidden;
    font-size: 12px;
  }
  .custom-tree-node {
    font-size: 12px;
    color: #666666;
    font-weight: 400;
    flex: 1;
    display: flex;
    align-items: center;
    > span {
      &:nth-child(1) {
        flex: 1;
      }
      &:nth-child(2) {
        flex: 0 0 120px;
        > a {
          display: inline-block;
          width: 16px;
          height: 15px;
          margin-right: 44px;
          &.up {
            background: url(~@/assets/img/up_ico.png) no-repeat center;
          }
          &.add {
            background: url(~@/assets/img/addbag_ioc.png) no-repeat center;
          }
          &.del {
            background: url(~@/assets/img/delete_ico.png) no-repeat center;
          }
          &.bin {
            background: url(~@/assets/img/bin_del.png) no-repeat center;
          }
          &.view {
            background: url(~@/assets/img/view_ico.png) no-repeat center;
          }
        }
      }
      &:nth-child(3) {
        flex: 0 0 180px;
      }
      &:nth-child(4) {
        flex: 0 0 170px;
      }
    }
    .file-name {
      padding-left: 25px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &.nofile {
        background: url(~@/assets/img/nofile.png) no-repeat left center;
      }
      &.hasfile {
        background: url(~@/assets/img/hasfile.png) no-repeat left center;
      }
      &.file {
        background: url(~@/assets/img/file.png) no-repeat left center;
      }
      &.bin {
        background: url(~@/assets/img/bin.png) no-repeat left center;
      }
      &.ysb {
        background: url(~@/assets/img/ysb.png) no-repeat left center;
      }
      &.pdf {
        background: url(~@/assets/img/pdf.png) no-repeat left center;
      }
      &.png {
        background: url(~@/assets/img/pic.png) no-repeat left center;
      }
      &.docx {
        background: url(~@/assets/img/word.png) no-repeat left center;
      }
      &.xlsx {
        background: url(~@/assets/img/excel.png) no-repeat left center;
      }
      &.ppt {
        background: url(~@/assets/img/ppt.png) no-repeat left center;
      }
      &.GBQ5 {
        background: url(~@/assets/img/GBQ5.png) no-repeat left center;
      }
      &.GBQ4 {
        background: url(~@/assets/img/GBQ4.png) no-repeat left center;
      }
      &.GBQ3 {
        background: url(~@/assets/img/GBQ3.png) no-repeat left center;
      }
      &.GGJ {
        background: url(~@/assets/img/GGJ.png) no-repeat left center;
      }
      &.GCL {
        background: url(~@/assets/img/GCL.png) no-repeat left center;
      }
      &.GTJ {
        background: url(~@/assets/img/GTJ.png) no-repeat left center;
      }
      &.GQI {
        background: url(~@/assets/img/GQI.png) no-repeat left center;
      }
      &.dwg {
        background: url(~@/assets/img/dwg.png) no-repeat left center;
      }
    }
  }
}
</style>
<style scoped>
.file-info >>> .el-tree-node:focus > .el-tree-node__content {
  background-color: #ecf4ff;
}
.file-info >>> .el-tree-node__content:hover {
  background-color: #ecf4ff;
}
</style>
