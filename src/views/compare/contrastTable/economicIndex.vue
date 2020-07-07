<!-- 经济指标对比 -->
<template>
  <div class="table">
    <el-table :data="vm.tableData" style="width: 100%" :max-height="maxHeight"
              :row-class-name="tableRowClassName"  @expand-change="expandChange" :expand-row-keys='lm.expands'
              row-key="id" :tree-props="{children: 'items', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="项目名称" min-width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="unit" label="单位"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column v-for="(item,index) in proList" :key="index" :label="item.name" align="center">
        <el-table-column label="" width="70" align="center" v-if="sign==2||sign==3">
          <template slot="header" v-if="sign==2">
            <span>标记</span>
            <el-tooltip class="item" effect="dark" content="通过勾选误判的异常项，并点击“标记完成”。您可将系统误判的异常项更改为正常项。" placement="right-start">
              <img src="@/assets/img/normality.png" alt="" class="source-img">
            </el-tooltip>
          </template>
          <template slot="header" v-if="sign==3">
            <span>调整</span>
            <el-tooltip class="item" effect="dark" content="偏差基准中，平均值为所有选中数据的算术平均数。取消数据的勾选状态，并点击“调整完成”。取消选中状态的数据将不再参与平均值的计算。" placement="right-start">
              <img src="@/assets/img/normality.png" alt="" class="source-img">
            </el-tooltip>
          </template>
          <template slot-scope="scope" >
            <el-checkbox v-model="scope.row['select-'+item.id]"  @change="changevalue(scope.row,item.id,'select')" v-if="sign==2&&(scope.row['result-'+item.id]==1)"></el-checkbox>
            <el-checkbox v-model="scope.row['calc-'+item.id]"  @change="changevalue(scope.row,item.id,'calc')" v-if="sign==3&&(scope.row['result-'+item.id]!=2)"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column :prop="'costPerSquare-'+item.id" label="平方米造价(元/㎡)" width="" align="center">
            <template slot-scope="scope">
              <span :class="['data-span',{'red-color':`${scope.row['result-'+item.id]}`==1},{'underline-color':`${scope.row['calc-'+item.id]}`=='false'}]">{{`${scope.row['costPerSquare-'+item.id]}`}}</span>
                <el-tooltip class="item" effect="dark" :content="$parent.getFileNames(scope.row['files-'+item.id])" placement="right-start" v-if="scope.row['files-'+item.id]">
                    <img src="@/assets/img/source.png" alt="" class="source-img">
                </el-tooltip>
            </template>
        </el-table-column>
        <el-table-column :prop="'costRatio-'+item.id" label="造价比例(%)" width="" align="center">
        </el-table-column>
      </el-table-column>

      <el-table-column  label="最大值/最小值" min-width="80" v-if="sign==2">
        <el-table-column prop="crMinMax" label="平方米造价(元/㎡)" width="150" >
        </el-table-column>
        <el-table-column prop="csMinMax" label="造价比例(%)">
        </el-table-column>
      </el-table-column>
      <el-table-column  label="平均值" min-width="80" v-if="sign==2" >
        <el-table-column prop="crAvg" label="平方米造价(元/㎡)" width="150" >
        </el-table-column>
        <el-table-column prop="csAvg" label="造价比例(%)" >
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import { tableFolding } from '@/assets/js/tableFolding'
export default {
  // monomers:单体列表,tableDatas:表格数据
  props: ['maxHeight', 'monomers', 'tableDatas','sign','abnormal'],
  data() {
    return {
        config:{dataType:"2"},
      vm:{tableData: []},
        lm:{
            calData:[],
            exceptData:[],
            expands: [], //要展开的行
        },
      proList: [] //工程名字列表
    }
  },
    watch:{
        monomers:{
            handler(val){
                this.proList=val;
            },
            deep:true
        },
        tableDatas:{
            handler(val){
                this.vm.tableData=val;
                let arr = []
                this.vm.tableData.forEach(item1 => {
                    arr.push(String(item1.id))
                    item1.items.forEach(item2 => {
                        arr.push(String(item2.id))
                        item2.items.forEach(item3 => {
                            arr.push(String(item3.id))
                        })
                    })
                })
                this.$nextTick(() => {
                    this.lm.expands = [...arr]
                })
            },
            deep:true
        }

    },
  methods: {
      expandChange(row, expanded) {
          let fineIndex = this.lm.expands.findIndex(data => data == row.id)
          // false 是收起 true是展开
          if (!expanded && fineIndex > -1) {
              this.lm.expands.splice(fineIndex, 1)
          }
      },
      tableRowClassName({ row }) {
          if(row.subCR!=undefined){
              if(row.result==0&&this.abnormal==2&&row.subCR==0){
                  return 'hidden'
              }
          }else if(row.result==0&&this.abnormal==2){
              return 'hidden'
          }
      },
      changevalue(row,columnId,type) {
          // select 标记正常项模式
          var payload={dataType:this.config.dataType};
          var exceptCell={id:row.id,columnId:columnId};
          payload.type=type;
          var data;
          if(type=='select') {
              data=this.lm.exceptData
          }else if(type == 'calc') {
              data=this.lm.calData;
          }
          payload.data=this.pushData(row,data,exceptCell,type)
          this.$emit('childExceptData', payload);
      },
      pushData(row,arry,data,type){
          var index=arry.findIndex((value, index, arr) =>{
              return  value.id == data.id&&value.columnId==data.columnId
          } );
          var result=type=='select'?row[type+`-${data.columnId}`]:true
          if (result) {
              if (index == -1) {
                  arry.push(data);
              }
          }else{
              arry.splice(index,1);
          }
          return arry;
      }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
    .source-img {
        float: right;
        margin-top: 9px;
    }
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
  .data-span {
    display: inline-block;
    width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .red-color {
    color: red;
  }
  .underline-color {
    font-size: 12px;
    font-weight: 400;
    text-decoration: line-through;
    color: rgba(204, 204, 204, 1);
  }
</style>
