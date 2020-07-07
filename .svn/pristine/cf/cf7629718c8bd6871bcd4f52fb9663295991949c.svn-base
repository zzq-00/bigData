<template>
  <div class="common-choice">
    <span class="title">项目地点：</span>
    <transition>
      <div class="block">
        <ul class="lists no-warp" key="provice">
          <li class="list" v-for="item in provice" :key="item.id">
            <input type="radio" :id="'provice'+item.code" v-bind="$attrs" v-bind:value="item.code" :data-name="item.name" v-on="inputProviceListeners" v-model="proviceModel" name="pRdi">
            <label :for="'provice'+item.code" class="name">{{item.name}}</label>
          </li>
        </ul>
        <ul class="lists" key="city">
          <li class="list" v-for="item in city" :key="item.id">
            <input type="radio" :id="'city'+item.code" v-bind="$attrs" v-bind:value="item.code" :data-name="item.name" v-on="inputCityListeners" v-model="cityModel" name="cRdi">
            <label :for="'city'+item.code" class="name">{{item.name}}</label>
          </li>
        </ul>
        <ul class="lists" key="district">
          <li class="list" v-for="item in district" :key="item.id">
            <input type="radio" :id="'district'+item.code" v-bind="$attrs" v-bind:value="item.code" :data-name="item.name" v-model="districtModel" v-on="inputDistrictListeners" name="dRdi">
            <label :for="'district'+item.code" class="name">{{item.name}}</label>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import api from '@/fetch/api'
export default {
  props: ['HEIGHT', 'defaultValue'],
  computed: {
    inputProviceListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          change: function (event) {
            let value = event.target.value
            let name = event.target.getAttribute('data-name')
            if (value === '00000') {
              vm.city = []
              value = ''
              name = ''
              vm.height = vm.HEIGHT
            } else {
              // vm.height = ''
              vm.citiesOfProvince(value)
            }
            vm.cityModel = '00000'
            vm.districtModel = '00000'
            vm.district = []
            // 清除第二级 第三级
            vm.$emit('cityChange', '', '')
            vm.$emit('districtChange', '', '')
            vm.$emit('proviceChange', value, name)
          }
        }
      )
    },
    inputCityListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          change: function (event) {
            let value = event.target.value
            let name = event.target.getAttribute('data-name')
            if (value === '00000') {
              vm.district = []
              vm.districtModel = '00000'
              value = ''
              name = ''
            } else {
              vm.getDistrictByParentCode(value)
            }
            vm.$emit('districtChange', '', '')
            vm.$emit('cityChange', value, name)
          }
        }
      )
    },
    inputDistrictListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          change: function (event) {
            let value = event.target.value
            let name = event.target.getAttribute('data-name')
            if (value === '00000') {
              value = ''
              name = ''
            }
            vm.$emit('districtChange', value, name)
          }
        }
      )
    }
  },
  components: {},
  data () {
    return {
      provice: [],
      city: [],
      district: [],
      height: this.HEIGHT,
      proviceModel: '00000',
      cityModel: '00000',
      districtModel: '00000'
    }
  },
  methods: {
    allProvinces () {
      api.allProvinces().then(res => {
        res.data.unshift({ id: '', code: '00000', name: '不限' })
        this.provice = res.data
      })
    },
    citiesOfProvince (code) {
      api.citiesOfProvince(code).then(res => {
        res.data.unshift({ id: '', code: '00000', name: '不限' })
        this.city = res.data
      })
    },
    getDistrictByParentCode (code) {
      api.getDistrictByParentCode(code).then(res => {
        res.data.unshift({ id: '', code: '00000', name: '不限' })
        this.district = res.data
      })
    },
    changeValue () {
      this.proviceModel = '00000'
      this.district = []
      this.city = []
      this.$emit('proviceChange', '', '')
    }
  },
  beforeMount () {
    // 将常量保存
    this.height = this.HEIGHT
  },
  mounted () {
    this.allProvinces()
  },
  watch: {
    defaultValue (newValue) {
      if (newValue) {
        this.changeValue()
      }
    }
  }
}
</script>
<style lang="less">
.common-choice {
  .no-warp {
    overflow: hidden;
  }
  .block {
    margin-top: -38px;
    position: relative;
  }
  .title {
    display: inline-block;
    // width: 60px;
    color: #bebebe;
    font-size: 12px;
    line-height: 38px;
    text-align: right;
  }
  .lists {
    margin-left: 70px;
    width: 95%;
    font-size: 12px;
    color: #606266;
  }
  .list {
    display: inline-block;
  }
  .name {
    display: inline-block;
    padding: 11px 10px;
    cursor: pointer;
  }
  input[type='radio']:checked + .name {
    color: #4474cf;
  }
  input[type='radio'] {
    display: none;
  }
}
</style>
