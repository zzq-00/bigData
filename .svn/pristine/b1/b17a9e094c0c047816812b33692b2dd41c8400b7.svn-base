<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <article class="container details-container">
      <div class="a-list">
        <p class="title" v-html="baseInfo.monomerName"></p>
        <ul class="sub-lists">
          <ul class="sub-list">
            <li>
              <i class="icon01"></i>
              <span class="text" :title="projectInfo.provinceName+projectInfo.cityName+projectInfo.distinctName">地址：{{projectInfo.provinceName}}/{{projectInfo.cityName}}
                <span v-if="projectInfo.distinctName">/{{projectInfo.distinctName}}</span>
              </span>
            </li>
            <li>
              <i class="icon05"></i>
              <span class="text" :title="'开工/竣工日期：'+baseInfo.projectStart+'/'+baseInfo.projectEnd">开工/竣工日期：{{baseInfo.projectStart}}<span v-if="baseInfo.projectEnd">/{{baseInfo.projectEnd}}</span>
              </span>
            </li>
          </ul>
          <ul class="sub-list sub-list-big">
            <li class="row-inline">
              <i class="icon02"></i>
              <div class="col-first">
                <p class="text" :title="'建筑面积：'+baseInfo.monomerArea">建筑面积：{{baseInfo.monomerArea}}㎡；</p>
                <p class="text" :title="'地上面积：'+baseInfo.groundArea">地上面积：{{baseInfo.groundArea}}㎡；</p>
              </div>
            </li>
            <li class="row-inline">
              <div>
                <p class="text" :title="'基础面积：' + baseInfo.baseArea">基础面积：{{baseInfo.baseArea}}㎡；</p>
                <p class="text" :title="'地下面积：' + baseInfo.undergroundArea">地下面积：{{baseInfo.undergroundArea}}㎡；</p>
              </div>
            </li>
          </ul>
          <ul class="sub-list sub-list-small">
            <li>
              <i class="icon03"></i>
              <span class="text" :title="'层数：地上'+baseInfo.groundFloors+'层，地下'+baseInfo.undergroundFloors">
                层数：地上<span v-html="baseInfo.groundFloors"></span>层，地下<span v-html="baseInfo.undergroundFloors"></span>层</span>
            </li>
            <li>
              <i class="icons"></i>
              <span class="text" :title="'建筑业态：' + baseInfo.structureForm1 + baseInfo.structureForm2">建筑业态：<span v-html="baseInfo.structureForm1"></span><span v-if="baseInfo.structureForm2" v-html="'/'+baseInfo.structureForm2"></span></span>
            </li>
          </ul>
          <ul class="sub-list sub-list-small">
            <li>
              <i class="icon04"></i>
              <span class="text" :title="'指标类型：'+baseInfo.indicatorName">指标类型：
                <span class="flag-cost" v-if="baseInfo.indicatorName === '造价指标'">造价</span>
                <span class="flag-install" v-else-if="baseInfo.indicatorName === '安装算量指标'">安装</span>
                <span class="flag-civil" v-else-if="baseInfo.indicatorName === '土建算量指标'">土建</span>
                <span class="flag-steel" v-else-if="baseInfo.indicatorName === '钢筋算量指标'">钢筋</span>
                <span v-else-if="baseInfo.indicatorName === '安装算量&造价指标'">
                  <span class="flag-cost">造价</span>
                  <span class="flag-install">安装</span>
                </span>
                <span v-else class="flag-cost" v-html="baseInfo.indicatorName"></span>
              </span>
            </li>
            <li>
              <i class="icons"></i>
              <span class="text" :title="'结构类型：' + baseInfo.structType">结构类型：<span v-html="baseInfo.structType"></span></span>
            </li>
          </ul>
        </ul>
        <p class="price" v-if="baseInfo.indicatorName === '钢筋算量指标'">
          <span v-if="baseInfo.steelVolume" :title="Number(baseInfo.steelVolume).toFixed(2)">
            {{Number(baseInfo.steelVolume).toFixed(2)}}<span class="unit">kg/m<sup>2</sup></span>
          </span></p>
        <p v-else-if="baseInfo.indicatorName === '土建算量指标'">
          <span class="price" v-if="baseInfo.masonryVolume" :title="Number(baseInfo.masonryVolume).toFixed(2)">
            {{Number(baseInfo.masonryVolume).toFixed(2)}}<span class="unit">m<sup>3</sup>/m<sup>2</sup>（砌体）</span>
          </span>
          <span class="civil-num" v-if="baseInfo.concreteVolume" :title="Number(baseInfo.concreteVolume).toFixed(2)">
            {{Number(baseInfo.concreteVolume).toFixed(2)}}<span class="unit">m<sup>3</sup>/m<sup>2</sup>（混凝土）</span>
          </span>
        </p>
        <p class="price" v-else-if="baseInfo.indicatorName === '造价指标' || baseInfo.indicatorName === '安装算量&造价指标'" :title="Number(baseInfo.unitPrice).toFixed(2)">{{Number(baseInfo.unitPrice).toFixed(2)}}<span class="unit">元/m<sup>2</sup></span></p>
      </div>
      <div class="tabs-container">
        <!--  <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="工程基本信息" name="first">
            <buildbaseinfo :baseInfo="baseInfo" :projectInfo="projectInfo"></buildbaseinfo>
          </el-tab-pane>
          <el-tab-pane label="工程指标" name="second">
            <components :is="indicator"></components>
          </el-tab-pane>
        </el-tabs> -->
        <ul class="tabs-lists" :class="{'fix-tabs': fixTabs}">
          <li class="tab-list" v-for="(item, index) in tabLists" :key="index" @click="tabsClick(index)" :class="{'active-tab': selectTabs === index}">{{item.value}}
            <img src="@/assets/img/tableIcon.png" alt="" @click.stop="changeChart" class="" v-if="item.key==1&& (indicator != 'engineeringCost&&install'&&indicator!='install')&&chartsStatus">
            <img src="@/assets/img/chartsIcon.png" alt="" @click.stop="changeChart" class="" v-if="item.key==1&& (indicator != 'engineeringCost&&install'&&indicator!='install')&&!chartsStatus">
          </li>
        </ul>
      </div>
      <div class="components-container">
        <!-- 造价和安装  需要特殊处理 -->
        <div v-if="indicator === 'engineeringCost&&install'">
          <components is="engineeringCost" v-show="selectTabs === 0" :charts='chartsStatus' :fixTabs='fixTabs' ref="componentsRef"></components>
          <components is="install" v-show="selectTabs === 1" :fixTabs='fixTabs' ref="componentsRef"></components>
          <buildbaseinfo :baseInfo="baseInfo" :projectInfo="projectInfo" v-show="selectTabs === 2"></buildbaseinfo>
        </div>
        <div v-else>
          <components :is="indicator" v-show="selectTabs === 0" :charts='chartsStatus' :fixTabs='fixTabs' ref="componentsRef"></components>
          <buildbaseinfo :baseInfo="baseInfo" :projectInfo="projectInfo" v-show="selectTabs === 1"></buildbaseinfo>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import api from '@/fetch/api'
import breadcrumb from '@/components/breadcrumb'
export default {
  components: {
    breadcrumb,
    buildbaseinfo: () => import('./buildbaseinfo'),
    steel: () => import('./steelcount') /* 钢筋 */,
    civil: () => import('./civilcount') /* 土建 */,
    install: () => import('./installcount') /* 安装 */,
    engineeringCost: () => import('./engineeringCost') /* 造价 */
  },
  data () {
    return {
      fixTabs: false,
      selectTabs: 0,
      tabLists: [
        {
          key: '1',
          value: '工程指标'
        },
        {
          key: '2',
          value: '工程基本信息'
        }
      ],
      andTabList: [
        {
          key: '0',
          value: '造价指标'
        },
        {
          key: '1',
          value: '安装算量指标'
        },
        {
          key: '2',
          value: '工程基本信息'
        }
      ],
      breadcrumbs: [{ name: '单项工程指标库', path: '/indicatorLibrary/singleItem' }, { name: 'XXX单项工程', path: this.$route.fullPath }],
      activeName: 'first',
      id: '',
      baseInfo: {},
      projectInfo: {},
      indicator: '',
      indicatorList: [
        {
          id: '2f41c015f43f409f9778e5183da8416c',
          name: 'engineeringCost'
        },
        {
          id: '3eebbe1f23334e86be300c42be1f6600',
          name: 'civil'
        },
        {
          id: '6dc03175a2a7413c8197002149d6bc8d',
          name: 'steel'
        },
        {
          id: 'e4ecf980659c4025bebc8823b519f854',
          name: 'install'
        },
        {
          id: 'e4ecf980659c4025bebc8823b519f111',
          name: 'engineeringCost&&install'
        }
      ],
      chartsStatus: true // 图标是收起 还是展开的，true是展开的
    }
  },
  methods: {
    tabsClick (index) {
      this.selectTabs = index
    },
    // 改变图表是收起还是展开
    changeChart () {
      if (this.selectTabs == 0) {
        this.chartsStatus = !this.chartsStatus
      }
    },
    handleClick () {},
    baseInfoList () {
      api.getMonomerDetail(this.id).then(res => {
        // 工程信息
        this.baseInfo = res.data
        // 不同的工程指标
        this.indicatorChoice(this.baseInfo.indicatorNameCode)
        // 面包屑
        this.$set(this.breadcrumbs, 1, { name: this.baseInfo.monomerName, path: this.$route.fullPath })
      })
    },
    getMonomerWithProject (id) {
      api.getMonomerWithProject(id).then(res => {
        this.projectInfo = res.data.project
        this.baseInfo = res.data.monomer
        // 不同的工程指标
        this.indicatorChoice(this.baseInfo.indicatorNameCode)
        // 面包屑
        this.$set(this.breadcrumbs, 1, { name: this.baseInfo.monomerName, path: this.$route.fullPath })
      })
    },
    /* 不同的指标类型对应不同的工程指标 */
    indicatorChoice (code) {
      let that = this
      let list = this.indicatorList
      for (let index = 0; index < list.length; index++) {
        if (list[index].id === code) {
          that.indicator = list[index].name
          if (that.indicator === 'engineeringCost&&install') {
            that.tabLists = that.andTabList
          }
          that.initHeight()
          break
        }
      }
    },
    init () {
      let id = this.$route.params.monomerId
      if (id) {
        this.id = id
        // this.baseInfoList()
        // 项目信息
        this.getMonomerWithProject(this.id)
      } else {
        throw Error('需要传参才能显示单体详情')
      }
    },
    initHeight () {
      let ref = document.getElementsByClassName('scroll-table')[0]
      if (ref) {
        let elHeight = ref.getBoundingClientRect().height
        let screenHeight = window.innerHeight
        if (elHeight < screenHeight - 60 && elHeight > screenHeight - 150) {
          ref.style.paddingBottom = 80 + 'px'
        } else {
          // ref.style.paddingBottom = 0
        }
      }
    }
  },
  updated () {},
  mounted () {
    this.init()
    // 滚动到顶部
    window.scrollTo(0, 0)
    document.onscroll = () => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.initHeight()
      let divHeight = document.getElementsByClassName('charts-box')[0] ? document.getElementsByClassName('charts-box')[0].getBoundingClientRect().height : 0
      if (scrollTop > 200 + divHeight) {
        this.fixTabs = true
      } else {
        this.fixTabs = false
      }
    }
  },
  destroyed () {
    document.onscroll = () => {}
  }
}
</script>
<style lang="less" scoped>
.details-container {
  background-color: #fff;
  border: 1px solid #e2e8f7;
  margin-top: 20px;
  margin-bottom: 20px;
  .a-list {
    padding: 20px 15px 13px 15px;
    position: relative;
    border: 1px solid #eff2f9;
    border-bottom: none;
    color: #666;
    font-size: 12px;
    background-color: #fff;
    &:first-child {
      border-top: none;
    }
    &:last-child {
      border-bottom: 1px solid #eff2f9;
    }
    .sub-lists {
      padding: 6px 0 0 25px;
      margin-right: 5%;
      overflow: hidden;
    }
    .sub-list {
      width: 25%;
      float: left;
      line-height: 26px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .icons {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 5px;
      vertical-align: middle;
    }
    .icon01 {
      .icons;
      background: url('../../../assets/img/address.png') no-repeat center center;
    }
    .icon02 {
      .icons;
      vertical-align: top;
      position: relative;
      top: 2px;
      background: url('../../../assets/img/house.png') no-repeat center center;
    }
    .icon03 {
      .icons;
      background: url('../../../assets/img/list.png') no-repeat center center;
    }
    .icon04 {
      .icons;
      background: url('../../../assets/img/flag.png') no-repeat center center;
    }
    .icon05 {
      .icons;
      background: url('../../../assets/img/data.png') no-repeat center center;
    }
    .flag-span(@r,@g,@b) {
      display: inline-block;
      border: 1px solid rgb(@r, @g, @b);
      padding: 0 3px;
      line-height: 20px;
      height: 20px;
      color: rgb(@r, @g, @b);
      background-color: rgba(@r, @g, @b, 0.1);
      border-radius: 2px;
      font-size: 12px;
    }
    .flag-cost {
      .flag-span(237, 71, 49);
    }
    .flag-civil {
      .flag-span(255, 156, 0);
    }
    .flag-install {
      .flag-span(100, 183, 132);
    }
    .flag-steel {
      .flag-span(56, 126, 197);
    }
    .text {
      vertical-align: middle;
    }
    .col-first {
      display: inline-block;
      min-width: 130px;
    }
    .row-inline {
      display: inline-block;
    }
    .title {
      color: #444;
      font-size: 16px;
      line-height: 16px;
    }
    .num-unit {
      position: absolute;
      color: #f03d3d;
      font-size: 18px;
      font-weight: bold;
      left: 90%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .unit {
        font-weight: normal;
        margin-left: 5px;
        font-size: 12px;
        color: #666;
      }
    }
    .civil-num {
      .num-unit;
      top: 73px;
    }
    .price {
      .num-unit;
      top: 45px;
    }
  }
  .tabs-container {
    // padding: 0 20px;
    position: relative;
    background-color: #e7eaee;
    &:after {
      content: ' ';
      display: table;
    }
  }
}
.components-container {
  background-color: #e7eaee;
  // padding: 0 20px;
}
.tabs-lists {
  border-bottom: 1px solid #ced2dc;
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  background-color: #e7eaee;
}
.fix-tabs {
  position: fixed;
  top: 60px;
  left: 13px;
  z-index: 10;
  padding-left: 20px;
  // width: 97.92%;
  box-sizing: border-box;
}
.tab-list {
  padding: 20px;
  cursor: pointer;
  position: relative;
  height: 16px;
  line-height: 16px;
  vertical-align: middle;
  // &:first-child{
  //   padding-left:20px;
  //   padding-right: 20px;
  // }
  &:hover {
    color: #108ecc;
  }
  // border-bottom: 1px solid #ccc;
  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: #ccc;
    position: absolute;
    bottom: -1px;
    left: 0;
    z-index: 10;
  }
}
.tab-list + .tab-list {
  margin-left: 20px;
}
.tab-list {
  img {
    width: 15px;
    height: 15px;
    vertical-align: middle;
    margin-top: -3px;
  }
}
.active-tab {
  color: #108ecc;
  &:after {
    content: '';
    background-color: #108ecc;
  }
}
@media screen and(max-width: 1400px) {
  .details-container .a-list {
    .sub-list-big {
      width: 30%;
    }
    .sub-list-small {
      width: 20%;
    }
    .civil-num,
    .price {
      left: 88%;
    }
  }
}
</style>
