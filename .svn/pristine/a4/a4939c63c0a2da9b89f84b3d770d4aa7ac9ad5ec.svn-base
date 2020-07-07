<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="container main">
      <div>
        <!-- <h5 class="headline">搜索项目</h5> -->
        <div class="search clearfix">
          <input class="fl" type="text" placeholder="搜索创建人 / 动态" v-model.trim="searchText" @change="handleSearch">
          <button class="fl" @click="handleSearch">搜索</button>
        </div>
      </div>

      <div class="my_project">
        <div class="clearfix filterTime fl">
          <span class="fl">创建时间：</span>
          <div class="fl">
            <ul class="clearfix">
              <li class="fl">
                <el-date-picker size="mini" v-model="timeValue" @change="confirmTime" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy/MM/dd HH:mm:ss" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" align="right">
                </el-date-picker>
              </li>
            </ul>
          </div>
        </div>
        <div class="proRig">
          <span>共有 {{totalElements}} 条数据。</span>
          <span v-show="totalPages">
            <el-button type="text" icon="el-icon-arrow-left" :disabled="conditionParams.page==1" @click="conditionParams.page--"></el-button>
            <span>{{conditionParams.page}}/{{totalPages}}</span>
            <el-button type="text" icon="el-icon-arrow-right  el-icon--right" :disabled="conditionParams.page==totalPages" @click="conditionParams.page++"></el-button>
          </span>
        </div>
      </div>

      <div class="project-tables">

        <el-table style="width: 100%;" height="calc(100vh - 280px)" :data="tableData" stripe border size="mini" @sort-change="sortChange">
          <el-table-column label="序号" align="center" width="60px">
            <template slot-scope="scope">
              {{scope.$index+1+(conditionParams.page-1)*conditionParams.size}}
            </template>
          </el-table-column>
          <el-table-column label="动态" min-width="855px">
            <template slot-scope="scope">
              <div v-html="scope.row.content"></div>
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="149px">
            <template slot-scope="scope">
              <span v-html="scope.row.realName"></span><span v-show="scope.row.userName">({{scope.row.userName}})</span>
            </template>
          </el-table-column>
          <el-table-column sortable="custom" prop="createAt" label="创建时间" width="160px"></el-table-column>
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
  name: 'dynamicCenter',
  components: {
    breadcrumb
  },
  data () {
    return {
      breadcrumbs: [{ name: '动态中心', path: this.$route.fullPath }],
      filterStatus: false,
      searchText: '',
      dynamicTags: {
        timeSel: '',
        statusSel: ''
      },
      conditionParams: {
        content: '',
        endDate: '',
        page: 1,
        realName: '',
        size: 20,
        startDate: ''
      },
      totalElements: 0,
      totalPages: 0,
      tableData: [],
      directoryList: [],
      temporaryArr: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      timeValue: '',
      statusOptions: [
        { name: '不限', id: '' },
        { name: '未处理', id: '0' },
        { name: '已处理', id: '1' },
        { name: '忽略', id: '2' }
      ]
    }
  },
  watch: {
    conditionParams: {
      handler: 'getIndexLastNewsByCondition',
      deep: true
    }
  },
  methods: {
    handleSearch () {
      // 文昌要求的，全部赋值
      this.conditionParams.content = this.conditionParams.realName = this.searchText
      this.conditionParams.page = 1
    },
    handleClose (key) {
      this.dynamicTags[key] = ''
      if (this.conditionParams.page != 1) this.conditionParams.page = 1
      switch (key) {
        case 'timeSel':
          this.timeValue = ''
          this.conditionParams.startDate = ''
          this.conditionParams.endDate = ''
          break
        case 'statusSel':
          this.conditionParams.dealStatus = ''
          break
      }
    },
    closeAll () {
      this.handleClose('timeSel')
      this.handleClose('statusSel')
    },
    sortChange (column, prop, order) {
      this.conditionParams.page = 1
      // true:降序  false：升序
      if (column.prop === 'createAt') {
        if (column.order === 'ascending') {
          this.conditionParams.createAtSort = false
        } else if (column.order === 'descending') {
          this.conditionParams.createAtSort = true
        }
      } else {
        delete this.conditionParams.createAtSort
      }
      this.getIndexLastNewsByCondition()
    },
    // 选择反馈时间
    confirmTime () {
      this.conditionParams.page = 1
      // 开工日期
      if (this.timeValue) {
        this.dynamicTags.timeSel = this.timeValue[0] + ' - ' + this.timeValue[1]
        this.conditionParams.startDate = this.timeValue[0]
        this.conditionParams.endDate = this.timeValue[1]
        this.getIndexLastNewsByCondition()
      } else {
        this.handleClose('timeSel')
      }
    },
    // 选择项目行业
    statusSel (item) {
      this.dynamicTags.statusSel = item.id === '' ? '' : item.name
      this.conditionParams.page = 1
    },

    handleCurrentChange (val) {
      this.conditionParams.page = val
    },
    handleSizeChange (val) {
      this.conditionParams.page = 1
      this.conditionParams.size = val
    },
    // 根据条件查询项目
    getIndexLastNewsByCondition () {
      api.getIndexLastNewsByCondition(this.conditionParams).then(res => {
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
            this.tableData[index].content = item.content.replace(replaceReg, replaceString)
            this.tableData[index].realName = item.realName.replace(replaceReg, replaceString)
          })
        }
      })
    }
  },
  activated () {
    this.getIndexLastNewsByCondition()
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

.my_project {
  overflow: hidden;
  margin-top: 12px;
  .filterTime {
    height: 40px;
    > span:first-child {
      color: #69789e;
      font-size: 12px;
      line-height: 28px;
    }
  }
  .proRig {
    height: 40px;
    line-height: 40px;
    float: right;
    > span {
      margin-right: 20px;
    }
    > b {
      margin: 0 20px;
      font-size: 14px;
    }
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
</style>
<style scoped>
.project-tables >>> .el-table th {
  padding: 0;
}
.status-radio >>> .el-radio + .el-radio {
  margin-left: 0;
  margin-top: 12px;
}
</style>
