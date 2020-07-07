<template>
  <div class="content">
    <div>
      <div class="title">
        <h5>单项工程钢筋单方含量走势图</h5>
        <div>
          <el-select v-model="echarts1Data.years" placeholder="请选择" style="width: 75px;" size="mini">
            <el-option v-for="item in yearOfExistence.echarts1" :key="item.years" :label="item.years" :value="item.years">
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
        <div id="single-fixture" style="height: 100%;"></div>
      </div>
    </div>
    <div>
      <div class="title">
        <h5>单项工程土建砌体单方含量走势图</h5>
        <div>
          <el-select v-model="echarts2Data.years" placeholder="请选择" style="width: 75px;" size="mini">
            <el-option v-for="item in yearOfExistence.echarts2" :key="item.years" :label="item.years" :value="item.years">
            </el-option>
          </el-select>
          <el-select v-model="echarts2Data.business1" size="mini" placeholder="请选择" style="width: 120px;" @change="accessToBusinessTwo(echarts2Data,'echarts2')">
            <el-option v-for="item in modus01.echarts2" :key="item.business1Id" :label="item.business1Name" :value="item.business1Id">
            </el-option>
          </el-select>
          <el-select v-show="echarts2Data.business2" v-model="echarts2Data.business2" size="mini" placeholder="请选择" style="width: 120px;">
            <el-option v-for="item in modus02.echarts2" :key="item.business2Id" :label="item.business2Name" :value="item.business2Id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="inner-data">
        <div id="single-masonry" style="height: 100%;"></div>
      </div>
    </div>
    <div>
      <div class="title">
        <h5>单项工程土建混凝土单方含量走势图</h5>
        <div>
          <el-select v-model="echarts3Data.years" placeholder="请选择" style="width: 75px;" size="mini">
            <el-option v-for="item in yearOfExistence.echarts3" :key="item.years" :label="item.years" :value="item.years">
            </el-option>
          </el-select>
          <el-select v-model="echarts3Data.business1" size="mini" placeholder="请选择" style="width: 120px;" @change="accessToBusinessTwo(echarts3Data,'echarts3')">
            <el-option v-for="item in modus01.echarts3" :key="item.business1Id" :label="item.business1Name" :value="item.business1Id">
            </el-option>
          </el-select>
          <el-select v-show="echarts3Data.business2" v-model="echarts3Data.business2" size="mini" placeholder="请选择" style="width: 120px;">
            <el-option v-for="item in modus02.echarts3" :key="item.business2Id" :label="item.business2Name" :value="item.business2Id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="inner-data">
        <div id="single-concrete" style="height: 100%;"></div>
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
      echarts1Data: {
        business1: '',
        business2: '',
        years: ''
      },
      echarts2Data: {
        business1: '',
        business2: '',
        years: ''
      },
      echarts3Data: {
        business1: '',
        business2: '',
        years: ''
      },
      modus01: {},
      modus02: {},
      yearOfExistence: {}
    }
  },
  watch: {
    'echarts1Data.business2': 'rebarChart',
    'echarts1Data.years': 'rebarChart',
    'echarts2Data.business2': 'civilEngineerinMasonryChart',
    'echarts2Data.years': 'civilEngineerinMasonryChart',
    'echarts3Data.business2': 'civilEngineerinConcreteChart',
    'echarts3Data.years': 'civilEngineerinConcreteChart'
  },
  methods: {
    // 建筑业态1  1：钢筋 2：土建 3：造价
    accessToBusinessOne (identifier) {
      api.accessToBusinessOne({ identifier }).then(res => {
        res.data.unshift({ business1Id: '', business1Name: '全部业态' })
        switch (identifier) {
          case 1:
            this.modus01['echarts1'] = res.data
            break
          case 2:
            this.modus01['echarts2'] = this.modus01['echarts3'] = res.data
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
    // 获取存在年份
    getTheYearOfExistence (identifier) {
      api.getTheYearOfExistence({ identifier }).then(res => {
        switch (identifier) {
          case 1:
            this.yearOfExistence['echarts1'] = res.data
            if (res.data.length) this.echarts1Data.years = res.data[res.data.length - 1].years
            break
          case 2:
            this.yearOfExistence['echarts2'] = this.yearOfExistence['echarts3'] = res.data
            if (res.data.length) this.echarts2Data.years = this.echarts3Data.years = res.data[res.data.length - 1].years
            break
        }
        this.$forceUpdate()
      })
    },
    drawEcharts1 (dataList) {
      var dom = document.getElementById('single-fixture')
      var myChart1 = echarts.init(dom)
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
            name: '(kg/㎡)',
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
        myChart1.setOption(option, true)
      }
      // 跟随改变
      window.addEventListener('resize', () => {
        myChart1.resize()
      })
    },
    drawEcharts2 (dataList) {
      var dom = document.getElementById('single-masonry')
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
            name: '(kg/㎡)',
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
    drawEcharts3 (dataList) {
      var dom = document.getElementById('single-concrete')
      var myChart3 = echarts.init(dom)
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
            name: '(kg/㎡)',
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
        myChart3.setOption(option, true)
      }
      // 跟随改变
      window.addEventListener('resize', () => {
        myChart3.resize()
      })
    },
    // 图1 单项工程钢筋单方含量走势图
    rebarChart () {
      api.rebarChart(this.echarts1Data).then(res => {
        this.drawEcharts1(res.data)
      })
    },
    // 图2 单项工程土建砌体单方含量走势图
    civilEngineerinMasonryChart () {
      api.civilEngineerinMasonryChart(this.echarts2Data).then(res => {
        this.drawEcharts2(res.data)
      })
    },
    // 图3 单项工程土建混凝土单方含量走势图
    civilEngineerinConcreteChart () {
      api.civilEngineerinConcreteChart(this.echarts3Data).then(res => {
        this.drawEcharts3(res.data)
      })
    }
  },
  mounted () {
    this.accessToBusinessOne(1) // 获取钢筋建筑业态
    this.accessToBusinessOne(2) // 获取土建建筑业态
    this.getTheYearOfExistence(1) // 获取钢筋存在年份
    this.getTheYearOfExistence(2) // 获取土建存在年份
    this.rebarChart()
    this.civilEngineerinMasonryChart()
    this.civilEngineerinConcreteChart()
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
      > h5 {
        font-size: 14px;
        color: #333;
        flex: 0 0 230px;
        margin-bottom: 5px;
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
<style scoped>
.year-pick >>> .el-input__inner {
  padding-right: 0;
}
</style>
