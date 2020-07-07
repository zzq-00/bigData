<template>
  <div>
    <headerComponent />
    <breadcrumb :breadcrumbs="breadcrumbs" />
    <div class="containers">
      <div class="side-menu" :class="{ sideMenus: isActive }" v-drag ref="sides">
        <el-scrollbar wrap-class="list" :native="false" style='height:100%'>
          <el-menu :default-openeds="defaultsOpen" :default-active="defaultPath" @open="handleOpen" @close="handleClose" @select="handleSelect" collapse-transition>
            <el-submenu :index="item1.path" v-for="(item1,idx1) in directoryList" :key="idx1">
              <template slot="title">
                <span style="padding-left:21px;display:inline-block" :title="item1.fristName">
                  <a :href="'#'+item1.path" style="display:inline-block;width:100%">{{item1.fristName}}</a>
                </span>
              </template>
              <el-menu-item :index="item2.path" :title="item2.secondName" v-for="(item2,idx2) in item1.secondArr" :key="idx2" style="padding-left:54px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
                <a :href="'#'+item2.path" :class="[{ active:item2.secondName=='1.3查看项目统计数据（仅针对特定权限用户）' }, 'second-name']">{{item2.secondName}}</a>
              </el-menu-item>
              <el-submenu index='2.5' v-if="item1.path==2" class="the-three">
                <template slot="title">
                  <div style="margin-left:14px;margin-right:22px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">2.5查看项目详细信息</div>
                </template>
                <el-menu-item index="2.5.1" title="2.5.1查看修改项目信息" style="margin-top:11px; padding-left:72px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
                  <a href="helpInfo#2.5.1" class="second-name">2.5.1查看修改项目信息</a>
                </el-menu-item>
                <el-menu-item index="2.5.2" title="2.5.2查看修改单项工程信息" style="padding-left:72px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
                  <a href="helpInfo#2.5.2" class="second-name">2.5.2查看修改单项工程信息</a>
                </el-menu-item>
                <el-menu-item index="2.5.3" title="2.5.3查看指标数据" style="padding-left:72px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
                  <a href="helpInfo#2.5.3" class="second-name">2.5.3查看指标数据</a>
                </el-menu-item>
                <el-menu-item index="2.5.4" title="2.5.4 下载/预览项目文件" style="padding-left:72px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
                  <a href="helpInfo#2.5.4" class="second-name">2.5.4下载/预览项目文件</a>
                </el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index='5' style="margin:15px 0 15px 0;">
              <span style="padding-left:21px;" slot="title">
                <a href="helpInfo#5">5.综合单价指标库</a>
              </span>
            </el-menu-item>
            <el-menu-item index='6' style="margin-bottom:45px;">
              <span style="padding-left:21px;" slot="title">
                <a href="helpInfo#6">6.反馈建议</a>
              </span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
        <div class="shrink-btn" title="展开/收起" v-show="!isActive" @click="Retract"></div>
        <div class="shrink-btn" title="展开/收起" v-show="isActive" @click="Open"></div>
        <div class="sliders"></div>
      </div>
      <div class="white-solid"></div>
      <router-view class="right-content" @childByValue="childByValue" />
    </div>
  </div>
</template>
<script>
import headerComponent from '@/components/headerComponent'
import breadcrumb from '@/components/breadcrumb'

export default {
  components: {
    headerComponent,
    breadcrumb
  },
  data () {
    return {
      breadcrumbs: [{ name: '帮助中心', path: '/helpCenter' }],
      isActive: false,
      keys: '', // 为了判断左边栏点击的是不是和右边滑动的相一致
      defaultsOpen: ['1', '2', '3', '4'], // 当前打开的 sub-menu 的 index 的数组
      defaultPath: '', // 当前激活菜单的 index
      directoryList: [
        {
          fristName: '1.首页',
          path: '1',
          secondArr: [{ secondName: '1.1查看累计数据统计', path: '1.1' }, { secondName: '1.2查看平台最新动态信息', path: '1.2' }, { secondName: '1.3查看项目统计数据（仅针对特定权限用户）', path: '1.3' }, { secondName: '1.4查看公司贡献榜', path: '1.4' }]
        },
        {
          fristName: '2.我的项目',
          path: '2',
          secondArr: [{ secondName: '2.1创建项目', path: '2.1' }, { secondName: '2.2上传文件', path: '2.2' }, { secondName: '2.3分析指标', path: '2.3' }, { secondName: '2.4分享项目', path: '2.4' }]
        },
        {
          fristName: '3.企业项目库',
          path: '3',
          secondArr: [{ secondName: '3.1查询项目', path: '3.1' }, { secondName: '3.2查看项目信息与单项工程信息', path: '3.2' }, { secondName: '3.3下载与预览文件', path: '3.3' }, { secondName: '3.4查看指标数据', path: '3.4' }]
        },
        {
          fristName: '4.单项工程指标库',
          path: '4',
          secondArr: [{ secondName: '4.1查询单项工程指标', path: '4.1' }, { secondName: '4.2查看指标详细信息', path: '4.2' }]
        }
      ]
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (oldVal.hash) {
          if (val.hash) {
            this.defaultPath = val.hash.replace('#', '')
          }
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    childByValue (childValue) {
      if (childValue.hash.replace('#', '') == 1.2 && childValue.scrollTop < 770) {
        this.defaultPath = '1.1'
      }
      if (childValue.hash.replace('#', '') == 5 && childValue.scrollTop >= 16858) {
        this.defaultPath = '6'
      } else {
        this.defaultPath = childValue.hash.replace('#', '')
      }
    },
    // 收起
    Retract () {
      this.isActive = !this.isActive
      this.$refs.sides.style.width = '51px'
      this.$refs.sides.style.transition = 'width 0.4s'
    },
    // 展开
    Open () {
      this.isActive = !this.isActive
      this.$refs.sides.style.width = '240px'
      this.$refs.sides.style.transition = 'width 0.4s'
    },
    handleOpen (key, keyPath) {
      this.isActive = false
      this.defaultPath = key
      this.$refs.sides.style.width = '240px'
      this.$refs.sides.style.transition = 'width 0.4s'
      this.$refs.sides.childNodes[0].style.width = '240px'
      this.$refs.sides.childNodes[0].style.transition = 'width 0.4s'
    },
    handleClose (key, keyPath) {
      this.isActive = false
      this.defaultPath = key
      this.$refs.sides.style.width = '240px'
      this.$refs.sides.style.transition = 'width 0.4s'
      this.$refs.sides.childNodes[0].style.width = '240px'
      this.$refs.sides.childNodes[0].style.transition = 'width 0.4s'
    },
    handleSelect (key, keyPath) {
      this.keys = key
      if (window.location.hash.replace('#', '') == key) {
        this.$router.push('/helpCenter/helpInfo#' + key + 'a1')
      }
      this.isActive = false
      this.defaultPath = key
      this.$refs.sides.style.width = '240px'
      this.$refs.sides.style.transition = 'width 0.4s'
      this.$refs.sides.childNodes[0].style.width = '240px'
      this.$refs.sides.childNodes[0].style.transition = 'width 0.4s'
    }
  },
  mounted () {
    this.widths = this.$refs.sides.style.width
    this.$router.push('/helpCenter/helpInfo#1.1')
  }
}
</script>
<style scoped lang="less">
.containers {
  width: 100%;
  display: flex;
  height: e('calc(100vh - 90px)');
  background-color: #e7eaee;
  overflow: hidden;
  .side-menu {
    width: 240px;
    height: 100%;
    background-color: #e7eaee;
    position: relative;
    border: 1px solid #e2e8f7;
    border-left: none;
    border-top: none;
    border-bottom: none;
    border-right: 1px solid #f6f8fa;
    .second-name {
      display: inline-block;
      width: 110%;
      line-height: 13px;
      height: 13px;
    }
    .active {
      display: inline-block;
      width: 97%;
      line-height: 13px;
      height: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .el-submenu__title:focus,
    .el-submenu__title:hover {
    }
    .el-menu-item:last-child {
      margin-bottom: 0;
    }
    .el-menu-item:focus,
    .el-menu-item:hover {
      background-color: #e7eaee;
    }
    .el-menu-item {
      font-size: 12px;
      height: 15px;
      line-height: 12px;
      margin-bottom: 10px;
    }
    .el-menu-item:focus a,
    .el-menu-item:hover a {
      background-color: #e7eaee !important;
      color: #4474cf;
    }
    .el-menu-item:hover::after {
      display: block;
      content: '';
      width: 3px;
      height: 15px;
      background-color: #4474cf;
      position: absolute;
      right: 4%;
      top: 50%;
      transform: translateY(-50%);
    }
    .el-menu-item.is-active a {
      color: #4474cf;
      &::after {
        display: block;
        content: '';
        width: 3px;
        height: 15px;
        background-color: #4474cf;
        position: absolute;
        right: 4%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .el-submenu .el-menu-item {
      padding-right: 17px;
    }
    .el-submenu__icon-arrow {
      left: 22px;
    }
    .shrink-btn {
      position: absolute;
      right: -10px;
      bottom: 0;
      top: 50%;
      margin-top: -25px;
      width: 5px;
      height: 50px;
      background: #c2c3c5;
      border-radius: 3px;
      cursor: pointer;
      z-index: 4;
    }
    .sliders {
      width: 5px;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      cursor: e-resize;
    }
  }
  .sideMenus {
    width: 55px;
  }
  .white-solid {
    background: #ced2dc;
    width: 1px;
    height: 100%;
  }
  .right-content {
    flex: 1;
    box-sizing: border-box;
    overflow-x: hidden;
  }
}
</style>
<style scoped>
.side-menu >>> .el-menu {
  width: 240px;
  font-size: 12px;
  background-color: #e7eaee;
  border: none !important;
}
.side-menu >>> .el-submenu__title {
  margin-top: 15px;
  margin-bottom: 11px;
  font-size: 12px !important;
  height: 12px;
  line-height: 12px;
}
.side-menu .the-three >>> .el-submenu__title {
  margin-top: 0;
  margin-bottom: 0;
}
.side-menu .el-dropdown-menu__item--divided:before,
.el-menu,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: #e7eaee;
}
.sideMenus >>> .el-menu {
  width: 51px;
  overflow: hidden;
}
.side-menu >>> .el-submenu__title:hover {
  color: #4474cf;
  background-color: #e7eaee;
}
.containers .side-menu >>> .el-icon-arrow-down,
.el-submenu__icon-arrow {
  left: 22px !important;
  top: 57%;
}
.containers .side-menu .the-three >>> .el-icon-arrow-down,
.el-submenu__icon-arrow {
  left: 36px !important;
  top: 57%;
}
.containers .side-menu >>> .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
  transform: rotateX(180deg) !important;
}
.containers .side-menu >>> .el-scrollbar__wrap {
  height: 100% !important;
  overflow-x: hidden !important;
}
</style>
<style lang="less">
.containers .side-menu .el-icon-arrow-down:before {
  content: '\E60b' !important;
}
</style>
