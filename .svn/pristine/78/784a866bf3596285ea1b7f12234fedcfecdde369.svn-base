<!-- 综合单价检查 -->
<template>
  <div class="all-check">
    <el-table :max-height="lm.maxHeight" @selection-change="handleSelectionChange"
              :data="vm.tableData.groups" empty-text="无更多数据！" row-key="id"           ref="multipleTable"
              :row-class-name="tableRowClassName" border lazy :load="load" :tree-props="{children: 'items', hasChildren: 'hasChildren'}">
      <el-table-column v-if="sign==2" type="selection" :selectable='selectable'>
      </el-table-column>
      <el-table-column prop="type" label="项目名称">
        <template slot-scope="scope">
          <span v-if="scope.row.hasChildren">{{scope.row.name}}</span>
          <span v-if="!scope.row.hasChildren">{{scope.row.type+" "+scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="spec" label="项目特征" show-overflow-tooltip="">
      </el-table-column>

      <el-table-column prop="unit" label="单位" width="" show-overflow-tooltip>
      </el-table-column>
      <el-table-column v-for="(item,index) in vm.columnList" :key="index" :label="item.name" align="center">
        <el-table-column :prop="'cost-'+item.id" label="单价（元）" align="center">
          <template slot-scope="scope" v-if="scope.row['cost-'+item.id]">
            <span class="left-icon">{{scope.row['cost-'+item.id]}}</span>
            <a class="click-icon" v-if="!scope.row['hasChildren']&&scope.row['cost-'+item.id]!='--'" href="javascript:;" @click="getDetail(scope.row,item.id,$event)"></a>
            <el-tooltip v-if="scope.row['fileName-'+item.id]&&scope.row['fileName-'+item.id]!='--'" class="item" effect="dark" :content="$parent.getFileNames(scope.row['fileName-'+item.id])" placement="right-start">
              <img src="@/assets/img/source.png" alt="" class="source-img">
            </el-tooltip>
          </template>
        </el-table-column>
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
        <el-table :data="vm.detailTable" :span-method="arraySpanMethod">
          <el-table-column prop="date" label="清单综合单价组成明细" align="center">
            <el-table-column prop="code" label="定额编号" walign="center">
            </el-table-column>
            <el-table-column prop="name" label="定额子目名称">
            </el-table-column>
            <el-table-column prop="unit" label="定额单位">
            </el-table-column>
            <el-table-column prop="amount" label="数量">
            </el-table-column>
            <el-table-column prop="totalCost" label="合价">
            </el-table-column>
            <el-table-column label="单价" align="center">
              <el-table-column prop="labor" label="人工费">
              </el-table-column>
              <el-table-column prop="material" label="材料费">
              </el-table-column>
              <el-table-column prop="machinery" label="主材费">
              </el-table-column>
              <el-table-column prop="mainMaterial" label="设备费">
              </el-table-column>
              <el-table-column prop="device" label="机械费">
              </el-table-column>
              <el-table-column prop="manageAndProfit" label="管理费和利润">
              </el-table-column>
            </el-table-column>
          </el-table-column>
        </el-table>
        <el-table :data="vm.detailResourceTable">
          <el-table-column prop="date" label="未计价材料明细" align="center">
            <el-table-column prop="name" label="材料名称" align="center">
            </el-table-column>
            <el-table-column prop="unit" label="单位" align="center">
            </el-table-column>
            <el-table-column prop="amount" label="数量" align="center">
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
import { tableFolding } from '@/assets/js/tableFolding'
export default {
  props: ['abnormal', 'maxHeight', 'sign', 'complete', 'tableDatas', 'monomers','comparedFinish'],
    watch:{
        comparedFinish:{
            handler(val){
                    this.$refs.multipleTable.clearSelection();
            },
            deep:true
        },
        monomers:{
            handler(val){
                this.vm.columnList =val
            },
            deep:true
        },
        tableDatas:{
            handler(val){
                if(this.tableDatas.groups!=undefined){
                  this.vm.tableData=val;
                  this.lm.respAllData = this.tableDatas
                  this.vm.tableData.groups.forEach(item => {
                      item.hasChildren = true
                  })
                }
            },
            deep:true
        }

    },
  data() {
    return {
      config: { dataType: '5' },
      vm: {
        tableData: {"groups":[]},
        columnList: [],
        detailBrief: {},
        detailTable: [],
        detailResourceTable: []
      },
      lm: {
        maxHeight: window.innerHeight - 276,
        showPriceDetail: false,
        selectionCard: 1,
      }
    }
  },
  methods: {
      ...tableFolding(['tablefold']),
    handleSelectionChange(val) {
      var payload = { dataType: this.config.dataType }
      payload.type = 'select'
      payload.data = val
      this.$emit('childExceptData', payload)
    },
    selectable(row) {
      if (!row.result || row.result == 0) {
        return false
      } else {
        return true
      }
    },
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
    getDetail(row, column, val) {
      this.lm.maxHeight = window.innerHeight - 560
      this.lm.showPriceDetail = true
      val.path[0].classList.remove('click-icon')
      val.path[0].classList.add('click-iconVisited')
      api
        .compUnitPrice({ code: row.type, unitProjectId: row['unitProjectId-' + column] })
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
    load(tree, treeNode, resolve) {
      var data = this.lm.respAllData.items[tree.type]
      resolve(data)
    },
    tableRowClassName({ row }) {
      if (row.result!=undefined && row.result != 0) {
        return 'warning-row'
      }
      if((row.subCR!=undefined&&row.subCR!=0)){
          return 'warning-row'
      }
      if (this.abnormal==2 ) {
          if( row.result == 0&&row.subCR==0){
              return 'hidden'
          }
          if(row.result==undefined&&row.subCR==0){
              return 'hidden'
          }
          if( row.result == 0&&row.subCR==undefined){
              return 'hidden'
          }
      }
    }
  },
  mounted() {

  },
    updated() {
        this.$nextTick(() => {
            this.tablefold('comprehensive')
        })
    }
}
</script>

<style lang="less" scoped>
.all-check {
  /deep/.el-table {
    .warning-row {
      color: red;
    }
    .hidden {
      display: none;
    }
    .cell {
    }
  }
  .hover-icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url(../../../assets/img/source.png);
    margin: 2px 0 0 8px;
    vertical-align: middle;
    cursor: pointer;
    border: none;
  }
  .left-icon {
    margin-right: 80px;
  }
  .click-icon {
    display: inline-block;
    width: 12px;
    height: 14px;
    background: url(../../../assets/img/list-n.png);
    margin: 0 10px 0 0;
    vertical-align: middle;
    cursor: pointer;
    border: none;
  }
  .click-iconVisited {
    background: url(../../../assets/img/listvisited.png);
    display: inline-block;
    width: 12px;
    height: 14px;
    margin: -2px 8px -6px 8px;
    vertical-align: middle;
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
</style>
