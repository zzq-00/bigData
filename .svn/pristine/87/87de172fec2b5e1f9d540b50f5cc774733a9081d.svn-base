<template>
  <div class="project-Info">
    <div class="page-info">
      <ul>
        <li>
          <span>项目编号：</span>
          <em>
            <span style="font-size: 14px;font-weight: 700;">{{projectData.projectCode}}</span>
          </em>
        </li>
        <li>
          <span>创建人：</span>
          <em>
            <span v-if="projectData.creatorChineseName">{{projectData.creatorChineseName}}({{projectData.creatorName}})</span>
            <span v-else>{{projectData.creatorName}}</span>
          </em>
        </li>
        <li>
          <span>创建时间：</span>
          <em>
            <span>{{projectData.createAt&&projectData.createAt.replace(/-/g, '/')}}</span>
          </em>
        </li>
        <li>
          <span>项目行业：</span>
          <em>
            <span>{{projectData.industryBelong}}</span>
          </em>
        </li>
        <li>
          <span>类别：</span>
          <em>
            <span>{{projectData.projectType}}</span>
          </em>
        </li>
        <li>
          <span>项目名称：</span>
          <em>
            <span>{{projectData.projectName}}</span>
          </em>
        </li>
        <li>
          <span>项目地点：</span>
          <em>
            <span>{{projectData.provinceName +'/'+ projectData.cityName +'/'+projectData.distinctName}}</span>
          </em>
        </li>
        <li>
          <span>开工日期：</span>
          <em>
            <span>{{projectData.projectStart}}</span>
          </em>
        </li>
        <li>
          <span>竣工日期：</span>
          <em>
            <span>{{projectData.projectEnd}}</span>
          </em>
        </li>
        <li>
          <span>建设性质：</span>
          <em>
            <span>{{projectData.projectNature}}</span>
          </em>
        </li>
        <li>
          <span>建设单位：</span>
          <em>
            <span>{{projectData.doSide}}</span>
          </em>
        </li>
        <li>
          <span>产品类型：</span>
          <em>
            <span v-for="(item,index) in projectData.productTypeList" :key="index">
              {{ index+1 != projectData.productTypeList.length ? item + ' / ' : item }}
            </span>
          </em>
        </li>
        <li>
          <span>建设规模：</span>
          <em>
            <span v-for="(item,index) in projectData.projectScaleList" :key="index">{{item.split(':')[0]}}：{{item.split(':')[1]}}{{item.split(':')[2] === '无' ? '' : item.split(':')[2]}}；</span>
          </em>
        </li>
        <li v-if="projectData.itemSpecification">
          <span>国家清单计价规范：</span>
          <em>
            <span>{{projectData.itemSpecification}}</span>
          </em>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/fetch/api'
export default {
  props: {
    projectData: {
      type: Object,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.project-Info {
  background-color: #fff;
  margin: 10px 18px 20px 19px;
  .page-info {
    overflow-x: hidden;
    height: calc(100vh - 120px);
    > ul {
      font-size: 12px;
      padding: 25px 60px;
      > li {
        line-height: 34px;
        overflow: hidden;
        > span {
          float: left;
          color: #bebebe;
          width: 120px;
        }
        > em {
          float: left;
          width: e('calc(100% - 120px)');
          color: #666;
        }
      }
    }
    .el-form {
      width: 835px;
    }
  }
}
</style>
