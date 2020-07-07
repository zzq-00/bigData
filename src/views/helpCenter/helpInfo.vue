<template>
  <div class="helpInfo-page" ref="page">
    <div class="helpInfo-white">
      <h1>帮助中心</h1>
      <div class="content">
        <ul class="frist-ul">
          <li class="frist-li" ref=item>
            <div class="frist-title" id="1">1.首页</div>
            <ul class="second-ul">
              <li class="second-li">
                <div class="second-title" ref="#1.1">1.1 查看累计数据统计</div>
                <img src="@/assets/helpImg/1.1.png" alt="1.1 查看累计数据统计" title="1.1 查看累计数据统计" class="second-img" style="height:500px">
                <ol>
                  <li>① 我的项目累计数量</li>
                  <li>② 企业项目库项目累计数量</li>
                  <li>③ 单项工程指标库指标累计数量</li>
                  <li>④ 综合单价指标库指标累计数量</li>
                  <li style="margin-bottom:0">⑤ 当月增长率</li>
                </ol>
              </li>
              <li class="second-li">
                <div class="second-title" ref="#1.2">1.2 查看平台最新动态信息</div>
                <img src="@/assets/helpImg/1.2.png" alt="1.2 查看平台最新动态信息" title="1.2 查看平台最新动态信息" class="second-img img-height">
              </li>
              <li class="second-li">
                <div class="second-title" ref="#1.3">1.3 查看项目统计数据（仅针对特定权限用户）</div>
                <img src="@/assets/helpImg/1.3.png" alt="1.3 查看项目统计数据（仅针对特定权限用户）" title="1.3 查看项目统计数据（仅针对特定权限用户）" class="second-img img-height">
              </li>
              <li class="second-li">
                <div class="second-title" ref="#1.4">1.4 查看公司贡献榜</div>
                <img src="@/assets/helpImg/1.4.png" alt="1.4 查看公司贡献榜" title="1.4 查看公司贡献榜" class="second-img img-height" style="margin-bottom:33px">
              </li>
            </ul>
          </li>
          <li class="frist-li" ref=item>
            <div class="frist-title">2. 我的项目</div>
            <ul class="second-ul">
              <li class="second-li">
                <div class="second-title" ref="#2.1">2.1 创建项目</div>
                <img src="@/assets/helpImg/2.1.png" alt="2.1 创建项目" title="2.1 创建项目" class="second-img" style="height:440px;">
                <img src="@/assets/helpImg/2.1-2.png" alt="2.1 创建项目" title="2.1 创建项目" class="second-img" style="height:411px;">
                <img src="@/assets/helpImg/2.1-3.png" alt="2.1 创建项目" title="2.1 创建项目" class="second-img img-height">
                <p class="second-twop">项目创建完成后，可以点击“上传”上传项目文件，可以点击“查看项目”按钮在项目详细信息界面查看/修改已填写信息，也可以点击“新建项目”按钮继续创建新项目。</p>
              </li>
              <li class="second-li">
                <div class="second-title" ref="#2.2">2.2 上传文件</div>
                <img src="@/assets/helpImg/2.2.png" alt="2.2 上传文件" title="2.2 上传文件" class="second-img  img-height">
                <img src="@/assets/helpImg/2.2-2.png" alt="2.2 上传文件" title="2.2 上传文件" class="second-img img-height">
                <img src="@/assets/helpImg/2.2-3.png" alt="2.2 上传文件" title="2.2 上传文件" class="second-img img-height">
                <img src="@/assets/helpImg/2.2-4.png" alt="2.2 上传文件" title="2.2 上传文件" class="second-img img-height">
              </li>
              <li class="second-li">
                <div class="second-title" ref="#2.3">2.3 分析指标</div>
                <img src="@/assets/helpImg/2.3.png" alt="2.3 分析指标" title="2.3 分析指标" class="second-img" style="height:365px;">
                <img src="@/assets/helpImg/2.3-2.png" alt="2.3 分析指标" title="2.3 分析指标" class="second-img" style="height:356px;">
                <ol>
                  <p>文件状态有4种</p>
                  <li>①指标准备中:指标文件正在导出解析，此时文件不可选;</li>
                  <li>②指标已分析:指标文件已分析完成，此时文件不可选;</li>
                  <li>③指标准备就绪:指标文件准备就绪，此时文件可选;</li>
                  <li>④指标不可分析:目前不支持指标原文件格式，此时文件不可选。</li>
                </ol>
                <img src="@/assets/helpImg/2.3-3.png" alt="2.3 分析指标" title="2.3 分析指标" class="second-img" style="376px;">
                <img src="@/assets/helpImg/2.3-4.png" alt="2.3 分析指标" title="2.3 分析指标" class="second-img  img-height">
                <img src="@/assets/helpImg/2.3-5.png" alt="2.3 分析指标" title="2.3 分析指标" class="second-img img-height">
              </li>
              <li class="second-li">
                <div class="second-title" ref="#2.4">2.4 分享项目</div>
                <img src="@/assets/helpImg/2.4.png" alt="2.4 分享项目" title="2.4 分享项目" class="second-img" style="height:411px;">
                <img src="@/assets/helpImg/2.4-2.png" alt="2.4 分享项目" title="2.4 分享项目" class="second-img img-height">
              </li>
              <li class="second-li">
                <div class="second-title" ref="#2.5" style="margin-bottom:0">2.5 查看项目详细信息</div>
                <span class="second-five" ref="#2.5.1">2.5.1 查看/修改项目信息</span>
                <img src="@/assets/helpImg/2.5.png" alt="2.5.1 查看/修改项目信息" title="2.5.1 查看/修改项目信息" class="second-img" style="margin-bottom:0;height:365px;">
                <span class="second-five" ref="#2.5.2">2.5.2 查看/修改单项工程信息</span>
                <img src="@/assets/helpImg/2.5-2.png" alt="2.5.2 查看/修改单项工程信息" title="2.5.2 查看/修改单项工程信息" class="second-img" style="margin-bottom:0;height:356px">
                <span class="second-five" ref="#2.5.3">2.5.3 查看指标数据</span>
                <span class="second-five-three">1、安装算量指标</span>
                <img src="@/assets/helpImg/2.5-3.1.png" alt="安装算量指标" title="安装算量指标" class="second-img img-height1">
                <span class="second-five-three">2、造价指标</span>
                <img src="@/assets/helpImg/2.5-3.2.png" alt="造价指标" title="造价指标" class="second-img img-height1">
                <span class="second-five-three">3、土建算量指标</span>
                <img src="@/assets/helpImg/2.5-3.3.png" alt="土建算量指标" title="土建算量指标" class="second-img img-height1">
                <span class="second-five-three">4、钢筋算量指标</span>
                <img src="@/assets/helpImg/2.5-3.4.png" alt="钢筋算量指标" title="钢筋算量指标" class="second-img img-height1">

                <span class="second-five" ref="#2.5.4">2.5.4 下载/预览项目文件</span>
                <span class="second-five-three">1、下载项目文件</span>
                <img src="@/assets/helpImg/2.5-4.1.png" alt="下载项目文件" title="下载项目文件" class="second-img img-height">
                <span class="second-five-three">2、预览项目文件</span>
                <img src="@/assets/helpImg/2.5-4.2.png" alt="预览项目文件" title="预览项目文件" class="second-img img-height">
                <span class="second-five-three">3、新建子节点文件夹</span>
                <img src="@/assets/helpImg/2.5-4.3.png" alt="新建子节点文件夹" title="新建子节点文件夹" class="second-img img-height">
              </li>
            </ul>
          </li>
          <li class="frist-li" ref=item>
            <div class="frist-title">3.企业项目库</div>
            <ul class="second-ul">
              <li class="second-li">
                <div class="second-title" ref="#3.1">3.1 查询项目</div>
                <img src="@/assets/helpImg/3.1.png" alt="3.1 查询项目" title="3.1 查询项目" class="second-img" style="height:375px;">
              </li>
              <li class="second-li">
                <div class="second-title" ref="#3.2">3.2 查看项目信息与单项工程信息</div>
                <img src="@/assets/helpImg/3.2.png" alt="3.2 查看项目信息与单项工程信息" title="3.2 查看项目信息与单项工程信息" class="second-img" style="margin-bottom:0;height:375px;">
              </li>
              <li class="second-li">
                <div class="second-title" ref="#3.3">3.3 下载与预览文件</div>
                <span class="second-five-three">1、下载文件</span>
                <img src="@/assets/helpImg/3.3-1.png" alt="1、下载文件" title="1、下载文件" class="second-img img-height">
                <span class="second-five-three">2、预览文件</span>
                <img src="@/assets/helpImg/3.3-2.png" alt="2、预览文件" title="2、预览文件" class="second-img img-height" style="margin-bottom:0">
              </li>
              <li class="second-li">
                <div class="second-title" ref="#3.4">3.4 查看指标数据</div>
                <span class="second-five-three">1、安装算量指标</span>
                <img src="@/assets/helpImg/3.4-1.png" alt="1、安装算量指标" title="1、安装算量指标" class="second-img img-height1">
                <span class="second-five-three">2、造价指标</span>
                <img src="@/assets/helpImg/3.4-2.png" alt="2、造价指标" title="2、造价指标" class="second-img img-height1">
                <span class="second-five-three">3、土建算量指标</span>
                <img src="@/assets/helpImg/3.4-3.png" alt="3、土建算量指标" title="3、土建算量指标" class="second-img img-height1">
                <span class="second-five-three">4、钢筋算量指标</span>
                <img src="@/assets/helpImg/3.4-4.png" alt="4、钢筋算量指标" title="4、钢筋算量指标" class="second-img img-height1">
              </li>
            </ul>
          </li>
          <li class="frist-li" ref=item>
            <div class="frist-title">4.单项工程指标库</div>
            <ul class="second-ul">
              <li class="second-li">
                <div class="second-title" ref="#4.1">4.1 查询单项工程指标</div>
                <img src="@/assets/helpImg/4.1.png" alt="4.1 查询单项工程指标" title="4.1 查询单项工程指标" class="second-img" style="margin-bottom:0;height:487px;">
              </li>
              <li class="second-li">
                <div class="second-title" ref="#4.2">4.2 查看指标详细信息</div>
                <img src="@/assets/helpImg/4.2.png" alt="4.2 查看指标详细信息" title="4.2 查看指标详细信息" class="second-img" style="height:347px;">
                <img src="@/assets/helpImg/4.2-2.png" alt="4.2 查看指标详细信息" title="4.2 查看指标详细信息" class="second-img" style="height:347px;">
              </li>
            </ul>
          </li>
          <li class="frist-li" ref=item>
            <div class="frist-title" ref="#5" style="padding:11px 0;">5. 综合单价指标库</div>
            <ul class="second-ul">
              <li class="second-li">
                <img src="@/assets/helpImg/5.png" alt="5 综合单价指标库" title="5 综合单价指标库" class="second-img" style="height:487px;">
              </li>
            </ul>
          </li>
          <li class="frist-li" ref=item>
            <div class="frist-title" ref="#6" style="padding:11px 0;">6. 反馈建议</div>
            <ul class="second-ul">
              <li class="second-li">
                <img src="@/assets/helpImg/6.1.png" alt="6. 反馈建议" title="6. 反馈建议" class="second-img" style="height:410px;">
                <img src="@/assets/helpImg/6.2.png" alt="6. 反馈建议" title="6. 反馈建议" class="second-img" style="height:410px;">
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      childValue: '',
      heightArr: [0, 870, 1295, 1720, 2185, 3520, 5085, 7153, 8034, 8440, 8837, 10486, 11762, 12192, 12612, 13459, 15129, 15661, 16420, 16956],
      // heightArr: [0, 970, 1395, 1820, 2285, 3620, 5185, 7253, 8134, 8540, 8937, 10586, 11862, 12292, 12711, 13558, 15228, 15760, 16519, 17055],
      arr: ['#1.1', '#1.2', '#1.3', '#1.4', '#2.1', '#2.2', '#2.3', '#2.4', '#2.5.1', '#2.5.2', '#2.5.3', '#2.5.4', '#3.1', '#3.2', '#3.3', '#3.4', '#4.1', '#4.2', '#5', '#6']
    }
  },
  mounted () {
    function checkIE () {
      return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
    }
    if (checkIE()) {
      window.addEventListener(
        'hashchange',
        () => {
          var currentPath = window.location.hash.slice(1)
          if (this.$route.hash !== '#' + currentPath) {
            this.$router.push(this.$route.path + '#' + currentPath)
          }
        },
        false
      )
    }
    // if (this.$refs[this.arr[19]]) {
    //   this.heightTop()
    // } else {
    //   window.addEventListener('load', () => {
    //     this.heightTop()
    //   })
    // }
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll, true)
    })
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (oldVal.hash) {
          if (val.hash) {
            let ele = val.hash
            if (this.$refs[ele]) {
              // 获取元素距离顶部的距离
              this.$nextTick(() => {
                this.$refs[ele].scrollIntoView({
                  behavior: 'instant', // 默认 auto      //滚动方式    smooth平滑滚动
                  block: 'start', // 默认 center
                  inline: 'nearest' // 默认 nearest
                })
              })
            }
          }
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    heightTop () {
      for (let index = 0; index < this.arr.length; index++) {
        this.heightArr.push(this.$refs[this.arr[index]].getBoundingClientRect().top)
      }
      this.heightArr.splice(0, 1, 0)
      window.addEventListener('scroll', this.handleScroll, true)
    },
    handleScroll () {
      var scrollTop = document.getElementsByClassName('helpInfo-page')[0].scrollTop
      this.heightArr.map((item, i) => {
        let height1 = this.heightArr[i]
        let height2 = this.heightArr[i + 1]
        let abc = {}
        if (scrollTop < height2 && scrollTop >= height1 - 160) {
          abc = { isScroll: false, hash: this.arr[i], scrollTop: scrollTop }
          this.$emit('childByValue', abc)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.helpInfo-page {
  .img-height {
    height: 370px;
  }
  .img-height1 {
    height: 366px;
  }
  padding: 10px 0;
  .helpInfo-white {
    margin: 10px auto;
    width: 970px;
    background: #ffffff;
    padding: 21px 0 15px 30px;
    h1 {
      margin-bottom: 20px;
      font-size: 28px;
      text-align: center;
      height: 27px;
      font-weight: 400;
      color: rgba(68, 68, 68, 1);
    }
    .content {
      .frist-ul {
        .frist-li {
          .frist-title {
            height: 17px;
            font-size: 16px;
            font-weight: 400;
            color: rgba(68, 68, 68, 1);
          }
          .second-ul {
            .second-li {
              .second-title {
                padding-top: 20px;
                margin-bottom: 10px;
                height: 15px;
                line-height: 15px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
              }
              .second-img {
                margin-left: 23px;
                margin-bottom: 10px;
              }
              ol {
                margin-left: 23px;
                li {
                  font-size: 14px;
                  font-weight: 400;
                  color: rgba(102, 102, 102, 1);
                  line-height: 24px;
                  vertical-align: middle;
                }
                li:last-child {
                  margin-bottom: 21px;
                }
              }
              .second-five {
                display: block;
                margin: 0px 0px 11px 23px;
                padding-top: 15px;
                height: 15px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                line-height: 15px;
              }
              .second-five-three {
                display: block;
                margin: 0px 0 11px 23px;
                height: 15px;
                font-size: 14px;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
                line-height: 15px;
              }
            }
            .second-twop {
              width: 888px;
              height: 39px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              line-height: 20px;
              margin-left: 23px;
              margin: 0 0px 0px 23px;
            }
          }
        }
      }
    }
  }
}
</style>
