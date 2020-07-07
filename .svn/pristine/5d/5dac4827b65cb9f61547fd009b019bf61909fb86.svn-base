<!-- 规费税金检查 -->
<template>
  <div class="table">
    <el-table :max-height="maxHeight" @selection-change="handleSelectionChange" :data="vm.tableData"  ref="multipleTable"
              style="width: 100%;" :row-class-name="tableRowClassName" border empty-text="无更多数据！"
              row-key="id" :expand-row-keys='lm.expands' @expand-change="expandChange" :tree-props="{children: 'items', hasChildren: 'hasChildren'}" >
      <el-table-column v-if="sign==2" type="selection" :selectable='selectable'>
      </el-table-column>
      <el-table-column prop="name" label="费用名称/取费专业/单位工程名称">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column v-for="(item,index) in vm.proList" :key="index" :label="item.name">

        <el-table-column :prop="'rate-'+item.id" label="费率" width="" align="center">
          <template slot-scope="scope" v-if="scope.row['rate-'+item.id]">
            <span style="margin-right: 80px">{{scope.row['rate-'+item.id]}}</span>
            <el-tooltip v-if="scope.row['files-'+item.id]" class="item" effect="dark" :content="$parent.getFileNames(scope.row['files-'+item.id])" placement="right-start">
              <img src="@/assets/img/source.png" alt="" class="source-img">
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import { tableFolding } from '@/assets/js/tableFolding'
export default {
  props: [ 'maxHeight', 'sign','tableDatas','monomers','abnormal','comparedFinish'],
  data() {
    return {
        config:{dataType:"6"},
      lm: {
        tagData: [], //标记数组
          expands:[]
      },
      vm: {
        tableData: [],
          proList: []
      }
    }
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
                this.vm.proList=val;
            },
            deep:true
        },
        tableDatas:{
            handler(val){
                this.vm.tableData=val;
                let arr = []
                this.vm.tableData.forEach(item1 => {
                    arr.push(String(item1.id))
                    if(item1.items!=undefined){
                        item1.items.forEach(item2 => {
                            arr.push(String(item2.id))
                            if(item2.items!=undefined){
                                item2.items.forEach(item3 => {
                                    arr.push(String(item3.id))
                                })
                            }

                        })
                    }
                })
                this.$nextTick(() => {
                    this.lm.expands = [...arr]
                })
            },
            deep:true
        }

    },
    updated() {
        this.$nextTick(() => {
            this.tablefold('comprehensive')
        })
    },
  methods: {
      ...tableFolding(['tablefold']),
      expandChange(row, expanded) {
          let fineIndex = this.lm.expands.findIndex(data => data == row.id)
          // false 是收起 true是展开
          if (!expanded && fineIndex > -1) {
              this.lm.expands.splice(fineIndex, 1)
          }
      },
      selectable(row) {
          if (!row.result || row.result == 0) {
              return false
          } else {
              return true
          }
      },
    tableRowClassName({ row }) {
      if (row.subCR!=undefined && row.subCR != 0) {
          return 'warning-row'
      }
      if (row.result!=undefined && row.result != 0) {
        return 'warning-row'
      }

      if (this.abnormal==2) {
          if( row.result!=undefined && row.result == 0){
              return 'hidden'
          }else if(row.subCR!=undefined && row.subCR == 0){
              return 'hidden'
          }

      }
    },
      handleSelectionChange(val) {
          var payload={dataType:this.config.dataType};
          payload.type='select';
          payload.data=val
          this.$emit('childExceptData', payload);
      },

  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.table{
  /deep/.el-table {
    .warning-row {
      color: red;
    }
    .hidden {
      display: none;
    }
  }
}
</style>
