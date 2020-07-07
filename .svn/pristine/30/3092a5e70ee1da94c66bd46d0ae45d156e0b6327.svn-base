<!-- 总指标对比 -->
<template>
  <div class="table">
    <el-table :data="vm.tableData"  element-loading-text="正在加载" style="width: 100%"  :row-class-name="tableRowClassName"
              :max-height="maxHeight" empty-text="暂无数据！">
      <el-table-column type="index" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="name" label="项目名称" min-width="80" show-overflow-tooltip>
      </el-table-column>

      <el-table-column v-for="(item,index) in proList" :key="index" :label="item.name" align="center">
        <!-- sign:2标记、3调整 -->
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
            <template slot-scope="scope" v-if="sign==3||sign==2">
                <el-checkbox v-model="scope.row['select-'+item.id]"  @change="changevalue(scope.row,item.id,'select')" v-if="sign==2&&(scope.row['result-'+item.id]==1)"></el-checkbox>
                <el-checkbox v-model="scope.row['calc-'+item.id]"  @change="changevalue(scope.row,item.id,'calc')" v-if="sign==3&&(scope.row['result-'+item.id]!=2)"></el-checkbox>
            </template>
        </el-table-column>
        <el-table-column :prop="'costByArea-'+item.id" label="平方米造价(元/㎡)" width="150" show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <span>平方米造价(元/㎡)</span>
            <el-tooltip class="item" effect="dark" content="来源文件名称" placement="right-start">
              <img src="@/assets/img/source.png" alt="" class="source-img">
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <span :class="['data-span',{'red-color':`${scope.row['result-'+item.id]}`==1},{'underline-color':`${scope.row['calc-'+item.id]}`=='false'}]">{{`${scope.row['costByArea-'+item.id]}`}}</span>
            <el-tooltip class="item" effect="dark" :content="$parent.getFileNames(scope.row['files-'+item.id])" placement="right-start" v-if="scope.row['files-'+item.id]">
              <img src="@/assets/img/source.png" alt="" class="source-img">
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column :prop="'costPercent-'+item.id" label="造价比例(%)" width="">
        </el-table-column>
      </el-table-column>

      <el-table-column  label="最大值/最小值" min-width="80" v-if="sign==2">
        <el-table-column prop="caMinMax" label="平方米造价(元/㎡)" width="150" >
        </el-table-column>
        <el-table-column prop="cpMinMax" label="造价比例(%)">
        </el-table-column>
      </el-table-column>
      <el-table-column  label="平均值" min-width="80" v-if="sign==2">
        <el-table-column prop="caAvg" label="平方米造价(元/㎡)" width="150" >
        </el-table-column>
        <el-table-column prop="cpAvg" label="造价比例(%)" >
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  // abnormal:异常项,
  // sign 是否点击标记正常项 2标记正常项
  // monomers:单体列表
  props: ['maxHeight',  'tableDatas', 'monomers','sign','abnormal'],
  data() {
    return {
      proList: [], //工程名字列表
      vm: {
        tableData: []
      },
      lm: {
        calData: [],
        exceptData: []
      }
    }
  },
    updated() {
        this.$nextTick(() => {
            this.$parent.tablefold('compre')
        })
    },
  methods: {
      tableRowClassName({ row }) {
          if(row.result==0&&this.abnormal==2){
              return 'hidden'
          }
      },
      changevalue(row,columnId,type) {
          // select 标记正常项模式
          var payload={type:type};
          var exceptCell={id:row.id,columnId:columnId};
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
          if (index == -1) {
              arry.push(data);
          }else{
              arry.splice(index,1);
          }
          return arry;
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
            },
            deep:true
        }

    },
  mounted() {
      this.vm.tableData=this.tableDatas;
      this.proList=this.monomers
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
