<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="container main">
      <div class="description">
        <div>{{currentItem.oldCode}}</div>
        <div>
          <p>{{currentItem.name}}</p>
        </div>
        <div>
          <i style="color: #A5A8AB;"><img src="@/assets/img/list.png" alt="" style="margin-right: 8px;">项目特征</i>
          <p style="margin-left: 24px;">{{currentItem.spec}}</p>
        </div>
        <!-- <div>
          <i style="color: #A5A8AB;"><img src="@/assets/img/gongcheng.png" alt="" style="margin-right: 8px;">工程内容</i>
          <p style="margin-left: 24px;">{{currentItem.content}}</p>
        </div> -->
        <div>
          <p style="text-align: right;"> <b style="font-size:18px;color:#F03D3D;">{{currentItem.cost}}</b> 元/{{currentItem.unit}}</p>
        </div>
      </div>
      <div class="tabulation">
        <div>
          <h5 class="table-desc">定额</h5>
          <el-table :data="normDtos" style="width: 100%" border stripe size="mini">
            <el-table-column prop="code" label="编码" width="150">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="390px">
            </el-table-column>
            <el-table-column prop="unit" label="单位" width="190">
            </el-table-column>
            <el-table-column prop="amount" label="工程量" width="190">
            </el-table-column>
            <el-table-column prop="cost" label="单价（元）" width="190">
            </el-table-column>
            <el-table-column prop="totalCost" label="合价（元）">
            </el-table-column>
          </el-table>
        </div>
        <div>
          <h5 class="table-desc">工料机汇总</h5>
          <el-table :data="materialMachineDtos" style="width: 100%" border stripe size="mini">
            <el-table-column prop="code" label="材料编码" width="150">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="390px">
            </el-table-column>
            <el-table-column prop="unit" label="单位" width="190">
            </el-table-column>
            <el-table-column prop="amount" label="数量" width="190">
            </el-table-column>
            <el-table-column prop="marketPrice" label="市场单价（元）">
            </el-table-column>
          </el-table>
        </div>
        <div>
          <h5 class="table-desc">综合单价构成</h5>
          <table cellspacing="0" cellpadding="0" class="table__body">
            <thead>
              <tr>
                <th>名称</th>
                <th>单价(元)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>人工费</td>
                <td>{{compPriceDtos.labor || ' -' }}</td>
              </tr>
              <tr>
                <td>普通材料费</td>
                <td>{{compPriceDtos.material || ' -' }}</td>
              </tr>
              <tr>
                <td>主材费</td>
                <td>{{compPriceDtos.mainMaterial  || ' -' }}</td>
              </tr>
              <tr>
                <td>设备费</td>
                <td>{{compPriceDtos.device  || ' -' }}</td>
              </tr>
              <tr>
                <td>机械费</td>
                <td>{{compPriceDtos.machinery  || ' -' }}</td>
              </tr>
              <tr>
                <td>管理和利润费</td>
                <td>{{compPriceDtos.manageAndProfit  || ' -' }}</td>
              </tr>
              <tr>
                <td>综合单价</td>
                <td>{{compPriceDtos.cost  || ' -' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb'
import api from '@/fetch/api'
export default {
  name: 'compDetail',
  components: {
    breadcrumb
  },
  data() {
    return {
      breadcrumbs: [{ name: '综合单价指标库', path: '/indicatorLibrary/comprehensive' }],
      currentItem: {}, //
      materialMachineDtos: [], // 工料机汇总
      normDtos: [], // 定额
      compPriceDtos: [] // 综合单价构成
      // compPriceName: [
      //   {name: '人工费'},{name: '材料费'},{name: '机械费'},{name: '直接工程费费'},{name: '设备'},{name: '管理和利润费'},{name: '综合单价'}
      // ]
    }
  },
  created() {
    this.bqItemDetail()
  },
  methods: {
    async bqItemDetail() {
      const { data: res } = await api.bqItemDetail({
        code: this.$route.params.code,
        unitProjectId: this.$route.params.id
      })
      this.currentItem = res.item
      this.normDtos = res.norms
      this.materialMachineDtos = res.resources
      this.compPriceDtos = res.composition
      // for (let key in res.composition) {
      //   var item = {};
      //   item[key] = res.composition[key]
      //   this.compPriceDtos.push(item)
      // }
      // for (var i=0;i<7;i++) {
      //   for(var key in this.compPriceDtos[i]) {
      //       this.compPriceName[i][key] = this.compPriceDtos[i][key]
      //   }
      // }
      this.breadcrumbs.push({ name: this.currentItem.oldCode + ' ' + this.currentItem.name, path: this.$route.fullPath })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container {
  box-sizing: border-box;
  &.main {
    padding: 21px 0;
  }
  .description {
    font-size: 12px;
    padding: 21px 165px 21px 30px;
    display: flex;
    align-items: center;
    background-color: #fff;
    > div {
      flex: 1;
      &:first-child {
        flex: 0 0 160px;
      }
      &:nth-child(2) {
        flex: 0 0 200px;
      }
    }
  }
  .tabulation {
    margin-top: 20px;
    > div {
      .table-desc {
        height: 40px;
        line-height: 40px;
        background-color: #f6f7fb;
        padding-left: 22px;
        color: #9ea2b2;
        font-weight: normal;
        border-left: 4px solid #91a2e8;
        border-right: 1px solid #ebeef5;
      }
    }
    .table__body {
      border: 1px solid #ebeef5;
      background-color: #fff;
      font-size: 12px;
      color: #606266;
      border-collapse: collapse;
      width: 100%;
      height: 30px;
      line-height: 30px;
      tr:nth-child(2n-2) {
        background-color: #f5f6f8;
      }
      th,
      td {
        border: 1px solid #ebeef5;
        padding-left: 10px !important;
      }
      th {
        text-align: left;
      }
      tr > td:first-child {
        width: 150px;
      }
    }
  }
}
</style>
