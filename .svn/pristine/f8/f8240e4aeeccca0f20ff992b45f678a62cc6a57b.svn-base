<template>
  <div class="organ">
    <div class="mainright">
      <div class="marnright_head">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in controlBread" :key="index"><img :src="item.imgages" alt="">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="marnright_sect">
        <div v-for='(item,index) in input' :key='index'>
          <el-input v-model="item.name" :key='index' placeholder="请输入新部门名称" @change="handlerChange = true"></el-input>
        </div>
        <div class="add" @click="adddom">
          <i class="el-icon-plus"></i>
        </div>
      </div>
      <div class="footer">
        <button class="save" @click="save">保存</button>
        <button class="again" @click="again">回退</button>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../../fetch/api.js'
import Bus from '../../assets/js/bus.js'
export default {
  data () {
    return {
      controlBread: [
        {
          name: '天职工程咨询有限公司',
          imgages: require('../../assets/img/index/position.png')
        }
      ],
      input: [
        {
          id: '',
          name: ''
        },
        {
          id: '',
          name: ''
        },
        {
          id: '',
          name: ''
        },
        {
          id: '',
          name: ''
        },
        {
          id: '',
          name: ''
        },
        {
          id: '',
          name: ''
        }
      ],
      cloneIpt: [],
      adddowmtemp: {
        deptId: '',
        deptInfoList: []
      },
      form: {
        name: '',
        region: '',
        search: '',
        id: null
      },
      loading: true,
      formLabelWidth: '120px',
      section: null,
      handlerChange: false,
      clickSave: false
    }
  },
  mounted () {
    let that = this
    Bus.$on('clickId', e => {
      that.cloneIpt = []
      that.adddowmtemp.deptId = e
      api
        .getDepartmentById(e)
        .then(function (res) {
          let len = res.data.length
          for (let i = 0; i < that.input.length; i++) {
            that.input[i].name = ''
            that.input[i].id = ''
          }
          if (res.data.length > 6) {
            that.input = []
            res.data.map((item, index) => {
              that.cloneIpt.push(item)
              that.input.push({ id: item.id, name: item.name })
            })
          } else {
            that.input = [{
              id: '',
              name: '' }, {
              id: '',
              name: '' }, {
              id: '',
              name: '' }, {
              id: '',
              name: '' }, {
              id: '',
              name: '' }, {
              id: '',
              name: '' }],
            res.data.map((item, ind) => {
              that.cloneIpt.push(item)
              item.name ? (that.input[ind].name = item.name) : ''
              item.id ? (that.input[ind].id = item.id) : ''
            })
          }
        })
        .catch(function (err) {
          console.log(err)
        })

      // 面包屑
      api
        .getSingleDeptList(e)
        .then(function (res) {
          res.data.map((item, index) => {
            that.controlBread.push({ name: item.name, ind: index })
          })
        })
        .catch(function (err) {
          console.log(err)
        })
      Bus.$emit('controlBread', that.controlBread)
    })
    document.querySelector('.save').setAttribute('disabled', true)
  },
  watch: {
    handlerChange: function (curVal, oldVal) {
      if (curVal) {
        let save = document.querySelector('.save')
        save.removeAttribute('disabled')
        save.style.background = '#FF9F00'
        save.style.border = '#FF9F00'
        save.style.color = '#fff'
      }
    },
    clickSave: function (curVal, oldVal) {
      if (curVal) {
        let again = document.querySelector('.again')
        again.setAttribute('disabled', true)
        again.removeAttribute('disabled')
        again.style.background = '#ccc'
        again.style.border = '#ccc'
        again.style.color = '#999'
      }
    }
  },
  methods: {
    // 添加节点
    adddom () {
      let obj = {
        id: '',
        name: ''
      }
      this.input.push(obj)
    },
    save () {
      // 保存
      if (this.handlerChange) {
        let that = this
        that.clickSave = true
        this.adddowmtemp.deptInfoList = []
        for (let i = 0; i < this.input.length; i++) {
          if (this.input[i].id || this.input[i].name) {
            this.adddowmtemp.deptInfoList.push({
              id: this.input[i].id,
              name: this.input[i].name
            })
          }
        }
        api
          .addJuniorDepartment(this.adddowmtemp)
          .then(function (res) {
            that.$router.go(0)
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    again () {
      let that = this
      if (that.handlerChange) {
        // 修改
        if (!that.clickSave) {
          that
            .$confirm('是否要回退到下级部门未修改的初始状态？', '提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'
            })
            .then(() => {
              for (let i = 0; i < that.input.length; i++) {
                if (that.input[i].name) {
                  that.input[i].name = this.cloneIpt[i].name
                }
              }
            })
            .catch(err => {
              return false
            })
        }
      }
    }
  }
}
</script>
<style lang="less">
.marnright_head {
  .el-breadcrumb__inner {
    color: #fff;
    font-size: 14px;
    img {
      padding-right: 10px;
    }
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #fff;
  }
}
.el-breadcrumb__separator[class*="icon"] {
  font-weight: 400;
  color: #fff;
}
.marnright_sect {
  .el-input {
    height: 36px;
    > .el-input__inner {
      height: 36px;
      font-size: 12px;
    }
  }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.el-breadcrumb__item {
  line-height: 41px;
}
.el-breadcrumb {
  font-size: 14px;
  color: #ffffff;
}
.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  font-weight: normal;
}
.mainright {
  width: 100%;
  margin-left: 16px;
  box-sizing: border-box;
  background: #fff;
}

.marnright_head {
  line-height: 41px;
  background: #a9acb3;
  padding-left: 26px;
  box-sizing: border-box;
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #fff;
  }
}
.marnright_sect {
  padding-top: 5px;
  padding-left: 26px;
  padding-bottom: 67px;
  border-bottom: 1px solid #eff2f9;
  > div {
    padding: 10px 0;
  }
  .el-input {
    width: 559px;
  }
  .add {
    width: 559px;
    height: 34px;
    border: 1px solid #dcdfe6;
    background: none;
    color: #606266;
    text-align: center;
    margin-top: 10px;
    padding: 0;
    .el-icon-plus {
      display: inline-block;
      width: 16px;
      height: 16px;
      line-height: 36px;
      text-align: center;
    }
  }
}
.footer {
  width: 559px;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  button {
    width: 100px;
    height: 36px;
    color: #fff;
    font-size: 14px;
  }
  .save {
    background: #ccc;
    border: 1px solid #ccc;
    color: #666;
    cursor: pointer;
  }
  .again {
    margin-left: 89px;
    background: #4474cf;
    border: 1px solid #4474cf;
    cursor: pointer;
  }
}
</style>
