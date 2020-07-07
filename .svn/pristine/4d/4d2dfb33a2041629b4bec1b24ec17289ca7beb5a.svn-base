<template>
  <div class="self-table scroll-table">
    <el-table :data="indexData" border v-loading="loading" stripe :class="{'fixedHeader': headerFixed}">
      <el-table-column label="名称及规格" align="center" width="270">
        <template slot-scope="scope">
          <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
            <p class='col level1'>
              <span class="table-cell">
                <input type="button" v-model="status1[index]" class="inputBtn" @click="changestatus(item,index)">
                <span :title="item.unitProjectName">{{item.unitProjectName}}</span>
              </span>
            </p>
            <div v-for="(items,index2) in item.priceClassList" :key="index2" v-if="item.isshow">
              <p class='col levelS'>
                <span class="table-cell" :title="items.className">
                  <input type="button" v-model="items.status2" class="inputBtn" @click="changestatus2(items,index,index2)">{{items.className}}
                </span>
              </p>
              <div v-for="(itemss,index) in items.priceList" :key="index" v-if="items.isshow">
                <p class='col levelT'>
                  <span class="table-cell" v-if="itemss.nameAndSpecification||itemss.nameAndSpecification!=null" :title="itemss.nameAndSpecification">{{itemss.nameAndSpecification}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
              </div>
            </div>
          </div>

        </template>
      </el-table-column>
      <el-table-column label="单位" prop="specialityName" align="center">
        <template slot-scope="scope">
          <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
            <p class='col centers'>
              <span class="table-cell">--</span>
            </p>
            <div v-for="(items,index) in item.priceClassList" :key="index" v-if="item.isshow">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(itemss,index) in items.priceList" :key="index" v-if="items.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="itemss.unit||itemss.unit!=null">{{itemss.unit}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center">
        <template slot-scope="scope">
          <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
            <p class='col centers'>
              <span class="table-cell">--</span>
            </p>
            <div v-for="(items,index) in item.priceClassList" :key="index" v-if="item.isshow">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(itemss,index) in items.priceList" :key="index" v-if="items.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="itemss.amount||itemss.amount!=null">{{itemss.amount}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="预算价" align="center">
        <template slot-scope="scope">
          <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
            <p class='col centers'>
              <span class="table-cell">--</span>
            </p>
            <div v-for="(items,index) in item.priceClassList" :key="index" v-if="item.isshow">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(itemss,index) in items.priceList" :key="index" v-if="items.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="itemss.budgetPrice||itemss.budgetPrice!=null">{{itemss.budgetPrice}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="市场价" align="center">
        <template slot-scope="scope">
          <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
            <p class='col centers'>
              <span class="table-cell">--</span>
            </p>
            <div v-for="(items,index) in item.priceClassList" :key="index" v-if="item.isshow">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(itemss,index) in items.priceList" :key="index" v-if="items.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="itemss.marketPrice||itemss.marketPrice!=null">{{itemss.marketPrice}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="预算价合计" align="center">
        <template slot-scope="scope">
          <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
            <p class='col centers'>
              <span class="table-cell">--</span>
            </p>
            <div v-for="(items,index) in item.priceClassList" :key="index" v-if="item.isshow">
              <p class='col centers'>
                <span class="table-cell">{{items.totalBudgetPrice}}</span>
              </p>
              <div v-for="(itemss,index) in items.priceList" :key="index" v-if="items.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="itemss.totalBudgetPrice||itemss.totalBudgetPrice!=null">{{itemss.totalBudgetPrice}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="市场价合计" align="center">
        <template slot-scope="scope">
          <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
            <p class='col centers'>
              <span class="table-cell">--</span>
            </p>
            <div v-for="(items,index) in item.priceClassList" :key="index" v-if="item.isshow">
              <p class='col centers'>
                <span class="table-cell">{{items.totalMarketPrice}}</span>
              </p>
              <div v-for="(itemss,index) in items.priceList" :key="index" v-if="items.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="itemss.totalMarketPrice||itemss.totalMarketPrice!=null">{{itemss.totalMarketPrice}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="每平方消耗量" align="center">
        <template slot-scope="scope">
          <div class="second-title" v-for="(item,index) in scope.row.unitProjectList" :key="index">
            <p class='col centers'>
              <span class="table-cell">--</span>
            </p>
            <div v-for="(items,index) in item.priceClassList" :key="index" v-if="item.isshow">
              <p class='col centers'>
                <span class="table-cell">--</span>
              </p>
              <div v-for="(itemss,index) in items.priceList" :key="index" v-if="items.isshow">
                <p class='col centers'>
                  <span class="table-cell" v-if="itemss.consumptionPeSquareMeter||itemss.consumptionPeSquareMeter!=null">{{itemss.consumptionPeSquareMeter}}</span>
                  <span class="table-cell" v-else>--</span>
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  props: ['message', 'fixTabs'],
  data () {
    return {
      headerFixed: false,
      params: {
        flag: 3,
        monomerId: (() => this.$route.params.monomerId)()
      }, // 请求参数
      id: '', // 地址栏参数id
      indexData: [], // 请求到的数据
      status1: [],
      loading: true, // 加载动画
      maxHeight: window.innerHeight - 500,
      oneDataList: [], // 人材机一级
      twoDataList: [], // 人材机二级
      threeDataList: [], // 人材机三级
      fourDataList: [] // 人材机四级
    }
  },
  methods: {
    // 控制一级折叠
    changestatus (item, index) {
      if (this.status1[index] == '+') {
        this.$set(this.status1, index, '-')
        item.isshow = true
        return
      }
      if (this.status1[index] == '-') {
        this.$set(this.status1, index, '+')
        item.isshow = false
      }
    },
    // 控制二级折叠
    changestatus2 (items, index, index2) {
      if (items.status2 == '+') {
        items.status2 = '-'
        this.humanMachineFour(items.classId, items.buildingId).then(res => {
          this.indexData[0].unitProjectList[index].priceClassList[index2].priceList = this.fourDataList
          this.$set(this.indexData[0].unitProjectList, index, this.indexData[0].unitProjectList[index])
        })
        items.isshow = true
        return
      }
      if (items.status2 == '-') {
        items.status2 = '+'
        this.indexData[0].unitProjectList[index].priceClassList[index2] = items
        this.$set(this.indexData[0].unitProjectList, index, this.indexData[0].unitProjectList[index])
        items.isshow = false
      }
    },
    // 人材机第1级
    humanMachineOne () {
      return new Promise((resolve, relect) => {
        api
          .humanMachineOne({ monomerId: this.$route.params.monomerId })
          .then(res => {
            if (res.data) {
              this.oneDataList = res.data
              this.loading = false
              this.status1 = []
              this.indexData = this.oneDataList
            } else {
              this.loading = false
            }
            resolve(this.indexData)
          })
          .catch(res => {
            this.loading = false
          })
      })
    },
    // 请求第1.1级数据
    humanMachineTwo () {
      return new Promise((resolve, relect) => {
        if (this.oneDataList[0]) {
          api.humanMachineTwo({ monomerId: this.oneDataList[0].buildingId }).then(res => {
            this.twoDataList = res.data
            if (res.data) {
              this.twoDataList.map((item, index) => {
                item.isshow = true
                this.$set(this.status1, index, '-')
              })
              this.indexData[0].unitProjectList = this.twoDataList
            }
            resolve(this.twoDataList)
          })
        } else {
          this.loading = false
        }
      })
    },
    // 请求第2级数据
    humanMachineThree () {
      if (this.oneDataList[0].unitProjectList) {
        this.oneDataList[0].unitProjectList.map((item, index) => {
          let data = {
            unitProjectId: item.unitProjectId
          }
          api.humanMachineThree(data).then(res => {
            this.threeDataList = res.data
            if (this.threeDataList) {
              this.threeDataList.map((items, indexs) => {
                items.isshow = false
                items.status2 = '+'
              })
            }
            this.oneDataList[0].unitProjectList[index].priceClassList = this.threeDataList
          })
        })
      }
    },
    // 请求第3级数据
    humanMachineFour (classId, buildingId) {
      return new Promise((resolve, relect) => {
        if (classId && buildingId) {
          let data = {
            classId: classId,
            monomerId: buildingId
          }
          api.humanMachineFour(data).then(res => {
            this.fourDataList = res.data
            resolve(this.fourDataList)
          })
        }
      })
    }
  },
  mounted () {
    this.humanMachineOne().then(res => {
      this.humanMachineTwo().then(res => {
        this.humanMachineThree()
      })
    })
  },
  watch: {
    fixTabs (val) {
      this.headerFixed = val
    }
  }
}
</script>
<style lang="less" scoped>
.inputBtn {
  width: 12px;
  height: 12px;
  line-height: 12px;
  border: 1px solid #d8e0f5;
  text-align: center;
  margin: 0px 5px 0 0;
  cursor: pointer;
  float: left;
  color: #4474cf;
  background-color: #fff;
}
.table-cell {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  max-height: 30px;
  height: 30px;
  padding: 0 10px;
  line-height: 13px;
}
.col {
  border-bottom: 1px solid #ccc;
  max-height: 30px;
  overflow: hidden;
}
.centers {
  display: table;
  width: 100%;
  text-align: center;
}
.level1 {
  padding-left: 20px;
}
.levelS {
  padding-left: 40px;
}
.levelT {
  padding-left: 60px;
}
</style>

<style lang="less">
.self-table .el-table .cell {
  line-height: 16px;
  padding: 0;
}
.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding-left: 0;
}
.self-table .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #fff;
}
.self-table .el-table td,
.el-table th.is-leaf {
  // border-bottom: none;
}
.self-table .el-table td {
  padding: 0;
}
</style>
<style scoped>
.self-table >>> .el-table th {
  background: #fafafb;
  color: #888;
  font-size: 12px;
  height: 30px;
  padding: 0;
  font-weight: bold;
}
.self-table >>> .el-table__row td {
  padding: 0;
  height: 30px;
  font-size: 12px;
  font-weight: 400;
}
.self-table >>> .el-table th.gutter {
  display: table-cell !important;
}
.self-table >>> .el-table--enable-row-hover .el-table__body tr:hover > td {
  background: #fff !important;
}
</style>
