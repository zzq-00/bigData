<template>
  <div>
    <headerComponent />
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="container main">
      <div>
        <div class="search clearfix">
          <input class="fl" type="text" placeholder="单项工程名称/分析状态/操作人/编制阶段" v-model.trim="params.name" @change="handleSearch">
          <button class="fl" @click="handleSearch">搜索</button>
        </div>
      </div>
      <div class="my_project">
        <div class="proRig">
          <span>共有 {{totalElements}} 条项目。</span>
          <span v-show="totalPages">
            <el-button type="text" icon="el-icon-arrow-left" :disabled="params.page==1" @click="params.page--"></el-button>
            <span>{{params.page}}/{{totalPages}}</span>
            <el-button type="text" icon="el-icon-arrow-right el-icon--right" :disabled="params.page==totalPages" @click="params.page++"></el-button>
          </span>
        </div>
      </div>
      <div class="project-tables">
        <el-table style="width: 100%;" height="calc(100vh - 280px)" :data="tableData" border @sort-change="sortChange">
          <el-table-column label="序号" align="center" type="index" width="60px">
          </el-table-column>
          <el-table-column label="时间" prop="createAt" width="140" sortable="custom"></el-table-column>
          <el-table-column label="操作人" prop="userName" width="110">
            <template slot-scope="scope">
              <span v-html="scope.row.userName"></span>
            </template>
          </el-table-column>
          <el-table-column label="编制阶段" prop="stageName" width="120">
            <template slot-scope="scope">
              <span v-html="scope.row.stageName"></span>
            </template>
          </el-table-column>
          <el-table-column label="单项工程名称" prop="name" min-width="150">
            <template slot-scope="scope">
              <div v-for="(item,i) in scope.row.monomers" :key="i" class="cell-p pro-name">
                <span class="name-span" v-html="item.name"></span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="分析状态">
            <template slot-scope="scope">
              <div v-for="(item,i) in scope.row.monomers" :key="i" class="cell-p p-status">
                <p v-for="(it,is) in item.items" :key="is" style="width: 100%;">
                  <span :class="['index-name', it.status=='0'?'col-name':'']" v-html="it.info"></span>
                  <!-- 1：等待分析，2：分析中，3：分析失败，0：分析完成 -->
                  <span v-if="it.status=='0'" @click="see(it,scope.row.stageName,item)" class="success-span">查看指标数据</span>
                  <el-popover v-if="it.status=='3'" placement="top-start" title="失败原因" width="200" trigger="hover" :content="it.error">
                    <i class="error-prompt" slot="reference" style="color:#F56C6C"></i>
                  </el-popover>
                </p>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" v-show="tableData.length">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="params.page" :page-sizes="[1,2,10, 20, 30, 40,50]" :page-size.sync="params.size" layout="sizes, prev, pager, next, jumper" :total="totalElements">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'
import { close } from 'fs'

export default {
  components: {
    headerComponent,
    breadcrumb
  },
  data() {
    return {
      breadcrumbs: [{ name: '我的项目', path: '/projectManage' }, { name: '指标分析记录', path: `/` }],
      projectId: this.$route.params.projectId, //项目id
      searchText: '',
      totalElements: 1,
      totalPages: 0,
      compilationStage: [], //编制阶段
      params: {
        page: 1,
        size: 10,
        asc: true,
        name: '', //搜索框输入
        projectId: this.$route.params.projectId
      },
      tableData: []
    }
  },
  watch: {
    params: {
      handler: 'findMonomerUpdateTaskByProject',
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.getProjectStage()
  },
  methods: {
    getProjectStage() {
      api
        .getProjectStage(this.projectId)
        .then(res => {
          this.compilationStage = res.data
        })
        .catch(res => {})
    },
    // 查看指标
    see(val, vals, item) {
      // 1：等待分析，2：分析中，3：分析失败，0：分析完成
      let findIndex = this.compilationStage.find(data => data.name == vals)
      if (val.status == 0) {
        if (val.type != '造价') {
          this.$router.push(`/projectManage/detail/newIndexData/operandIndex/${this.projectId}/${item.id}`)
        } else {
          this.$router.push(`/projectManage/detail/newIndexData/proIndex/${this.projectId}/${findIndex.stageId}`)
        }
      }
    },
    //搜索
    handleSearch() {
      this.params.page = 1
    },
    handleSizeChange(val) {
      this.params.page = 1
      this.params.size = val
    },
    handleCurrentChange(val) {
      this.params.page = val
    },
    sortChange({ column, prop, order }) {
      this.params.page = 1
      switch (order) {
        case 'descending':
          this.params.asc = true
          break
        case 'ascending':
          this.params.asc = false
          break
        default:
          this.params.asc = null
      }
    },
    findMonomerUpdateTaskByProject() {
      api
        .findMonomerUpdateTaskByProject(this.params)
        .then(res => {
          this.tableData = res.data.content
          this.totalElements = res.data.totalElements
          this.totalPages = res.data.totalPages
          if (this.tableData && this.params.name) {
            let searchText = this.params.name
            let temp = searchText
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
            let replaceString = '<span style="color: red;font-weight:bold;">' + searchText + '</span>'
            this.tableData.forEach((it, index) => {
              this.tableData[index].userName = it.userName.replace(replaceReg, replaceString) //操作人
              this.tableData[index].stageName = it.stageName.replace(replaceReg, replaceString) //编制阶段
              for (let indexs = 0; indexs < it.monomers.length; indexs++) {
                const element = it.monomers[indexs]
                this.tableData[index].monomers[indexs].name = element.name.replace(replaceReg, replaceString) //单项工程名称
                for (let indexss = 0; indexss < element.items.length; indexss++) {
                  const elements = element.items[indexss]
                  this.tableData[index].monomers[indexs].items[indexss].info = elements.info.replace(replaceReg, replaceString) //分析状态
                }
              }
            })
          }
          this.$nextTick(() => {
            let row = document.getElementsByClassName('el-table__row')
            for (let index = 0; index < row.length; index++) {
              const element5 = row[index].children[5].getElementsByClassName('cell-p')
              const element4 = row[index].children[4].getElementsByClassName('cell-p')
              for (let i = 0; i < element5.length; i++) {
                const e = element4[i]
                element4[i].style.height = element5[i].offsetHeight + 'px'
              }
            }
          })
        })
        .catch(res => {})
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
.cell-p {
  padding: 0 10px;
  line-height: 30px;
  border-bottom: 1px solid #ebeef5;
  .index-name {
    display: inline-block;
    text-align: left;
  }
  .col-name {
    width: 140px;
  }
  .success-span {
    font-size: 12px;
    font-weight: 400;
    color: #69789e;
    text-decoration: underline;
    display: inline-block;
    margin-left: 5px;
  }
  .error-prompt {
    display: inline-block;
    vertical-align: top;
    margin-top: 9px;
    margin-left: 5px;
    width: 14px;
    height: 14px;
    background: url(../../assets/img/normality.png);
  }
  .error-prompt:hover {
    background: url(../../assets/img/suspension.png);
  }
  span {
    cursor: pointer;
  }
}
.cell-p:last-child {
  border: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.p-status {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid #ebeef5;
  padding-top: 5px;
  padding-bottom: 5px;
}
.pro-name {
  height: 121px;
  display: flex;
  text-overflow: ellipsis;
  vertical-align: middle;
  width: 100%;
  align-items: center;
  overflow: hidden;
  line-height: auto !important;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    line-height: 18px;
  }
  .name-span {
    display: inline-block;
    line-height: auto !important;
  }
}
.project-tables {
  /deep/.el-table__body {
    .el-table__row {
      td:nth-child(5),
      td:nth-child(6) {
        .cell {
          padding: 0;
          height: 100%;
        }
      }
    }
  }
  /deep/.el-table {
    .el-table__row .cell {
      height: auto !important;
      line-height: 23px;
    }
  }
  /deep/.el-table--enable-row-hover /deep/.el-table__body tr:hover > td {
    background: #fff !important;
  }
}
</style>