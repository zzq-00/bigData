<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <article class="container indicator-container">
      <div class="search-container">
        <search placeholder="搜索单项工程名称 / 指标属性" @searchClick="handleSearch"></search>
        <div @click="filterStatus = !filterStatus" class="filter-bar">
          <span>
            {{filterStatus?'收起过滤':'过滤查询'}}
          </span>
          <img src="../../../assets/img/Open.png" v-if="!filterStatus">
          <img src="../../../assets/img/Retract.png" v-else>
        </div>
        <el-collapse-transition>
          <section class="condition" v-show="filterStatus">
            <ul class="lists">
              <li>
                <location :defaultValue="defaultValue[0]" :HEIGHT="HEIGHT" @proviceChange="proviceChange" @cityChange="cityChange" @districtChange="districtChange"></location>
              </li>
              <li>
                <industry :HEIGHT="HEIGHT" :defaultValue="defaultValue[1]" @industryChange="industryChange"></industry>
              </li>
              <li v-if="params.industry">
                <category :HEIGHT="HEIGHT" :defaultValue="defaultValue[2]" @categoryChange="categoryChange" :id="params.industry"></category>
              </li>
              <li>
                <startTime :HEIGHT="HEIGHT" :time="startTimeData" :defaultValue="defaultValue[3]" @startTimeClick="startTimeClick"></startTime>
              </li>
              <li>
                <startTime :HEIGHT="HEIGHT" :time="endTimeData" :defaultValue="defaultValue[4]" @startTimeClick="endTimeClick"></startTime>
              </li>
              <li>
                <construction :HEIGHT="HEIGHT" :defaultValue="defaultValue[5]" @constructChange="constructChange"></construction>
              </li>
              <li>
                <norm :HEIGHT="HEIGHT" :defaultValue="defaultValue[6]" @normChange="normChange"></norm>
              </li>
            </ul>
            <transition name="heightest-item">
              <ul class="lists" v-show="heightItem">
                <li>
                  <buildarea :defaultValue="defaultValue[7]" @areaUpClick="areaUpClick" @areaBottomClick="areaBottomClick" @areaBaseClick="areaBaseClick"> </buildarea>
                </li>
                <li>
                  <buildheight :defaultValue="defaultValue[10]" @heightUpChange="heightUpChange" @heightDownChange="heightDownChange"></buildheight>
                </li>
                <li>
                  <buildModus :HEIGHT="HEIGHT" :defaultValue="defaultValue[12]" @modus01Change="modus01Change" @modus02Change="modus02Change"></buildModus>
                </li>
                <li>
                  <structType :HEIGHT="HEIGHT" :defaultValue="defaultValue[13]" @structChange="structChange"></structType>
                </li>
              </ul>
            </transition>
            <div class="height-item" @click="heightestClick">高级选项<i class="el-icon-arrow-down" :class="{'el-icon-arrow-up': heightItem}"></i></div>
          </section>
        </el-collapse-transition>
        <div class="res" v-if="resParamsCopy.length">
          <span class="title">全部结果：</span>
          <span class="clear" @click="clearParamsClick">清空所有</span>
          <el-tag v-if="item" v-for="(item, index) in resParamsCopy" :key="index" closable @close="handleClose(index)">{{item}}</el-tag>
        </div>
      </div>
      <!-- :pageData="page_size.currentPage" -->
      <indicatorKanban @indexData="indexData" :kanbanData="kanbanData"></indicatorKanban>
      <reslists :dataList="dataList" v-loading="dataWait" :searchWord="searchInput" :pageData.sync="page_size.page" @handlePage="handlePage" @handleSize="handleSize" @handlepricesort="handleSort" @handlestarttimesort="handleSort" @handleendtimesort="handleSort"></reslists>
    </article>
  </div>
</template>

<script>
import api from '@/fetch/api'
import breadcrumb from '@/components/breadcrumb'
import indicatorKanban from './indicatorKanban'

export default {
  name: 'singleLists',
  components: {
    breadcrumb,
    indicatorKanban,
    search: () => import('../components/search'),
    location: () => import('../components/location'),
    industry: () => import('../components/industry'),
    category: () => import('../components/category'),
    startTime: () => import('../components/starttime'),
    endTime: () => import('../components/endtime'),
    construction: () => import('../components/construction'),
    norm: () => import('../components/norm'),
    buildarea: () => import('../components/area'),
    buildheight: () => import('../components/height'),
    buildModus: () => import('../components/modus'),
    structType: () => import('../components/structtype'),
    reslists: () => import('./reslists')
  },
  data() {
    return {
      scroll: 0,
      filterStatus: false,
      dataList: {},
      dataWait: false,
      HEIGHT: '38px',
      searchInput: '',
      heightItem: false,
      defaultValue: [],
      startTimeData: {
        title: '开工日期：',
        id: 'start',
        placeholder: '请选择开始时间范围'
      },
      endTimeData: {
        title: '竣工日期：',
        id: 'end',
        placeholder: '请选择结束时间范围'
      },
      params: {
        locationParams: {
          provinceCode: '', // 省
          cityCode: '', // 市
          distinctCode: '', // 区县
          provinceName: '', // 省
          cityName: '', // 市
          distinctName: '' // 区县
        },
        industry: '',
        category: '',
        start: {
          value1: '',
          value2: ''
        },
        end: {
          value1: '',
          value2: ''
        },
        construct: '',
        norm: [],
        area: {
          upValue1: '',
          upValue2: '',
          bottomValue1: '',
          bottomValue2: '',
          baseValue1: '',
          baseValue2: ''
        },
        height: {
          up: '',
          down: '',
          upMax: '', // 1~3中的3
          upMin: '', // 1~3中的1
          downMax: '', // 大于等于3
          downMin: '' // 小于等于2
        },
        modus: {
          value1: '',
          name1: '',
          value2: ''
        },
        structType: ''
      },
      page_size: {
        page: 1,
        size: 10,
        projectEndSort: true
        // valueForOrder: ''
      },
      breadcrumbs: [{ name: '单项工程指标库', path: this.$route.fullPath }],
      resParams: [],
      onceFlag: false,
      kanbanData: {
        provinceName: '',
        indexdataName: '',
        civilData: {}, // 土建
        deliveryData: {} // 钢筋
      },
      kanbanParams: {
        // 指标看板数据
        indicatorId: '', // 指标类型id,
        region: '' // 指标看板选择的省份
      }
    }
  },
  methods: {
    // 看板往父组件传的值
    indexData(data) {
      if (data.name == '造价指标') {
        data.id = ['2f41c015f43f409f9778e5183da8416c', 'e4ecf980659c4025bebc8823b519f111']
        this.normChange(data.id, data.name)
      } else {
        this.normChange([data.id], data.name)
      }
      this.$set(this.defaultValue, 6, data.id)
    },
    // 获取看板数据 造价
    costHome() {
      api
        .costHome(this.kanbanParams)
        .then(res => {
          this.kanbanData.deliveryData = res.data
        })
        .catch(res => {})
    },
    // 获取看板数据 钢筋
    rebarSingleProjectlist() {
      api
        .rebarSingleProjectlist(this.kanbanParams)
        .then(res => {
          this.kanbanData.deliveryData = res.data
        })
        .catch(res => {})
    },
    // 获取看板数据 土建-砌体
    masonrySingleProjectlist() {
      api
        .masonrySingleProjectlist(this.kanbanParams)
        .then(res => {
          this.kanbanData.deliveryData = res.data
        })
        .catch(res => {})
    },
    // 获取看板数据 土建-混凝土
    concreteSingleProjectlist() {
      api
        .concreteSingleProjectlist(this.kanbanParams)
        .then(res => {
          this.kanbanData.civilData = res.data
        })
        .catch(res => {})
    },

    handleSearch(value) {
      this.searchInput = value
      this.page_size.page = 1
      let params = Object.assign(this.params, this.page_size)
      this.getTableList(params, true)
    },
    handleSize(val) {
      this.page_size.size = val
      // 强制回第一页的传值
      this.page_size.page = 1
      let params = Object.assign(this.params, this.page_size)
      this.getTableList(params)
    },
    handleSort(val, name) {
      if (name === 'price') {
        this.page_size.valueForOrder = val
      } else {
        this.page_size.valueForOrder = ''
      }
      if (name === 'starttime') {
        this.page_size.projectStartSort = val
      } else {
        this.page_size.projectStartSort = ''
      }
      if (name === 'endtime') {
        this.page_size.projectEndSort = val
      } else {
        this.page_size.projectEndSort = ''
      }
      this.page_size.page = 1
      let params = Object.assign(this.params, this.page_size)
      this.getTableList(params)
    },
    handlePage(val) {
      this.page_size.page = val
      let params = Object.assign(this.params, this.page_size)
      this.getTableList(params)
    },
    getTableList(pagesData, searchBox = false) {
      let paramsData = this.paramsTransform(pagesData, searchBox)
      this.dataWait = true
      api
        .getMonomerByCondition(paramsData)
        .then(res => {
          this.dataList = res.page
          this.dataWait = false
        })
        .catch(err => {
          this.dataWait = false
        })
    },
    // 将页面的数据转为后台需要的
    paramsTransform(pagesData, searchBox = false) {
      let data = {
        baseAreaMax: pagesData.area.baseValue2,
        baseAreaMin: pagesData.area.baseValue1,
        cityCode: pagesData.locationParams.cityCode,
        // "createAtSort": true, // 排序 true降序 false升序
        distinctCode: pagesData.locationParams.distinctCode,
        groundAreaMax: pagesData.area.upValue2,
        groundAreaMin: pagesData.area.upValue1,
        groundFloorsMax: pagesData.height.upMax,
        groundFloorsMin: pagesData.height.upMin,
        indicatorNameCodeList: pagesData.norm,
        industryBelongCode: pagesData.industry,
        page: pagesData.page,
        // "productTypeCode": pagesData.category,
        projectEndFirst: pagesData.end.value1,
        projectEndLast: pagesData.end.value2,
        // "projectEndSort": true, // 竣工时间排序
        projectNatureCode: pagesData.construct,
        projectStartFirst: pagesData.start.value1,
        projectStartLast: pagesData.start.value2,
        // "projectStartSort": true,
        projectTypeCode: pagesData.category,
        provinceCode: pagesData.locationParams.provinceCode,
        size: pagesData.size,
        valueForOrder: pagesData.valueForOrder,
        projectEndSort: pagesData.projectEndSort,
        projectStartSort: pagesData.projectStartSort,
        structType: pagesData.structType,
        structureForm1Code: pagesData.modus.value1,
        structureForm2Code: pagesData.modus.value2,
        undergroundAreaMax: pagesData.area.bottomValue2,
        undergroundAreaMin: pagesData.area.bottomValue1,
        undergroundFloors: pagesData.height.downMin,
        undergroundFloors3: pagesData.height.downMax,
        searchBox: searchBox,
        searchBoxKeyWord: this.searchInput
        // "userId": localStorage.userId
      }
      return data
    },
    clearParamsClick() {
      this.resParams.map((item, index) => {
        // 逐个清空 -- 好处：不能重写属性为空 缺点：调用接口太多
        if (item) {
          this.handleClose(index)
        }
      })
    },
    heightestClick() {
      this.heightItem = !this.heightItem
    },
    // 根据不同位置关闭标签和重置当前的”不限“
    handleClose(index) {
      switch (index) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 12:
        case 13:
          this.defaultValue[index] = 'true'
          this.$set(this.defaultValue, index, 'true')
          break
        case 7:
          this.defaultValue[index] = 'upValue'
          this.$set(this.defaultValue, index, 'upValue')
          break
        case 8:
          this.defaultValue[7] = 'bottomValue'
          this.$set(this.defaultValue, 7, 'bottomValue')
          break
        case 9:
          this.defaultValue[7] = 'baseValue'
          this.$set(this.defaultValue, 7, 'baseValue')
          break
        case 10:
          this.defaultValue[10] = 'upHeight'
          this.$set(this.defaultValue, 10, 'upHeight')
          break
        case 11:
          this.defaultValue[10] = 'downHeight'
          this.$set(this.defaultValue, 10, 'downHeight')
          break
        default:
          break
      }
    },
    updataTag(obj, index, value) {
      this.$set(obj, index, value)
      // 有选中值时，改变状态
      this.defaultValue[index] = false
      // hack 因为789在一个组件里
      if (index === 8 || index === 9) {
        this.defaultValue[7] = false
      }
      if (index === 11) {
        this.defaultValue[11] = false
      }
    },
    proviceChange(value, name) {
      this.kanbanParams.region = value || ''
      this.kanbanData.provinceName = name || '全部地区'
      this.kanbanData.deliveryData = {}
      this.kanbanData.civilData = {}
      switch (this.kanbanData.indexdataName) {
        case '造价指标':
          this.costHome() // 造价
          break
        case '土建算量指标':
          this.masonrySingleProjectlist() // 砌体
          this.concreteSingleProjectlist() // 混凝土
          break
        case '钢筋算量指标':
          this.rebarSingleProjectlist()
          break
        case '安装算量指标':
          break
        default:
          break
      }
      this.params.locationParams.provinceCode = value
      this.params.locationParams.cityCode = ''
      this.params.locationParams.distinctCode = ''
      this.params.locationParams.provinceName = name
      this.updataTag(this.resParams, 0, name)
    },
    cityChange(value, name) {
      this.params.locationParams.cityCode = value
      this.params.locationParams.distinctCode = ''
      let provinceName = this.params.locationParams.provinceName
      this.params.locationParams.cityName = name
      let tagValue
      if (name) {
        tagValue = provinceName + '-' + name
      } else {
        tagValue = provinceName
      }
      this.updataTag(this.resParams, 0, tagValue)
    },
    districtChange(value, name) {
      this.params.locationParams.distinctCode = value
      let provinceName = this.params.locationParams.provinceName
      let cityName = this.params.locationParams.cityName
      let tagValue
      if (name) {
        tagValue = provinceName + '-' + cityName + '-' + name
      } else {
        tagValue = provinceName + '-' + cityName
      }
      this.updataTag(this.resParams, 0, tagValue)
    },
    industryChange(value, name) {
      this.params.industry = value
      this.updataTag(this.resParams, 1, name)
      // 行业和类别相关联
      if (!value) {
        this.params.category = value
        this.updataTag(this.resParams, 2, name)
      }
    },
    categoryChange(value, name) {
      this.params.category = value
      this.updataTag(this.resParams, 2, name)
    },
    startTimeClick(value) {
      if (value.length) {
        this.params.start.value1 = value[0]
        this.params.start.value2 = value[1]
        this.updataTag(this.resParams, 3, value[0] + '-' + value[1])
      } else {
        this.params.start.value1 = ''
        this.params.start.value2 = ''
        this.updataTag(this.resParams, 3, '')
      }
    },
    endTimeClick(value) {
      if (value.length) {
        this.params.end.value1 = value[0]
        this.params.end.value2 = value[1]
        this.updataTag(this.resParams, 4, value[0] + '-' + value[1])
      } else {
        this.params.end.value1 = ''
        this.params.end.value2 = ''
        this.updataTag(this.resParams, 4, '')
      }
    },
    constructChange(value, name) {
      this.params.construct = value
      this.updataTag(this.resParams, 5, name)
    },
    normChange(value, name, implement) {
      this.params.norm = value
      this.kanbanData.indexdataName = name
      this.kanbanData.deliveryData = {}
      this.kanbanData.civilData = {}
      switch (name) {
        case '造价指标':
          this.kanbanParams.indicatorId = value[0] + ',' + value[1]
          this.costHome() // 造价
          break
        case '土建算量指标':
          this.kanbanParams.indicatorId = value[0]
          this.masonrySingleProjectlist() // 砌体
          this.concreteSingleProjectlist() // 混凝土
          break
        case '钢筋算量指标':
          this.kanbanParams.indicatorId = value[0]
          this.rebarSingleProjectlist()
          break
        case '安装算量指标':
          break

        default:
          break
      }
      // if (!implement) {
      this.updataTag(this.resParams, 6, name)
      // }
    },
    /* 建筑面积 */
    areaUpClick(value1, value2) {
      this.params.area.upValue1 = value1
      this.params.area.upValue2 = value2
      if (value1 && value2) {
        this.updataTag(this.resParams, 7, '地上面积：' + value1 + '-' + value2)
      } else {
        this.updataTag(this.resParams, 7, '')
      }
    },
    areaBottomClick(value1, value2) {
      this.params.area.bottomValue1 = value1
      this.params.area.bottomValue2 = value2
      if (value1 && value2) {
        this.updataTag(this.resParams, 8, '地下面积：' + value1 + '-' + value2)
      } else {
        this.updataTag(this.resParams, 8, '')
      }
    },
    areaBaseClick(value1, value2) {
      this.params.area.baseValue1 = value1
      this.params.area.baseValue2 = value2
      if (value1 && value2) {
        this.updataTag(this.resParams, 9, '基础面积：' + value1 + '-' + value2)
      } else {
        this.updataTag(this.resParams, 9, '')
      }
    },
    heightUpChange(value, name, min = null, max = null) {
      this.params.height.up = value
      this.params.height.upMin = min
      this.params.height.upMax = max
      this.updataTag(this.resParams, 10, name)
    },
    heightDownChange(value, name, floor = null) {
      this.params.height.down = value
      if (floor >= 3) {
        this.params.height.downMax = floor
        this.params.height.downMin = ''
      } else {
        this.params.height.downMax = ''
        this.params.height.downMin = floor
      }
      this.updataTag(this.resParams, 11, name)
    },
    modus01Change(value, name) {
      this.params.modus.value1 = value
      this.params.modus.value2 = ''
      this.params.modus.name1 = name
      this.updataTag(this.resParams, 12, name)
    },
    modus02Change(value, name) {
      let tagValue
      // 建筑业态必须要第一个先有值
      if (this.params.modus.value1) {
        this.params.modus.value2 = value
        let name1 = this.params.modus.name1
        if (name) {
          tagValue = name1 + '-' + name
        } else {
          tagValue = name1
          this.params.modus.value2 = ''
        }
      } else {
        tagValue = ''
      }
      this.updataTag(this.resParams, 12, tagValue)
    },
    structChange(value, name) {
      this.params.structType = value
      this.updataTag(this.resParams, 13, name)
    },
    handleScroll() {
      this.scroll = document.documentElement && document.documentElement.scrollTop
    }
  },
  computed: {
    resParamsCopy: function() {
      let newValue = []
      let flag = false
      newValue = this.resParams.map(item => {
        if (item) {
          flag = true
          return item
        }
      })
      if (!flag) {
        return []
      }
      return newValue
    }
  },
  watch: {
    resParams: {
      handler(newValue) {
        // 将页面的数据转为后台需要的
        this.page_size.page = 1
        let params = Object.assign(this.params, this.page_size)
        if (!this.onceFlag) {
          this.getTableList(params)
        } else {
          // 作用：为了防止第一次进入时加载
          this.onceFlag = false
        }
      }
    }
  },
  mounted() {
    /*  let params = Object.assign(this.params, this.page_size)
    this.getTableList(params) */
    this.resParams = new Array(11)
    this.onceFlag = true
  },
  activated() {
    let params = Object.assign(this.params, this.page_size)
    this.getTableList(params)
    if (this.scroll >= 0) {
      window.scrollTo(0, this.scroll)
      this.scroll = 0
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  deactivated() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="less" scoped>
.search-container {
  padding: 15px 0 0 0;
}
.indicator-container {
  box-sizing: border-box;
  // background: #fff;
  // border: 1px solid #E2E8F7;
  .filter-bar {
    // color: #69789E;
    color: #666;
    font-size: 14px;
    height: 36px;
    line-height: 36px;
    display: inline-block;
    > span {
      cursor: pointer;
      vertical-align: middle;
    }
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .condition {
    margin-bottom: 20px;
    background-color: #f7f8f9;
    &:after {
      content: '';
      display: table;
      clear: both;
    }
    li {
      padding: 0 16px;
      border-bottom: 1px solid #eff2f9;
    }
  }
  .height-item {
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #666;
    font-size: 12px;
    cursor: pointer;
  }
  .heightest-item-enter-active,
  .heightest-item-leave-active {
    transition: opacity 0.3s ease;
  }
  .heightest-item-enter, .heightest-item-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
    height: 0;
  }
  .res {
    margin-bottom: 20px;
    .title {
      color: #666;
      font-size: 12px;
    }
    .clear {
      cursor: pointer;
      display: inline-block;
      height: 100%;
      color: #ed4542;
      border: 1px #ed4542 dashed;
      border-radius: 4px;
      padding: 5px 10px;
    }
    .el-tag {
      margin-left: 10px;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
