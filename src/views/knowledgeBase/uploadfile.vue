<template>
  <div class="base-container">
    <h5>上传文档</h5>
    <div>
      <div class="circle active">1</div>
      <div class="line" :class="{'active': active==2}"></div>
      <div class="circle" :class="{'active': active==2}">2</div>
    </div>

    <div class="first-step" v-show="active===1">
      <div>
        <img :src="require('@/assets/img/pc.png')" alt="">
        <p>从我的电脑选择要上传的文件</p>
        <el-upload with-credentials class="upload-demo" :action="httpHead + 'knowledge/uploadKnowFile'" :limit="1" :on-exceed="handleExceed" :on-remove="handleRemove" :before-upload="handleBeforeUpload" :on-success="handleSuccess" :on-error="handleError" :file-list="fileList">
          <el-button size="small" type="primary" v-if="ruleForm.fileId" @click.stop="active = 2">下一步</el-button>
          <el-button size="small" type="primary" v-else>点击上传</el-button>
        </el-upload>
      </div>
      <dl>
        <dt>提示：</dt>
        <dd>1、您可以上传平时积累的规范性文件，如清单标准、图集、法律法规信息等，支持文档类型有：doc / docx ; xls , xlsx ; ppt , pptx , pot , pps ; wps ; et ; dps ; PDF ; txt ; rtf ; epub ; bmp , jpg , png 。</dd>
        <dd>2、上传涉及侵权内容文档将会被移除。</dd>
      </dl>
    </div>

    <div class="second-step" v-show="active===2">
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
          <el-button type="warning" @click="active = 1">上一步</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api'

export default {
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
      httpHead: process.env.VUE_APP_API,
      active: 1,
      serviceType: [],
      fileList: [],
      ruleForm: {
        fileId: '',
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
    handleRemove (file, fileList) {
      this.ruleForm.fileId = ''
      if (file.response) {
        api.deleteKnowFile(file.response.fileId).then(res => { })
      }
    },
    handleExceed (files, fileList) {
      this.$message({
        showClose: true,
        message: '当前限制选择一个文件',
        type: 'warning'
      })
    },
    handleError (err, file, fileList) {
      this.$message({
        showClose: true,
        message: '文件上传失败',
        type: 'warning'
      })
    },
    handleBeforeUpload (file) {
      if (file.size <= 0) {
        this.$message({
          showClose: true,
          message: '不能上传空文件',
          type: 'warning'
        })
      }
      return file.size > 0
    },
    handleSuccess (response, file, fileList) {
      if (response.errorCode === '200') {
        this.$message({
          showClose: true,
          message: '文件上传成功',
          type: 'success'
        })
        this.ruleForm.fileId = response.fileId
      } else {
        this.fileList = []
        this.$message({
          showClose: true,
          message: response.errorMsg,
          type: 'warning'
        })
        response.errorCode === '1001' && (window.location.href = '/login')
      }
    },
    getKnowFileServiceType () {
      api.getKnowFileServiceType().then(res => {
        this.serviceType = res.data
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.addKnowledgeBase(this.ruleForm).then(res => {
            this.$confirm('文件上传完成，具体上传结果可在 个人中心->我的文件 中查看。', '提示', {
              confirmButtonText: '查看',
              cancelButtonText: '继续上传',
              type: 'success'
            }).then(() => {
              // 查看文档
              this.$router.push('/knowledgeBase/personalCenter')
            }).catch(() => {
              // 继续上传
              this.fileList = []
              this.ruleForm.fileId = ''
              this.$refs['ruleForm'].resetFields()
              this.active = 1
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    this.getKnowFileServiceType()
  }
}
</script>
<style lang="less" scoped>
.base-container {
  box-sizing: border-box;
  background-color: #fff;
  height: 800px;
  margin-top: 35px;
  margin-bottom: 35px;
  padding: 20px;
  > h5 {
    font-size: 16px;
    font-weight: normal;
    & + div {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .circle {
        width: 24px;
        height: 24px;
        line-height: 24px;
        border-radius: 50%;
        background-color: #c8cace;
        color: #fff;
        text-align: center;
        &.active {
          background-color: #4474cf;
        }
      }
      .line {
        width: 148px;
        height: 4px;
        background-color: #c8cace;
        &.active {
          background-color: #4474cf;
        }
      }
    }
  }
}
.first-step {
  > div:first-child {
    width: 700px;
    padding: 43px 0;
    margin: 35px auto 15px;
    border: 1px solid #a0a0a0;
    text-align: center;
    > img {
      & + p {
        font-size: 12px;
        margin: 14px 0 19px;
      }
    }
  }
  > dl {
    width: 700px;
    margin: 0 auto;
    dd {
      font-size: 12px;
      color: #888888;
      line-height: 20px;
      margin-top: 5px;
    }
  }
}
.second-step {
  width: 525px;
  margin: 35px auto 15px;
}
</style>
