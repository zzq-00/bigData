<template>
  <div class="home-header">
    <div class="header">
      <div class="base-container">
        <router-link class="headerleft" to="/">TZData</router-link>
        <ul class="headerright">
          <li>
            <em ref="logins">
              <!-- <router-link class="logins" to='/login'>登录</router-link> -->
              <a class="logins" :href='loginUrl'>登录</a>
              <em>|</em>
              <a href="javascript:;">注册</a>
            </em>
          </li>
          <li v-show='ifLogout'>
            <a href="javascript:;" @click='logout'>注销</a>
          </li>
          <li>
            <router-link to="/controlPanel/organization">控制台</router-link>
          </li>
          <li>
            <a href="javascript:;">关于我们</a>
          </li>
          <li>
            <a href="javascript:;">关注微信</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="nav">
      <div class="base-container">
        <ul class="menu_index">
          <li class="drop-down">
            <img src='../assets/img/index/menu.png' />
            <span>发现</span>
            <ul class="drop-down-content">
              <li style='border-bottom:1px solid #464E5C;line-height:50px;padding-top:10px;'>天职咨询工程大数据平台</li>
              <li>
                <router-link :to="'/projectManage'" tag="span">项目管理分析</router-link>
              </li>
              <li>
                <span>模拟清单</span>
              </li>
              <li>
                <span>自动质检</span>
              </li>
              <li>
                <span>成本利润分析</span>
              </li>
              <li style='border-bottom:1px solid #464E5C;line-height:50px;'>造价数据库</li>
              <li>
                <span>单项工程指标库</span>
              </li>
              <li>
                <span>综合单价库</span>
              </li>
              <li>
                <span>材料价格库</span>
              </li>
              <li style='border-bottom:1px solid #464E5C;line-height:50px;'>资源</li>
              <li>
                <router-link :to="'/knowledgeBase/recommend'" tag="span">文库</router-link>
              </li>
            </ul>
          </li>
          <li class="drop-down">
            <span>天职咨询工程大数据平台</span>
            <ul class="menu_listnomal drop-down-content">
              <li>
                <router-link :to="'/projectManage'" tag="span">项目管理分析</router-link>
              </li>
              <li>
                <span>成本利润分析</span>
              </li>
              <li>
                <span>项目管理分析</span>
              </li>
              <li>
                <span>模拟清单</span>
              </li>
            </ul>
          </li>
          <li class="drop-down">
            <span>项目管理分析</span>
            <ul class="menu_listnomal drop-down-content">
              <li>
                <span>成本利润分析</span>
              </li>
              <li>
                <span>综合单价库</span>
              </li>
              <li>
                <span>材料价格库</span>
              </li>
            </ul>
          </li>
          <li class="drop-down">
            <router-link :to="'/knowledgeBase'" tag="span">文库</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/fetch/api.js'
import axios from 'axios'

export default {
  data() {
    return {
      loginUrl: process.env.VUE_APP_LOGIN_ROOT + '/login/index?subsystemUrl=' + window.location.href,
      activeIndex2: '1',
      userName: null,
      ifLogout: true
    }
  },
  mounted() {
    this.userName = localStorage.getItem('userName')
    if (this.userName) {
      this.$refs.logins.innerHTML = this.userName
      this.ifLogout = true
    } else {
      this.ifLogout = false
    }
    let menu_list = document.querySelectorAll('.drop-down-content')
    for (var i = 0; i < menu_list.length; i++) {
      let menu_li = menu_list[i].getElementsByTagName('li')
      for (var j = 0; j < menu_li.length; j++) {
        menu_li[j].onclick = function() {
          for (var i = 0; i < menu_list.length; i++) {
            menu_list[i].parentNode.style.borderBottom = 'none'
          }
          this.parentNode.parentNode.style.borderBottom = '4px solid #4574d0'
        }
      }
    }
  },
  methods: {
    logout() {
      api.logout().then(res => {
        axios.get(process.env.VUE_APP_LOGIN_ROOT + '/login/SignoutPortal?subsystemUrl=http://data.tzecc.com')
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        this.$message({
          showClose: true,
          message: '注销成功',
          type: 'success'
        })
        this.$router.push('/')
        window.location.reload()
      })
    }
  }
}
</script>
<style lang="less">
.home-header {
  .el-icon-arrow-down::before {
    content: '';
  }
  .el-submenu {
    height: 60px;
    line-height: 60px;
  }
}
</style>

<style lang="less" scoped>
.header {
  background-color: #131416;
  border-bottom: 1px solid #2f374a;
  .base-container {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .headerleft {
      width: 84px;
      height: 41px;
      background: url(~@/assets/logo.png) no-repeat;
      text-indent: -20000px;
    }
    .headerright {
      > li {
        display: inline;
        font-size: 12px;
        padding-left: 18px;
        em {
          color: #929292;
          padding: 0 5px;
          > em {
            font-size: 10px;
          }
        }
        a {
          color: #929292;
          vertical-align: middle;
        }
      }
      img {
        width: 13px;
        height: 12px;
        display: inline-block;
      }
    }
  }
}
.nav {
  height: 60px;
  background-color: #242a35;
  color: #fff;
  .base-container {
    > .menu_index {
      height: 56px;
      position: relative;
      > li {
        margin: 0 15px;
        float: left;
        line-height: 56px;
        box-sizing: border-box;
        border-bottom: 0;
        cursor: pointer;
        &:first-child {
          margin-left: 0;
          &:after {
            content: '|';
            display: inline-block;
            margin-left: 15px;
            line-heigth: 16px;
            color: #979797;
          }
        }
        img {
          width: 16px;
          height: 14px;
          padding-right: 6px;
          top: -2px;
        }
        > span {
          font-size: 14px;
        }
      }
    }
  }
}
.menu_list > li:hover {
  color: #4574d0;
}
.drop-down {
  position: relative;
  height: 60px;
  line-height: 60px;
  span {
    display: inline-block;
  }
}
.drop-down-content {
  padding: 0;
  height: 0;
  overflow: hidden;
  transition: all 1s ease;
  z-index: 999;
  position: absolute;
  top: 60px;
  width: 300px;
  background: #242a35;
  li {
    line-height: 30px;
    margin: 0 22px;
    span {
      color: #b6b4b4;
    }
  }
}
.menu_listnomal {
  height: 0;
  width: 150px;
  > li {
    line-height: 40px;
    span {
      text-align: center;
    }
  }
}
.drop-down-content li:hover span {
  color: #4574d0;
}
.menu_index .drop-down:hover .drop-down-content {
  opacity: 0.9;
  height: 460px;
}
.menu_index .drop-down:hover .menu_listnomal {
  opacity: 0.9;
  height: 180px;
}
</style>
