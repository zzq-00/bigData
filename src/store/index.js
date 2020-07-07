import Vue from 'vue'
import Vuex from 'vuex'
import memberList from './memberlist'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    AnalysisSteps: 1, // 指标分析步骤
    projectManageFilterData: {}, // 我的项目过滤
    projectLibraryFilterData: {}, // 企业项目库过滤
    // 单项工程指标库过滤
    singleItemFilterData: {
      column: 'costByArea',
      sort: 'desc',
      page: 1,
      size: 10
    },
    // 单项工程指标库联动过滤标签
    singleItemDynamicTags: {}
  },
  mutations: {
    nextStep(state, n) {
      state.AnalysisSteps = n
    },
    // 项目列表过滤查询数据
    setFilterData(state, { type, value }) {
      state[type + 'FilterData'] = value
    },
    setSingleItemFilterData(state, { dataForBack, dynamicTags, order }) {
      if (order === 'clearAll') {
        state.singleItemFilterData = { page: 1, size: 10 }
        state.singleItemDynamicTags = {}
        return
      }
      // 不然watch不到变化
      state.singleItemFilterData = Object.assign({}, state.singleItemFilterData, dataForBack)
      state.singleItemDynamicTags = Object.assign({}, state.singleItemDynamicTags, dynamicTags)
    },
  },
  actions: {
    nextStepFUN(context, n) {
      context.commit('nextStep', n)
    }
  },
  modules: {
    memberList
  }
})