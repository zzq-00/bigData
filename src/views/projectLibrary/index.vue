<template>
  <div>
    <headerComponent />
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="container main">
      <!-- 筛选栏 -->
      <projectFilterCom filterType='projectLibrary' placeholder="搜索项目编号 / 项目名称 / 建设单位 / 创建人" />
      <div class="my-project">
        <div class="another-pagination">
          <span>共有 {{totalElements}} 条项目。</span>
          <span v-show="totalPages">
            <el-button type="text" icon="el-icon-arrow-left" :disabled="conditionParams.page==1" @click="conditionParams.page--"></el-button>
            <span> {{conditionParams.page}}/{{totalPages}} </span>
            <el-button type="text" icon="el-icon-arrow-right" :disabled="conditionParams.page==totalPages" @click="conditionParams.page++"></el-button>
          </span>
        </div>
      </div>

      <div class="project-tables">
        <el-table ref="project-table" style="width: 100%;" height="calc(100vh - 280px)" :data="tableData" stripe border size="mini" @sort-change="sortChange" @row-click='rowClick'>
          <el-table-column label="序号" align="center" width="60px">
            <template slot-scope="scope">
              {{scope.$index+1+(conditionParams.page-1)*conditionParams.size}}
            </template>
          </el-table-column>
          <el-table-column label="项目编号" width="120px">
            <template slot-scope="scope">
              <div v-html="scope.row.projectCode"></div>
            </template>
          </el-table-column>
          <el-table-column label="项目名称" min-width="300px">
            <template slot-scope="scope">
              <div class="name-row">
                <span v-html="scope.row.projectName" class="ellipsis" style="max-width: 80%;"></span>
                <span class="name-ico">
                  <i class="blue" @click.stop="gotoIndex(scope.row,'quantity')" v-if="scope.row.indicatorData1 === '算量指标'">量</i>
                  <i class="red" @click.stop="gotoIndex(scope.row,'cost')" v-if="scope.row.indicatorData2 === '造价指标'">价</i>
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="项目行业" prop="industryBelong" width="200px">
            <template slot-scope="scope">
              {{scope.row.industryBelong}} / {{scope.row.subIndustryBelong}}
            </template>
          </el-table-column>
          <el-table-column label="建设单位" width="230px">
            <template slot-scope="scope">
              <div v-html="scope.row.doSide"></div>
            </template>
          </el-table-column>
          <el-table-column label="建设性质" prop="nature" width="90px">
          </el-table-column>
          <el-table-column label="开工日期" sortable="custom" prop="project_start" width="105px">
            <template slot-scope="scope">
              {{scope.row.projectStart}}
            </template>
          </el-table-column>
          <el-table-column label="竣工日期" sortable="custom" prop="project_end" width="105px">
            <template slot-scope="scope">
              {{scope.row.projectEnd}}
            </template>
          </el-table-column>
          <el-table-column label="编制阶段" min-width="250px">
            <template slot-scope="scope">
              {{scope.row.stage}}
            </template>
          </el-table-column>
          <el-table-column v-if="conditionParams.provinceCode" label="项目地点" min-width="230px">
            <template slot-scope="scope">
              <span>{{scope.row.provinceName}}-{{scope.row.cityName}}-{{scope.row.distinctName}}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="conditionParams.areaType" label="地区类别" prop="areaType" width="100px">
          </el-table-column>
          <el-table-column v-if="conditionParams.buildingArea1||conditionParams.buildingArea2" label="规划建筑面积㎡" prop="buildingArea" width="100px">
          </el-table-column>
          <el-table-column label="创建人" width="190px">
            <div slot-scope="scope" style="display: flex;justify-content: space-between;">
              <span>
                <span v-html="scope.row.creatorName"></span>
                <span>（{{scope.row.jobNumber}}）</span>
              </span>
              <el-popover placement="right" width="100" trigger="hover" @show="getProjectStaff(scope.row)">
                <dl class="member-list">
                  <dt>项目成员列表</dt>
                  <dd v-for="(item,index) in scope.row.member" :key="index">{{item}}</dd>
                </dl>
                <img src="@/assets/img/member.png" slot="reference" alt="" style="margin-left: 10px;">
              </el-popover>
            </div>
          </el-table-column>
          <el-table-column label="创建时间" sortable="custom" prop="create_at" width="160px">
            <template slot-scope="scope">
              {{scope.row.createAt}}
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-wrap" v-show="tableData.length">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="conditionParams.page" :page-sizes="[10, 20, 50, 100]" :page-size.sync="conditionParams.size" layout="sizes, prev, pager, next, jumper" :total="totalElements">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 判断权限 没有权限改变颜色 -->
    <span class="J-lookProject" v-has="['30tPRo']"></span>
    <span class="J-analysis" v-has="['70bb3J']"></span>
    <span class="J-index" v-has="['gi1q6y']"></span>
  </div>
</template>

<script>
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'
import projectFilterCom from '@/components/projectFilterCom'
import api from '@/fetch/api'
import { isDisplay } from '@/assets/js/Utils'
import { mapState } from 'vuex'

export default {
  name: 'projectLibrary',
  components: {
    headerComponent,
    breadcrumb,
    projectFilterCom
  },
  computed: {
    ...mapState(['projectLibraryFilterData'])
  },
  data() {
    return {
      permissionlookProject: false,
      permissionanalysis: false,
      permissionindex: false,
      breadcrumbs: [{ name: '企业项目库', path: this.$route.fullPath }],
      conditionParams: {
        column: 'create_at',
        descOrAsc: true,
        page: 1,
        size: 20
      },
      totalElements: 0,
      totalPages: 0,
      tableData: [],
      directoryList: [],
    }
  },
  watch: {
    projectLibraryFilterData: {
      handler: function(val) {
        this.conditionParams.page = 1
        Object.assign(this.conditionParams, val)
        // 指标数据的筛选要放到不同的字段里，indicatorData1: '算量指标'  indicatorData2: '造价指标'
        this.conditionParams.indicatorData1 = this.conditionParams.indicatorData2 = this.conditionParams.indicatorData
        if (this.conditionParams.indicatorData === '算量指标') {
          delete this.conditionParams.indicatorData2
        } else if (this.conditionParams.indicatorData === '造价指标') {
          delete this.conditionParams.indicatorData1
        }
        for (const key in this.conditionParams) {
          if (this.conditionParams[key] == '' || this.conditionParams[key] == '不限') delete this.conditionParams[key]
        }
        this.getEnterpriseProjectByCondition()
      },
      deep: true
    }
  },
  methods: {
    // 跳转指标
    gotoIndex(row, type) {
      api.entSidebar(row.id).then(res => {
        this.directoryList = res.data
        let costIndex
        let quantityIndex
        let fristIndex
        for (let i = 0; i < this.directoryList.length; i++) {
          const element = this.directoryList[i]
          for (let b = 0; b < element.indicatorName.length; b++) {
            const eleb = element.indicatorName[b]
            if (eleb.indicatorName == '造价指标') {
              costIndex = b
            } else if (eleb.indicatorName == '算量指标') {
              quantityIndex = b
            }
            continue
          }
          fristIndex = i
          break
        }
        if (type == 'cost') {
          let arr = this.directoryList[fristIndex].indicatorName[costIndex].projectIndex
          let proIndex = arr.findIndex(data => data.projectIndexNmae == '项目指标')
          if (proIndex || proIndex == 0) {
            let stageId = arr[proIndex].stageId
            this.$router.push(`/projectLibrary/detail/newIndexData/proIndex/${row.id}/${stageId}`)
          } else {
            let monomerId
            monomerId = arr[0].monomerMessage[0].buildingId
            this.$router.push(`/projectLibrary/detail/newIndexData/costIndex/${row.id}/${monomerId}`)
          }
        } else if (type == 'quantity') {
          this.$router.push(`/projectLibrary/detail/newIndexData/operandIndex/${row.id}/${this.directoryList[fristIndex].indicatorName[quantityIndex].monomerMessage[0].buildingId}`)
        }
      })
    },
    sortChange({ column, prop, order }) {
      this.conditionParams.page = 1
      this.conditionParams.column = prop
      switch (order) {
        case 'descending':
          this.conditionParams.descOrAsc = true
          break
        case 'ascending':
          this.conditionParams.descOrAsc = false
          break
        default:
          this.conditionParams.descOrAsc = null
      }
      this.getEnterpriseProjectByCondition()
    },

    // 翻页
    handleCurrentChange(val) {
      this.conditionParams.page = val
      this.getEnterpriseProjectByCondition()
    },
    // 改变每页项目数量
    handleSizeChange(val) {
      this.conditionParams.page = 1
      this.conditionParams.size = val
      this.getEnterpriseProjectByCondition()
    },
    // 根据条件查询项目
    getEnterpriseProjectByCondition() {
      api.getEnterpriseProjectByCondition(this.conditionParams).then(res => {
        this.tableData = res.data
        this.totalElements = res.count
        this.totalPages = Math.ceil(res.count / this.conditionParams.size)
        // 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
        this.$refs['project-table'].doLayout()
        if (this.tableData && this.conditionParams.searchBoxKeyWord) {
          let searchText = this.conditionParams.searchBoxKeyWord
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
          this.tableData.forEach((item, index) => {
            this.tableData[index].projectCode = item.projectCode.replace(replaceReg, replaceString)
            this.tableData[index].projectName = item.projectName.replace(replaceReg, replaceString)
            this.tableData[index].doSide = item.doSide.replace(replaceReg, replaceString)
            this.tableData[index].creatorName = item.creatorName.replace(replaceReg, replaceString)
          })
        }
      })
    },
    // 获取项目成员
    getProjectStaff(row) {
      api.getProjectStaff(row.id).then(res => {
        let member = res.data.map(item => item.name)
        this.$set(row, 'member', member)
      })
    },
    // 整行点击进入项目详情
    rowClick({ id }, column, event) {
      this.$router.push(`/projectLibrary/detail/projectInfo/${id}`)
    }
  },
  mounted() {
    isDisplay(this, 'J-lookProject', 'permissionlookProject')
    isDisplay(this, 'J-analysis', 'permissionanalysis')
    isDisplay(this, 'J-index', 'permissionindex')
  },
  activated() {
    this.getEnterpriseProjectByCondition()
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
.my-project {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 5px 0;
  .another-pagination {
    > span:last-child {
      margin: 0 10px;
    }
    > b {
      margin: 0 20px;
      font-size: 14px;
    }
  }
}
.pagination-wrap {
  text-align: right;
  margin-top: 10px;
  margin-right: 40px;
}
.name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .name-ico {
    overflow: hidden;
    > i {
      float: left;
      border: 1px solid #000;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      & + i {
        margin-left: 5px;
      }
      &.blue {
        color: #577eee;
        border-color: #577eee;
        background-color: #eef2ff;
      }
      &.red {
        color: #ed4731;
        border-color: #ed4731;
        background-color: #fef2f0;
      }
    }
  }
}
.member-list {
  line-height: 30px;
  > dt {
    border-bottom: 1px solid #ddd;
    margin: -10px -12px 0;
    padding: 0 12px;
  }
  > dd:nth-child(2) {
    margin-top: 5px;
  }
}
.project-tables {
  /deep/ .el-table__row {
    cursor: pointer;
  }
  /deep/ .el-table th {
    padding: 0;
  }
}
</style>
