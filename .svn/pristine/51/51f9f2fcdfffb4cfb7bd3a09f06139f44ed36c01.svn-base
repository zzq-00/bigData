<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="container main">
      <div>
        <!-- <h5 class="headline">搜索项目</h5> -->
        <div class="search clearfix">
          <input class="fl" type="text" placeholder="搜索项目名称 / 创建人" v-model.trim="searchText" @change="handleSearch">
          <button class="fl" @click="handleSearch">搜索</button>
        </div>
      </div>

      <div class="tabulation">
        <div @click="filterStatus = !filterStatus">
          <span>
            {{filterStatus?'收起过滤':'过滤查询'}}
          </span>
          <img src="@/assets/img/Open.png" v-if="!filterStatus">
          <img src="@/assets/img/Retract.png" v-else>
        </div>
        <el-collapse-transition>
          <div class="chpro" v-show="filterStatus">
            <div class="clearfix">
              <span class="fl">指标类型：</span>
              <div class="fl">
                <ul class="single-selection">
                  <li v-for="(item,index) in norm" :key="index">
                    <label>
                      <input type="radio" v-model="indicatorNameCode" :value="item.id" @change="indicatorSel('nameCodeSel',item)">
                      <span>{{item.name}}</span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div class="clearfix">
              <span class="fl">指标分析状态：</span>
              <div class="fl">
                <ul class="single-selection">
                  <li v-for="(item,index) in indicatorTypeList" :key="index">
                    <label>
                      <input type="radio" v-model="conditionParams.indicatorStatus" :value="item.value" @change="indicatorSel('statusSel',item)">
                      <span>{{item.name}}</span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div class="clearfix">
              <span class="fl">文件上传时间：</span>
              <div class="fl">
                <ul class="fl">
                  <li>
                    <el-date-picker size="mini" v-model="timeValue" @change="confirmTime" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy/MM/dd HH:mm:ss" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" align="right">
                    </el-date-picker>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </el-collapse-transition>
        <div class="allResult" v-show="dynamicTags.timeSel || dynamicTags.statusSel || dynamicTags.nameCodeSel">
          <span>全部结果：</span>
          <span class="clear-all" @click="closeAll">清空所有</span>
          <el-tag :key="key" v-for="(tag, key) in dynamicTags" closable @close="handleClose(key)" v-show="tag">
            {{tag}}
          </el-tag>
        </div>
      </div>

      <div class="my_project">
        <!-- <h5 class="headline">我的项目</h5> -->
        <div class="proRig">
          <span>共有 {{totalElements}} 条项目。</span>
          <span v-show="totalPages">
            <el-button type="text" icon="el-icon-arrow-left" :disabled="conditionParams.page==1" @click="conditionParams.page--"></el-button>
            <span>{{conditionParams.page}}/{{totalPages}}</span>
            <el-button type="text" icon="el-icon-arrow-right  el-icon--right" :disabled="conditionParams.page==totalPages" @click="conditionParams.page++"></el-button>
          </span>
        </div>
      </div>

      <div class="project-tables">

        <el-table style="width: 100%;" height="calc(100vh - 280px)" :data="tableData" stripe border size="mini" @sort-change="sortChange" @row-click='rowClick'>
          <el-table-column label="序号" align="center" width="60px">
            <template slot-scope="scope">
              {{scope.$index+1+(conditionParams.page-1)*conditionParams.size}}
            </template>
          </el-table-column>
          <el-table-column label="指标类型" width="200" prop="indicatorName">
            <template slot-scope="scope" v-if="scope.row.indicatorName">
              <span v-for="(i,index) in outArr(scope.row.indicatorName.split('&'))" :key="index" class="typeDiv" :class="{greens:i.indexOf('安装算量')!=-1,blues:i=='钢筋算量指标',oras:i=='土建算量指标',reds:i=='造价指标'}" @click="gotoIndexpage(scope.row,i)">
                {{i.substring(0,2)}}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="文件名称" min-width="314px" prop="originalName"></el-table-column>
          <el-table-column label="项目名称" min-width="314px">
            <template slot-scope="scope">
              <div v-html="scope.row.projectName"></div>
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="149px">
            <template slot-scope="scope">
              <span v-html="scope.row.chineseName"></span><span v-show="scope.row.creatorName">({{scope.row.creatorName}})</span>
            </template>
          </el-table-column>
          <el-table-column sortable="custom" prop="createAt" label="文件上传时间" width="145px"></el-table-column>
          <el-table-column label="指标分析状态" width="153px">
            <template slot-scope="scope">
              <span v-if="scope.row.analytical === '0'">准备中</span>
              <span v-else-if="scope.row.analytical === '1'">准备就绪</span>
              <span v-else-if="scope.row.analytical === '2'">已分析</span>
              <span v-else-if="scope.row.analytical === '9999' || scope.row.analytical === '-1'">不可分析</span>
              <span v-else-if="scope.row.analytical === '666'">已删除</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" v-show="tableData.length">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="conditionParams.page" :page-sizes="[10, 20, 50, 100]" :page-size.sync="conditionParams.size" layout="sizes, prev, pager, next, jumper" :total="totalElements">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import breadcrumb from '@/components/breadcrumb'
import api from '@/fetch/api'
export default {
  name: 'projectData',
  components: {
    breadcrumb
  },
  data () {
    return {
      breadcrumbs: [{ name: '项目数据', path: this.$route.fullPath }],
      filterStatus: false,
      searchText: '',
      indicatorNameCode: '',
      dynamicTags: {
        timeSel: '',
        statusSel: '',
        nameCodeSel: ''
      },
      conditionParams: {
        fileCreateAtForOrder: true,
        searchBoxKeyWord4ProjectData: '',
        indicatorNameCodeList: [],
        indicatorStatus: '',
        page: 1,
        size: 20,
        fileCreateAtStart: '',
        fileCreateAtEnd: ''
      },
      totalElements: 0,
      totalPages: 0,
      tableData: [],
      directoryList: [],
      temporaryArr: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      timeValue: '',
      indicatorTypeList: [],
      norm: []
    }
  },
  watch: {
    conditionParams: {
      handler: 'getProjectDataByCondition',
      deep: true
    }
  },
  methods: {
    outArr (arr) {
      var hash = []
      for (var i = 0; i < arr.length; i++) {
        if (hash.indexOf(arr[i]) == -1) {
          hash.push(arr[i])
        }
      }
      return hash
    },
    handleSearch () {
      // 文昌要求的，全部赋值
      this.conditionParams.searchBoxKeyWord4ProjectData = this.searchText
      this.conditionParams.page = 1
    },
    handleClose (key) {
      this.dynamicTags[key] = ''
      if (this.conditionParams.page != 1) this.conditionParams.page = 1
      switch (key) {
        case 'timeSel':
          this.timeValue = ''
          this.conditionParams.fileCreateAtStart = ''
          this.conditionParams.fileCreateAtEnd = ''
          break
        case 'statusSel':
          this.conditionParams.indicatorStatus = ''
          break
        case 'nameCodeSel':
          this.indicatorNameCode = ''
          this.conditionParams.indicatorNameCodeList.length = 0
          this.getProjectDataByCondition()
          break
      }
    },
    closeAll () {
      this.handleClose('timeSel')
      this.handleClose('statusSel')
      this.handleClose('nameCodeSel')
    },
    sortChange (column, prop, order) {
      this.conditionParams.page = 1
      // true:降序  false：升序
      if (column.prop === 'createAt') {
        if (column.order === 'ascending') {
          this.conditionParams.fileCreateAtForOrder = false
        } else if (column.order === 'descending') {
          this.conditionParams.fileCreateAtForOrder = true
        }
      } else {
        this.conditionParams.fileCreateAtForOrder = true
        // delete this.conditionParams.fileCreateAtForOrder
      }
      this.getProjectDataByCondition()
    },
    // 选择反馈时间
    confirmTime () {
      this.conditionParams.page = 1
      // 开工日期
      if (this.timeValue) {
        this.dynamicTags.timeSel = this.timeValue[0] + ' - ' + this.timeValue[1]
        this.conditionParams.fileCreateAtStart = this.timeValue[0]
        this.conditionParams.fileCreateAtEnd = this.timeValue[1]
        this.getProjectDataByCondition()
      } else {
        this.handleClose('timeSel')
      }
    },
    // 选择项目行业
    indicatorSel (type, item) {
      if (type === 'nameCodeSel') {
        this.conditionParams.indicatorNameCodeList[0] = item.id
        if (item.name === '安装算量指标' || item.name === '造价指标') {
          this.conditionParams.indicatorNameCodeList[1] = 'e4ecf980659c4025bebc8823b519f111'
        } else if (item.name === '不限') {
          this.conditionParams.indicatorNameCodeList.length = 0
        } else {
          this.conditionParams.indicatorNameCodeList.length = 1
        }
        this.getProjectDataByCondition()
      }
      this.dynamicTags[type] = item.id === '' ? '' : item.name
      this.conditionParams.page = 1
    },
    getDicCommons () {
      api.getDicCommon('DicIndicatorName').then(res => {
        // 给用户显示只能是四种类型，其实有五种
        this.norm = res.data.filter(item => item.name !== '安装算量&造价指标')
        this.norm.unshift({ id: '', name: '不限' })
      })
      api.getDicCommon('DicIndicatorType').then(res => {
        this.indicatorTypeList = res.data
        this.indicatorTypeList.unshift({ id: '', name: '不限', value: '' })
      })
    },
    handleCurrentChange (val) {
      this.conditionParams.page = val
    },
    handleSizeChange (val) {
      this.conditionParams.page = 1
      this.conditionParams.size = val
    },
    // 根据条件查询项目
    getProjectDataByCondition () {
      api
        .getProjectDataByCondition(this.conditionParams)
        .then(res => {
          if (!res.page) {
            this.tableData = []
            this.totalElements = 0
            this.totalPages = 0
            return
          }
          this.tableData = res.page.content
          this.totalElements = res.page.totalElements
          this.totalPages = res.page.totalPages
          if (this.tableData && this.searchText) {
            let temp = this.searchText
              .replace('\\', '\\\\')
              .replace('*', '\\*')
              .replace('+', '\\+')
              .replace('|', '\\|')
              .replace('{', '\\{')
              .replace('}', '\\}')
              .replace('(', '\\(')
              .replace(')', '\\)')
              .replace('^', '\\^')
              .replace('$', '\\$')
              .replace('[', '\\[')
              .replace(']', '\\]')
              .replace('?', '\\?')
              .replace(',', '\\,')
              .replace('.', '\\.')
              .replace('&', '\\&')
            let replaceReg = new RegExp(temp, 'g')
            let replaceString = '<em style="color: red;font-weight:bold;">' + this.searchText + '</em>'
            this.tableData.forEach((item, index) => {
              this.tableData[index].projectName = item.projectName.replace(replaceReg, replaceString)
              this.tableData[index].chineseName = item.chineseName.replace(replaceReg, replaceString)
            })
          }
        })
    },
    // 指标数据层级目录
    directory (id) {
      api.directory(id).then(res => {
        this.directoryList = res.data
        if (this.directoryList) {
          this.directoryList[0].indicatorNameList.map(item => {
            this.temporaryArr.push(item.indicatorName)
          })
        }
      })
    },
    rowClick (row, column, event) {
      // 避免整行点击与指标类型点击按钮冲突
      let typeDiv = new RegExp('typeDiv').test(event.target.className)
      if (!typeDiv) {
        this.$router.push('/monitorCenter/projectData/detail/projectInfo/' + row.id)
      }
    },
    // 跳转指标页面
    gotoIndexpage (row, i) {
      let name
      let type = 'quantityCalculation'
      if (i.indexOf('安装算量') != -1) {
        name = '4'
      }
      if (i == '土建算量指标') {
        name = '5'
      }
      if (i == '钢筋算量指标') {
        name = '6'
      }
      if (i == '造价指标') {
        name = ''
        type = 'engineeringCost'
      }
      api.directory(row.id).then(res => {
        this.directoryList = res.data
        let arr = this.directoryList
        let isContinue = true
        if (this.directoryList) {
          for (let index1 = 0; index1 < arr.length; index1++) {
            if (arr[index1].indicatorNameList) {
              for (let index2 = 0; index2 < arr[index1].indicatorNameList.length; index2++) {
                if ((name == '6' && arr[index1].indicatorNameList[index2].indicatorName == '钢筋算量指标' && isContinue) || (name == '5' && arr[index1].indicatorNameList[index2].indicatorName == '土建算量指标' && isContinue)) {
                  this.$router.push('/monitorCenter/projectData/detail/IndexData/' + type + '/' + row.id + '?id=' + '&name=' + name + '&productNameCode=' + arr[index1].productNameCode + '&indicatorNameCode=' + arr[index1].indicatorNameList[index2].indicatorNameCode + '&ids=' + arr[index1].indicatorNameList[index2].sourceFileId + '&isActive=' + '1')
                  isContinue = false
                  break
                }
                if (name == '4' || name == '') {
                  if (arr[index1].indicatorNameList[index2].monomerMessage) {
                    for (let index3 = 0; index3 < arr[index1].indicatorNameList[index2].monomerMessage.length; index3++) {
                      if (name == '4' && arr[index1].indicatorNameList[index2].indicatorName.indexOf('安装算量') != -1 && isContinue) {
                        this.$router.push('/monitorCenter/projectData/detail/IndexData/' + type + '/' + row.id + '?id=' + arr[index1].indicatorNameList[index2].sourceFileId + '&name=' + name + '&productNameCode=' + arr[index1].productNameCode + '&indicatorNameCode=' + arr[index1].indicatorNameList[index2].indicatorNameCode + '&ids=' + arr[index1].indicatorNameList[index2].sourceFileId + '&isActive=' + '1')
                        isContinue = false
                        break
                      }
                      if (name == '' && arr[index1].indicatorNameList[index2].indicatorName == '造价指标' && isContinue) {
                        this.$router.push('/monitorCenter/projectData/detail/IndexData/' + type + '/' + row.id + '?id=' + arr[index1].indicatorNameList[index2].sourceFileId + '&name=' + name + '&productNameCode=' + arr[index1].productNameCode + '&indicatorNameCode=' + arr[index1].indicatorNameList[index2].indicatorNameCode + '&ids=' + arr[index1].indicatorNameList[index2].sourceFileId + '&isActive=' + '1' + '&id2=')
                        isContinue = false
                        break
                      }
                    }
                  }
                }
              }
            }
          }
          return false
        }
      })
    }
  },
  activated () {
    this.getDicCommons()
    this.getProjectDataByCondition()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.tabulation {
  > div:first-child {
    color: #666666;
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
  .chpro {
    font-size: 12px;
    color: #606266;
    background-color: #f7f8f9;
    .sureBtn {
      cursor: pointer;
      width: 40px;
      height: 26px;
      line-height: 26px;
      color: #606266;
      background-color: #eee;
      border: 1px solid #e3e2e2;
      text-align: center;
    }
    > div {
      padding: 5px 15px;
      box-sizing: border-box;
      & + div {
        border-top: 1px solid #eff2f9;
      }
      i.icon {
        cursor: pointer;
        font-size: 24px;
        margin-top: 3px;
      }
      > span:first-child {
        color: #bebebe;
        margin-right: 10px;
        margin-top: 7px;
        width: 90px;
      }
      > div {
        > ul {
          overflow: hidden;
          &.single-selection {
            margin-left: -12px;
          }
          & + ul {
            margin-top: 5px;
          }
          li {
            display: inline-block;
            > label {
              > span {
                cursor: pointer;
                display: inline-block;
                padding: 7px 10px;
              }
              input[type='radio']:checked + span {
                color: #4474cf;
              }
            }
          }
        }
      }
    }
  }
  .allResult {
    margin-top: 10px;
    height: 30px;
    line-height: 30px;
    > span:first-child {
      font-size: 12px;
      color: #666;
    }
    > .clear-all {
      box-sizing: border-box;
      cursor: pointer;
      font-size: 12px;
      display: inline-block;
      height: 100%;
      color: #ed4542;
      border: 1px #ed4542 dashed;
      border-radius: 4px;
      margin-left: 15px;
      padding: 0 10px;
    }
    .el-tag {
      margin-left: 10px;
    }
  }
}
.my_project {
  overflow: hidden;
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
.link-style {
  cursor: pointer;
  &:hover {
    color: #4474cf;
  }
}
.headline {
  font-size: 18px;
  color: #444444;
  margin-bottom: 10px;
}
.block {
  text-align: right;
  margin-top: 10px;
  margin-right: 40px;
}
input[type='radio'] {
  display: none;
}
.canClick {
  display: inline-block;
  color: #69789e;
  height: 100%;
  &.disabled {
    color: #bebebe;
  }
  & + .canClick::before {
    content: '';
    display: inline-block;
    height: 9px;
    width: 1px;
    background-color: #dfdfdf;
    margin: 0 6px;
  }
}
.project-tables {
  .typeDiv {
    height: 20px;
    width: 34px;
    display: inline-block;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    font-weight: 400;
    margin-left: 5px;
    cursor: pointer;
    .typeDiv:last-child {
      margin-left: 0;
    }
  }
  .greens {
    background: #f3fff8;
    border: 1px solid rgba(100, 183, 132, 1);
    color: rgba(100, 183, 132, 1);
  }
  .blues {
    background: #f1f7fe;
    border: 1px solid rgba(56, 126, 197, 1);
    color: rgba(56, 126, 197, 1);
  }
  .oras {
    background: #fcf6ec;
    border: 1px solid rgba(254, 163, 19, 1);
    color: rgba(255, 156, 0, 1);
  }
  .reds {
    background: #fef2f0;
    border: 1px solid rgba(237, 71, 49, 1);
    color: rgba(237, 71, 49, 1);
  }
}
</style>
<style scoped>
.project-tables >>> .el-table__row {
  cursor: pointer;
}
.project-tables >>> .el-table th {
  padding: 0;
}
.status-radio >>> .el-radio + .el-radio {
  margin-left: 0;
  margin-top: 12px;
}
</style>
