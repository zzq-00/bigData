<template>
  <div>
    <h5>文档详情</h5>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" size="small">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文件属性分类：" prop="fileServiceType">
          <el-select v-model="ruleForm.fileServiceType" placeholder="请选择" style="width: 100%;">
            <el-option v-for="(item,index) in serviceType" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签：" prop="label">
          <el-input v-model="ruleForm.label" placeholder="请填写文章内容的关键词并以空格隔开，如：河北 审核 合同"></el-input>
        </el-form-item>
        <el-form-item label="简介：" prop="introduction">
          <el-input type="textarea" v-model="ruleForm.introduction"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'

export default {
  watch: {
    editFileId: function (value) {
      this.getKnowBaseById()
    }
  },
  props: {
    editFileId: {
      type: String,
      required: true
    }
  },
  data () {
    var checkLength = (rule, value, callback) => {
      let arr = value.trim().split(/\s+/)
      if (arr.length > 10) {
        callback(new Error('最多10个关键词!'))
      } else {
        callback()
      }
    }
    return {
      serviceType: [],
      ruleForm: {
        id: '',
        title: '',
        fileServiceType: '',
        label: '',
        introduction: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        fileServiceType: [
          { required: true, message: '请选择文件属性分类', trigger: 'change' }
        ],
        label: [
          { validator: checkLength, trigger: 'blur' }
        ],
        introduction: [
          { max: 200, message: '长度不超过 200 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getKnowBaseById () {
      api.getKnowBaseById(this.editFileId).then(res => {
        this.ruleForm = res.data
      })
    },
    getKnowFileServiceType () {
      api.getKnowFileServiceType().then(res => {
        this.serviceType = res.data
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.updateKnowBase(this.ruleForm).then(res => {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.$emit('refresh')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    this.getKnowBaseById()
    this.getKnowFileServiceType()
  }
}
</script>
<style lang="less" scoped>
h5 {
  font-weight: normal;
  font-size: 16px;
  margin-bottom: 65px;
  & + div {
    width: 525px;
  }
}
</style>
