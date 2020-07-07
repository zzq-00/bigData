<!-- 人材机检查 -->
<template>
  <div class="all-check">
    <el-table :max-height="lm.maxHeight" @selection-change="handleSelectionChange" :data="vm.tableData.groups"
              empty-text="无更多数据！"  row-key="id"
              :row-class-name="tableRowClassName"
              border
              lazy
              ref="multipleTable"
              @expand-change="expandChange" :expand-row-keys='lm.expands'
              :load="load"
              :tree-props="{children: 'items', hasChildren: 'hasChildren'}">
      <el-table-column v-if="sign==2" type="selection" :selectable='selectable'>
      </el-table-column>
      <el-table-column prop="type" label="名称及规格">
        <template slot-scope="scope">
          <span >{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="unit" label="单位" show-overflow-tooltip="">
      </el-table-column>
      <el-table-column v-for="(item,index) in vm.columnList" :key="index" :label="item.name" align="center">
        <el-table-column :prop="'marketPrice-'+item.buildingId" label="市场价（元）"  align="center">
          <template slot-scope="scope">
            <span class="left-icon">{{scope.row['marketPrice-'+item.buildingId]}}</span>
            <el-tooltip v-if="scope.row['files-'+item.buildingId]"  class="item" effect="dark" :content="$parent.getFileNames(scope.row['files-'+item.buildingId])" placement="right-start">
              <img src="@/assets/img/source.png" alt="" class="source-img">
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    props: ['abnormal', 'maxHeight', 'sign','tableDatas','monomers','comparedFinish'],
  data() {
    return {
        config:{dataType:"7"},
        vm:{
            tableData: {"groups":[]},
            columnList:[],
        },
        lm:{
            maxHeight:window.innerHeight-276,
            selectionCard:1,
            tagData:[], //标记数组
            expands:[]
        }
    }
  },
    updated() {
        this.$nextTick(() => {
            this.$parent.tablefold('compre')
        })
    },
  methods: {
      expandChange(row, expanded) {
          let fineIndex = this.lm.expands.findIndex(data => data == row.id)
          // false 是收起 true是展开
          if (!expanded && fineIndex > -1) {
              this.lm.expands.splice(fineIndex, 1)
          }
      },
      handleSelectionChange(val) {
          var payload={dataType:this.config.dataType};
          payload.type='select';
          payload.data=val
          this.$emit('childExceptData', payload);
      },
      selectable(row) {
          if (!row.result || row.result == 0) {
              return false
          } else {
              return true
          }
      },
      load(tree, treeNode, resolve) {
          var data=this.lm.respAllData.items[tree.id];
          resolve(data)
      },
      tableRowClassName({ row }) {
          if (row.result && row.result != 0) {
              return 'warning-row'
          }
          if(row.subCR!=undefined&&row.subCR!=0){
              return 'warning-row'
          }
          if(this.abnormal==undefined||this.abnormal==2){
              if (row.result == 0) {
                  return 'hidden'
              }
              if (row.subCR==0) {
                  return 'hidden'
              }
          }
      },
  },
    watch:{
        comparedFinish:{
            handler(val){
               this.$refs.multipleTable.clearSelection();
            },
            deep:true
        },
        monomers:{
            handler(val){
                this.vm.columnList=val;
            },
            deep:true
        },
        tableDatas:{
            handler(val){
                this.lm.expands = []
                this.vm.tableData=val;
                this.lm.respAllData=val
                let arr = []
                this.vm.tableData.groups.forEach(item1 => {
                    arr.push(String(item1.id))
                })
                this.$nextTick(() => {
                    this.lm.expands = [...arr]
                })
            },
            deep:true
        }

    },
  mounted() {
      this.vm.columnList=this.monomers
        if(this.tableDatas!=undefined){
            this.vm.tableData=this.tableDatas;
            this.lm.respAllData=this.tableDatas;
            let arr = []
            this.vm.tableData.groups.forEach(item1 => {
                arr.push(String(item1.id))
            })
            this.$nextTick(() => {
                this.lm.expands = [...arr]
            })
        }
  }
}
</script>

<style lang="less" scoped>
  .all-check{
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
    .left-icon{
      margin-right: 80px;
    }
    .click-icon {
      display: inline-block;
      width: 12px;
      height: 14px;
      background: url(../../../assets/img/list-n.png);
      margin: 0 10px 0  0;
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
      .content{
        max-height: 254px;
        overflow: scroll;
        .head-brief{
          text-align: center;
          background-color: #F5F7FA;
          .title{
            padding: 10px;
          }
          .wrapper {
            div{
              text-align: left;
              box-sizing: border-box;
              padding: 10px;
              border-top: 1px  solid #EBEEF5;
              border-left: 1px  solid #EBEEF5;
              display: inline-block;    /* 如需支持IE8以下版本，用浮动来做 */
              width: calc(100% / 8.09);    /* 此处运用了一个css3的表达式，将div三等分，IE8及以上可以支持，当然也可以根据需要设置固定值 */
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
