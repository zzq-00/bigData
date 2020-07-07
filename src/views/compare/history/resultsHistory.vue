<template>
  <div class="analysis-content">
    <div class="content">
      <div class="left">
        <div class="top">
          <el-tree :data="vm.treeData" default-expand-all node-key="index" ref="tree" :check-strictly="true" highlight-current :render-content="renderContent" :props="defaultProps">
          </el-tree>
        </div>
        <div class="bottom" @click="goBack">
          返回比对记录列表
        </div>

      </div>
      <div class="right">
        <el-tabs v-model="lm.dataType" @tab-click="changeTab">
          <el-tab-pane label="综合单价检查" name="1"></el-tab-pane>
          <el-tab-pane label="规费、税金检查" name="2"></el-tab-pane>
        </el-tabs>

        <div class="bottom1">
          <div class="mid">
            <el-radio v-model="vm.radio" label="1" @change="changeData">全部</el-radio>
            <el-radio v-model="vm.radio" label="2" @change="changeData">异常项</el-radio>
            <span v-if="lm.dataType==1&&lm.except1" class="result">鉴定意见：清单综合单价不一致</span>
            <span v-if="lm.dataType!=1&&lm.except2" class="result">鉴定意见：相同取费专业下费率不一致</span>
          </div>
          <div class="table1">
            <div v-show="lm.dataType==1">
              <el-table :max-height="lm.maxHeight" :data="vm.tableData" v-loading="lm.loading" empty-text="无更多数据！" style="width: 100%;" row-key="id" :row-class-name="tableRowClassName" border lazy :load="load" :tree-props="{children: 'items', hasChildren: 'hasChildren'}">
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
            <div v-if="lm.dataType!=1">
              <el-table :max-height="lm.maxHeight1" :data="vm.tableData1" style="width: 100%;" :row-class-name="tableRowClassName" border empty-text="无更多数据！" row-key="id" default-expand-all :tree-props="{children: 'items', hasChildren: 'hasChildren'}">
                <el-table-column prop="name" label="费用名称/取费专业/单位工程名称" width="600">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="rate" label="费率(%)" width="180">
                </el-table-column>
                <el-table-column prop="fileName" label="来源文件名称">
                </el-table-column>
              </el-table>
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
import { tableFolding } from '@/assets/js/tableFolding'
import monomerModular from '@/components/monomerInfo'
export default {
  components: {
    monomerModular
  },
  data() {
    return {
      keys: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      vm: {
        treeData: [],
        radio: '2',
        title: '数据比对历史',
        breadcrumbs: [{ name: '我的项目', path: '/projectManage' }, { name: '数据比对历史' }],
        checkResults: '清单综合单价不一致',
        tableData: [], //综合单价
        tableData1: [], //规费税金
        detailBrief: {},
        detailTable: [],
        detailResouceTable: []
      },
      lm: {
        loading: true,
        treeIndex: 1,
        monomerId: '-1',
        allDataElse: { '1': '2', '2': '2' },
        selectionCard: 1, //选项卡 清单构成 综合单价指标库清单数据 1是清单构成
        dataType: '1', //1为综合单价  2为规费税金
        tagData: [], //综合单价标记数据
        tagData1: [], //规费税金标记数据
        tableData: [], //综合单价
        tableData1: [], //规费税金
        respAllData: {},
        except1: false, //综合单价是否包含异常项
        except2: false, //规费税金是否包含异常项
        showPriceDetail: false,
        maxHeight: window.innerHeight - 276,
        maxHeight1: window.innerHeight - 276,
        currentPriceDetail: 0
      },
      compareId: (() => this.$route.params.id)(),
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
      // debugger
      if (this.lm.dataType == '1') {
        this.tablefold('comprehensive')
      } else {
        this.tablefold('compare123')
      }
    })
  },
  methods: {
      goBack() {
          this.$router.back(-1)
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
      console.log(row)
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
      this.vm.radio = this.lm.allDataElse[this.lm.dataType] = value
      if (this.lm.dataType == 1) {
        if (this.lm.allDataElse[this.lm.dataType] == 1) {
          this.vm.tableData = this.lm.tableData
        } else if (!this.chargeDataExcept(this.lm.tableData)) {
          this.vm.tableData = []
        }
      } else {
        if (this.lm.allDataElse[this.lm.dataType] == 1) {
          this.vm.tableData1 = this.lm.tableData1
        } else if (!this.chargeDataExcept(this.lm.tableData1)) {
          this.vm.tableData1 = []
        }
      }
    },
    changeTab(type) {
      this.lm.dataType = type.name
      this.vm.radio = this.lm.allDataElse[this.lm.dataType]
    },
    tableRowClassName({ row }) {
      if (row.result && row.result != 0) {
        return 'warning-row'
      }
      if (row.subCR != undefined && row.subCR != 0) {
        return 'warning-row'
      }
      if (this.lm.allDataElse[this.lm.dataType] == 2) {
        if (row.result == 0) {
          return 'hidden'
        }
        if (row.subCR == 0) {
          return 'hidden'
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
    }
  },
  mounted() {
    api
      .getInnerMonomerCompareOpinion(this.compareId)
      .then(res => {
        var data = res.data
        this.vm.treeData = data.treeData
        this.lm.respAllData = data
        this.lm.tableData = this.vm.tableData = data.综合单价.groups
        console.log(this.vm.tableData)
        this.lm.tableData1 = this.vm.tableData1 = data.规费税金

        //判断是否显示鉴定结果
        if (this.lm.tableData && this.lm.tableData.length > 0) {
          if (this.chargeDataExcept(this.lm.tableData)) {
            this.lm.except1 = true
          } else {
            this.lm.except1 = false
            this.vm.tableData = []
          }
        }
        if (this.lm.tableData1 && this.lm.tableData1.length > 0) {
          if (this.chargeDataExcept(this.lm.tableData1)) {
            this.lm.except2 = true
          } else {
            this.lm.except2 = false
            this.vm.tableData1 = []
          }
        }
        this.lm.loading = false
      })
      .catch(err => {
        console.log(err)
      })
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
