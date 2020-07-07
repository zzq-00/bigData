<template>
  <div class="content">
    <div>
      <div class="title" id="titles">
        <div style="display: flex;flex: 0 0 385px;margin-bottom:5px;">
          <h5>单项工程单方造价走势</h5>
          <div style="border-left: 1px solid #DEDEDE;padding-left: 22px;margin-left: 22px;">
            <el-radio v-model="typeShow" label="1">图形展示</el-radio>
            <el-radio v-model="typeShow" label="2">表单展示</el-radio>
          </div>
        </div>
        <div>
          <el-select v-model="echarts1Data.years" placeholder="请选择" style="width: 75px;" size="mini">
            <el-option v-for="item in yearOfExistence" :key="item.years" :label="item.years" :value="item.years">
            </el-option>
          </el-select>
          <el-select v-model="echarts1Data.business1" size="mini" placeholder="请选择" style="width: 120px;" @change="accessToBusinessTwo(echarts1Data,'echarts1')">
            <el-option v-for="item in modus01.echarts1" :key="item.business1Id" :label="item.business1Name" :value="item.business1Id">
            </el-option>
          </el-select>
          <el-select v-show="echarts1Data.business2" v-model="echarts1Data.business2" size="mini" placeholder="请选择" style="width: 120px;">
            <el-option v-for="item in modus02.echarts1" :key="item.business2Id" :label="item.business2Name" :value="item.business2Id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="inner-data">
        <div id="single-cost" style="height: 100%;" v-show="typeShow === '1'"></div>
        <div v-if="typeShow === '2'">
          <el-table :data="tableData" :height="tableHeight" tooltip-effect="dark" border fit>
            <el-table-column type="index" label="" fixed>
            </el-table-column>
            <el-table-column prop="provinceName" label="地区" fixed>
            </el-table-column>
            <el-table-column show-overflow-tooltip min-width="100" :label="item.month" :prop="'monthlyContent'+index" v-for="(item,index) in tableData[0].monthlyUnilateralContent" :key="index">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div>
      <div class="title">
        <h5>综合单价价格走势</h5>
        <div>
          <el-select v-model="echarts2Data.years" placeholder="请选择" style="width: 75px;" size="mini">
            <el-option v-for="item in yearOfExistence" :key="item.years" :label="item.years" :value="item.years">
            </el-option>
          </el-select>
          <el-select v-model="echarts2Data.code" size="mini" placeholder="请选择" style="width: 120px;">
            <el-option v-for="item in unitpriceList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="inner-data" v-loading="loading">
        <div id="Comprehensive-price" style="height: 100%;"></div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
import echarts from 'echarts'
export default {
  data () {
    return {
      typeShow: '1',
      tableData: [{ monthlyUnilateralContent: [] }],
      echarts1Data: {
        business1: '',
        business2: '',
        years: ''
      },
      echarts2Data: {
        code: '',
        years: ''
      },
      modus01: {},
      modus02: {},
      unitpriceList: [],
      loading: true,
      tableHeight: 0,
      yearOfExistence: []
    }
  },
  watch: {
    typeShow: 'calculation',
    'echarts1Data.business2': 'singleProjectUnilateralCostChart',
    'echarts1Data.years': 'singleProjectUnilateralCostChart',
    'echarts2Data.code': 'homeUnilateralCostChart',
    'echarts2Data.years': 'homeUnilateralCostChart'
  },
  methods: {
    // 计算table 的高度
    calculation () {
      let boxHeight = document.getElementsByClassName('content')[2].clientHeight
      let titleHeight = document.getElementById('titles').clientHeight
      this.tableHeight = boxHeight - titleHeight - 10 - 36 + 'px'
    },
    // 建筑业态1  1：钢筋 2：土建 3：造价
    accessToBusinessOne (identifier) {
      api.accessToBusinessOne({ identifier }).then(res => {
        res.data.unshift({ business1Id: '', business1Name: '全部业态' })
        switch (identifier) {
          case 3:
            this.modus01['echarts1'] = res.data
            break
        }
        this.$forceUpdate()
      })
    },
    // 根据建筑业态1找建筑业态2
    accessToBusinessTwo (echartsData, type) {
      if (echartsData.business1 === '') return (echartsData.business2 = '')
      let identifier
      switch (type) {
        case 'echarts1':
          identifier = 1
          break
        case 'echarts2':
        case 'echarts3':
          identifier = 2
          break
      }
      api.accessToBusinessTwo({ businessId: echartsData.business1, identifier }).then(res => {
        this.modus02[type] = res.data
        echartsData.business2 = res.data[0].business2Id
        this.$forceUpdate()
      })
    },
    // 综合单价下拉
    integratedUnitPriceDrop () {
      api.integratedUnitPriceDrop().then(res => {
        this.unitpriceList = res.data
        this.echarts2Data.code = res.data[0].code
      })
    },
    // 获取存在年份
    getTheYearOfExistence (identifier) {
      api.getTheYearOfExistence({ identifier }).then(res => {
        this.yearOfExistence = res.data
        if (res.data.length) this.echarts1Data.years = this.echarts2Data.years = res.data[res.data.length - 1].years
      })
    },
    drawEcharts1 (dataList) {
      let dom = document.getElementById('single-cost')
      let myChart1 = echarts.init(dom)
      dataList.forEach(item => {
        item.name = item.provinceName
        item.type = 'line'
        item.data = item.monthlyUnilateralContent.map(ele => ele.monthlyContent)
      })
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          right: 0,
          show: true,
          orient: 'horizontal',
          itemWidth: 13,
          itemHeight: 13,
          itemGap: 23,
          icon: 'stack',
          textStyle: { color: '#666', fontSize: 12, fontWeight: 400 },
          data: dataList.map(item => item.provinceName)
        },
        grid: {
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: Array.isArray(dataList) && dataList.length && dataList[0].monthlyUnilateralContent.map(item => item.month.slice(-2) + '月')
        },
        yAxis: {
          type: 'value',
          name: '(元/㎡)',
          // nameTextStyle: {
          //   padding: [0, 50, 0, 0]
          // },
          splitLine: false
        },
        color: ['#3AA5FF', '#8398F3', '#01D3AB', '#FFBE40', '#575960'],
        series: dataList
      }
      if (option && typeof option === 'object') {
        myChart1.setOption(option, true)
      }
      window.addEventListener('resize', () => {
        myChart1.resize()
      })
    },
    drawEcharts2 (dataList) {
      let dom = document.getElementById('Comprehensive-price')
      var myChart2 = echarts.init(dom)
      dataList.forEach(item => {
        item.name = item.provinceName
        item.type = 'bar'
        item.data = item.monthlyUnilateralContent.map(ele => ele.monthlyContent)
      })
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          right: 0,
          data: dataList.map(item => item.provinceName)
        },
        grid: {
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: Array.isArray(dataList) && dataList.length && dataList[0].monthlyUnilateralContent.map(item => item.month.slice(-2) + '月')
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '(元/㎡)',
            // min: 0,
            // max: 250,
            // interval: 50,
            // nameTextStyle: {
            //   padding: [0, 50, 0, 0]
            // },
            splitLine: false,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: dataList,
        color: ['#3AA5FF', '#8398F3', '#01D3AB', '#FFBE40', '#575960']
      }
      if (option && typeof option === 'object') {
        myChart2.setOption(option, true)
      }
      // 跟随改变
      window.addEventListener('resize', () => {
        myChart2.resize()
      })
    },
    // 单项工程单方造价走势
    singleProjectUnilateralCostChart () {
      api.singleProjectUnilateralCostChart(this.echarts1Data).then(res => {
        this.drawEcharts1(res.data)
        this.tableData = res.data
        res.data.map((item, index) => {
          item.monthlyUnilateralContent.forEach((ele, indexs) => {
            this.$set(this.tableData[index], 'monthlyContent' + indexs, ele.monthlyContent)
          })
        })
      })
    },
    // 综合单价价格走势
    homeUnilateralCostChart () {
      this.loading = true
      api.homeUnilateralCostChart(this.echarts2Data).then(res => {
        this.drawEcharts2(res.data)
        this.loading = false
      })
    }
  },
  mounted () {
    // this.calculation()
    this.accessToBusinessOne(3) // 获取造价建筑业态
    this.getTheYearOfExistence(3) // 获取造价存在年份
    this.integratedUnitPriceDrop()
    this.singleProjectUnilateralCostChart()
    this.homeUnilateralCostChart()
  }
}
</script>
<style lang="less" scoped>
.content {
  display: flex;
  justify-content: space-between;
  height: 400px;
  margin-top: 10px;
  > div {
    box-sizing: border-box;
    flex: 1;
    height: 100%;
    background-color: #fff;
    padding: 18px 21px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    & + div {
      margin-left: 10px;
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      h5 {
        font-size: 14px;
        color: #333;
      }
    }
    .inner-data {
      flex: 1;
      padding-top: 10px;
      box-sizing: border-box;
    }
  }
}
</style>
