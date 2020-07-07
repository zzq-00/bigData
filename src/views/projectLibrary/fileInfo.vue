<template>
  <div class="file-info">
    <!-- <div class="file-top clearfix">
      <div class="fl" @click="fileDown" v-has="['VTc6AR']">
        <img src="@/assets/img/load_ico.png" alt="">
        <span>下载文件</span>
      </div>
      <div class="fl" @click="fileShare" v-has="['y9e4OS']">
        <img src="@/assets/img/share.png" alt="">
        <span>分享文件</span>
      </div>
    </div> -->
    <div class="tree-title">
      <span>文件名称</span>
      <span>操作</span>
      <span>大小</span>
      <span>修改日期</span>
    </div>
    <el-tree ref="fileTree" node-key="key" lazy :props="defaultProps" :load="loadNode" :default-expanded-keys="defaultExpandedKeys" class="filetree">
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <span :class="['name-column', computedClass(data)]">
          <span class="text">{{ data.originalName || data.name }} <em v-if="data.childCount>=0">（{{data.childCount}}）</em> </span>
        </span>
        <span class="operate-column" v-show="data.parentId !== -1">
          <!-- <a href="javascript:;" class="operate-icon down" title="下载文件" v-if="data.originalName" @click.stop="downloadFile(data.id)"></a> -->
          <a href="javascript:;" class="operate-icon view" title="预览文件" v-if="data.originalName&&supportPreviewFile(data.originalName)" @click.stop="preview(data)"></a>
          <a href="javascript:;" class="operate-icon analyzed" title="查看解析结果" v-if="data.originalName&&data.analytical==2" @click.stop="analyzed(data)"></a>
        </span>
        <span class="size-column">{{(data.size/Math.pow(1024,2)).toFixed(2)}}M</span>
        <span class="time-column">{{data.updateAt}}</span>
      </div>
    </el-tree>
  </div>
</template>
<script>
import api from '@/fetch/api'
import { getPostfix } from '@/assets/js/Utils'

export default {
  data() {
    return {
      defaultExpandedKeys: [],
      defaultProps: {
        isLeaf: 'leaf'
      },
      rootId: '', // 我的项目文件ID
      supportPreviewSuffix: ['.PDF', '.DOCX', '.DOC', '.XLSX', '.XLS', '.DWG', '.PNG', '.TIFF', '.GPEG', '.JPG', '.JPEG', '.GIF']
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) return this.getEnterpriseDefaultFolders(resolve)
      this.getEnterpriseFilesByFolderId(node.data.id, resolve)
    },
    // 初始化 为一个目录下 所有文件夹
    getEnterpriseDefaultFolders(resolve) {
      api.getEnterpriseDefaultFolders(this.$route.params.projectId).then(res => {
        if (!res.data.length) return
        // 为了重命名加的一个标识
        let rootFolder = res.data[0]
        rootFolder.reEditBool = false
        // leaf为true，则表示当前节点为叶子节点，没有子节点。根据size是否为0判断不准确
        rootFolder.leaf = false
        // node-key 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
        // 文件夹id和文件id有可能相同，当文件id和初始文件夹id相同时，tree有bug，所以给node-key加一个唯一标识
        rootFolder.key = rootFolder.id + 'folder'
        // 默认展开的节点的 key 的数组
        this.defaultExpandedKeys = [rootFolder.key]
        // 根目录
        // this.rootId = rootFolder.id
        return resolve([rootFolder])
      })
    },
    // 获取文件夹子目录
    getEnterpriseFilesByFolderId(folderId, resolve) {
      if (!folderId) return false
      api.getEnterpriseFilesByFolderId(folderId).then(res => {
        // 文件数组
        res.data.fileInfoList.forEach(item => {
          item.reEditBool = false
          item.leaf = true
          // 文件夹id和文件id有可能相同，当文件id和初始文件夹id相同时，tree有bug，所以给node-key加一个唯一标识
          item.key = item.id + 'file'
        })
        // 文件夹数组
        res.data.folderInfoList.forEach(item => {
          item.reEditBool = false
          item.leaf = false
          // 文件夹id和文件id有可能相同，当文件id和初始文件夹id相同时，tree有bug，所以给node-key加一个唯一标识
          item.key = item.id + 'folder'
        })
        resolve([...res.data.fileInfoList, ...res.data.folderInfoList])
      })
    },
    // 计算class，显示不同的图标
    computedClass(data) {
      if (data.originalName) {
        let suffix = getPostfix(data.originalName).toUpperCase()
        if (['.ZIP'].includes(suffix)) return 'ysb'
        if (['.PDF'].includes(suffix)) return 'pdf'
        if (['.PNG', '.JPG', '.JPEG'].includes(suffix)) return 'pic'
        if (['.DOCX', '.DOC'].includes(suffix)) return 'docx'
        if (['.XLSX', '.XLS'].includes(suffix)) return 'xlsx'
        if (['.PPT'].includes(suffix)) return 'ppt'
        if (['.GBQ5'].includes(suffix)) return 'GBQ5'
        if (['.GBQ4'].includes(suffix)) return 'GBQ4'
        if (['.GBQ3'].includes(suffix)) return 'GBQ3'
        if (suffix.startsWith('.GGJ')) return 'GGJ'
        if (suffix.startsWith('.GCL')) return 'GCL'
        if (suffix.startsWith('.GTL')) return 'GTL'
        if (suffix.startsWith('.GQI')) return 'GQI'
        if (['.DWG'].includes(suffix)) return 'dwg'
        return 'file'
      }
      if (data.size) return 'hasfile'
      if (!data.size) return 'nofile'
    },
    // 是否支持预览
    supportPreviewFile(name) {
      let suffix = getPostfix(name).toUpperCase()
      return this.supportPreviewSuffix.includes(suffix)
    },
    // 文件预览
    preview(data) {
      window.open('/filePreview/' + data.id)
    },
    // 跳转到指标数据
    analyzed(row) {
      row.suffixName = row.suffixName.toUpperCase()
      // 指标目录
      api.entSidebar(row.projectId).then(res => {
        this.directoryList = res.data
        this.directoryList.forEach(item => {
          if (!item.indicatorName) return
          item.indicatorName.forEach(items => {
            if (items.indicatorName == '造价指标' && row.suffixName.startsWith('.GBQ')) {
              let obj = items.projectIndex.find(it => it.projectIndexNmae === '项目指标')
              obj && this.$router.push(`/projectLibrary/detail/newIndexData/proIndex/${row.projectId}/${obj.stageId}`)
            } else {
              this.$router.push(
                `/projectLibrary/detail/newIndexData/operandIndex/${row.projectId}/${this.directoryList[0].indicatorName[0].monomerMessage[0].buildingId}`
              )
            }
          })
        })
      })
    },
    // 下载文件
    fileDown() {
      var CheckedKeys = this.$refs.fileTree.getCheckedKeys(),
        checkArr = []
      CheckedKeys.forEach(item => {
        let end = item.indexOf('file')
        if (end !== -1) checkArr.push(item.slice(0, end))
      })
      if (checkArr.length === 0) return this.$message({ showClose: true, type: 'warning', message: '请选择具体文件' })
      this.downloadFile(checkArr)
    },
    downloadFile(downloadIds) {
      if (!Array.isArray(downloadIds)) downloadIds = [downloadIds]
      api.downloadFile(downloadIds).then(res => {
        // 二维转一维
        let arr = res.data.join(',').split(',')
        let norepeatArr = [...new Set(arr)]
        norepeatArr.forEach(item => window.open(item))
      })
    },
    fileShare() {
      /* js调用本地邮箱发送邮件 */
      var who = prompt('请输入收件人邮箱: ', 'sample@sample.net')
      var what = prompt('输入主题: ', '主题')
      var body = prompt('输入内容: ', '')
      if (confirm('你确定要向' + who + '发送主题为 ' + what + '的邮件么?') == true) {
        parent.location.href = `mailto:${who}?subject=${what}&body=${body}`
      }
    }
  }
}
</script>
<style lang="less" scoped>
.file-info {
  margin: 10px 18px 20px 19px;
  background-color: #fff;
  overflow: hidden;
  .file-top {
    height: 40px;
    background: #e7eaee;
    > div {
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      &:first-child {
        background: #44cf96;
        margin-right: 10px;
      }
      // &:last-child {
      //   background: #4474cf;
      // }
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
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    color: #666666;
    background-color: #fafafb;
    display: flex;
    > span {
      &:nth-child(1) {
        flex: 1;
        padding-left: 45px;
      }
      &:nth-child(2) {
        flex: 0 0 250px;
      }
      &:nth-child(3) {
        flex: 0 0 150px;
      }
      &:nth-child(4) {
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
    height: 100%;
    color: #666666;
    font-weight: 400;
    flex: 1;
    display: flex;
    align-items: center;
    .operate-column {
      flex: 0 0 250px;
      .operate-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 44px;
        &.down {
          background: url(~@/assets/img/down_ico.png) no-repeat center;
        }
        &.view {
          background: url(~@/assets/img/view_ico.png) no-repeat center;
        }
        &.analyzed {
          background: url(~@/assets/img/analyzed_ico.png) no-repeat center;
        }
      }
    }
    .size-column {
      flex: 0 0 150px;
    }
    .time-column {
      flex: 0 0 170px;
    }
    .name-column {
      flex: 1;
      padding-left: 25px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-right: 25px;
      &.nofile {
        background: url(~@/assets/img/nofile.png) no-repeat left center;
      }
      &.hasfile {
        background: url(~@/assets/img/hasfile.png) no-repeat left center;
      }
      &.file {
        background: url(~@/assets/img/file.png) no-repeat left center;
      }
      &.ysb {
        background: url(~@/assets/img/ysb.png) no-repeat left center;
      }
      &.pdf {
        background: url(~@/assets/img/pdf.png) no-repeat left center;
      }
      &.pic {
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
.file-info {
  /deep/ .el-tree-node__content:hover {
    background-color: #ecf4ff;
  }
  /deep/ .el-tree-node__content {
    height: 39px;
    border-bottom: 1px dashed #eff2f9;
  }
}
</style>
