<!--  -->
<template>
  <div class="li-box">
    <div v-if="$props.info">
      <li>
        <span>项目地点:</span>
        <span>{{ruleForm.projectCommon.provinceName}}/{{ruleForm.projectCommon.cityName}}{{ruleForm.projectCommon.distinctName}}</span>
      </li>
      <li>
        <span>地区类别:</span>
        <span>{{ruleForm.objectX.areaType}}</span>
      </li>
    </div>
    <div v-else>
      <li>
        <span>项目地点:</span>
        <el-select v-model="ruleForm.commonProvinceCode" multiple collapse-tags placeholder="请选择项目地点">
          <el-option v-for="item in tabularData.regionalList" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </li>
      <li>
        <span>地区类别:</span>
        <el-select v-model="ruleForm.areaType" placeholder="请选择地区类别">
          <el-option v-for="item in tabularData.areaTypeList" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </li>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ruleForm: Object,
    info: Boolean,
    tabularData: Object
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>

<style lang="less" scoped>
</style>
