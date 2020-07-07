<template>
  <div>
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="container main">
      <div>
        <!-- <h5 class="headline">搜索项目</h5> -->
        <div class="search clearfix">
          <input class="fl" type="text" placeholder="搜索创建人 / 反馈内容" v-model.trim="searchText" @change="handleSearch">
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
              <span class="fl">反馈时间：</span>
              <div class="fl">
                <ul>
                  <li>
                    <el-date-picker size="mini" v-model="timeValue" @change="confirmTime" type="datetimerange" value-format="yyyy/MM/dd HH:mm:ss" format="yyyy/MM/dd HH:mm:ss" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" align="right">
                    </el-date-picker>
                  </li>
                </ul>
              </div>
            </div>
            <div class="clearfix">
              <span class="fl">处理状态：</span>
              <div class="fl">
                <ul class="single-selection">
                  <li v-for="(item,index) in statusOptions" :key="index">
                    <label>
                      <input type="radio" v-model="conditionParams.dealStatus" :value="item.id" @change="statusSel(item)">
                      <span>{{item.name}}</span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </el-collapse-transition>
        <div class="allResult" v-show="dynamicTags.timeSel || dynamicTags.statusSel">
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
          <el-table-column label="反馈内容" min-width="800px">
            <template slot-scope="scope">
              <span v-html="scope.row.content"></span>
              <!-- <span style="color: #4474CF;cursor: pointer;text-decoration:underline;" v-show="scope.row.content.length>317">展开</span> -->
            </template>
          </el-table-column>
          <el-table-column label="页面链接" width="77px">
            <template slot-scope="scope">
              <a :href="scope.row.feedbackUrl" target="_blank" style="color: #4474CF;text-decoration:underline;">查看</a>
            </template>
          </el-table-column>
          <el-table-column label="创建人" width="149px">
            <template slot-scope="scope">
              <span v-html="scope.row.realName"></span><span v-show="scope.row.userName">({{scope.row.userName}})</span>
            </template>
          </el-table-column>
          <el-table-column sortable="custom" prop="createAt" label="反馈时间" width="145px"></el-table-column>
          <el-table-column label="联系方式" width="153px" prop="emailOrTel"></el-table-column>
          <el-table-column label="附件" width="158px">
            <template slot-scope="scope">
              <ul>
                <li v-for="(value,key,index) in scope.row.idAndNameMap" :key="index">
                  <a href="javascript:;" @click="showDialog(key)" target="_blank" style="color: #4474CF;text-decoration:underline;">{{value}}</a>
                </li>
              </ul>
            </template>
          </el-table-column>
          <el-table-column label="处理状态" width="120px" fixed="right">
            <template slot-scope="scope">
              <div class="status-radio">
                <el-radio-group v-model="scope.row.dealStatus" @change="modifyDealStatus(scope.row)">
                  <el-radio :label="0">未处理</el-radio>
                  <el-radio :label="1">已处理</el-radio>
                  <el-radio :label="2">忽略</el-radio>
                </el-radio-group>
              </div>
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
  name: 'feedback',
  components: {
    breadcrumb
  },
  data () {
    return {
      breadcrumbs: [{ name: '反馈建议', path: this.$route.fullPath }],
      filterStatus: false,
      fileUrl: '',
      searchText: '',
      dynamicTags: {
        timeSel: '',
        statusSel: ''
      },
      conditionParams: {
        content: '',
        dealStatus: '',
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
      handler: 'getFeedBackByCondition',
      deep: true
    }
  },
  methods: {
    showDialog (id) {
      api.reviewNewsPic(id).then(res => {
        window.open(res.data)
      })
    },
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
      this.getFeedBackByCondition()
    },
    // 选择反馈时间
    confirmTime () {
      this.conditionParams.page = 1
      // 开工日期
      if (this.timeValue) {
        this.dynamicTags.timeSel = this.timeValue[0] + ' - ' + this.timeValue[1]
        this.conditionParams.startDate = this.timeValue[0]
        this.conditionParams.endDate = this.timeValue[1]
        this.getFeedBackByCondition()
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
    getFeedBackByCondition () {
      api.getFeedBackByCondition(this.conditionParams).then(res => {
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
    },
    modifyDealStatus (val) {
      api.modifyDealStatus({
        dealStatus: val.dealStatus,
        id: val.id
      }).then(res => {
        this.$message({ showClose: true, type: 'success', message: res.errorMsg })
      })
    }
  },
  activated () {
    this.getFeedBackByCondition()
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
      }
      > div {
        > ul {
          overflow: hidden;
          & + ul {
            margin-top: 5px;
          }
          &.single-selection {
            margin-left: -12px;
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
</style>
<style scoped>
.project-tables >>> .el-table th {
  padding: 0;
}
.status-radio >>> .el-radio + .el-radio {
  margin-left: 0;
  margin-top: 8px;
}
.status-radio >>> .el-radio__label {
  display: inline-block;
  font-size: 12px;
  width: 38px;
  text-align: justify;
  text-align-last: justify;
  vertical-align: middle;
}
.status-radio >>> .el-radio__inner {
  width: 12px;
  height: 12px;
}
</style>
