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
            <el-tree :data="data" show-checkbox default-expand-all node-key="index" ref="tree" :check-strictly="true" highlight-current :render-content="renderContent" @check-change="handleClick" :props="defaultProps">
            </el-tree>
          </div>
          <div class="bottom">
            <div class="l-left" @click="goBack">重选比对类型</div>
            <div v-if="lm.step!=4" :class="['l-right',getNodeKey.length==0?'initial':'']" @click="startProCompare">开始比对</div>
            <div v-if="lm.step==4" class="l-right" @click="saveCompareReulst">保存比对结果</div>
          </div>
        </div>
        <div class="right">
          <el-tabs v-model="lm.dataType" @tab-click="changeTab">
            <el-tab-pane v-for="(item,index) in tabList" :key="index" :label="item.label" :name="item.name+''"></el-tab-pane>
          </el-tabs>
          <div v-if="lm.step==3" class="bottom blank">
            <img src="@/assets/img/compare/picr.png" />
            <span class="prompt">请先在左侧选择单项工程，并点击“开始比对”。</span>
          </div>
          <div v-if="lm.step==4" v-loading="lm.loading">
            <div class="mid">
              <!-- sign：1标记正常项、调整计算项； 2退出标记和标记完成；3退出调整和调整完成 -->
              <div class="btn-group">
                <span class="row btn1" v-if="!sign[lm.dataType]||sign[lm.dataType]==1" @click="tagChange(2)">标记正常项</span>
                <span class="row btn2" v-if="sign[lm.dataType]==2" @click="tagChange(1,'select')">退出标记</span>
                <span class="row btn3" v-if="sign[lm.dataType]==2" @click="tagFinish('signs')">标记完成</span>
                <span class="row btn2" v-if="lm.specialMenuIndex.indexOf(lm.dataType)!=-1&&sign[lm.dataType]!=3&&sign[lm.dataType]!=2" @click="tagChange(3)">{{lm.dataType==3?'调整参与对比项':'调整计算项'}}</span>
                <span class="row btn2" v-if="sign[lm.dataType]==3" @click="tagChange(1,'cal')">退出调整</span>
                <span class="row btn3" v-if="sign[lm.dataType]==3" @click="tagFinish('adjustment')">调整完成</span>
              </div>
              <div class="word-group" v-if="lm.specialMenuIndex.indexOf(lm.dataType)!=-1">
                <span class="division"></span>
                <span class="result">偏差基准：平均值</span>
                <span class="result">偏差范围</span>：
                <span :class="['result',{'may-point':true}]" @click="modificationBias">{{deviationRange[lm.dataType].from}}%~{{deviationRange[lm.dataType].to}}%</span>
              </div>
              <span class="division"></span>
              <div class="choice-group">
                <el-radio v-model="vm.radio" label="1" @change="changeData">全部</el-radio>
                <el-radio v-model="vm.radio" label="2" @change="changeData">异常项</el-radio>
              </div>
              <span class="division"></span>
              <span class="appraisal" v-if="expertConclusion[this.lm.dataType].show">鉴定意见：{{expertConclusion[this.lm.dataType].tip}}</span>
            </div>
            <!-- sign：1正常模式、2标记正常项模式、3调整计算项模式 -->
            <!-- monomers:单体列表 -->
            <totalIndex ref="1" v-show="lm.dataType==1" @childExceptData="getDataFromChild" :maxHeight='maxHeight' :tableDatas='dataSet[1]' :monomers='dataSet.monomers' :abnormal='abnormal[1]' :sign='sign[1]'></totalIndex>
            <economicIndex ref="2" v-show="lm.dataType==2" @childExceptData="getDataFromChild" :maxHeight='maxHeight' :tableDatas='dataSet[2]' :monomers='dataSet.monomers' :abnormal='abnormal[2]' :sign='sign[2]'></economicIndex>
            <detailedList ref="3" v-show="lm.dataType==3" @childExceptData="getDataFromChild" :maxHeight='maxHeight' :tableDatas='dataSet[3]' :monomers='dataSet.monomers' :abnormal='abnormal[3]' :sign='sign[3]'></detailedList>
            <quantitiesIndex ref="4" v-show="lm.dataType==4" @childExceptData="getDataFromChild" :maxHeight='maxHeight' :tableDatas='dataSet[4]' :monomers='dataSet.monomers' :abnormal='abnormal[4]' :sign='sign[4]'></quantitiesIndex>
            <comprehensive ref="5" v-show="lm.dataType==5" @childExceptData="getDataFromChild" :maxHeight='maxHeight' :tableDatas='dataSet[5]' :monomers='dataSet.monomers' :sign='sign[5]' :abnormal='abnormal[5]' :comparedFinish="comparedFinish[5]"></comprehensive>
            <fees ref="6" v-show="lm.dataType==6" @childExceptData="getDataFromChild" :maxHeight='maxHeight' :tableDatas='dataSet[6]' :monomers='dataSet.monomers' :sign='sign[6]' :abnormal='abnormal[6]' :comparedFinish="comparedFinish[6]"></fees>
            <resource ref="7" v-show="lm.dataType==7" @childExceptData="getDataFromChild" :maxHeight='maxHeight' :tableDatas='dataSet[7]' :monomers='dataSet.monomers' :sign='sign[7]' :abnormal='abnormal[7]' :comparedFinish="comparedFinish[7]"></resource>

          </div>
        </div>
      </div>
    </div>
    <el-dialog title="" :visible.sync="adjustmentBox[lm.dataType]" width="400px" center>
      <div>
        <span>偏差范围(%)：</span>
        <el-input v-model="deviationMin" placeholder="请输入偏差范围" style="width:100px"></el-input> ~
        <el-input v-model="deviationMax" placeholder="请输入偏差范围" style="width:100px"></el-input>
      </div>
      <p class="red-tips">{{tips}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="definiteScope">确 定</el-button>
        <el-button @click="cancellationScope">取 消</el-button>
      </span>
    </el-dialog>
    <monomerModular :monomerInfo='monomerInfo' :style="{top: renderData.pos.y - posSreen.y + 'px',left: renderData.pos.x +'px'}" v-show="renderData.show"></monomerModular>
  </div>
</template>
<script>
import api from '@/fetch/api'
import tool from '@/assets/js/useMoreTool'
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'
import stepBar from '@/components/stepBar'
import totalIndex from './contrastTable/totalIndex' //总指标对比
import economicIndex from './contrastTable/economicIndex' //总指标对比
import detailedList from './contrastTable/detailedList' //清单漏项
import quantitiesIndex from './contrastTable/quantitiesIndex' //工程量指标对比
import comprehensive from './contrastTable/comprehensive'
import { getPostfix } from '@/assets/js/Utils'
import { tableFolding } from '@/assets/js/tableFolding'
import monomerModular from '@/components/monomerInfo'
import fees from './contrastTable/fees'
import resource from './contrastTable/resource'
import testJson from '@/assets/innerMonomerCompare'

export default {
  components: {
    resource,
    fees,
    headerComponent,
    breadcrumb,
    stepBar,
    totalIndex,
    economicIndex,
    detailedList,
    quantitiesIndex,
    comprehensive,
    monomerModular
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      vm: {
        radio: '2',
        title: '数据比对',
        stage: ['选择阶段', '选择数据对比类型', '选择单项工程', '查看对比结果'],
        breadcrumbs: [{ name: '我的项目', path: '/projectManage' }, { name: '数据比对' }],
        tableData: [] //综合单价
      },
      lm: {
        i: 0,
        treeIndex: 1,
        dataType: '1',
        step: 3,
        tableData: [],
        respAllData: {},
        specialMenuIndex: ['1', '2', '4'], //需要 调整计算项
        loading: true,
        hasCompared: false,
        checkedData: {},
        comparedTimes: 1,
          saved:false
      },
      projectId: this.$route.params.projectId,
      stageId: this.$route.params.stageId,
      compareType: this.$route.params.type,
      maxHeight: window.innerHeight - 276,
      getNodeKey: [], //左侧选择的需要对比的单项工程
      tabList: [
        { label: '总指标对比', name: 1 },
        { label: '经济指标对比', name: 2 },
        { label: '清单漏项', name: 3 },
        { label: '工程量指标对比', name: 4 },
        { label: '综合单价检查', name: 5 },
        { label: '规费税金检查', name: 6 }
      ],
      markerItem: {}, // 标记的正常项
      modiyData: {}, // 调整的项
      renderData: {
        show: false,
        pos: {} // 弹出框位置
      },
      posSreen: {
        x: 245,
        y: 25
      },
      monomerInfo: {},
      abnormal: [2,2,2,2,2,2,2], //是否选择异常项
      comparedFinish: [],
      sign: [1, 1, 1, 1, 1, 1, 1], //标记调整按钮 2：标记、3：调整
      deviationRange: {
        1: { from: 90, to: 110 },
        2: { from: 90, to: 110 },
        3: { from: 90, to: 110 },
        4: { from: 90, to: 110 },
        5: { from: 90, to: 110 },
        6: { from: 90, to: 110 }
      },
      adjustmentBox: [], //调整范围
      deviationMin: 90,
      deviationMax: 110,
      tips: '', //调整范围的提示
      dataSet: {
        //数据集合
        1: [], //总指标对比
        2: [], //经济指标对比
        3: [], //清单漏项
        4: [], //工程量指标对比
        5: [], //综合单价检查
        6: [] //规费税金检查
      },
      expertConclusion: {
        '1': { show: false, tip: '单项工程总指标在指标区间内偏离平均值过大' },
        '2': { show: false, tip: '经济指标区间偏离平均值过大' },
        '3': { show: false, tip: '清单存在漏项' },
        '4': { show: false, tip: '工程量指标区间偏离平均值过大' },
        '5': { show: false, tip: '清单综合单价不一致' },
        '6': { show: false, tip: '费率不一致' },
        '7': { show: false, tip: '材料价格不一致' }
      }, //鉴定结论
      range: ['第一级', '第二级', '第三级', '第四级'],
      command: [],
      mapper: {
        '1': { key: '总指标', checkKey: 'costByArea' },
        '2': { key: '经济指标对比', checkKey: 'costPerSquare' },
        '3': { key: '清单漏项', checkKey: 'amount' },
        '4': { key: '工程量', checkKey: 'amountPS' },
        '5': { key: '综合单价', checkKey: '' },
        '6': { key: '规费税金', checkKey: '' }
      }
    }
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
      return false
    },
    getDataFromChild(payload) {
      if (payload.data && payload.data.length > 0) {
        if (payload.type == 'select') {
          this.markerItem[this.lm.dataType] = payload
        } else {
          this.modiyData[this.lm.dataType] = payload
        }
      }
    },
    ...tableFolding(['tablefold']),
    //显示范围
    handleCommand(command) {
      this.$set(this.command, this.lm.dataType, command)
    },
    // 修改偏差范围
    modificationBias() {
      this.tips = ''
      this.$set(this.adjustmentBox, this.lm.dataType, true)
      this.deviationMin = this.deviationRange[this.lm.dataType].from
      this.deviationMax = this.deviationRange[this.lm.dataType].to
      // api.biasCalcOfIPQuantityIndex(this.lm.).then()
    },
    // 确定偏差范围
    definiteScope() {
      if (Number(this.deviationMin) < Number(this.deviationMax)) {
        var keyData = this.mapper[this.lm.dataType].key
        var reqParam = { from: this.deviationMin, to: this.deviationMax }
        var reqData = this.lm.respAllData[keyData].data
        this.lm.loading = true
        api
          .reCalc({ data: reqData, param: reqParam }, this.lm.dataType)
          .then(res => {
            this.lm.loading = false
            this.lm.respAllData[keyData].param.from = this.deviationRange[this.lm.dataType].from = this.deviationMin
            this.lm.respAllData[keyData].param.to = this.deviationRange[this.lm.dataType].to = this.deviationMax
            console.log(this.lm.dataType, 'type')
            this.dataSet[this.lm.dataType] = res.data.data
            if (this.chargeDataExcept(res.data.data)) {
              this.expertConclusion[this.lm.dataType].show = true
            } else {
              this.expertConclusion[this.lm.dataType].show = false
            }
          })
          .catch(err => {
            this.lm.loading = false
            console.log(err)
          })

        this.$set(this.adjustmentBox, this.lm.dataType, false)
      } else {
        this.tips = '偏差范围最大值必须大于最小值'
      }
    },
    // 取消偏差范围
    cancellationScope() {
      this.$set(this.adjustmentBox, this.lm.dataType, false)
    },
    changeData(value) {
      this.$set(this.abnormal, this.lm.dataType, value)
      if (value == 1) {
        this.$refs[this.lm.dataType].vm.tableData = this.dataSet[this.lm.dataType]
      } else {
        if (!this.expertConclusion[this.lm.dataType].show) {
          this.$refs[this.lm.dataType].vm.tableData = []
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
    startProCompare() {
      this.nextstep(3)
      this.lm.loading = true
      if (this.$refs.tree.getCheckedNodes().length > 0) {
        if (this.compareType == 3) {
          var yearMonth = this.$refs.tree.getCheckedNodes()[0].name.substring(0, 7)
          var monomerList = []
          this.$refs.tree.getCheckedNodes()[0].list.forEach(data => {
            var monomer = {}
            monomer.buildingId = data.basicId
            monomer.name = data.name
            monomerList.push(monomer)
          })
          api
            .innerProjectResCompare({
              projectId: this.projectId,
              stage: this.stageId,
              yearMonth: yearMonth,
              monomers: monomerList
            })
            .then(res => {
              // res=testJson
              this.lm.loading = false
              this.lm.hasCompared = true
              this.dataSet.monomers = res.data.params.monomers
              res.data.groups.forEach(item => {
                item.items.forEach(subItem => {
                  subItem.hasChildren = true
                })
              })
              this.dataSet[7] = res.data
              //检测是否包含异常项
              var checkData = this.dataSet[7].groups
              if (this.chargeDataExcept(checkData)) {
                this.expertConclusion[7].show = true
              }
              this.lm.respAllData = res.data
                this.abnormal[7];
              this.lm.dataType = '7'
              this.$nextTick(() => {
                this.lm.dataType = '7'
              })
            })
            .catch(err => {
              this.nextstep(2)
              this.lm.loading = false
              console.log('err:' + err)
            })
        } else {
          api
            .startProCompare({ projectId: this.projectId, stage: this.stageId, type3: this.$refs.tree.getCheckedNodes()[0].id })
            .then(res => {
              console.log(res)
              this.lm.loading = false
              this.lm.hasCompared = true
              this.nextstep(3)
              /* 获取偏差范围 */
              if (res.data && res.data.params.monomers) {
                this.dataSet.monomers = res.data.params.monomers
                if (res.data.总指标 && res.data.总指标.param) {
                  this.deviationRange[1] = res.data.总指标.param
                  this.dataSet[1] = res.data.总指标.data
                }
                if (res.data.经济指标对比 && res.data.经济指标对比.param) {
                  this.deviationRange[2] = res.data.经济指标对比.param
                  this.dataSet[2] = res.data.经济指标对比.data
                }
                if (res.data.工程量 && res.data.工程量.param) {
                  this.deviationRange[4] = res.data.工程量.param
                  this.dataSet[4] = res.data.工程量.data
                }
                this.dataSet[3] = res.data.清单漏项
                this.dataSet[5] = res.data.综合单价
                this.dataSet[6] = res.data.规费税金
                //检测是否包含异常项
                var index = 1
                let that = this
                Object.keys(this.dataSet).forEach(function(key) {
                  var checkData = that.dataSet[key]
                  if (key == 5) {
                    checkData = that.dataSet[key].groups
                  }
                  if (that.chargeDataExcept(checkData)) {
                    that.expertConclusion[index].show = true
                  }
                  index++
                })
                this.lm.respAllData = res.data
                this.lm.dataType = '1'
                this.tablefold('compare123')
              }
            })
            .catch(err => {
              this.lm.loading = false
              console.log('err:' + err)
            })
        }
      } else {
        this.$message({
          type: 'info',
          message: '请选择单项工程'
        })
      }
    },
    handleClick(data, checked, indeterminate) {
      if (this.lm.i == 0) {
        this.lm.checkedData = data
      }
      this.lm.i++
      if (this.lm.i % 2 === 0) {
        if (checked && this.lm.hasCompared && data.index != this.lm.checkedData.index) {
          this.$confirm('您已选择了新的单项工程，是否重新进行比对？', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.lm.checkedData = data
              this.$refs.tree.setCheckedNodes([])
              this.$refs.tree.setCheckedNodes([data])
              this.startProCompare()
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
          } else {
            this.$refs.tree.setCheckedNodes([])
          }
        }
      }
      this.getNodeKey = this.$refs.tree.getCheckedNodes()
    },
    renderContent(h, { node, data, store }) {
      if (node.level == 3) {
        return (
          <span class="custom-tree-node three-level">
            <el-tooltip class="item" effect="dark" content={node.label} placement="top-start">
              <span stype="">{node.label}</span>
            </el-tooltip>
          </span>
        )
      } else if (node.level == 4) {
        return (
          <span class="custom-tree-node four-level">
            <span>{node.label}</span>
            <i class="icon-info" onMouseover={e => this.maskNameEnter(e, data)} onMouseleave={e => this.maskNameLeave()} />
          </span>
        )
      } else {
        return (
          <span class="custom-tree-node two-level">
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
    changeTab(type) {
      this.lm.dataType = type.name
      this.vm.radio = this.abnormal[this.lm.dataType] ? '2' : '1'
    },
    tagChange(val, type) {
      if (val == 2 && !this.expertConclusion[this.lm.dataType].show) {
        this.$message({
          type: 'info',
          message: '无异常项'
        })
      } else if (val == 1) {
        this.$set(this.sign, this.lm.dataType, val)
        var data
        if (type == 'select') {
          data = this.markerItem[this.lm.dataType]
          this.$refs[this.lm.dataType].lm.exceptData = []
          this.markerItem[this.lm.dataType] = []
        } else if (type == 'cal') {
          data = this.modiyData[this.lm.dataType]
          this.$refs[this.lm.dataType].lm.calData = []
          this.modiyData[this.lm.dataType] = []
        }
        if (data != undefined && data.data != undefined && data.data.length > 0) {
          if (this.lm.dataType == 7 || this.lm.dataType == 5) {
            this.comparedFinish[this.lm.dataType] = this.lm.comparedTimes
            this.lm.comparedTimes++
          } else {
            this.cancelChangeData(this.getCurrentData(), data)
          }
        }
      } else {
        this.$set(this.sign, this.lm.dataType, val)
      }
    },
    getCurrentData() {
      var data
      var keyData = this.mapper[this.lm.dataType].key
      if (this.lm.specialMenuIndex.indexOf(this.lm.dataType) == -1) {
        data = this.lm.respAllData[keyData]
      } else {
        data = this.lm.respAllData[keyData].data
      }
      return data
    },
    tagFinish(type) {
      let that = this
      // type:signs 标记 type:adjustment 调整
      var tagAllData = type == 'signs' ? this.markerItem[this.lm.dataType] : this.modiyData[this.lm.dataType]
      var data
      if (this.lm.dataType == 7) {
        data = this.lm.respAllData
      } else {
        var keyData = this.mapper[this.lm.dataType].key
        if (this.lm.specialMenuIndex.indexOf(this.lm.dataType) == -1) {
          data = this.lm.respAllData[keyData]
        } else {
          data = this.lm.respAllData[keyData].data
        }
      }

      var dataLength = 0
      if (tagAllData && tagAllData.data) {
        dataLength = tagAllData.data.length
      }
      if (dataLength <= 0) {
        this.$message({
          type: 'info',
          message: type == 'signs' ? '未选择异常项' : '未选择计算项'
        })
      } else {
        let tips = ''
        type == 'signs'
          ? (tips = '您已勾选' + dataLength + '个异常项，是否确认将勾选的异常项标记为正常项?')
          : (tips = '您已勾选' + dataLength + '个计算项，是否确认取消勾选的数值不再参与平均值计算？?')
        this.$confirm(tips, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$set(this.sign, this.lm.dataType, 1)
            //标记完成总指标
            if (this.lm.dataType == 1) {
              this.tagFinishChangeData1(data, tagAllData)
              if (this.chargeDataExcept(this.dataSet[this.lm.dataType])) {
                this.expertConclusion[this.lm.dataType].show = true
              } else {
                this.expertConclusion[this.lm.dataType].show = false
                if (this.abnormal[this.lm.dataType]) {
                  this.$refs[this.lm.dataType].vm.tableData = []
                }
              }
            }
            //标记  经济指标比对和清单漏项
            else if (this.lm.dataType == 2 || this.lm.dataType == 3 || this.lm.dataType == 4) {
              this.tagFinishChangeData2(data, tagAllData)
              if (this.chargeDataExcept(this.dataSet[this.lm.dataType])) {
                this.expertConclusion[this.lm.dataType].show = true
              } else {
                this.expertConclusion[this.lm.dataType].show = false
                if (this.abnormal[this.lm.dataType]) {
                  this.$refs[this.lm.dataType].vm.tableData = []
                }
              }
            } else if (this.lm.dataType == 6) {
              data.forEach(item => {
                this.tagFinishChangeData(item, tagAllData)
              })
              this.comparedFinish[this.lm.dataType] = this.lm.comparedTimes
              this.lm.comparedTimes++
              if (this.chargeDataExcept(this.dataSet[this.lm.dataType])) {
                this.expertConclusion[this.lm.dataType].show = true
              } else {
                this.expertConclusion[this.lm.dataType].show = false
                if (this.abnormal[this.lm.dataType]) {
                  this.$refs[this.lm.dataType].vm.tableData = []
                }
              }
            }
            //标记 综合单价和规费
            else if (this.lm.dataType == 5 || this.lm.dataType == 7) {
              data.groups.forEach(datat => {
                if (this.lm.dataType == 7) {
                  datat.items.forEach(item => {
                    if (item.subCR != 0) {
                      item.items = data.items[item.id]
                    }
                  })
                } else if (this.lm.dataType == 5) {
                  if (datat.subCR != 0) {
                    datat.items = data.items[datat.type]
                  }
                }
              })
              data.groups.forEach(item => {
                this.tagFinishChangeData(item, tagAllData)
              })
              data.groups.forEach(datat => {
                if (this.lm.dataType == 7) {
                  datat.items.forEach(item => {
                    item.items = []
                  })
                } else if (this.lm.dataType == 5) {
                  datat.items = []
                }
              })
              this.comparedFinish[this.lm.dataType] = this.lm.comparedTimes
              this.lm.comparedTimes++
              if (this.chargeDataExcept(this.dataSet[this.lm.dataType].groups)) {
                this.expertConclusion[this.lm.dataType].show = true
              } else {
                this.expertConclusion[this.lm.dataType].show = false
                if (this.abnormal[this.lm.dataType]) {
                  this.$refs[this.lm.dataType].vm.tableData = []
                }
              }
            }
            if (type == 'signs') {
              this.markerItem[this.lm.dataType].data = []
              this.$refs[this.lm.dataType].lm.exceptData = []
            } else {
              this.modiyData[this.lm.dataType].data = []
              this.$refs[this.lm.dataType].lm.calData = []
            }

            this.$message({
              type: 'success',
              message: type == 'signs' ? '标记完成' : '调整完成'
            })
          })
          .catch(err => {
            console.log(err, 'err')
            if (tagAllData.type == 'calc') {
              this.cancelChangeData(data, tagAllData)
              this.modiyData[this.lm.dataType].data = []
            }
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
      }
    },
    cancelChangeData(dataY, subData) {
      let that = this
      dataY.forEach(function(data) {
        var type = subData.type
        subData.data.find((value, index, arr) => {
          if (value && data.id == value.id) {
            data[type + '-' + value.columnId] = !data[type + '-' + value.columnId]
          }
        })
        if (data.items) {
          that.cancelChangeData(data.items, subData)
        }
      })
    },
    tagFinishChangeData1(dataY, subData) {
      //总指标
      let that = this
      dataY.forEach(function(data) {
        var type = subData.type
        //改变当前cell 的result
        subData.data.find((value, index, arr) => {
          if (data.id == value.id) {
            if (type == 'select') {
              data['result-' + value.columnId] = 0
              data['result'] = data['result'] - 1
            } else if (type == 'calc') {
              that.calculate(data)
            }
          }
        })
      })
    },
    tagFinishChangeData2(dataY, subData) {
      let that = this
      var tagResult = 0
      dataY.forEach(function(data) {
        var type = subData.type
        //改变当前cell 的result
        var yuanDataResult = data['result']
        subData.data.find((value, index, arr) => {
          if (data.id == value.id) {
            if (type == 'select') {
              if (value.columnId) {
                data['result-' + value.columnId] = 0
                data['result'] = data['result'] - 1
                  if(   data['amount-' + value.columnId]=='漏项'){
                      data['amount-' + value.columnId]=data['amountV-' + value.columnId]
                  }
              }
            } else if (type == 'calc') {
              that.calculate(data)
            }
            if (yuanDataResult != 0 && data['result'] == 0 && (data.subCR != 0 || data.subCR == undefined)) {
              tagResult++
            } else if (yuanDataResult == 0 && data['result'] != 0 && (data.subCR != 0 || data.subCR == undefined)) {
              tagResult--
            }
          }
        })
        if (data.items) {
          data.subCR -= that.tagFinishChangeData2(data.items, subData)
        }
      })
      return tagResult
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
      subData.data.find((value, index, arr) => {
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
    //根据偏差范围修改，计算一行是为否异常项
    calculate(data) {
      var average = 0
      var index = 0
      var checkKey = this.mapper[this.lm.dataType].checkKey
      Object.keys(data).forEach(function(key) {
        var id = key.slice(5)
        if (key.startsWith('calc') && data['calc-' + id]) {
          index++
          average += data[checkKey + '-' + id]
        }
      })
      var fix = 2
      if (this.lm.dataType == 7) {
        //人材机消耗量小数点规则：	（保留小数点后三位	，第四位小数四舍五入	）
        fix = 3
      } else if (this.lm.dataType == 4) {
        fix = 2
      }
      average = (average / index).toFixed(fix)
      let that = this
      data['result'] = 0
      Object.keys(data).forEach(function(key) {
        if (key.startsWith('calc') && data[key]) {
          var id = key.slice(5)
          var min
          var max
          if (average > 0) {
            min = that.deviationRange[that.lm.dataType].from * average
            max = that.deviationRange[that.lm.dataType].to * average
          } else {
            max = that.deviationRange[that.lm.dataType].from * average
            min = that.deviationRange[that.lm.dataType].to * average
          }
          if (data[checkKey + '-' + id] * 100 >= max || data[checkKey + '-' + id] * 100 <= min) {
            data['result-' + id] = 1
            data['result'] += 1
          } else {
            data['result-' + id] = 0
          }
        }
      })
      console.log('data:' + JSON.stringify(data))
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
          this.addTreeIndex(data[a].children)
        }
      }
    },
    saveCompareReulst() {
      var prompt =
        '保存后，若退出数据比对页面，则不可再调整已保存的经济技术指标（不含人材机）比对结果，如需调整，请重新比对。是否确定保存？'
      if (this.compareType == 3) {
        prompt = '保存后，若退出数据比对页面，则不可再调整已保存的人材机比对结果，如需调整，请重新比对。是否确定保存？'
      }
      this.$confirm(prompt, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var info = this.lm.respAllData.params
          this.lm.respAllData.treeData = this.data
          var content = JSON.stringify(this.lm.respAllData)
          var code = 0
          for (var name in this.expertConclusion) {
            if (this.expertConclusion[name].show) {
              code = 1
              break
            }
          }
          if(this.lm.dataType==7){
              let that =this;
              //人材机三个类型需要补充
              info.monomers.forEach(item=>{
                  that.lm.checkedData.children.find(function (elem) {
                      if(elem.basicId==item.buildingId){
                          item.type1=elem.type1;
                          item.type2=elem.type2;
                          item.type3=elem.type3;
                      }
                  })
              })
          }
          api
            .saveInnerProjectCompare({ params: info, content: content, code: code },this.lm.dataType)
            .then(res => {
              this.$alert('当前比对结果已保存，您可在“我的项目”-“数据比对”点击“查看记录”查看。', '', {
                confirmButtonText: '确定',
                callback: action => {}
              })
                this.lm.saved = true
            })
            .catch(err => {
              this.waitTime = false
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    chargeDataExcept(data) {
      //判断数据中是否存在异常项
      for (var a = 0; a < data.length; a++) {
        var v = data[a]
        var result
        Object.keys(v).forEach(function(key) {
          if (key.startsWith('result')) {
            if (v[key] != 0 && v[key] != -1) {
              result = true
            }
          }
          if (key == 'subCR' && v[key] != 0) {
            result = true
          }
        })
        if (result) {
          return true
        }
        if (v.items && v.items.length > 0) {
          if (this.chargeDataExcept(v.items)) {
            return true
          }
        }
      }
    }
  },
  created() {
    var from = this.$route.query.from
    if (from && from == 'yg') {
      this.vm.stage = ['选择质监类型', '选择单项工程', '查看质监结果']
      this.vm.title = '数据质监'
      this.lm.step = 2
    }
    if (this.compareType == 3) {
      this.tabList = []
      this.tabList.push({ label: '人材机价格比对', name: '7' })
      this.lm.dataType = '7'
    }
    this.$store.dispatch('nextStepFUN', this.lm.step)
  },
  mounted() {
    api
      .getCompareMonomers({ commonId: this.projectId, stageId: this.stageId, dataMatchType: this.compareType })
      .then(res => {
        var results = [res.data]
        if (this.compareType == 2) {
          results[0].list[0].list = results[0].list[0].typeList
        } else if (this.compareType == 3) {
          results[0].list[0].list = results[0].list[0].timeList
        }
        // else if(this.compareType==4){

        // }
        results[0].disabled = true
        results[0].list[0].disabled = true
        results[0].list[0].list.map(item => {
          item.list.map(item1 => {
            item1.disabled = true
          })
        })
        this.addTreeIndex(results)
        this.data = results
        let treeElement = document.getElementsByClassName('custom-tree-node')
        this.$nextTick(() => {
          for (let index = 0; index < treeElement.length; index++) {
            const element = treeElement[index]
            if (element.previousElementSibling.classList.length > 1) {
              element.previousElementSibling.remove()
            }
          }
        })
      })
      .catch(err => (this.waitTime = false))
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
          .prompt {
            border-bottom: 1px solid rgba(224, 227, 235, 1);
            padding-left: 12px;
            padding-top: 9px;
            padding-bottom: 8px;
            font-size: 12px;
            font-weight: 400;
            background-color: #fafafb;
          }
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
                width: 145px;
              }
            }
            .four-level {
              margin-left: 5px;
              > span {
                width: 106px;
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
          .initial {
            width: 120px;
            height: 36px;
            background: #dddddd;
            color: #b8b8b8;
          }
        }
      }
      .right {
        margin-left: 260px;
        height: 100%;
        position: relative;
        /deep/.el-tabs {
          .el-tabs__item {
            color: #b8b8b8;
          }
          .el-tabs__item.is-active {
            color: #4474cf;
          }
          .el-tabs__active-bar {
            background-color: #4474cf;
          }
        }
        .mid {
          margin-bottom: 20px;
          height: 30px;
          line-height: 30px;
          .btn-group {
            float: left;
            .row {
              padding: 6px 12px;
              height: 18px;
              line-height: 18px;
              margin-right: 14px;
              cursor: pointer;
              color: rgba(255, 255, 255, 1);
              font-size: 14px;
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
          }
          .division {
            float: left;
            width: 1px;
            height: 16px;
            background: #ced2dc;
            margin: 7px 11px 0 8px;
          }
          .division:nth-of-type(2) {
            margin: 7px 11px 0 11px;
          }
          .word-group {
            float: left;
            .result {
              display: inline-block;
              height: 30px;
              font-size: 12px;
              font-weight: 400;
              color: #666666;
            }
            span:nth-child(2) {
              margin-right: 17px;
            }
            .prohibit-point {
              color: #b8b8b8;
              background: #dddddd;
              padding: 0 10px;
              cursor: not-allowed;
            }
            .may-point {
              background: #4474cf;
              color: rgba(255, 255, 255, 1);
              padding: 0 10px;
              cursor: pointer;
            }
          }
          .choice-group {
            float: left;
            /deep/.el-radio {
              margin-right: 21px;
              .el-radio__input.is-checked .el-radio__inner {
                border-color: #4474cf;
                background: #4474cf;
              }
              .el-radio__input.is-checked + .el-radio__label {
                color: #4474cf;
              }
            }
            /deep/.el-radio:nth-children(2) {
              margin-right: 0 !important;
            }
          }
          .appraisal {
            color: #cf4242;
          }
          .drop-down {
            display: inline-block;
            margin-left: 10px;
            /deep/.el-dropdown {
              /deep/.el-button {
                width: 94px;
                height: 30px;
                padding: 0 !important;
                border-radius: 0 !important;
                background-color: #44cf96;
                border-color: #44cf96;
              }
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
      }
    }
  }
  .red-tips {
    color: red;
    font-size: 12px;
    margin-top: 5px;
    height: 13px;
    line-height: 13px;
  }
}
</style>
