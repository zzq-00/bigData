<template>
  <div>
    <div v-if="$props.info=='true'">
      <li>
        <span>占地面积:</span>
        <span>{{ruleForm.monomerAll.deitail.monomerArea}}㎡</span>
      </li>
      <li>
        <span>地上建筑面积:</span>
        <span>{{ruleForm.monomerAll.deitail.groundArea}}㎡</span>
      </li>
      <li>
        <span>地下建筑面积:</span>
        <span>{{ruleForm.monomerAll.deitail.undergroundArea}}㎡</span>
      </li>
      <li>
        <span>地上层数:</span>
        <span>{{ruleForm.monomerAll.deitail.groundFloors}}层</span>
      </li>
      <li>
        <span>地下层数:</span>
        <span>{{ruleForm.monomerAll.deitail.undergroundFloors}}层</span>
      </li>
      <li>
        <span>建筑风格:</span>
        <span>{{ruleForm.monomerAll.deitail.style}}</span>
      </li>
    </div>
    <div v-else>
      <li>
        <el-form-item label="主体建安工程价格信息取定时间:" prop="selectedDate" id='time' class="special-item">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.selectedDate" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="占地面积(㎡):" prop="monomerArea">
          <el-input class="short-input" v-model="ruleForm.monomerArea">
          </el-input>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="建筑面积(㎡):" prop="buildArea">
          <el-input class="short-input" v-model="ruleForm.buildArea">
          </el-input>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="层数(层):" prop="floors">
          <el-input class="short-input" v-model="ruleForm.floors">
          </el-input>
        </el-form-item>
      </li>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    ruleForm: Object
  }
}
</script>

<style>
</style>