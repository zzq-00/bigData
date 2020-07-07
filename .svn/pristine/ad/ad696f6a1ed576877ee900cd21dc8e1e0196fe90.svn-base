<!--对比记录-->
<template>
  <div>
    <headerComponent />
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="container main">
      <div>
        <el-tabs v-model="activeName" @tab-click="changeTab">
          <el-tab-pane label="单项工程内数据比对" name="first"></el-tab-pane>
          <el-tab-pane label="同类单项工程数据比对" name="second"></el-tab-pane>
        </el-tabs>
        <div class="search clearfix">
          <input class="fl" type="text" placeholder="搜索单项工程名称" v-model.lazy.trim="params.name" @change="handleSearch">
          <button class="fl" @click="handleSearch">搜索</button>
        </div>
      </div>
      <div class="filter-box">
        <span>单项工程类别：</span>
        <div>
          <ul>
            <li v-for="(item,index) in IndustryBelongFirst" :key="index">
              <label>
                <input type="radio" v-model="params.type1" :value="item.id" @change="IndustryBelongFirstSel(item)">
                <span>{{item.name}}</span>
              </label>
            </li>
          </ul>
          <ul v-show="IndustryBelongSecond.length">
            <li v-for="(item,index) in IndustryBelongSecond" :key="index">
              <label>
                <input type="radio" v-model="params.type2" :value="item.id">
                <span>{{item.name}}</span>
              </label>
            </li>
          </ul>
        </div>

      </div>

      <div class="my_project">
        <div class="proRig">
          <span>共有 {{totalElements[activeName]}} 条项目。</span>
          <span v-show="totalPages[activeName]">
            <el-button type="text" icon="el-icon-arrow-left" :disabled="vm[activeName].page==1" @click="vm[activeName].page--"></el-button>
            <span>{{vm[activeName].page}}/{{totalPages[activeName]}}</span>
            <el-button type="text" icon="el-icon-arrow-right el-icon--right" :disabled="vm[activeName].page==totalPages[activeName]" @click="vm[activeName].page++"></el-button>
          </span>
        </div>
      </div>
      <div class="project-tables">
        <div>
          <el-table v-if="activeName=='first'" style="width: 100%;" height="calc(100vh - 332px)" :data="tableData[activeName]" border @sort-change="sortChange">
            <el-table-column label="序号" align="center" type="index" width="60px">
            </el-table-column>
            <el-table-column label="单位工程名称" prop="monomerName" width="" :render-header="renderName">
            </el-table-column>
            <el-table-column label="单项工程类别" prop="typeDesc" width="">
            </el-table-column>
            <el-table-column label="是否通过" prop="code" width="" :render-header="renderAdopt">
            </el-table-column>
            <el-table-column label="保存时间" prop="createAt" min-width="" sortable="custom">
            </el-table-column>
            <el-table-column label="创建人" prop="userName" min-width="" :render-header="renderFounder">
            </el-table-column>
            <el-table-column label="对比结果">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div>
          <el-table v-if="activeName=='second'" style="width: 100%;" height="calc(100vh - 332px)" :data="tableData[activeName]" border @sort-change="sortChange">
            <el-table-column label="序号" align="center" type="index" width="60px">
            </el-table-column>
            <el-table-column label="单位工程组名称" prop="typeDesc" :render-header="renderName">
            </el-table-column>
            <el-table-column label="单项工程名称" prop="monomerNames">
            </el-table-column>
            <el-table-column label="检查项" prop="checkItem">
            </el-table-column>
            <el-table-column label="保存时间" prop="createAt" min-width="" sortable="custom">
            </el-table-column>
            <el-table-column label="创建人" prop="userName" min-width="" :render-header="renderFounder">
            </el-table-column>
            <el-table-column label="是否通过" prop="code" :render-header="renderAdopt">
            </el-table-column>
            <el-table-column label="对比结果">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="vm[activeName].page" :page-sizes="[10, 20, 30, 40,50]" :page-size.sync="params.size" layout="sizes, prev, pager, next, jumper" :total="totalElements[activeName]">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 下拉框1 单位工程名称 -->
    <!--<table-pop :thisObjBox="this" :listData="filterRules.propsNameData" v-if="renderNameData.show" :pos="renderNameData.pos" @filtersData="filtersNameClick" :hasIndex="renderNameData.indexTable"></table-pop>-->
    <!-- 下拉框2 是否通过 -->
    <!--<table-pop :thisObjBox="this" :listData="filterRules.propsCategory" v-if="renderAdoptData.show" :pos="renderAdoptData.pos" @filtersData="filtersAdoptClick" :hasIndex="renderAdoptData.indexTable"></table-pop>-->
    <!-- 下拉框3 创建人 -->
    <!--<table-pop :thisObjBox="this" :listData="filterRules.propsFounderData" v-if="renderFounderData.show" :pos="renderFounderData.pos" @filtersData="filtersFounderClick" :hasIndex="renderFounderData.indexTable"></table-pop>-->
  </div>
</template>
<script>
import api from '@/fetch/api'
import tool from '@/assets/js/useMoreTool'
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'
import tablePop from '@/components/tablePop'
export default {
  components: {
    headerComponent,
    breadcrumb,
    tablePop
  },
  data() {
    return {
      activeName: 'first',
      breadcrumbs: [{ name: '我的项目', path: '/projectManage' }, { name: '指标对比记录', path: `/` }],
      projectId: (() => this.$route.params.projectId)(), //项目id
      totalElements: { first: 0, second: 0 },
      totalPages: { first: 0 },
      tableData: { first: [], second: [] },
      compilationStage: [], //编制阶段
      vm: { first: { page: 1 }, second: { page: 1 } },
      params: {
        projectId: (() => this.$route.params.projectId)(),
        page: 1,
        size: 10,
        name: '',
        type1: '', // 项目行业
        type2: '' // 项目行业二级
      },
      IndustryBelongFirst: [], // 项目行业
      IndustryBelongSecond: [], // 项目行业二级
      // render函数的数据 -- 单项工程名称
      renderNameData: {
        show: false,
        pos: {},
        indexTable: ''
      },
      renderAdoptData: {
        show: false,
        pos: {},
        indexTable: ''
      },
      renderFounderData: {
        show: false,
        pos: {},
        indexTable: ''
      },
      filterRules: {
        propsNameData: [{ key: '全部' }], // 单位工程名称
        propsFounderData: [{ key: '全部' }], // 创建人
        propsCategory: [
          //是否通过
          {
            key: '全部',
            value: []
          },
          {
            key: '通过',
            value: [2]
          },
          {
            key: '未通过',
            value: [1]
          }
        ]
      }
    }
  },
  watch: {
    params: {
      handler: 'getResults',
      deep: true
    },
    vm: {
      handler: 'getResults',
      deep: true
    }
  },
  mounted() {
    this.getProjectStage()
    this.getIndustryBelongFirst()
    this.getResults()
    api
      .findInnerProjectCompareOpinion(this.params)
      .then(res => {
        this.tableData['second'] = res.data.content
        this.totalElements['second'] = res.data.totalElements
        this.totalPages['second'] = res.data.totalPages
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    changeTab(tab, event) {},
    getResults() {
      this.params.page = this.vm[this.activeName].page - 1
      if (this.activeName == 'first') {
        api
          .findInnerMonomerCompareOpinion(this.params)
          .then(res => {
            this.tableData['first'] = res.data.content
            this.totalElements['first'] = res.data.totalElements
            this.totalPages['first'] = res.data.totalPages
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        api
          .findInnerProjectCompareOpinion(this.params)
          .then(res => {
            this.tableData['second'] = res.data.content
            this.totalElements['second'] = res.data.totalElements
            this.totalPages['second'] = res.data.totalPages
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    closeShow() {
      this.renderNameData.show = false
      this.renderAdoptData.show = false
      this.renderFounderData.show = false
    },
    renderName(createElement, { column }) {
      return createElement(
        'div',
        {
          class: {
            'cell-box': true,
            'check-active-triangle': this.renderNameData.indexTable
          }
        },
        [
          createElement('span', [column.label]),
          createElement('i', {
            class: {
              'icon-top': true
            },
            on: {
              click: this.maskShowName
            }
          })
        ]
      )
    },
    renderAdopt(createElement, { column }) {
      return createElement(
        'div',
        {
          class: {
            'cell-box': true,
            'check-active-triangle': this.renderAdoptData.indexTable
          }
        },
        [
          createElement('span', [column.label]),
          createElement('i', {
            class: {
              'icon-top': true
            },
            on: {
              click: this.maskShowAdopt
            }
          })
        ]
      )
    },
    renderFounder(createElement, { column }) {
      return createElement(
        'div',
        {
          class: {
            'cell-box': true,
            'check-active-triangle': this.renderFounderData.indexTable
          }
        },
        [
          createElement('span', [column.label]),
          createElement('i', {
            class: {
              'icon-top': true
            },
            on: {
              click: this.maskShowFounder
            }
          })
        ]
      )
    },
    // 一个展示隐藏--createElement的用法 render
    maskShowName(event) {
      // 数据优化
      var _this = this
      _this.renderNameData.pos = tool.getMousePos(event)
      _this.renderNameData.show = !_this.renderNameData.show
    },
    // 一个展示隐藏--createElement的用法 render
    maskShowAdopt(event) {
      var _this = this
      _this.renderAdoptData.pos = tool.getMousePos(event)
      _this.renderAdoptData.show = !_this.renderAdoptData.show
    },
    maskShowFounder(event) {
      var _this = this
      _this.renderFounderData.pos = tool.getMousePos(event)
      _this.renderFounderData.show = !_this.renderFounderData.show
    },
    filtersNameClick(item) {
      this.params.authType = item.value
      this.renderNameData.indexTable = item.index
      this.handleCurrentChange && this.handleCurrentChange(1)
    },
    filtersAdoptClick(item) {
      this.params.authType = item.value
      this.renderNameData.indexTable = item.index
      this.handleCurrentChange && this.handleCurrentChange(1)
    },
    filtersFounderClick(item) {
      this.params.authType = item.value
      this.renderNameData.indexTable = item.index
      this.handleCurrentChange && this.handleCurrentChange(1)
    },
    handleCurrentChange(val) {
      this.vm[this.activeName].page = val
    },
    // 获取项目行业
    getIndustryBelongFirst() {
      api.getIndustryBelongFirst().then(res => {
        res.data.unshift({ id: '', name: '不限' })
        this.IndustryBelongFirst = res.data
      })
    },
    // 选择项目行业
    IndustryBelongFirstSel(item) {
      this.params.type2 = ''
      // 当项目行业一级为不限时，清空二级
      console.log(item, 'item??')
      if (!item.id) return (this.IndustryBelongSecond = [])
      this.getIndustrySecondByParentId(item.id)
    },

    // 获取项目行业二级
    getIndustrySecondByParentId(id) {
      api.getIndustrySecondByParentId(id).then(res => {
        res.data.length && res.data.unshift({ id: '', name: '不限' })
        this.IndustryBelongSecond = res.data
      })
    },
    // 查看对比结果
    handleClick(row) {
      this.$router.push(`/compare/history/` + row.id + '/' + this.activeName)
      // this.$router.push(`/compare/results/${row.projectId}/${row.stageId}/${row.type}`)
    },
    getProjectStage() {
      api
        .getProjectStage(this.projectId)
        .then(res => {
          this.compilationStage = res.data
        })
        .catch(res => {})
    },
    //搜索
    handleSearch() {
      this.vm[this.activeName].page = 1
    },
    handleSizeChange(val) {
      this.vm[this.activeName].page = 1
      this.params.size = val
    },
    handleCurrentChange(val) {
      this.vm[this.activeName].page = val
    },
    sortChange({ column, prop, order }) {
      this.vm[this.activeName].page = 1
      this.params.column = prop
      switch (order) {
        case 'descending':
          this.params.descOrAsc = true
          break
        case 'ascending':
          this.params.descOrAsc = false
          break
        default:
          this.params.descOrAsc = null
      }
    }
  }
}
</script>
<style scoped lang="less">
.container {
  box-sizing: border-box;
  &.main {
    padding: 15px 0;
    min-height: e('calc(100vh - 90px)');
  }
}
.search {
  height: 30px;
  input {
    width: 559px;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #d8e0f5;
    padding-left: 12px;
    &::placeholder {
      color: #bebebe;
      font-size: 12px;
    }
  }
  button {
    cursor: pointer;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    width: 70px;
    box-sizing: border-box;
    color: #fff;
    background-color: #ffa21d;
    margin-left: 6px;
    padding: 0 12px 0 30px;
    background-image: url(~@/assets/img/searchPic.png);
    background-repeat: no-repeat;
    background-position: 9px center;
  }
}
.filter-box {
  background-color: #f7f8f9;
  display: flex;
  padding: 5px 15px;
  font-size: 12px;
  margin-top: 20px;
  > span:first-child {
    margin-top: 7px;
    color: #bebebe;
    flex: 0 0 100px;
  }
  > div {
    flex: 1;
  }
  ul {
    overflow: hidden;
    li {
      float: left;
      label {
        input[type='radio'] {
          display: none;
        }
        span {
          cursor: pointer;
          display: inline-block;
          padding: 7px 0;
          margin-right: 20px;
        }
        input[type='radio']:checked + span {
          color: #4474cf;
        }
      }
    }
  }
}
.my_project {
  margin: 10px 0;
}
.proRig {
  float: right;
  > span {
    margin-right: 20px;
  }
  > b {
    margin: 0 20px;
    font-size: 14px;
  }
}
.block {
  text-align: right;
  margin-top: 10px;
  margin-right: 40px;
}
.pro-name {
  height: 121px;
  display: flex;
  text-overflow: ellipsis;
  vertical-align: middle;
  width: 100%;
  align-items: center;
  overflow: hidden;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 18px;
  }
}
.project-tables {
  /deep/.el-table {
    .cell-box {
      position: relative;
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding-left: 0 !important;
      .icon-top {
        display: inline-block;
        position: absolute;
        top: 18%;
        right: 10%;
        width: 20px;
        height: 20px;
        transition: transform 0.3s;
        cursor: pointer;
      }
      .icon-top:before {
        content: '';
        position: absolute;
        top: 8px;
        right: 5px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #ccc;
        cursor: pointer;
      }
      .icon-top:after {
        content: '';
        position: absolute;
        top: 6px;
        right: 5px;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #f6f7fb;
      }
    }
  }
}
</style>