<!--  -->
<template>
  <div class="li-box">
    <div v-if="$props.info=='true'">
      <li>
        <span>占地面积:</span>
        <span>{{ruleForm.monomerAll.deitail.monomerArea}}㎡</span>
      </li>
      <li>
        <span>建筑面积:</span>
        <span>{{ruleForm.monomerAll.deitail.buildArea}}㎡</span>
      </li>
      <li>
        <span>层数:</span>
        <span>{{ruleForm.monomerAll.deitail.floors}}层</span>
      </li>
    </div>
    <div v-else>
      <li>
        <el-form-item label="有无桩基工程:" prop="ifZhuangji">
          <el-select v-model="ruleForm.ifZhuangji" placeholder="有无桩基工程">
            <el-option label="有" value="true"></el-option>
            <el-option label="无" value="false"></el-option>
          </el-select>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="结构类型:" prop="structureTypeId">
          <el-select v-model="ruleForm.structureTypeId" multiple collapse-tags placeholder="请选择结构类型">
            <el-option v-for="item in structureList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="主体建安工程价格信息取定时间:" class="special-item">
          <el-date-picker v-model="ruleForm.selectedDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="占地面积(㎡):">
          <el-col :span="11">
            <el-form-item>
              <el-input class="short-input" v-model="ruleForm.monomerArea1">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-input class="short-input" v-model="ruleForm.monomerArea2">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="建筑面积(㎡):">
          <el-col :span="11">
            <el-form-item prop="buildArea1">
              <el-input class="short-input" v-model="ruleForm.buildArea1">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="buildArea2">
              <el-input class="short-input" v-model="ruleForm.buildArea2">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="层数(层):">
          <el-col :span="11">
            <el-form-item prop="floors1">
              <el-input class="short-input" v-model="ruleForm.floors1">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="floors2">
              <el-input class="short-input" v-model="ruleForm.floors2">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

      </li>
    </div>
  </div>

</template>
<script>
import api from '@/fetch/api'
export default {
  props: {
    ruleForm: Object,
    info: String
  },
  watch: {},
  data() {
    return {
      structureList: []
    }
  },
  methods: {},
  mounted() {
    api.getDicCommon(9).then(res => {
      this.structureList = res.data
    })
  }
}
</script>

<style lang="less" scoped>
</style>
