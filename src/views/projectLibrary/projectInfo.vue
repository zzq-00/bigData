<template>
  <div class="project-Info">
    <ul>
      <li>
        <h4>1 项目基本信息</h4>
      </li>
      <li>
        <span>项目编号：</span>
        <em>
          <span style="font-size: 14px;font-weight: 700;">{{projectData.common.projectCode}}</span>
        </em>
      </li>
      <li>
        <span>创建时间：</span>
        <em>
          <span>{{projectData.common.createAt}}</span>
        </em>
      </li>
      <li>
        <span>创建人：</span>
        <em>
          <span>{{projectData.common.creatorName}}</span>
        </em>
      </li>
      <li>
        <span>项目行业：</span>
        <em>
          <span>{{projectData.common.industryBelongOther || projectData.common.industryBelong}} / {{ projectData.common.subIndustryBelongOther || projectData.common.subIndustryBelong}}</span>
        </em>
      </li>
      <li>
        <span>项目名称：</span>
        <em>
          <span>{{projectData.common.projectName}}</span>
        </em>
      </li>
      <li>
        <span>建设单位：</span>
        <em>
          <span>{{projectData.common.doSide}}</span>
        </em>
      </li>
      <li>
        <span>开工日期：</span>
        <em>
          <span>{{projectData.common.projectStart || '-'}}</span>
        </em>
      </li>
      <li>
        <span>竣工日期：</span>
        <em>
          <span>{{projectData.common.projectEnd || '-'}}</span>
        </em>
      </li>
      <li>
        <span>建设性质：</span>
        <em>
          <span>{{projectData.common.nature}}</span>
        </em>
      </li>
      <li>
        <span>项目成员：</span>
        <em>
          <span v-if="projectData.members.length">{{projectData.members.join('/')}}</span>
          <span v-else>-</span>
        </em>
      </li>
      <li>
        <h4>2 扩展信息</h4>
      </li>
      <li>
        <span>项目地点：</span>
        <em>
          <span>{{projectData.common.provinceName +' / '+ projectData.common.cityName}}<span v-if="projectData.common.distinctName">{{' / '+projectData.common.distinctName}}</span></span>
        </em>
      </li>
      <li>
        <span>地区类别：</span>
        <em>
          <span>{{projectData.projectX.areaType}}</span>
        </em>
      </li>
      <li>
        <span>容积率：</span>
        <em>
          <span>{{projectData.projectX.volumeRate || '-'}}%</span>
        </em>
      </li>
      <li>
        <span>绿化率：</span>
        <em>
          <span>{{projectData.projectX.greeningRate || '-'}}%</span>
        </em>
      </li>
      <li>
        <span>占地面积：</span>
        <em>
          <span>{{projectData.projectX.floorArea}}㎡</span>
        </em>
      </li>
      <li>
        <span>规划建筑面积：</span>
        <em>
          <span>{{projectData.projectX.buildingArea}}㎡</span>
        </em>
      </li>
    </ul>
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
<style lang="less" scoped>
.project-Info {
  background-color: #fff;
  margin: 10px 18px 20px 19px;
  overflow: hidden;
  height: calc(100vh - 160px);
  > ul {
    font-size: 12px;
    padding: 25px 60px;
    > li {
      line-height: 34px;
      display: flex;
      align-items: center;
      > h4 {
        font-size: 14px;
      }
      > span {
        flex: 0 0 120px;
        color: #bebebe;
        margin-left: 13px;
      }
      > em {
        flex: 1;
        color: #666;
      }
    }
  }
}
</style>
