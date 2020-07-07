<template>
  <div class="analysis-content">
    <div class="content" v-loading="lm.loading">
      <div class="left">
        <div class="top">
          <el-tree :data="data" default-expand-all node-key="id" ref="trees" :check-strictly="true" highlight-current :render-content="renderContent" :props="defaultProps">
          </el-tree>
        </div>
        <div class="bottom" @click="goBack">
          返回比对记录列表
        </div>
      </div>
      <div class="right">
        <el-tabs v-model="lm.dataType" @tab-click="changeTab">
          <el-tab-pane v-for="(item,index) in tabList" :key="index" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
        <div>
          <div class="mid">
            <div class="word-group" v-if="lm.dataType==1||lm.dataType==2||lm.dataType==4">
              <span class="division"></span>
              <span class="result">偏差基准：平均值</span>
              <span class="result">偏差范围</span>：
              <span :class="['result',{'prohibit-point':sign[lm.dataType-1]==3},{'may-point':sign[lm.dataType-1]==1||sign[lm.dataType-1]==2}]">{{deviationRange[lm.dataType].from}}%~{{deviationRange[lm.dataType].to}}%</span>
            </div>
            <span class="division"></span>
            <div class="choice-group">
              <el-radio v-model="vm.radio" label="1" @change="changeData">全部</el-radio>
              <el-radio v-model="vm.radio" label="2" @change="changeData">异常项</el-radio>
            </div>
            <span class="division"></span>
            <span class="appraisal" v-if="expertConclusion[this.lm.dataType].show">鉴定意见：{{expertConclusion[this.lm.dataType].tip}}</span>
          </div>
          <!-- sign：1正常模式、2标记正常项模式、3调整计算项模式 complete:2标记完成、3调整完成-->
          <!-- monomers:单体列表 -->
          <totalIndex ref="1" v-show="lm.dataType==1" :maxHeight='maxHeight' :tableDatas='dataSet[1]' :monomers='dataSet.monomers' :abnormal='abnormal[1]'></totalIndex>
          <economicIndex ref="2" v-show="lm.dataType==2" :maxHeight='maxHeight' :tableDatas='dataSet[2]' :monomers='dataSet.monomers' :abnormal='abnormal[2]'></economicIndex>
          <detailedList ref="3" v-show="lm.dataType==3" :maxHeight='maxHeight' :tableDatas='dataSet[3]' :monomers='dataSet.monomers' :abnormal='abnormal[3]'></detailedList>
          <quantitiesIndex ref="4" v-show="lm.dataType==4" :maxHeight='maxHeight' :tableDatas='dataSet[4]' :monomers='dataSet.monomers' :abnormal='abnormal[4]'></quantitiesIndex>
          <comprehensive ref="5" v-show="lm.dataType==5" :maxHeight='maxHeight' :tableDatas='dataSet[5]' :monomers='dataSet.monomers' :abnormal='abnormal[5]'></comprehensive>
          <fees ref="6" v-show="lm.dataType==6" :maxHeight='maxHeight' :tableDatas='dataSet[6]' :monomers='dataSet.monomers' :abnormal='abnormal[6]'></fees>
          <resource ref="7" v-show="lm.dataType==7" :maxHeight='maxHeight' :tableDatas='dataSet[7]' :monomers='dataSet.monomers' :abnormal='abnormal[7]'></resource>
        </div>
      </div>
    </div>
    <monomerModular :monomerInfo='monomerInfo' :style="{top: renderData.pos.y - posSreen.y + 'px',left: renderData.pos.x +'px'}" v-show="renderData.show"></monomerModular>

  </div>

</template>
<script>
import api from '@/fetch/api'
import tool from '@/assets/js/useMoreTool'

import totalIndex from './../contrastTable/totalIndex' //总指标对比
import economicIndex from './../contrastTable/economicIndex' //总指标对比
import detailedList from './../contrastTable/detailedList' //清单漏项
import quantitiesIndex from './../contrastTable/quantitiesIndex' //工程量指标对比
import comprehensive from './../contrastTable/comprehensive'
import { tableFolding } from '@/assets/js/tableFolding'
import fees from './../contrastTable/fees'
import resource from './../contrastTable/resource'
import monomerModular from '@/components/monomerInfo'
export default {
  components: {
    fees,
    totalIndex,
    economicIndex,
    detailedList,
    quantitiesIndex,
    comprehensive,
    monomerModular,
    resource
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      vm: {
        radio: '1',
        title: '数据比对',
        stage: ['选择阶段', '选择数据对比类型', '选择单项工程', '查看对比结果'],
        breadcrumbs: [{ name: '我的项目', path: '/projectManage' }, { name: '数据比对' }],
        checkResults: '清单综合单价不一致',
        tableData: [], //综合单价
        tableData1: [] //规费税金
      },
      lm: {
        treeIndex: 1,
        dataType: '1',
        tableData: [], //综合单价
        tableData1: [], //规费税金
        respAllData: {},
        compareId: (() => this.$route.params.id)(),
        projectId: this.$route.params.projectId,
        loading: true
      },

      maxHeight: window.innerHeight - 276,
      tableData: [],
      getNodeKey: [], //左侧选择的需要对比的单项工程
      tabList: [
        { label: '总指标对比', name: '1' },
        { label: '经济指标对比', name: '2' },
        { label: '清单漏项', name: '3' },
        { label: '工程量指标对比', name: '4' },
        { label: '综合单价检查', name: '5' },
        { label: '规费税金检查', name: '6' }
      ],
      renderData: {
        show: false,
        pos: {} // 弹出框位置
      },
      posSreen: {
        x: 245,
        y: 25
      },
      monomerInfo: {},
      abnormal: [], //是否选择异常项
      // complete: 1, //标记 调整是否完成1：未完成、2标记完成、3调整完成
      complete: [1, 1, 1, 1, 1, 1], //标记 调整是否完成1：未完成、2标记完成、3调整完成、4：退出标记或者是退出调整
      sign: [false, false, false, false, false, false], //标记调整按钮
      deviationRange: [{ from: 90, to: 110 }, { from: 90, to: 110 }],
      adjustmentBox: [false, false, false, false], //调整范围
      deviationMin: '', //偏差小值
      deviationMax: '', //偏差大值
      dataSet: {
        //数据集合
        indexComparison: [], //总指标对比
        economicIndicators: [], //经济指标对比
        listMissingItems: [], //清单漏项
        quantityIndex: [], //工程量指标对比
        comprehensiveUnitPrice: [], //综合单价检查
        feesTax: [] //规费税金检查
      },
      expertConclusion: {
        '1': { show: false, tip: '单项工程总指标在指标区间内偏离平均值过大' },
        '2': { show: false, tip: '经济指标区间偏离平均值过大' },
        '3': { show: false, tip: '清单存在漏项' },
        '4': { show: false, tip: '工程量指标区间偏离平均值过大' },
        '5': { show: false, tip: '清单综合单价不一致' },
        '6': { show: false, tip: '费率不一致' },
          '7': { show: false, tip: '材料价格不一致' }
      } //鉴定结论
    }
  },
  updated() {
    this.$nextTick(() => {
      if (this.lm.dataType == 5) {
        this.tablefold('comprehensive')
      } else {
        this.tablefold('compare')
      }
    })
  },
  methods: {
    ...tableFolding(['tablefold']),
    load(tree, treeNode, resolve) {
      var data = this.lm.respAllData.综合单价.items[tree.type]
      resolve(data)
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
          this.$router.back(-1)
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
      this.vm.radio = '1'
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
    chargeDataExcept(data) {
      //判断数据中是否存在异常项
      for (var a = 0; a < data.length; a++) {
        var v = data[a]
        if (v.result && v.result != 0) {
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
    },
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
    }
  },
  mounted() {
    api
      .getInnerProjectCompareOpinion(this.lm.compareId)
      .then(res => {
        this.data = res.data.treeData
        this.lm.projectId = res.data.treeData[0].projectId
          this.dataSet.monomers = res.data.params.monomers

          var index = 1
          if(res.data.总指标!=undefined){
              /* 获取偏差范围 */
              this.deviationRange[1] = res.data.总指标.param
              this.deviationRange[2] = res.data.经济指标对比.param
              this.deviationRange[4] = res.data.工程量.param
              /* 获取表格值 */
              this.dataSet[1] = res.data.总指标.data
              this.dataSet[2] = res.data.经济指标对比.data
              this.dataSet[3] = res.data.清单漏项
              this.dataSet[4] = res.data.工程量.data
              this.dataSet[5] = res.data.综合单价
              this.dataSet[6] = res.data.规费税金
          }else{
            //人材机比对历史记录
              var obj={};
              obj.groups = res.data.groups
              obj.items=res.data.items
              this.dataSet[7]=obj
              this.lm.dataType="7"
              this.tabList=[]
              var newTab= { label: '人材机比对', name: '7' }
              this.tabList.push(newTab)
              index=7
              this.vm.radio="2"
          }
        //检测是否包含异常项
        let that = this
        Object.keys(this.dataSet).forEach(function(key) {
          var checkData
          if (key == 5||key == 7) {
            checkData = that.dataSet[key].groups
          } else {
            checkData = that.dataSet[key]
          }
          if (that.chargeDataExcept(checkData)) {
            that.expertConclusion[index].show = true
          }
          index++
        })
        this.lm.respAllData = res.data
        this.lm.loading = false
        this.tablefold('compare123')
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
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
        line-height: 36px;
        position: absolute;
        bottom: 0px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        background-color: #4574d0;
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
        background: url(../../../assets/img/list-n.png);
        margin: -2px 0 0 8px;
        vertical-align: middle;
        cursor: pointer;
        border: none;
      }
      .click-iconVisited {
        background: url(../../../assets/img/listvisited.png);
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
</style>
