<template>
  <div class="content">
    <div>
      <div v-for="(item,index) in threeData" :key="index">
        <div class="title">
          <h5>{{item.name}}</h5>
        </div>
        <div class="total">
          <b @click="gotoDetail(item)">
            <div v-for="idx in item.count.toString().length" :key="idx" class="mt-number-animate-dom fl" :style="computedNum(item.count, idx-1)">
              <span class="mt-number-animate-span">0</span>
              <span class="mt-number-animate-span">1</span>
              <span class="mt-number-animate-span">2</span>
              <span class="mt-number-animate-span">3</span>
              <span class="mt-number-animate-span">4</span>
              <span class="mt-number-animate-span">5</span>
              <span class="mt-number-animate-span">6</span>
              <span class="mt-number-animate-span">7</span>
              <span class="mt-number-animate-span">8</span>
              <span class="mt-number-animate-span">9</span>
            </div>
          </b>
        </div>
        <div class="separate">
          <div>
            <span>当日上传</span>
            <b>{{item.todayUpload || 0}}</b>
          </div>
          <div>
            <span>当月上传</span>
            <b>{{item.theMonthUpload || 0}}</b>
            <em v-if="item.name!='我的项目'&&item.percent!=999" :class="[item.increase?'up':'down']"><i>{{item.increase?'↑':'↓'}}</i> {{Math.round(item.percent*100,10)}}%</em>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-for="(item,index) in oneData" :key="index">
        <div class="title">
          <h5>{{item.name}}</h5>
        </div>
        <div class="total">
          <b @click="gotoDetail(item)">
            <div v-for="idx in item.count.toString().length" :key="idx" class="mt-number-animate-dom fl" :style="computedNum(item.count, idx-1)">
              <span class="mt-number-animate-span">0</span>
              <span class="mt-number-animate-span">1</span>
              <span class="mt-number-animate-span">2</span>
              <span class="mt-number-animate-span">3</span>
              <span class="mt-number-animate-span">4</span>
              <span class="mt-number-animate-span">5</span>
              <span class="mt-number-animate-span">6</span>
              <span class="mt-number-animate-span">7</span>
              <span class="mt-number-animate-span">8</span>
              <span class="mt-number-animate-span">9</span>
            </div>
          </b>
        </div>
        <div class="separate">
          <div>
            <span>当日上传</span>
            <b>{{item.todayUpload || 0}}</b>
          </div>
          <div>
            <span>当月上传</span>
            <b>{{item.theMonthUpload || 0}}</b>
            <em v-if="item.name!='我的项目'&&item.percent!=999" :class="[item.increase?'up':'down']"><i>{{item.increase?'↑':'↓'}}</i> {{Math.round(item.percent*100,10)}}%</em>
          </div>
        </div>
      </div>
      <div style="flex: 2;">
        <div class="title">
          <h5>最新动态<em v-show="showNew"></em></h5>
        </div>
        <ul class="dynamic">
          <li v-for="(item, index) in indexLatestNews" :key="index">
            <span :title="item.content">{{item.content}}</span>
            <span>{{item.date}}</span>
          </li>
          <li v-if="!indexLatestNews.length">
            <span>暂无动态</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    indexLatestNews: {
      type: Array,
      required: true
    },
    fourData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showNew: false
    }
  },
  computed: {
    threeData () {
      if (this.fourData.length) return this.fourData.slice(0, 3)
    },
    oneData () {
      if (this.fourData.length) return this.fourData.slice(-1)
    }
  },
  watch: {
    indexLatestNews: function (val, oldVal) {
      if (oldVal.length && val[0].createAt != oldVal[0].createAt) this.showNew = true
    }
  },
  methods: {
    gotoDetail (item) {
      switch (item.name) {
        case '我的项目':
          this.$router.push('/projectManage')
          break
        case '企业项目':
          this.$router.push('/projectLibrary')
          break
        case '单项工程指标':
          this.$router.push('/indicatorLibrary/singleItemList')
          break
        case '综合单价指标':
          this.$router.push('/indicatorLibrary/comprehensive')
          break
        default:
          break
      }
    },
    computedNum (num, idx) {
      let single = num.toString().substr(idx, 1)
      return `transform: translateY(${-34 * single}px);`
    }
  },
  created () {},
  destroyed () {}
}
</script>
<style lang="less" scoped>
.content {
  display: flex;
  height: 200px;
  > div {
    flex: 1;
    min-width: 0;
    display: flex;
    & + div {
      margin-left: 10px;
    }
    > div {
      flex: 1;
      overflow: hidden;
      box-sizing: border-box;
      height: 100%;
      padding: 18px 21px;
      background-color: #fff;
      & + div {
        margin-left: 10px;
      }
      .title {
        > h5 {
          font-size: 14px;
          color: #333;
          margin-bottom: 22px;
          > em {
            display: inline-block;
            width: 25px;
            height: 15px;
            background: url(~@/assets/img/new.png) no-repeat right top;
            margin-left: 5px;
            transform: translateY(-6px);
          }
        }
      }
      .total {
        margin-bottom: 50px;
        > b {
          cursor: pointer;
          display: inline-block;
          height: 34px;
          overflow: hidden;
          .mt-number-animate-dom {
            display: flex;
            flex-direction: column;
            font-size: 30px;
            color: #4474cf;
            transition: all 1s ease 0s;
            > span {
              height: 34px;
            }
          }
        }
      }
      .separate {
        font-size: 12px;
        white-space: nowrap;
        > div {
          > b {
            color: #ed5d5d;
            margin-left: 5%;
          }
          > em {
            &::before {
              display: inline-block;
              content: '';
              width: 1px;
              height: 10px;
              background-color: #dedede;
              margin: 0 5%;
            }
            &.up {
              color: #ed5d5d;
            }
            &.down {
              color: #359e55;
            }
            > i {
              position: relative;
              top: -2px;
            }
          }
        }
      }
      .dynamic {
        font-size: 12px;
        li {
          padding-left: 27px;
          background: url(~@/assets/img/horn.png) no-repeat left center;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          & + li {
            margin-top: 9px;
          }
          > span {
            white-space: nowrap;
            &:first-child {
              margin-right: 12px;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>
