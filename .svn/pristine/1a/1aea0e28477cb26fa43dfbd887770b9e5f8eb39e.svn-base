<!-- 匹配单项工程 -->
<template>
  <div class="match-page">
    <div class="match-content">
      <div class="already-matched">
        <p class="table-top already-table">
          <span>已匹配到单项工程</span>
          <button @click="newProAndMatch('already')">+新建单项工程</button>
        </p>
        <el-table :data="matchTableData" ref="matchTable" style="width: 100%" :max-height="maxHeight" :row-key="getRowOne" border default-expand-all :tree-props="{children: 'msList', hasChildren: 'hasChildren'}">
          <el-table-column prop="date" label="" width="">
            <template slot-scope="scope">
              <i class="el-icon-arrow-right expands" v-if="scope.row.msList&&scope.row.msList.length==0"></i>
              <img src="@/assets/img/file-icon.png" alt="" class="file-icons" v-if="scope.row.fileName">
              <span class="file-name-style" :class="{'father-style':scope.row.msList,'child-style':scope.row.type,}">{{scope.row.type?scope.row.pmoName:scope.row.fileName}}</span>
              <div class="type-box">
                <span v-for="(item,index) in scope.row.type" :key="index" class="type-btn" :class="{'cost-color': item=='造价', 'install-color': item=='安装','steel-color': item=='钢筋','civil-color': item=='土建'  }">{{item}}</span>
              </div>
              <div class="operation-col">
                <el-tooltip class="item" effect="dark" content="编辑" placement="bottom" v-if="scope.row.fileName">
                  <img src="@/assets/img/edit-icon.png" alt="" @click="editSinglePro(scope.row)">
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="bottom" v-if="scope.row.fileName">
                  <img src="@/assets/img/delete-icon.png" alt="" @click="delSinglePro(scope.row)">
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="查看其它文件匹配关系" placement="bottom" v-if="scope.row.fileName">
                  <img src="@/assets/img/ellipsis-icon.png" alt="" @click="viewMatching(scope.row)">
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="取消匹配" placement="bottom" v-if="scope.row.type">
                  <img src="@/assets/img/close-icon.png" alt="" @click="cancelMatching(scope.row)">
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="to-be-matched">
        <p class="table-top">待匹配文件</p>
        <el-table :data="tableData" style="width: 100%" :max-height="maxHeight" :row-key="getRow" border default-expand-all :tree-props="{children: 'msList', hasChildren: 'hasChildren'}">
          <el-table-column prop="address" label="待匹配文件" show-overflow-tooltip>
            <template slot-scope="scope">
              <i class="el-icon-arrow-right expands" v-if="scope.row.msList&&scope.row.msList.length==0"></i>
              <img class="type-icon" src="@/assets/img/GBQ5.png" alt="" v-if="getFileType(scope.row.fileName)=='GBQ5'">
              <img class="type-icon" src="@/assets/img/GGJ.png" alt="" v-if="getFileType(scope.row.fileName)=='GGJ'">
              <img class="type-icon" src="@/assets/img/GCL.png" alt="" v-if="getFileType(scope.row.fileName)=='GCL'">
              <img class="type-icon" src="@/assets/img/GTJ.png" alt="" v-if="getFileType(scope.row.fileName)=='GTJ'">
              <span :class="['file-name',scope.row.isChild?'child-name':'father-name']">{{scope.row.isChild?scope.row.pmoName:scope.row.fileName}}</span>
              <span v-if="!scope.row.isChild&&scope.row.unMatched" class="right-btn" @click="cancelMatch(scope.row,scope.$index)">取消匹配</span>
              <span v-if="scope.row.isChild&&matchTableData.length==0" class="right-btn" @click="newProAndMatch('toBe',scope.row,scope.$index)">新建单项工程并匹配</span>
              <img src="@/assets/img/matchingIcon.png" alt="" v-if="scope.row.isChild&&matchTableData.length>0" class="right-btn imgs" @click="matchfile(scope.row,scope.$index)">
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="clear:both"></div>
      <p class="tips">
        <span>i</span>
        请选择最终版成果文件，否则可能导致指标重复计算
      </p>
    </div>
    <div class="next-btn">
      <button class="previous" @click="previousStep">上一步</button>
      <button class="cancel" @click="preservation">保存</button>
      <button class="next" @click="nextPage">下一步</button>
    </div>

    <el-dialog :title="NewOrEdit" :visible.sync="NewlyNuildDia" width="400px" class="new-name-box" :close-on-click-modal='false' @closed='newNameLock = true'>
      <p class="reminder">请输入单项工程名称</p>
      <el-input v-model="newSingleProject" placeholder=""></el-input>
      <span slot="footer" class="dialog-footer">
        <p class="error-prompt">{{errorTips}}</p>
        <el-button @click="NewlyNuildDia = false">取消</el-button>
        <el-button type="primary" @click="confirmProName">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="其它文件匹配列表" :visible.sync="dialogfileList" width="400px" class="file-match-table" :close-on-click-modal='false'>
      <div class="list-table">
        <p class="single-pro" v-if="singlePro">单项工程名称：{{singlePro}}</p>
        <el-table max-height="390px" :data="fileMatchList">
          <el-table-column property="" label="" width="">
            <template slot-scope="scope">
              <span class="file-name-style">{{scope.$index+1}}.{{scope.row.pmoName}}</span>
              <div class="type-box">
                <span v-for="(item,index) in scope.row.type" :key="index" class="type-btn" :class="{'cost-color': item=='造价', 'install-color': item=='安装','steel-color': item=='钢筋','civil-color': item=='土建'  }">{{item}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog title="" :visible.sync="dialogMatchChange" class="match-dialog" width="450px" :close-on-click-modal='false' @closed='addLock = true'>
      <el-input v-model="searchMactchFiles" size="mini" placeholder="输入关键字搜索" />
      <el-table ref="includesTable" :data="matchTableData.filter(data => data.fileName.includes(searchMactchFiles))" highlight-current-row @current-change="handleCurrentChange" style="width: 100%" max-height="300px">
        <el-table-column align="center" label="单项工程列表">
          <template slot-scope="scope">
            <p>{{scope.row.fileName}}</p>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMatchChange = false">取消</el-button>
        <el-button type="primary" @click="sureMatch">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/fetch/api'
import { match } from 'minimatch'
export default {
  data() {
    return {
      projectId: this.$route.params.projectId, //项目id
      stageId: this.$route.params.stageId, //编制阶段id
      // folderId: (() => this.$route.params.folderId)(), //文件夹id
      NewlyNuildDia: false, //新建和编辑单项工程弹框
      newSingleProject: '', //新建和编辑单项工程名称
      NewOrEdit: '', //新建还是编辑
      tableData: [],
      matchTableData: [],
      errorTips: '', //新建单项工程错误提示
      fileMatchList: [],
      dialogfileList: false,
      singlePro: '', //其它文件匹配列表单项工程名称
      dialogMatchChange: false, //选择匹配文件框
      searchMactchFiles: '', //搜索匹配文件
      alreadyRow: {}, //点击已匹配的行
      toBeMatchRow: {}, //点击未匹配的行
      newProType: '', //新建的类型 是已匹配文件新建 还是未匹配文件新建 tobe：是未匹配文件新建，
      maxHeight: null,
      oldMonomerList: [],
      isLock: false, //点击保存变成true
      sendLock: true, //防止重复提交
      nameRepeat: false, //单体名称是否重复
      newNameLock: true, // 新建编辑单项工程名称防止重复提交
      addLock: true // 匹配单体防止重复提交
    }
  },
  components: {},
  computed: {},
  watch: {
    newSingleProject(val, oldVal) {
      if (val) {
        this.errorTips = ''
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (window.screen.width <= 1920 && window.screen.width > 1366) {
        this.maxHeight = 480
      }
      // 分辨率再在等于于1366的情况下
      else if (window.screen.width >= 1366 && window.screen.width < 1920) {
        this.maxHeight = 350
      }
      // 分辨率1600-1680的情况下
      else {
      }
    })

    this.$store.dispatch('nextStepFUN', 2)
    this.getMonomers().then(res => {
      this.getMatches() // 已匹配的单体
    }) // 未匹配的所有单体
  },

  methods: {
    getRowOne(row) {
      if (row.msList) {
        return row.pmid
      } else {
        return row.pmoid
      }
    },
    getRow(row) {
      if (row.msList) {
        return row.id + '.' + 0
      } else {
        return row.pmoid
      }
    },
    // 往未匹配表格添加数据
    tableDataMslistPush(index, val) {
      this.$set(this.tableData[index].msList, this.tableData[index].msList.length, {
        pmoName: val.pmoName,
        isChild: true,
        fatherIndex: val.tobeFatherIndex,
        pmoid: val.pmoid,
        pfId: val.pfId,
        type: val.type,
        fileType: val.fileType,
        id: val.id
      })
    },
    aboutData(val, OperationType, oldMonomerList) {
      let data = {
        monomerList: JSON.parse(JSON.stringify(val)),
        commonId: this.projectId,
        sid: this.stageId,
        oldMonomerList: oldMonomerList,
        fileIds: JSON.parse(this.$route.query.fid)
      }
      data.oldMonomerList.map(item => {
        item.monomerName = item.fileName
        if (item.msList) {
          item.pmsId = [...item.msList]
        }
        delete item.fileName
        delete item.msList
        delete item.id
      })
      data.monomerList.map(item => {
        item.monomerName = item.fileName
        if (item.msList) {
          item.pmsId = [...item.msList]
        }
        delete item.fileName
        delete item.msList
        delete item.id
        item.pmsId.map(its => {
          switch (its.type) {
            case ['造价', '安装']:
              msList.fileType = 1
              break
            case ['钢筋']:
              msList.fileType = 2
              break
            case ['土建']:
              msList.fileType = 3
              break
            case ['钢筋', '土建']:
              msList.fileType = 4
              break
            default:
              break
          }
          delete its.isChild
          delete its.fatherIndex
          delete its.id
          delete its.type
          delete its.tobeFatherIndex
        })
      })
      api
        .matchTmpMonomer(data)
        .then(res => {
          if (OperationType == 'match') {
            this.$alert('当前匹配关系保存成功。', '', {
              confirmButtonText: '确定',
              customClass: 'tips-dialog',
              center: true,
              callback: action => {}
            })
            this.isLock = true
          } else {
            this.$router.push({
              path: `/indexAnalysis/index/fillInInfo/${this.stageId}/${this.projectId}`,
              query: { fid: this.$route.query.fid }
            })
          }
        })
        .catch(res => {
          this.$alert(res.data.errorMsg, '', {
            confirmButtonText: '确定',
            customClass: 'tips-dialog',
            center: true,
            callback: action => {}
          })
        })
        .finally(() => {
          this.sendLock = true
        })
    },
    // 下一步 匹配临时保存功能
    matchTmpMonomer(val, OperationType) {
      if (!this.sendLock) return
      // isLock点击过保存
      this.sendLock = false
      let oldMonomerList
      if (this.isLock) {
        api
          .getMatches({ commonId: this.projectId, stageId: this.stageId, fileIds: JSON.parse(this.$route.query.fid) }) //选中文件集合})
          .then(res => {
            oldMonomerList = JSON.parse(JSON.stringify(res.data))
            this.aboutData(val, OperationType, oldMonomerList)
          })
      } else {
        oldMonomerList = this.oldMonomerList
        this.aboutData(val, OperationType, oldMonomerList)
      }
    },
    handleCurrentChange(val) {
      this.alreadyRow = val
    },
    //确定匹配的单项工程
    sureMatch() {
      if (!this.addLock) return
      this.addLock = false
      let arr = []
      let pushRow
      if (this.alreadyRow) {
        let findIndex = this.matchTableData.findIndex(data => data.fileName == this.alreadyRow.fileName)
        let fatherMsList = this.matchTableData[findIndex].msList
        let toBeMatchRowIndex = this.tableData[this.toBeMatchRow.fatherIndex].msList.findIndex(
          data => data.pmoid == this.toBeMatchRow.pmoid
        )
        pushRow = {
          id:
            fatherMsList.length > 0
              ? this.alreadyRow.id + '.' + (fatherMsList[fatherMsList.length - 1].id.split('.')[1] + 1)
              : this.alreadyRow.id + '.' + 1,
          pmoid: this.toBeMatchRow.pmoid,
          pfId: this.toBeMatchRow.pfId,
          pmoName: this.toBeMatchRow.pmoName,
          isChild: true,
          fatherIndex: this.alreadyRow.id - 1,
          type: this.toBeMatchRow.type,
          fileType: this.toBeMatchRow.fileType,
          tobeFatherIndex: this.toBeMatchRow.fatherIndex
        }
        if (this.alreadyRow.msList.length > 0) {
          this.alreadyRow.msList.map((item, i) => {
            arr.push(item.fileType)
          })
          let sameIndex
          // 造价安装累加 其他覆盖
          if (this.changeFileType == 1) {
            sameIndex == -1
          } else {
            sameIndex = arr.findIndex(data => data == this.changeFileType)
          }
          let coverageType
          if (sameIndex >= 0) {
            switch (arr[sameIndex]) {
              case 1:
                coverageType = '造价&安装'
                break
              case 2:
                coverageType = '钢筋'
                break
              case 3:
                coverageType = '土建'
                break
              case 4:
                coverageType = '钢筋&土建'
                break
              default:
                break
            }
            this.$confirm('此单项工程已有' + coverageType + '指标，' + '是否覆盖？', '', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              customClass: 'tips-dialog',
              center: true
            })
              .then(() => {
                let row = fatherMsList[sameIndex]
                let dcoverIndex = fatherMsList[sameIndex].tobeFatherIndex
                if (fatherMsList[sameIndex].tobeFatherIndex || fatherMsList[sameIndex].tobeFatherIndex == 0) {
                  this.tableDataMslistPush(row.tobeFatherIndex, row)
                }
                this.$set(fatherMsList, sameIndex, pushRow)
                this.tableData[this.toBeMatchRow.fatherIndex].msList.splice(toBeMatchRowIndex, 1)
                this.tableData[this.toBeMatchRow.fatherIndex].unMatched = true
                let arrs = []
                if (dcoverIndex || dcoverIndex == 0) {
                  for (let i = 0; i < this.matchTableData.length; i++) {
                    const element = this.matchTableData[i]
                    arrs = arrs.concat(element.msList.filter(data => data.tobeFatherIndex == dcoverIndex))
                  }
                  if (arrs.length == 0) {
                    this.tableData[dcoverIndex].unMatched = false
                  }
                }
                this.$message({
                  type: 'success',
                  message: '覆盖成功!'
                })
              })
              .catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消匹配'
                })
              })
          } else {
            this.$set(fatherMsList, fatherMsList.length, pushRow)
            this.tableData[this.toBeMatchRow.fatherIndex].msList.splice(toBeMatchRowIndex, 1)
            this.tableData[this.toBeMatchRow.fatherIndex].unMatched = true
          }
        } else {
          let spliceIndex = this.tableData[this.toBeMatchRow.fatherIndex].msList.indexOf(this.toBeMatchRow)
          this.tableData[this.toBeMatchRow.fatherIndex].msList.splice(spliceIndex, 1)
          this.tableData[this.toBeMatchRow.fatherIndex].unMatched = true
          this.$set(fatherMsList, 0, pushRow)
        }
        this.dialogMatchChange = false
      }
    },
    // 未匹配的所有单体
    getMonomers() {
      return new Promise((resolve, relect) => {
        let data = {
          fileIds: JSON.parse(this.$route.query.fid),
          commonId: this.projectId,
          stageId: this.stageId
        }
        api
          .getMonomers(data)
          .then(res => {
            let getData = res.data
            for (let index = 0; index < getData.length; index++) {
              const element = getData[index]
              element.id = index + 1
              element.unMatched = false
              if (element.msList.length > 0) {
                for (let i = 0; i < element.msList.length; i++) {
                  const msList = element.msList[i]
                  msList.id = index + 1 + '.' + (i + 1)
                  msList.unMatched = false
                  msList.isChild = true
                  msList.fatherIndex = index
                  switch (element.fileType) {
                    case 1:
                      msList.type = ['造价', '安装']
                      break
                    case 2:
                      msList.type = ['钢筋']
                      break
                    case 3:
                      msList.type = ['土建']
                      break
                    case 4:
                      msList.type = ['钢筋', '土建']
                      break
                    default:
                      break
                  }
                }
              } else {
                element.msList = []
              }
              this.getFileType(getData[0].fileName)
              this.tableData.push(element)
            }
            let arr = this.tableData.map(data => data.fileId)
            resolve(getData)
          })
          .catch(res => {})
      })
    },
    // 已匹配记录
    getMatches(pfids) {
      let data = {
        commonId: this.projectId,
        stageId: this.stageId,
        fileIds: JSON.parse(this.$route.query.fid) //选中文件集合
      }
      api
        .getMatches(data)
        .then(res => {
          let getData = res.data
          this.oldMonomerList = JSON.parse(JSON.stringify(res.data))
          for (let index = 0; index < getData.length; index++) {
            const element = getData[index]
            element.id = index + 1
            if (element.msList.length > 0) {
              for (let i = 0; i < element.msList.length; i++) {
                const msList = element.msList[i]
                msList.id = index + 1 + '.' + (i + 1)
                msList.isChild = true
                msList.fatherIndex = index
                let matchIndex
                if (msList.pfId || msList.pfId == 0) {
                  matchIndex = this.tableData.findIndex(data => data.fileId == msList.pfId)
                  if (matchIndex >= 0) {
                    msList.tobeFatherIndex = matchIndex
                    this.tableData[matchIndex].unMatched = true
                  }
                }
                switch (msList.fileType) {
                  case 1:
                    msList.type = ['造价', '安装']
                    break
                  case 2:
                    msList.type = ['钢筋']
                    break
                  case 3:
                    msList.type = ['土建']
                    break
                  case 4:
                    msList.type = ['钢筋', '土建']
                    break
                  default:
                    break
                }
              }
            } else {
              element.msList = []
            }
            this.matchTableData.push(element)
          }
        })
        .catch(res => {})
    },
    // 获取文件后缀
    getFileType(val) {
      if (val) {
        if (val.indexOf('GBQ5') > -1) return 'GBQ5'
        if (val.indexOf('GBQ4') > -1) return 'GBQ4'
        if (val.indexOf('GBQ3') > -1) return 'GBQ3'
        if (val.indexOf('GGJ') > -1) return 'GGJ'
        if (val.indexOf('GCL') > -1) return 'GCL'
        if (val.indexOf('GTJ') > -1) return 'GTJ'
      }
    },
    // 新建单项工程并匹配
    newProAndMatch(val, row, index) {
      this.newProType = val //新建单项工程的类型
      this.errorTips = ''
      this.newSingleProject = ''
      this.NewOrEdit = '新建'
      this.NewlyNuildDia = true
      if (val == 'toBe') {
        this.toBeMatchRow = row
      }
    },
    // 匹配
    matchfile(row, index) {
      this.changeFileType = row.fileType
      this.toBeMatchRow = row
      this.searchMactchFiles = ''
      this.dialogMatchChange = true
      if (this.$refs.includesTable) {
        this.$refs.includesTable.setCurrentRow()
      }
    },

    // 确定单项工程名称
    async confirmProName() {
      if (!this.newNameLock) return
      this.newNameLock = false
      let data = {
        name: this.newSingleProject,
        param: 2,
        pid: this.projectId,
        sid: this.stageId
      }
      let { data: nameRepeat } = await api.monomerNameIsRepeat(data)
      if (this.newSingleProject) {
        if (
          (this.matchTableData.findIndex(data => data.fileName == this.newSingleProject) == -1 ||
            this.newSingleProject == this.alreadyRow.fileName) &&
          !nameRepeat
        ) {
          this.NewlyNuildDia = false
          if (this.NewOrEdit == '新建') {
            this.tableData.map(item => {
              item.msList.map(items => {
                items.unMatched = true
              })
            })
            if (this.newProType == 'toBe') {
              this.matchTableData.push({
                id: this.matchTableData.length + 1,
                fileName: this.newSingleProject.toString(),
                msList: [
                  {
                    id: this.matchTableData.length + 1 + '.' + 1,
                    pmoid: this.toBeMatchRow.pmoid,
                    pfId: this.toBeMatchRow.pfId,
                    pmoName: this.toBeMatchRow.pmoName,
                    isChild: true,
                    fatherIndex: this.matchTableData.length == 0 ? 0 : this.matchTableData.length - 1,
                    type: this.toBeMatchRow.type,
                    fileType: this.toBeMatchRow.fileType,
                    tobeFatherIndex: this.toBeMatchRow.fatherIndex
                  }
                ],
                pmid: ''
              })
              this.tableData[this.toBeMatchRow.fatherIndex].unMatched = true
              this.tableData[this.toBeMatchRow.fatherIndex].msList.splice(this.toBeMatchRow.id.split('.')[1] - 1, 1)
            } else {
              this.matchTableData.push({
                id: this.matchTableData.length + 1,
                fileName: this.newSingleProject,
                msList: []
              })
            }
          } else if (this.NewOrEdit == '编辑') {
            let modiyIndex = this.matchTableData.findIndex(data => data.fileName == this.alreadyRow.fileName)
            this.matchTableData[modiyIndex].fileName = this.newSingleProject.toString()
          }
        } else {
          this.errorTips = '单项工程名称已存在'
        }
      } else {
        this.errorTips = '请输入单项工程名称'
      }
    },
    // 取消匹配
    cancelMatch(row, index) {
      this.$confirm('是否取消此文件已有单项工程匹配关系？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'tips-dialog',
        center: true
      })
        .then(() => {
          let indexs = this.tableData.findIndex(item => item.id == row.id)
          this.matchTableData.map((item, index) => {
            item.msList.map((is, ins) => {
              if (is.tobeFatherIndex == indexs) {
                this.tableDataMslistPush(indexs, is)
                this.tableData[indexs].unMatched = false
                this.matchTableData[index].msList.splice(ins, 1)
              }
            })
          })
          this.$message({
            type: 'success',
            message: '取消成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已终止取消'
          })
        })
    },
    // 编辑单项工程
    editSinglePro(row) {
      this.NewOrEdit = '编辑'
      this.NewlyNuildDia = true
      this.alreadyRow = row
      this.newSingleProject = row.fileName
    },
    // 删除单项工程
    delSinglePro(row) {
      this.alreadyRow = row
      let delIndex = this.matchTableData.findIndex(data => data.fileName == this.alreadyRow.fileName)
      if (row.msList.length > 0) {
        this.$confirm('操作会将已分析过指标数据一并删除，是否确定删除此单项工程？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'tips-dialog',
          center: true
        })
          .then(() => {
            this.matchTableData.splice(delIndex, 1)
            row.msList.map((item, index) => {
              if (item.tobeFatherIndex || item.tobeFatherIndex == 0) {
                this.tableDataMslistPush(item.tobeFatherIndex, item)
                let surplus = []
                for (let i = 0; i < this.matchTableData.length; i++) {
                  const element = this.matchTableData[i]
                  surplus = surplus.concat(
                    element.msList.filter(data => data.tobeFatherIndex == this.tableData[item.tobeFatherIndex].id - 1)
                  )
                }
                if (surplus.length > 0) {
                  this.tableData[item.tobeFatherIndex].unMatched = true
                } else {
                  this.tableData[item.tobeFatherIndex].unMatched = false
                }
              }
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else {
        this.$confirm('是否删除当前单项工程信息？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'tips-dialog',
          center: true
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.matchTableData.splice(delIndex, 1)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    // 查看匹配关系
    viewMatching(row) {
      this.dialogfileList = true
      this.singlePro = row.pmoName
      let data = {
        folderId: this.stageId,
        pfids: this.tableData.map(data => data.fileId),
        commonId: this.projectId,
        pmid: row.pmid
      }
      api
        .otherFileMatchList(data)
        .then(res => {
          this.fileMatchList = res.data
          this.fileMatchList.map(item => {
            switch (item.fileType) {
              case 1:
                item.type = ['造价', '安装']
                break
              case 2:
                item.type = ['钢筋']
                break
              case 3:
                item.type = ['土建']
                break
              case 4:
                item.type = ['钢筋', '土建']
                break
              default:
                break
            }
          })
        })
        .catch(res => {})
    },
    // 取消匹配关系
    cancelMatching(row) {
      let spliceIndex = this.matchTableData[row.fatherIndex].msList.indexOf(row)
      this.matchTableData[row.fatherIndex].msList.splice(spliceIndex, 1)
      if (row.tobeFatherIndex || row.tobeFatherIndex == 0) {
        this.tableDataMslistPush(row.tobeFatherIndex, row)
      }
      let arr = []
      for (let i = 0; i < this.matchTableData.length; i++) {
        const element = this.matchTableData[i]
        arr = arr.concat(element.msList.filter(data => data.tobeFatherIndex == row.tobeFatherIndex))
      }
      if (arr.length == 0 && (row.tobeFatherIndex || row.tobeFatherIndex == 0)) {
        this.tableData[row.tobeFatherIndex].unMatched = false
      } else if (arr.length != 0 && (row.tobeFatherIndex || row.tobeFatherIndex == 0)) {
        this.tableData[row.tobeFatherIndex].unMatched = true
      }
    },
    previousStep() {
      this.$router.go(-1)
    },
    preservation() {
      this.matchTmpMonomer(this.matchTableData, 'match')
    },
    nextPage() {
      this.matchTmpMonomer(this.matchTableData, 'nextGo')
    }
  }
}
</script>
<style lang='less' scoped>
.match-page {
  // padding-top: 44px;
  box-sizing: border-box;
  .match-content {
    padding: 0 80px;
    .expands {
      float: left;
      width: 12px;
      line-height: 12px;
      height: 12px;
      text-align: center;
      margin: 8px 7px 8px 0;
      cursor: pointer;
      color: #666;
      font-size: 12px;
    }
    .table-top {
      position: absolute;
      top: 0;
      left: -1px;
      line-height: 30px;
      height: 30px;
      width: 323px;
      z-index: 2;
      background: #ffffff;
      font-size: 12px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      border-left: none;
      border-right: none;
    }
    .already-matched {
      width: 510px;
      // height: 480px;
      float: left;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(224, 227, 235, 1);
      box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.15);
      position: relative;
      .already-table {
        width: 509px;
        left: 0;
        background: #fafafb;
        span {
          margin-left: 13px;
        }
        button {
          height: 30px;
          line-height: 30px;
          color: #69789e;
          background: #fafafb;
          float: right;
          cursor: pointer;
          margin-right: 33px;
        }
      }
      /deep/.el-table {
        .el-table__body-wrapper {
          border-top: 1px solid rgba(224, 227, 235, 1);
          width: 100% !important;
          .el-table__body {
            width: 100% !important;
          }
        }
        .file-icons {
          float: left;
          // margin-top: 7px;
          // margin-right: 11px;
          margin: 7px 11px 0 0;
        }
        .file-name-style {
          display: inline-block;
          font-size: 12px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
        .father-style {
          width: 325px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .child-style {
          width: 105px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-right: 140px;
        }
        .operation-col {
          float: right;
          margin-right: 10px;
          img {
            cursor: pointer;
            margin-right: 14px;
          }
          img:last-child {
            margin-right: 0;
          }
        }

        /deep/.el-table__placeholder {
          width: 30px;
        }
      }
      /deep/.el-table__empty-block {
        min-height: 40px;
        line-height: 40px;
        .el-table__empty-text {
          height: 40px;
          line-height: 40px;
        }
      }
    }
    .to-be-matched {
      width: 319px;
      // height: 480px;
      float: right;
      position: relative;
      background: #f2f2f2;
      border: 1px solid rgba(224, 227, 235, 1);
      border-top: none;
      /deep/.el-table {
        background-color: #f2f2f2;
        border: none;
        .cell {
          vertical-align: middle;
          .type-icon {
            float: left;
            margin-top: 7px;
          }
        }
        .el-table__body-wrapper {
          border-top: 1px solid rgba(224, 227, 235, 1);
          width: 100% !important;
          .el-table__body {
            width: 100% !important;
          }
        }
        tr {
          background-color: #f2f2f2;
        }

        .el-table__body tr:hover > td {
          background-color: #f2f2f2 !important;
        }

        .el-table__body tr.current-row > td {
          background-color: #f2f2f2 !important;
        }
      }

      .file-name {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        margin-left: 5px;
      }
      .child-name {
        width: 123px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .father-name {
        width: 190px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .right-btn {
        float: right;
        color: #a9b6d0;
      }
      .imgs {
        margin-top: 7px;
      }
      .right-btn:hover {
        color: #4474cf;
        cursor: pointer;
      }
    }
    .tips {
      span {
        width: 12px;
        height: 12px;
        line-height: 12px;
        display: inline-block;
        border: 1px solid #dd4444;
        border-radius: 50%;
        text-align: center;
      }
      margin: 12px 0px 31px 12px;
      height: 15px;
      line-height: 15px;
      font-size: 10px;
      font-weight: 400;
      color: rgba(221, 68, 68, 1);
    }
  }
  .new-name-box {
    .reminder {
      height: 13px;
      line-height: 13px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-bottom: 17px;
    }
    /deep/.el-dialog__header {
      color: #333;
      height: 18px;
      line-height: 18px;
      font-size: 18px;
      font-weight: 400;
      padding: 20px 0 20px 20px;
      .el-dialog__title {
        line-height: 18px;
      }
    }
    /deep/.el-dialog__body {
      padding: 0 20px;
    }
    /deep/.el-dialog__footer {
      padding: 20px 20px 40px 20px;
      position: relative;
      .error-prompt {
        position: absolute;
        color: red;
        font-size: 12px;
        top: 0;
      }
      .el-button {
        padding: 0;
        border-radius: 2px;
        width: 60px;
        height: 32px;
        line-height: 32px;
      }
    }
  }
  .type-box {
    display: inline-block;
    .type-btn {
      float: left;
      width: 34px;
      height: 18px;
      line-height: 18px;
      font-size: 12px;
      font-weight: 400;
      border-radius: 1px;
      text-align: center;
      margin: 5px 10px 5px 0;
    }
    .cost-color {
      border: 1px solid rgba(237, 71, 49, 1);
      color: rgba(237, 71, 49, 1);
    }
    .install-color {
      border: 1px solid rgba(254, 163, 19, 1);
      color: rgba(255, 156, 0, 1);
    }
    .steel-color {
      border: 1px solid rgba(56, 126, 197, 1);
      color: rgba(56, 126, 197, 1);
    }
    .civil-color {
      border: 1px solid rgba(100, 183, 132, 1);
      color: rgba(100, 183, 132, 1);
    }
  }
  .file-match-table {
    /deep/.el-dialog {
      border-radius: 5px;
    }
    .list-table {
      position: relative;
      .single-pro {
        position: absolute;
        top: 0;
        height: 15px;
        line-height: 15px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        z-index: 2;
        margin-left: 20px;
      }
    }
    /deep/.el-dialog__header {
      padding: 20px;
    }
    /deep/.el-dialog__body {
      padding: 0;
      padding-bottom: 70px;
      .file-name-style {
        float: left;
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        width: 231px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .type-box {
        float: right;
        width: 92px;
        text-align: left;
      }
      /deep/.el-table {
        td {
          border: none;
        }
        .cell {
          padding: 0 21px;
        }
        th.is-leaf {
          border-bottom: none;
        }
      }
      /deep/.el-table--border::after,
      .el-table--group::after,
      .el-table::before {
        background: none;
      }
    }
  }
  /deep/.el-table {
    td,
    th {
      padding: 0 !important;
    }
    th {
      background-color: #fff;
      color: #999999;
      font-size: 12px;
      font-weight: 400;
      .cell {
        padding: 0;
      }
    }
    .cell {
      line-height: 30px !important;
      height: 30px !important;
    }
  }
  // 滚动条的宽度
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 5px; // 横向滚动条
    height: 5px; // 纵向滚动条 必写
  }
  // 滚动条的滑块
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #c2c3c5;
    border-radius: 3px;
  }
  /deep/ .el-table [class*='el-table__row--level'] .el-table__expand-icon {
    float: left;
    width: 12px;
    line-height: 12px;
    height: 12px;
    text-align: center;
    margin: 8px 7px 8px 0;
  }
  /deep/.el-table__placeholder {
    display: inline-block;
    width: 20px;
  }
  .match-dialog {
    /deep/.el-dialog__header {
      display: none;
    }
    /deep/.el-table {
      border: 1px solid #dcdfe6;
    }
  }
}
@media screen and (max-width: 1920px) {
  .to-be-matched,
  .already-matched {
    height: 480px;
  }
  .match-page {
    padding-top: 44px;
  }
}
@media screen and (max-width: 1366px) {
  .to-be-matched,
  .already-matched {
    height: 350px;
  }
  .match-page {
    padding-top: 20px;
  }
}
</style>
<style>
.tips-dialog {
  width: 300px;
  padding-bottom: 25px !important;
}
.tips-dialog .el-message-box__header {
  display: none;
}
.tips-dialog .el-message-box__content {
  padding: 25px 15px 20px 15px;
}
</style>
