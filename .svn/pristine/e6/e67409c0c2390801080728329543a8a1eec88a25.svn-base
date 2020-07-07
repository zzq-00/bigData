<template>
  <div class="file-info">
    <div class="file-top clearfix">
      <div class="fl" @click="fileDown" v-has="['VTc6AR']">
        <img src="@/assets/img/load_ico.png" alt="">
        <span>下载文件</span>
      </div>
      <!-- <div class="fl" @click="fileShare" v-has="['y9e4OS']">
        <img src="@/assets/img/share.png" alt="">
        <span>分享文件</span>
      </div> -->
    </div>
    <div class="tree-title">
      <span>文件名称</span>
      <span>操作</span>
      <span>大小</span>
      <span>修改日期</span>
    </div>
    <el-tree ref="fileTree" node-key="key" show-checkbox lazy :props="defaultProps" :load="loadNode" :default-expanded-keys="defaultExpandedKeys" :expand-on-click-node="false" class="filetree">
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <span :class="['name-column', computedClass(data)]">
          <input type="text" v-if="data.reEditBool" v-focus class="input-css" v-model="inputName" @blur="inputBlur(node, data)" @keyup.enter="(e) => e.target.blur()">
          <span class="text" v-else>{{ data.originalName || data.name }} <em v-if="data.childCount>=0">（{{data.childCount}}）</em> </span>
        </span>
        <span class="operate-column" v-show="data.parentId !== -1">
          <!-- 只在上传时显示 -->
          <span v-if="data.hasOwnProperty('percentage')" class="upload-progress" :style="{backgroundImage: `linear-gradient(to right, #4474cf 0%, #4474cf ${data.percentage}%, #E1E6E9 ${data.percentage}%, #E1E6E9 100%)`}">
            {{data.percentage}}%
            <i class="close" title="取消上传" @click="data.cancel('取消本次文件上传')" v-show="data.percentage < 100"></i>
          </span>
          <template v-else>
            <a href="javascript:;" class="operate-icon up" title="上传文件" v-if="!data.originalName" @click.stop="upFile(node,data)"></a>
            <a href="javascript:;" class="operate-icon down" title="下载文件" v-if="data.originalName" @click.stop="downloadFile(data.id)"></a>
            <a href="javascript:;" class="operate-icon add" title="新建文件夹" v-if="!data.originalName&&node.expanded" @click.stop="appendNodes(node, data)"></a>
            <a href="javascript:;" class="operate-icon view" title="预览文件" v-if="data.originalName&&supportPreviewFile(data.originalName)" @click.stop="preview(data)"></a>
            <a href="javascript:;" class="operate-icon analysis" title="分析指标" v-if="data.originalName&&data.analytical!=0&&data.analytical!=2" @click.stop="analysis(data)"></a>
            <a href="javascript:;" class="operate-icon analyzed" title="查看解析结果" v-if="data.originalName&&data.analytical==2" @click.stop="analyzed(data)"></a>
            <el-dropdown placement="bottom-start" @command="handleCommand" v-if="data.originalName || data.canDel">
              <a href="javascript:;" class="operate-icon more"></a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="data.originalName || data.canDel" :command="{order: 'moveFileOrFolder',node,data}">移动到</el-dropdown-item>
                <el-dropdown-item :command="{order: 'renameFileOrFolder',node,data}">重命名</el-dropdown-item>
                <el-dropdown-item :command="{order: 'delFileOrFolder',node,data}">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </span>
        <span class="size-column">{{(data.size/Math.pow(1024,2)).toFixed(2)}}M</span>
        <span class="time-column">{{data.updateAt}}</span>
      </div>
    </el-tree>
    <input ref="file-button" type="file" multiple style="display: none;" @change="changeFile">

    <el-dialog title="移动到" :visible.sync="dialogVisibleToMove" width="550px">
      <el-tree v-if="dialogVisibleToMove" node-key="id" highlight-current lazy @node-click="setTargetNode" :props="defaultProps" :load="loadNodeTomove" :default-expanded-keys="defaultExpandedKeysToMove" :expand-on-click-node="false">
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <span :class="['name-column', computedClass(data)]">
            <span class="text">{{ data.originalName || data.name }}</span>
          </span>
        </div>
      </el-tree>
      <span slot="footer">
        <el-button @click="dialogVisibleToMove = false">取 消</el-button>
        <el-button type="primary" @click="confirmToMove">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/fetch/api'
import { CancelToken } from 'axios'
import { getPostfix } from '@/assets/js/Utils'

export default {
  data() {
    return {
      dialogVisibleToMove: false,
      sourceToMoveData: {},
      targetFolderId: '',
      defaultExpandedKeysToMove: [], // 要移动文件（夹）所属的编制阶段
      defaultExpandedKeys: [],
      inputName: '',
      defaultProps: {
        isLeaf: 'leaf'
      },
      DragNodeParent: {},
      tempFile: {}, // 上传时样式的临时文件
      dataToOperate: {},
      supportPreviewSuffix: ['.PDF', '.DOCX', '.DOC', '.XLSX', '.XLS', '.DWG', '.PNG', '.TIFF', '.GPEG', '.JPG', '.JPEG', '.GIF'],
      accessid: '',
      host: '',
      policyBase64: '',
      signature: '',
      callbackbody: '',
      key: '',
      expire: 0,
      now: Date.parse(new Date()) / 1000,
      timestamp: Date.parse(new Date()) / 1000,
      currentFileName: '',
      originalFileName: ''
    }
  },
  watch: {
    dialogVisibleToMove: function(val) {
      if (val === false) {
        this.sourceToMoveData = {}
        this.targetFolderId = ''
        this.defaultExpandedKeysToMove = []
      }
    }
  },
  methods: {
    send_request() {
      var xmlhttp = null
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
      } else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
      }

      if (xmlhttp != null) {
        // serverUrl是 用户获取 '签名和Policy' 等信息的应用服务器的URL，请将下面的IP和Port配置为您自己的真实信息。
        // var serverUrl = 'http://data.tzecc.com/api/ali/getPolice'
        var serverUrl =
          process.env.VUE_APP_API + 'ali/getPolice/' + encodeURIComponent(this.originalFileName + '/' + this.dataToOperate.id)
        xmlhttp.open('GET', serverUrl, false)
        xmlhttp.send(null)
        return xmlhttp.responseText
      } else {
        alert('Your browser does not support XMLHTTP.')
      }
    },
    get_signature() {
      // 可以判断当前expire是否超过了当前时间， 如果超过了当前时间， 就重新取一下，3s 作为缓冲。
      this.now = Date.parse(new Date()) / 1000
      this.timestamp = Date.parse(new Date()) / 1000
      var body = this.send_request()
      var obj = eval('(' + body + ')')
      this.host = obj['host']
      this.policyBase64 = obj['policy']
      this.accessid = obj['accessid']
      this.signature = obj['signature']
      this.expire = parseInt(obj['expire'])
      this.callbackbody = obj['callback']
      this.key = obj['dir'] + this.currentFileName
      return obj
    },
    get_pre(filename) {
      var pos = filename.lastIndexOf('.')
      var name = ''
      if (pos != -1) {
        name = filename.substring(0, pos)
      }
      return name
    },
    random_string(len) {
      len = len || 32
      var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      var maxPos = chars.length
      var pwd = ''
      for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    loadNode(node, resolve) {
      if (node.level === 0) return this.getDefaultFolders(resolve)
      this.getFilesByFolderId(node.data.id, resolve)
    },
    // 初始化 为一个目录下 所有文件夹
    getDefaultFolders(resolve) {
      api.getDefaultFolders(this.$route.params.projectId).then(res => {
        if (this.defaultExpandedKeysToMove.length) {
          // 加载可移动编制阶段的文件夹
          let compilationStage = res.data.filter(item => item.id === this.defaultExpandedKeysToMove[0])
          resolve(compilationStage)
        } else {
          let rootFolder = res.data[0]
          // 为了重命名加的一个标识
          rootFolder.reEditBool = false
          // leaf为true，则表示当前节点为叶子节点，没有子节点。根据size是否为0判断不准确
          rootFolder.leaf = false
          // node-key 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
          // 文件夹id和文件id有可能相同，当文件id和初始文件夹id相同时，tree有bug，所以给node-key加一个唯一标识
          rootFolder.key = rootFolder.id + 'folder'
          // 默认展开的节点的 key 的数组
          this.defaultExpandedKeys = [rootFolder.key]
          resolve([rootFolder])
        }
      })
    },
    // 获取文件夹子目录
    getFilesByFolderId(folderId, resolve) {
      if (!folderId) return false
      api.getFilesByFolderId(folderId).then(res => {
        if (this.defaultExpandedKeysToMove.length) {
          // 加载可移动编制阶段的文件夹
          let folderCanMove = res.data.folderInfoList
          if (this.sourceToMoveData.hasOwnProperty('childCount')) {
            // 当移动的是文件夹时，去掉文件树上的该文件夹自身
            folderCanMove = res.data.folderInfoList.filter(item => item.id !== this.sourceToMoveData.id)
          }
          resolve(folderCanMove)
        } else {
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
          resolve([...res.data.folderInfoList, ...res.data.fileInfoList])
        }
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
    inputBlur(node, data) {
      if (!this.inputName) return this.$refs.fileTree.remove(data)
      // 添加文件夹
      if (data.id === '') {
        data.folderName = this.inputName
        this.inputName = ''
        api.addFolder(data).then(res => {
          res.data.key = res.data.id + 'folder'
          res.data.reEditBool = false
          res.data.leaf = false
          // 重新把有key的文件夹添加一遍，不然有问题
          this.$refs.fileTree.append(Object.assign({}, data, res.data), node.parent)
          this.$refs.fileTree.remove(data)
        })
      } else {
        // 修改文件（夹）名
        if (data.hasOwnProperty('childCount')) {
          // 修改文件夹
          api
            .renameFolder({ id: data.id, name: this.inputName })
            .then(res => {
              this.$message({ showClose: true, type: 'success', message: '修改文件夹名成功' })
              data.name = this.inputName
            })
            .finally(() => (data.reEditBool = false))
        } else if (data.hasOwnProperty('originalName')) {
          // 修改文件名
          api
            .renameFile({ id: data.id, name: this.inputName })
            .then(res => {
              this.$message({ showClose: true, type: 'success', message: '修改文件名成功' })
              data.originalName = this.inputName
            })
            .finally(() => (data.reEditBool = false))
        }
      }
    },
    // 添加文件夹 data为当前点击节点的数据
    appendNodes(node, data) {
      // 判断当前页是否展开 node.expand(deep, animation, callback) 【展开方法（深遍历，动画，回调函数）】
      // if (!node.expanded) node.expand(false, true)
      let tempData = {
        key: 'temp' + Date.now(),
        id: '',
        name: '',
        childCount: 0,
        size: 0,
        parentId: data.id,
        projectId: data.projectId,
        reEditBool: true,
        leaf: false
      }
      this.$refs.fileTree.append(tempData, data)
    },
    handleCommand({ order, node, data }) {
      this[order](node, data)
    },
    // 移动
    moveFileOrFolder(node, data) {
      this.sourceToMoveData = data
      // 找到当前要移动文件（夹）所属的编制阶段
      this.defaultExpandedKeysToMove = [this.findCompilationStage(node).id]
      this.dialogVisibleToMove = true
    },
    // 找到当前要移动文件（夹）所属的编制阶段
    findCompilationStage(node) {
      let parent = node.parent
      if (parent.level === 2) return parent.data
      return this.findCompilationStage(parent)
    },
    // 重命名
    renameFileOrFolder(node, data) {
      this.inputName = data.originalName || data.name
      data.reEditBool = true
    },
    // 删除
    delFileOrFolder(node, data) {
      if (data.hasOwnProperty('childCount')) {
        if (!data.canDel) return this.$message({ showClose: true, type: 'warning', message: '该文件夹不可删除' })
        // 删除文件夹
        this.$confirm('将删除该文件夹及其包含的文件', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            api.delFolder(data.id).then(res => {
              this.$refs.fileTree.remove(data)
              this.$message({ showClose: true, type: 'success', message: '删除成功' })
            })
          })
          .catch(() => {})
      } else if (data.hasOwnProperty('originalName')) {
        // 删除文件
        let text =
          data.analytical === 2 || data.analytical === 3
            ? '删除文件同时会删除文件解析指标数据，是否确定删除'
            : '是否确定删除此文件'
        this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            api.delFile(data.id).then(res => {
              node.parent.data.childCount -= 1
              this.$refs.fileTree.remove(data)
              this.$message({ showClose: true, type: 'success', message: '删除成功' })
            })
          })
          .catch(() => {})
      }
    },
    upFile(node, data) {
      if (!node.expanded) node.expand(false, true)
      this.$refs['file-button'].click()
      this.dataToOperate = data
    },
    changeFile(event) {
      let files = event.target.files || event.dataTransfer.files
      if (!files.length) return
      for (let index = 0; index < files.length; index++) {
        this.uploadToServer(files[index])
      }
      this.$refs['file-button'].value = ''
    },
    // 上传到服务器
    async uploadToServer(file) {
      if (this.tempFile[file.name]) return this.$message({ showClose: true, type: 'error', message: '不能上传同名文件' })
      // 上传未完成时的临时文件，假数据
      this.$set(this.tempFile, file.name, {
        key: 'temp' + Date.now(),
        name: file.name,
        originalName: file.name,
        size: file.size,
        leaf: true,
        cancel: '',
        percentage: 0
      })
      let config = {
        // 一个执行器函数接收一个取消函数作为参数
        cancelToken: new CancelToken(c => (this.tempFile[file.name].cancel = c)),
        // 上传进度
        onUploadProgress: progressEvent => {
          if (progressEvent.lengthComputable) {
            this.tempFile[file.name].percentage = ((progressEvent.loaded / progressEvent.total) * 100) | 0
          }
        }
      }
      this.$refs.fileTree.append(this.tempFile[file.name], this.dataToOperate)
      let filesData = new FormData(),
        currentData = null
      try {
        // 测试传到机房，正式传到阿里oss
        if (process.env.VUE_APP_MODE == 'production') {
          this.originalFileName = file.name
          var suffix = getPostfix(this.originalFileName)
          this.currentFileName = this.get_pre(this.originalFileName) + '-' + this.random_string(10) + suffix

          var tmp = this.get_signature()
          if (tmp.errorCode) {
            this.$message({ showClose: true, type: 'error', message: tmp.errorMsg })
          } else {
            filesData.append('signature', this.signature)
            filesData.append('success_action_status', '200')
            filesData.append('name', this.currentFileName)
            filesData.append('key', this.key)
            filesData.append('policy', this.policyBase64)
            filesData.append('OSSAccessKeyId', this.accessid)
            filesData.append('file', file)
            api
              .uploadToAliFile(this.host, filesData, config)
              .then(res1 => {
                console.log('send 2 ali', res1)
              })
              .catch(async error => {
                if (error.status == 200) {
                  let { data: fileId } = await api.uploadFileToAli({ folderId: this.dataToOperate.id }, config)
                  let { data } = await this.getFileById(fileId)
                  data.key = data.id + 'file'
                  currentData = data
                }
              })
          }
        } else {
          filesData.append('folderId', this.dataToOperate.id)
          filesData.append('projectFile', file)
          let { data: fileId } = await api.uploadFile4Test(filesData, config)
          let { data } = await this.getFileById(fileId)
          data.key = data.id + 'file'
          currentData = data
        }
        this.$message({ showClose: true, type: 'success', message: '上传成功' })
        this.$refs.fileTree.remove(this.tempFile[file.name])
        delete this.tempFile[file.name]
        currentData.reEditBool = false
        currentData.leaf = true
        this.dataToOperate.childCount += 1
        this.$refs.fileTree.append(currentData, this.dataToOperate)
      } catch (error) {
        console.log(error)
        this.$refs.fileTree.remove(this.tempFile[file.name])
        delete this.tempFile[file.name]
      }
    },
    // 获取文件详情
    getFileById(ID) {
      return api.getFileById(ID)
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
    // 跳转到分析指标
    analysis(data) {
      // analytical -1.不可分析*文件汇总出错  0.不可分析*文件不可分析  1.指标准备中  2.指标已分析  3.指标准备就绪/部分已分析  4.指标准备就绪
      window.open('/indexAnalysis/index/selectFile/' + data.projectId + '?fromFile=' + data.id)
    },
    // 跳转到指标数据
    analyzed(row) {
      row.suffixName = row.suffixName.toUpperCase()
      // 指标目录
      api.sidebarDirectory(row.projectId).then(res => {
        this.directoryList = res.data
        this.directoryList.forEach(item => {
          if (!item.indicatorName) return
          item.indicatorName.forEach(items => {
            if (items.indicatorName == '造价指标' && row.suffixName.startsWith('.GBQ')) {
              let obj = items.projectIndex.find(it => it.projectIndexNmae === '项目指标')
              obj && this.$router.push(`/projectManage/detail/newIndexData/proIndex/${row.projectId}/${obj.stageId}`)
            } else {
              this.$router.push(
                `/projectManage/detail/newIndexData/operandIndex/${row.projectId}/${this.directoryList[0].indicatorName[0].monomerMessage[0].buildingId}`
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
        if (end !== -1) checkArr.push(item.slice(0, end) * 1)
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
    loadNodeTomove(node, resolve) {
      if (node.level === 0) return this.getDefaultFolders(resolve)
      this.getFilesByFolderId(node.data.id, resolve)
    },
    // 设置移动目标文件夹
    setTargetNode(data, node) {
      this.targetFolderId = data.id
    },
    // 确定移动
    confirmToMove() {
      if (!this.targetFolderId) return this.$message.warning('请选择目标文件夹')
      api.moveFile({ sourceId: this.sourceToMoveData.id, targetId: this.targetFolderId }).then(res => {
        this.$message({ showClose: true, type: 'success', message: '移动成功' })
        if (this.sourceToMoveData.parentId) this.sourceToMoveData.parentId = this.targetFolderId
        if (this.sourceToMoveData.folderId) this.sourceToMoveData.folderId = this.targetFolderId
        let targetFolder = this.$refs.fileTree.getNode(this.targetFolderId + 'folder'),
          sourceToMove = this.$refs.fileTree.getNode(this.sourceToMoveData)
        // TODO
        if (this.sourceToMoveData.hasOwnProperty('originalName')) {
          // 还有问题，没办法，先这样弄上吧
          // 离开时的-1，拖拽进的+1（仅统计文件数量）
          if (targetFolder.level === sourceToMove.parent.level) {
            // 如果目标文件夹和当前离开文件夹同级
            targetFolder.data.childCount += 1
            sourceToMove.parent.data.childCount -= 1
          } else if (targetFolder.level < sourceToMove.parent.level) {
            // 如果目标文件夹，是当前离开文件夹的父，那么目标文件夹childCount不变，当前离开的文件夹childCount-1
            sourceToMove.parent.data.childCount -= 1
          } else if (targetFolder.level > sourceToMove.parent.level) {
            // 如果目标文件夹，是当前离开文件夹的子，那么当前离开的文件夹childCount不变，目标文件夹childCount+1
            targetFolder.data.childCount += 1
          }
        }
        this.$refs.fileTree.remove(this.sourceToMoveData)
        this.$refs.fileTree.append(this.sourceToMoveData, targetFolder)
        this.dialogVisibleToMove = false
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
        &.up {
          background: url(~@/assets/img/up_ico.png) no-repeat center;
        }
        &.down {
          background: url(~@/assets/img/down_ico.png) no-repeat center;
        }
        &.add {
          background: url(~@/assets/img/addbag_ioc.png) no-repeat center;
        }
        &.del {
          background: url(~@/assets/img/delete_ico.png) no-repeat center;
        }
        &.view {
          background: url(~@/assets/img/view_ico.png) no-repeat center;
        }
        &.analysis {
          background: url(~@/assets/img/analysis_ico.png) no-repeat center;
        }
        &.analyzed {
          background: url(~@/assets/img/analyzed_ico.png) no-repeat center;
        }
        &.more {
          background: url(~@/assets/img/more_ico.png) no-repeat center;
        }
      }
      .upload-progress {
        display: inline-block;
        width: 85%;
        height: 20px;
        line-height: 20px;
        color: #000;
        border-radius: 10px;
        text-align: center;
        position: relative;
        .close {
          &::before {
            content: '×';
          }
          font-size: 16px;
          position: absolute;
          right: 3px;
          top: -1px;
          width: 20px;
          height: 100%;
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
.input-css {
  height: 24px;
  // width: 80%;
}
.el-popper[x-placement^='bottom'] {
  margin-top: 0;
}
.el-dropdown-menu {
  padding: 3px 0;
}
.el-dropdown-menu__item {
  font-size: 12px;
  line-height: 30px;
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
