<template>
  <div class="analysis-page">
    <headerComponent />
    <breadcrumb :breadcrumbs="vm.breadcrumbs" />
    <div class="analysis-content">
      <stepBar v-bind:ctitle="vm.title" v-bind:cStepList="vm.stage" />
      <div class="content">
        <div class="left">
          <div class="top">
            <div class="prompt">请选择需要对比的单项工程</div>
            <el-tree :data="vm.data" show-checkbox default-expand-all node-key="index" ref="tree" :check-strictly="true" highlight-current :render-content="renderContent" @check-change="handleClick" :props="defaultProps">
            </el-tree>
          </div>
          <div class="bottom">
            <div class="l-left" @click="goBack">重选比对类型</div>
            <div v-if="this.lm.step!=4" class="l-right" @click="startCompare">开始比对</div>
            <div v-if="this.lm.step==4" class="l-right" @click="saveCompareReulst">保存比对结果</div>
          </div>
        </div>
        <div class="right">
          <el-tabs v-model="lm.dataType">
            <el-tab-pane label="综合单价检查" name="type1"></el-tab-pane>
            <el-tab-pane label="规费、税金检查" name="type2"></el-tab-pane>
          </el-tabs>
          <div v-if="lm.step==3" class="bottom blank">
            <img src="@/assets/img/compare/picr.png" />
            <span class="prompt">请先在左侧选择单项工程，并点击“开始比对”。</span>
          </div>
          <div v-if="lm.step==4" class="bottom1">
            <div class="mid">
              <span class="row btn1" v-if="!lm.tagMode[lm.dataType]" @click="tagChange(1)">标记正常项</span>
              <span class="row btn2" v-if="lm.tagMode[lm.dataType]" @click="tagChange(2)">退出标记</span>
              <span class="row btn3" v-if="lm.tagMode[lm.dataType]" @click="tagFinish">标记完成</span>
              <el-radio-group v-model="vm.radio[lm.dataType]" @change="changeData">
                <el-radio label="all">全部</el-radio>
                <el-radio label="except">异常项</el-radio>
              </el-radio-group>
              <span v-if="lm.dataType=='type1'&&lm.except['type1']" class="result">鉴定意见：清单综合单价不一致</span>
              <span v-if="lm.dataType=='type2'&&lm.except['type2']" class="result">鉴定意见：相同取费专业下费率不一致</span>
            </div>
            <div class="table1">
              <div class="0" v-show="lm.dataType=='type1'">
                <el-table ref="type1" :max-height="lm.maxHeight" @selection-change="handleSelectionChange" :data="vm.tableData1" v-loading="lm.loading" empty-text="无更多数据！" style="width: 100%;" row-key="id" :row-class-name="tableRowClassName" border lazy @expand-change="expandChange" :expand-row-keys="lm.expands['type1']" :load="load" :tree-props="{children: 'items', hasChildren: 'hasChildren'}">
                  <el-table-column v-if="lm.tagMode[lm.dataType]" type="selection" :selectable='selectable' width="55">
                  </el-table-column>
                  <el-table-column prop="type" label="清单编码" width="180">
                    <template slot-scope="scope">
                      <span>{{scope.row.type}}</span>
                      <a class="click-icon" href="javascript:;" v-if="scope.row.name&&scope.row.spec" @click="getDetail(scope.row,$event)"></a>
                    </template>
                  </el-table-column>

                  <el-table-column prop="name" label="项目名称" width="180">
                  </el-table-column>
                  <el-table-column prop="spec" width="500px" label="项目特征" show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column prop="unit" width="153px" label="单位">
                  </el-table-column>
                  <el-table-column prop="cost" width="159px" label="单价（元）">
                  </el-table-column>
                  <el-table-column prop="fileName" label="来源文件名称">
                  </el-table-column>
                </el-table>
                <div v-if="lm.showPriceDetail" class="list-coding">
                  <div class="titles">
                    <button @click="closeTable">X</button>
                    <button :class="lm.selectionCard==1?'choice-btn':''" @click="lm.selectionCard=1">清单构成</button>
                  </div>
                  <div class="content">
                    <div class="head-brief">
                      <div class="title">综合单价分析表</div>
                      <div class="wrapper">
                        <div>子目编码
                        </div>
                        <div>{{vm.detailBrief.code}}
                        </div>
                        <div>子目名称
                        </div>
                        <div>{{vm.detailBrief.name}}
                        </div>
                        <div>计量单位
                        </div>
                        <div>{{vm.detailBrief.unit}}
                        </div>
                        <div>工程量
                        </div>
                        <div>{{vm.detailBrief.amount}}
                        </div>
                      </div>
                    </div>
                    <el-table :data="vm.detailTable" style="width: 100%" :span-method="arraySpanMethod">
                      <el-table-column prop="date" label="清单综合单价组成明细" align="center">
                        <el-table-column prop="code" label="定额编号" width="" align="center">
                        </el-table-column>
                        <el-table-column prop="name" label="定额子目名称" width="">
                        </el-table-column>
                        <el-table-column prop="unit" label="定额单位" width="">
                        </el-table-column>
                        <el-table-column prop="amount" label="数量" width="">
                        </el-table-column>
                        <el-table-column prop="totalCost" label="合价" width="">
                        </el-table-column>
                        <el-table-column label="单价" align="center">
                          <el-table-column prop="labor" label="人工费" width="">
                          </el-table-column>
                          <el-table-column prop="material" label="材料费" width="">
                          </el-table-column>
                          <el-table-column prop="machinery" label="主材费" width="">
                          </el-table-column>
                          <el-table-column prop="mainMaterial" label="设备费" width="">
                          </el-table-column>
                          <el-table-column prop="device" label="机械费" width="">
                          </el-table-column>
                          <el-table-column prop="manageAndProfit" label="管理费和利润" width="">
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                    <el-table :data="vm.detailResouceTable" style="width: 100%">
                      <el-table-column prop="date" label="未计价材料明细" align="center">
                        <el-table-column prop="name" label="材料名称" width="" align="center">
                        </el-table-column>
                        <el-table-column prop="unit" label="单位" width="" align="center">
                        </el-table-column>
                        <el-table-column prop="amount" label="数量" width="" align="center">
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
              <div class="1" v-show="lm.dataType=='type2'">
                <el-table ref="type2" :max-height="lm.maxHeight1" @selection-change="handleSelectionChange1" :data="vm.tableData2" style="width: 100%;" :row-class-name="tableRowClassName" border empty-text="无更多数据！" row-key="id" @expand-change="expandChange" :expand-row-keys="lm.expands['type2']" :tree-props="{children: 'items', hasChildren: 'hasChildren'}">
                  <el-table-column v-if="lm.tagMode[lm.dataType]" type="selection" :selectable='selectable' width="55">
                  </el-table-column>
                  <el-table-column prop="name" label="费用名称/取费专业/单位工程名称" width="600">
                    <template slot-scope="scope">
                      <span>{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="rate" label="费率(%)" width="180">
                  </el-table-column>
                  <el-table-column prop="" label="来源文件名称">
                    <template slot-scope="scope">
                      <span>{{getFileNames(scope.row['files'])}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <monomerModular :monomerInfo='monomerInfo' :style="{top: renderData.pos.y - posSreen.y + 'px',left: renderData.pos.x +'px'}" v-show="renderData.show"></monomerModular>
  </div>
</template>
<script>
import api from '@/fetch/api'
import tool from '@/assets/js/useMoreTool'
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'
import stepBar from '@/components/stepBar'
import { getPostfix } from '@/assets/js/Utils'
import testJson from '@/assets/innerMonomerCompare.json'
import { tableFolding } from '@/assets/js/tableFolding'
import monomerModular from '@/components/monomerInfo'

export default {
  components: {
    headerComponent,
    breadcrumb,
    stepBar,
    monomerModular
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      vm: {
        data: [],
        radio: { type1: 'except', type2: 'except' },
        title: '数据比对',
        stage: ['选择阶段', '选择数据对比类型', '选择单项工程', '查看对比结果'],
        breadcrumbs: [{ name: '我的项目', path: '/projectManage' }, { name: '数据比对' }],
        checkResults: '清单综合单价不一致',
        tableData1: [],
        tableData2: [],
        detailBrief: {},
        detailTable: [],
        detailResouceTable: []
      },
      lm: {
        loading: true,
        i: 0,
        treeIndex: 1,
        monomerId: '-1',
        tagMode: { type1: false, type2: false },
        selectionCard: 1, //选项卡 清单构成 综合单价指标库清单数据 1是清单构成
        dataType: 'type1',
        step: 3,
        tagData: [], //综合单价标记数据
        tagData1: [], //规费税金标记数据
        tableData: {},
        respAllData: {},
        except: {}, //综合单价是否包含异常项
        showPriceDetail: false,
        maxHeight: window.innerHeight - 276,
        maxHeight1: window.innerHeight - 276,
        currentPriceDetail: 0,
        saved: false,
        hasCompared: false,
        checkedData: {},
        expands: { type1: [] }
      },
      tmpData: {},
      projectId: (() => this.$route.params.projectId)(),
      stageId: (() => this.$route.params.stageId)(),
      compareType: (() => this.$route.params.type)(),
      monomerInfo: {},
      renderData: {
        show: false,
        pos: {} // 弹出框位置
      },
      posSreen: {
        x: 245,
        y: 25
      }
    }
  },
  updated() {
    this.$nextTick(() => {
      if (this.lm.dataType == 'type1') {
        this.tablefold('comprehensive')
      } else {
        this.tablefold('compare123')
      }
    })
  },
  methods: {
    getFileNames(array) {
      if (array) {
        var result
        if (Array.isArray(array)) {
          array.forEach(data => {
            result = data + '\n'
          })
        } else {
          result = array
        }
        return result
      }
      return ''
    },
    expandChange(row, expanded) {
      var dataArray = this.lm.expands[this.lm.dataType]
      let fineIndex = dataArray.findIndex(data => data == row.id)
      // false 是收起 true是展开
      if (!expanded && fineIndex > -1) {
        dataArray.splice(fineIndex, 1)
      }
    },
    ...tableFolding(['tablefold']),
    // 关闭清单编码弹框
    closeTable() {
      this.lm.maxHeight = window.innerHeight - 276
      this.lm.showPriceDetail = false
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log('arraySpanMethod....')
      if (row.lastOne) {
        if (columnIndex === 0) {
          return [1, 4]
        } else if (columnIndex === 1) {
          return [0, 0]
        } else if (columnIndex === 2) {
          return [0, 0]
        } else if (columnIndex === 3) {
          return [0, 0]
        }
      }
    },
    load(tree, treeNode, resolve) {
      var data = this.lm.respAllData.综合单价.items[tree.type]
      resolve(data)
    },
    // 点击清单编码
    getDetail(row, val) {
      this.lm.maxHeight = window.innerHeight - 560
      this.lm.showPriceDetail = true
      val.path[0].classList.remove('click-icon')
      val.path[0].classList.add('click-iconVisited')
      api
        .compUnitPrice({ code: row.type, unitProjectId: row.unitProjectId })
        .then(res => {
          if (res.code == 200) {
            this.vm.detailBrief = res.data.item
            this.vm.detailResouceTable = res.data.resources
            var lastItem = {
              code: '清单子目综合单价',
              lastOne: true,
              totalCost: res.data.item.totalCost,
              labor: res.data.item.labor,
              material: res.data.item.material,
              machinery: res.data.item.machinery,
              mainMaterial: res.data.item.mainMaterial,
              device: res.data.item.device,
              manageAndProfit: res.data.item.manageAndProfit
            }
            res.data.norms.push(lastItem)
            this.vm.detailTable = res.data.norms
          }
        })
        .catch(err => {
          console.log(err)
          console.log('except compUnitPrice demo data')
          this.vm.detailBrief = this.tmpDetailData.data.item
          this.vm.detailResouceTable = this.tmpDetailData.data.resources
          var lastItem = {
            code: '清单子目综合单价',
            lastOne: true,
            totalCost: this.tmpDetailData.data.item.totalCost,
            labor: this.tmpDetailData.data.item.labor,
            material: this.tmpDetailData.data.item.material,
            machinery: this.tmpDetailData.data.item.machinery,
            mainMaterial: this.tmpDetailData.data.item.mainMaterial,
            device: this.tmpDetailData.data.item.device,
            manageAndProfit: this.tmpDetailData.data.item.manageAndProfit
          }
          this.tmpDetailData.data.norms.push(lastItem)
          this.vm.detailTable = this.tmpDetailData.data.norms
        })
      //   console.log(object)
    },
    changeData(value) {
      this.vm.radio[this.lm.dataType] = value
      if (value == 'all') {
        if (this.lm.dataType == 'type1') {
          this.vm.tableData1 = this.lm.tableData[this.lm.dataType]
        } else {
          this.vm.tableData2 = this.lm.tableData[this.lm.dataType]
        }
      } else {
        this.lm.showPriceDetail = false
        if (!this.lm.except[this.lm.dataType]) {
          if (this.lm.dataType == 'type1') {
            this.vm.tableData1 = []
          } else {
            this.vm.tableData2 = []
          }
        }
      }
    },
    goBack() {
        if(this.lm.saved){
            this.$router.back(-1)
        }else {
            this.$confirm('您尚未保存过该单项的比对结果，是否强制退出？', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.back(-1)
            })
        }

    },
    nextstep(current) {
      this.lm.step = current + 1
      this.$store.dispatch('nextStepFUN', this.lm.step)
    },
    resetRadioAndTab() {
      this.lm.dataType = 'type1'
      this.vm.radio['type1'] = 'except'
      this.vm.radio['type2'] = 'except'
    },
    startCompare() {
      if (this.lm.monomerId == -1) {
        this.$message({
          type: 'info',
          message: '未选择单项工程信息'
        })
      } else {
        this.lm.loading = true
        api
          .startCompare({ buildingId: this.lm.monomerId })
          .then(res => {
            this.lm.saved = false

            this.lm.hasCompared = true
            this.nextstep(3)
            if (res.code == 200) {
              // var data = testJson.data
              var data = res.data
              data.综合单价.groups.forEach(item => {
                item.hasChildren = true
              })
              this.lm.respAllData = data
              this.lm.tableData['type1'] = data.综合单价.groups
              this.lm.tableData['type2'] = data.规费税金
              let arr2 = []
              this.getExpendArray(data.规费税金, arr2)
              this.$nextTick(() => {
                this.lm.expands['type2'] = [...arr2]
              })
              //判断是否显示鉴定结果
              if (this.lm.tableData['type1'] && this.lm.tableData['type1'].length > 0) {
                if (this.chargeDataExcept(this.lm.tableData['type1'])) {
                  this.lm.except['type1'] = true
                  this.vm.tableData1 = this.lm.tableData['type1']
                } else {
                  this.vm.tableData1 = []
                  this.lm.except['type1'] = false
                }
              }
              if (this.lm.tableData['type2'] && this.lm.tableData['type2'].length > 0) {
                if (this.chargeDataExcept(this.lm.tableData['type2'])) {
                  this.lm.except['type2'] = true
                  this.vm.tableData2 = this.lm.tableData['type2']
                } else {
                  this.vm.tableData2 = []
                  this.lm.except['type2'] = false
                }
              }
            }
            this.lm.loading = false
          })
          .catch(err => {
            this.nextstep(2)
            this.lm.loading = false
            console.log('startCompare err  for ...' + err)
          })
      }
    },
    getExpendArray(data, resultArray) {
      data.forEach(item1 => {
        resultArray.push(String(item1.id))
        if (item1.items != undefined) {
          this.getExpendArray(item1.items, resultArray)
        }
      })
    },
    handleClick(data, checked, indeterminate) {
      if (this.lm.i == 0) {
        this.lm.checkedData = data
        this.lm.monomerId = data.basicId
      }
      this.lm.i++
      if (this.lm.i % 2 === 0) {
        if (checked && this.lm.hasCompared && data.basicId != this.lm.checkedData.basicId) {
          this.$confirm('您已选择了新的单项工程，是否重新进行比对？', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.lm.checkedData = data
              this.lm.monomerId = data.basicId
              this.$refs.tree.setCheckedNodes([])
              this.$refs.tree.setCheckedNodes([data])
              this.lm.respAllData = {}
              this.lm.tableData['type1'] = []
              this.lm.tableData['type2'] = []
              this.vm.tableData1 = []
              this.vm.tableData2 = []
              this.startCompare()
              this.resetRadioAndTab()
            })
            .catch(() => {
              this.$refs.tree.setCheckedNodes([])
              this.$refs.tree.setCheckedNodes([this.lm.checkedData])
            })
        } else {
          if (checked) {
            this.$refs.tree.setCheckedNodes([])
            this.$refs.tree.setCheckedNodes([data])
            this.lm.checkedData = data
            this.lm.monomerId = data.basicId
          } else {
            this.$refs.tree.setCheckedNodes([])
          }
        }
      }
    },
    renderContent(h, { node, data, store }) {
      if (node.level == 3) {
        return (
          <span class="custom-tree-node three-level">
            <span stype="">{node.label}</span>
            <i class="icon-info" onMouseover={e => this.maskNameEnter(e, data)} onMouseleave={e => this.maskNameLeave()} />
          </span>
        )
      } else {
        return (
          <span class="custom-tree-node four-level">
            <span>{node.label}</span>
          </span>
        )
      }
    },
    // 鼠标放上
    maskNameEnter($event, data) {
      let _this = this
      _this.renderData.show = true
      _this.renderData.pos = tool.getMousePos($event) // 弹出框位置
      _this.renderData.pos.x = tool.getMousePos($event).x + 20
      _this.renderData.pos.y = tool.getMousePos($event).y + 50
      _this.monomerInfo = data
    },
    // 鼠标离开
    maskNameLeave() {
      let _this = this
      _this.renderData.show = false
    },
    tagChange(type) {
      if (type == 1 && !this.lm.except['type1'] && !this.lm.except['type2']) {
        this.$message({
          type: 'info',
          message: '无异常项'
        })
      } else {
        this.lm.tagMode[this.lm.dataType] = type == 1
      }
    },
    tableRowClassName({ row }) {
      if (row.result != undefined && row.result != 0) {
        return 'warning-row'
      }
      if (row.subCR != undefined) {
        if (row.subCR == 0 && this.vm.radio[this.lm.dataType] == 'except') {
          return 'hidden'
        }
        if (row.subCR != 0) {
          return 'warning-row'
        }
      }
      if (row.result != undefined && row.result == 0 && this.vm.radio[this.lm.dataType] == 'except') {
        return 'hidden'
      }
    },
    selectable(row) {
      if (!row.result || row.result == 0) {
        return false
      } else {
        return true
      }
    },
    tagFinish() {
      let that = this
      var count
      if (this.lm.dataType == 'type1') {
        count = this.lm.tagData.length
      } else {
        count = this.lm.tagData1.length
      }
      if (count <= 0) {
        this.$message({
          type: 'info',
          message: '未选择异常项'
        })
      } else {
        this.$confirm('您已勾选' + count + '个异常项，是否确认将勾选的异常项标记为正常项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            if (this.lm.dataType == 'type1') {
              //综合单价标记完成
              that.vm.tableData1.forEach(datat => {
                if (datat.subCR != 0) {
                  datat.items = this.lm.respAllData.综合单价.items[datat.type]
                }
              })
              that.vm.tableData1.forEach(item => {
                that.tagFinishChangeData(item, that.lm.tagData)
              })
              that.vm.tableData1.forEach(datat => {
                datat.items = []
              })
              //判断是否还存在异常项
              if (!that.chargeDataExcept(that.vm.tableData1)) {
                that.lm.except['type1'] = false
                if (!that.lm.allData1) {
                  that.vm.tableData1 = []
                }
              } else {
                that.lm.except['type1'] = true
              }
            } else {
              //规费税金标记完成
              if (!that.lm.tagData1.length > 0) {
                that.tagFinishChangeData2(that.vm.tableData2, that.lm.tagData1)
              }
              //判断是否还存在异常项
              if (!that.chargeDataExcept(that.lm.tableData1)) {
                that.lm.except['type2'] = false
                if (!that.lm.allData2) {
                  that.vm.tableData2 = []
                }
              } else {
                that.lm.except['type2'] = true
              }
            }
            that.lm.tagMode[this.lm.dataType] = false
            that.$refs[this.lm.dataType].clearSelection()
          })
          .catch(err => {
            console.log('err' + err)
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      }
    },

    tagFinishChangeData(data, subData) {
      if ((data.subCR != undefined) & (data.subCR == 0)) {
        return 0
      }
      if (data.result != undefined && data.result == 0) {
        return 0
      }
      let that = this
      var i = 0
      subData.find((value, index, arr) => {
        if (value && data.id == value.id) {
          data['result'] = 0
          i++
        }
      })
      if (data.items) {
        data.items.forEach(dataSub => {
          data.subCR -= that.tagFinishChangeData(dataSub, subData)
        })
        if (data.subCR == 0) {
          i++
        }
      }
      return i
    },
    handleSelectionChange(val) {
      this.lm.tagData = val
    },
    handleSelectionChange1(val) {
      this.lm.tagData1 = val
    },
    chargeDataExcept(data) {
      //判断数据中是否存在异常项
      for (var a = 0; a < data.length; a++) {
        var v = data[a]
        if (v.result != undefined && v.result != 0) {
          return true
        } else if (v.items && v.items.length > 0) {
          if (this.chargeDataExcept(v.items)) {
            return true
          }
        }
        if (v.subCR != undefined && v.subCR != 0) {
          return true
        }
      }
      return false
    },
    addTreeIndex(data) {
      for (var a = 0; a < data.length; a++) {
        data[a].index = this.lm.treeIndex
        if (data[a].projectName) {
          data[a].label = data[a].projectName
        }
        if (data[a].name) {
          data[a].label = data[a].name
        }
        if (data[a].stageName) {
          data[a].label = data[a].stageName
        }
        this.lm.treeIndex++
        if (data[a].list && data[a].list.length > 0) {
          data[a].children = data[a].list
          data[a].disabled = true
          this.addTreeIndex(data[a].children)
        }
      }
    },
    saveCompareReulst() {
        let that=this
      var prompt = '是否保存当前比对结果？'
      if (this.lm.saved) {
        prompt = '您已保存过该单项的比对结果，是否覆盖比对记录？'
      }
      this.$confirm(prompt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var info = this.lm.respAllData.monomerInfo
          this.lm.respAllData.treeData = this.vm.data
          var content = JSON.stringify(this.lm.respAllData)
          var code = that.lm.except['type1'] ||  that.lm.except['type2'] ? 1 : 0
          api
            .saveCompareResults({ info: info, content: content, code: code })
            .then(res => {
              this.$alert('\n' + '当前比对结果已保存，您可在“我的项目”-“数据比对”点击“查看记录”查看。', '', {
                confirmButtonText: '确定'
              })
              this.lm.saved = true
            })
            .catch(err => {
              console.log('err', err)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    }
  },
  created() {
    var from = this.$route.query.from
    if (from && from == 'yg') {
      this.vm.stage = ['选择质监类型', '选择单项工程', '查看质监结果']
      this.vm.title = '数据质监'
      this.lm.step = 2
    }
    this.$store.dispatch('nextStepFUN', this.lm.step)
  },
  mounted() {
    if (this.projectId == -1 || this.stageId == -1) {
      this.$message({
        type: 'info',
        message: '任务出错'
      })
    } else {
      api
        .getCompareMonomers({ commonId: this.projectId, stageId: this.stageId, dataMatchType: 1 })
        .then(res => {
          var results = [res.data]
          this.addTreeIndex(results)
          this.vm.data = results
        })
        .catch(err => {
          console.log('err:' + err)
        })
    }
  }
}
</script>
<style lang="less" scoped>
.analysis-page {
  .analysis-content {
    height: calc(100vh - 151px);
    background-color: #fff;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
    .content {
      box-sizing: border-box;
      height: 100%;
      background-color: #e7eaee;
      padding: 11px 11px 20px 19px;
      .left {
        float: left;
        width: 240px;
        height: 100%;
        position: relative;
        .top {
          height: 100%;
          background-color: #fff;
          /deep/.el-tree {
            .custom-tree-node {
              height: 13px;
              line-height: 13px;
              > span {
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                height: 13px;
                line-height: 13px;
              }
            }
            .two-level {
              > span {
                width: 182px;
              }
            }
            .three-level {
              > span {
                width: 120px;
              }
            }
            .four-level {
              margin-left: 5px;
              > span {
                width: 156px;
              }
            }
            .icon-info {
              margin-left: 5px;
              width: 10px;
              height: 10px;
              background: url(~@/assets/img/infos.png);
              cursor: pointer;
              display: inline-block;
            }
            .icon-info:hover {
              margin-left: 5px;
              display: inline-block;
              width: 10px;
              height: 10px;
              background: url(~@/assets/img/hoverInfos.png);
              cursor: pointer;
            }
          }

          .prompt {
            border-bottom: 1px solid rgba(224, 227, 235, 1);
            padding-left: 12px;
            padding-top: 9px;
            padding-bottom: 8px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            background-color: #fafafb;
          }
        }
        .bottom {
          cursor: pointer;
          width: 100%;
          height: 36px;
          text-align: center;
          position: absolute;
          bottom: 0px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          .l-left {
            text-align: center;
            display: inline-block;
            width: 120px;
            height: 36px;
            line-height: 36px;
            background-color: #4574d0;
          }
          .l-right {
            text-align: center;
            display: inline-block;
            width: 120px;
            height: 36px;
            line-height: 36px;
            background-color: #13ce66;
          }
        }
      }
      .right {
        max-height: 893px;
        margin-left: 260px;
        height: 100%;
        position: relative;
        .bottom1 {
          .mid {
            margin-bottom: 20px;
            .row {
              padding: 6px 12px;
              margin-right: 14px;
              cursor: pointer;
              color: rgba(255, 255, 255, 1);
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
            }
            .btn1 {
              background: #44cf96;
            }
            .btn2 {
              background: #4474cf;
            }
            .btn3 {
              background: #44cf96;
            }
            .result {
              margin-left: 20px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: rgba(207, 66, 66, 1);
            }
          }
        }
        .bottom {
          position: absolute;
          top: 84px;
          bottom: 0;
          right: 0;
          left: 0;
        }
        .blank {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f5f6f8;
          flex-direction: column;
          .prompt {
            color: #bcbbcd;
            font-size: 18px;
            font-weight: 400;
            margin-top: 49px;
          }
        }
        .table1 {
          overflow: scroll;
        }
        .click-icon {
          display: inline-block;
          width: 12px;
          height: 14px;
          background: url(../../assets/img/list-n.png);
          margin: -2px 0 0 8px;
          vertical-align: middle;
          cursor: pointer;
          border: none;
        }
        .click-iconVisited {
          background: url(../../assets/img/listvisited.png);
          display: inline-block;
          width: 12px;
          height: 14px;
          margin: -2px 0 0 8px;
          vertical-align: middle;
        }
        /deep/.el-table {
          .warning-row {
            color: red;
          }
          .hidden {
            display: none;
          }
          .el-table__expand-icon--expanded {
            transform: rotate(00deg);
          }
          .el-table__expand-icon {
            font-size: 12px !important;
            i {
              height: 12px;
              line-height: 12px;
              text-align: center;
              width: 12px;
              font-size: 12px !important;
              border: 1px solid rgba(216, 224, 245, 1) !important;
              background: rgba(255, 255, 255, 1) !important;
              color: #4474cf;
            }
          }
        }
        .list-coding {
          .content {
            max-height: 254px;
            overflow: scroll;
            .head-brief {
              text-align: center;
              background-color: #f5f7fa;
              .title {
                padding: 10px;
              }
              .wrapper {
                div {
                  text-align: left;
                  box-sizing: border-box;
                  padding: 10px;
                  border-top: 1px solid #ebeef5;
                  border-left: 1px solid #ebeef5;
                  display: inline-block; /* 如需支持IE8以下版本，用浮动来做 */
                  width: calc(
                    100% / 8.09
                  ); /* 此处运用了一个css3的表达式，将div三等分，IE8及以上可以支持，当然也可以根据需要设置固定值 */
                  width: -webkit-calc(100% /8.09); /*3.09 排除margin的宽度*/
                  width: -moz-calc(100% /8.09);
                }
              }
            }
          }

          .titles {
            height: 30px;
            font-size: 12px;

            button {
              background: #e7eaee;
              cursor: pointer;
              height: 30px;
              line-height: 30px;
              color: #666666;
            }
            button:nth-child(1) {
              width: 30px;
              background: #a2acc0;
              color: #fff;
            }
            button:nth-child(2) {
              padding: 0 55px;
            }
            button:nth-child(3) {
              padding: 0 45px;
            }
            .choice-btn {
              background: #4474cf;
              border-radius: 8px 8px 0px 0px;
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
    }
  }
}
</style>
