<template>
  <div class="project-Info">
    <div class="footers">
      <el-button type="primary" v-if="!doEdit" @click="doEdit = true" size="mini">编辑</el-button>
      <el-button type="primary" v-else @click="cancel()" size="mini">取消</el-button>
    </div>
    <div class="project-page">
      <template v-if="!doEdit">
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
              <span>{{projectData.members.map(item => item.name).join(' / ')}}</span>
            </em>
          </li>
          <li>
            <h4>2 扩展信息</h4>
          </li>
          <li v-if="projectData.common.provinceName">
            <span>项目地点：</span>
            <em>
              <span>{{projectData.common.provinceName +' / '+ projectData.common.cityName}}<span v-if="projectData.common.distinctName">{{' / '+projectData.common.distinctName}}</span></span>
            </em>
          </li>
          <li v-if="projectData.projectX.areaType">
            <span>地区类别：</span>
            <em>
              <span>{{projectData.projectX.areaType}}</span>
            </em>
          </li>
          <li v-if="projectData.projectX.volumeRate">
            <span>容积率：</span>
            <em>
              <span>{{projectData.projectX.volumeRate || '-'}}%</span>
            </em>
          </li>
          <li v-if="projectData.projectX.greeningRate">
            <span>绿化率：</span>
            <em>
              <span>{{projectData.projectX.greeningRate || '-'}}%</span>
            </em>
          </li>
          <li v-if="projectData.projectX.floorArea">
            <span>占地面积：</span>
            <em>
              <span>{{projectData.projectX.floorArea}}㎡</span>
            </em>
          </li>
          <li v-if="projectData.projectX.buildingArea">
            <span>规划建筑面积：</span>
            <em>
              <span>{{projectData.projectX.buildingArea}}㎡</span>
            </em>
          </li>
          <li v-if="projectData.projectX.hospitalRank">
            <span>医院规划等级：</span>
            <em>
              <span>{{projectData.projectX.hospitalRank}}</span>
            </em>
          </li>
          <li v-if="projectData.projectX.schoolType">
            <span>学校类别：</span>
            <em>
              <span>{{projectData.projectX.schoolType}}</span>
            </em>
          </li>
          <li v-if="projectData.projectX.projectScale">
            <span>建设规模：</span>
            <em>
              <span>{{projectData.projectX.projectScale}} MW</span>
            </em>
          </li>
          <li v-if="projectData.projectX.handleCapacity">
            <span>日处理量：</span>
            <em>
              <span>{{projectData.projectX.handleCapacity}} t</span>
            </em>
          </li>
          <li v-if="projectData.projectX.planCapacity">
            <span>规划容量：</span>
            <em>
              <span>{{projectData.projectX.planCapacity}} 万kVA</span>
            </em>
          </li>
          <li v-if="projectData.projectX.totalKm">
            <span>线路规划总里程长度：</span>
            <em>
              <span>{{projectData.projectX.totalKm}} km</span>
            </em>
          </li>
          <li v-if="projectData.projectX.transportVolum || projectData.projectX.transportVolum2">
            <span>年客货运量：</span>
            <em>
              <span>{{projectData.projectX.transportVolum}} 万吨</span>
              /
              <span>{{projectData.projectX.transportVolum2}} 万人</span>
            </em>
          </li>
          <li v-if="projectData.common.importantCities">
            <span>项目途经重要节点城市：</span>
            <em>
              <span>{{projectData.common.importantCities}}</span>
            </em>
          </li>
          <li v-if="projectData.projectX.railwayRank">
            <span>铁路等级：</span>
            <em>
              <span>{{projectData.projectX.railwayRank}}</span>
            </em>
          </li>
          <li v-if="projectData.projectX.trafficType">
            <span>城市轨道交通类别：</span>
            <em>
              <span>{{projectData.projectX.trafficType}}</span>
            </em>
          </li>
          <li v-if="projectData.projectX.highwayRank">
            <span>公路等级：</span>
            <em>
              <span>{{projectData.projectX.highwayRank}}</span>
            </em>
          </li>
          <li v-if="projectData.projectX.starRank">
            <span>酒店星级：</span>
            <em>
              <span>{{projectData.projectX.starRank}}</span>
            </em>
          </li>
        </ul>
      </template>
      <template v-else>
        <projectInfoEdit :projectData="projectData" @cancelClick='cancel' />
      </template>
    </div>

  </div>
</template>
<script>
import api from '@/fetch/api'
import projectInfoEdit from './projectInfoEdit'

export default {
  components: {
    projectInfoEdit
  },
  props: {
    projectData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      doEdit: false
    }
  },
  methods: {
    // 获取项目详情
    cancel(value) {
      this.$emit('editClick', value)
      this.doEdit = false
    }
  }
}
</script>
<style lang="less" scoped>
.project-Info {
  background-color: #fff;
  margin: 10px 18px 20px 19px;
  overflow: hidden;
  .footers {
    height: 40px;
    text-align: left;
    background-color: #e7eaee;
    > button {
      width: 70px;
      height: 30px;
      line-height: 30px;
      border-radius: 0;
      padding: 0;
      font-size: 14px;
    }
  }
  .project-page {
    overflow-x: hidden;
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
          flex: 0 0 150px;
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
}
</style>
