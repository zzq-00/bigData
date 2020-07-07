<!--  -->
<template>
  <div class="li-box">
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
        <span>学制:</span>
        <span>{{ruleForm.monomerAll.deitail.educationalSystem}}</span>
      </li>
      <li>
        <span>班级人数:</span>
        <span>{{ruleForm.monomerAll.deitail.classSize}}人</span>
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
        <el-form-item label="地上建筑面积(㎡):" class="special-item">
          <el-col :span="11">
            <el-form-item>
              <el-input class="short-input" v-model="ruleForm.groundArea1">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-input class="short-input" v-model="ruleForm.groundArea2">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="地下建筑面积(㎡):" class="special-item">
          <el-col :span="11">
            <el-form-item>
              <el-input class="short-input" v-model="ruleForm.undergroundArea1">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-input class="short-input" v-model="ruleForm.undergroundArea2">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="地上层数(层):">
          <el-col :span="11">
            <el-form-item>
              <el-input class="short-input" v-model="ruleForm.groundFloors1">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-input class="short-input" v-model="ruleForm.groundFloors2">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="地下层数(层):">
          <el-col :span="11">
            <el-form-item prop="undergroundFloors1">
              <el-input class="short-input" v-model="ruleForm.undergroundFloors1">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="undergroundFloors2">
              <el-input class="short-input" v-model="ruleForm.undergroundFloors2">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="班级人数(人):">
          <el-col :span="11">
            <el-form-item prop="classSize1">
              <el-input class="short-input" v-model="ruleForm.classSize1">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="classSize2">
              <el-input class="short-input" v-model="ruleForm.classSize2">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="学制:" prop="educationalSystem">
          <el-select v-model="ruleForm.educationalSystem" multiple collapse-tags placeholder="请选择学制">
            <el-option v-for="item in educationalSystemData" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
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
