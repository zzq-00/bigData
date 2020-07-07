const memberList = {
  state: {
    breadcrumbName: [],
    currentLevel: 0,
    dialogMemberVisible: false, // 弹窗
    memberData: [], // 选中的成员信息列表
  },
  mutations: {
    SETLEVEL(state, level) {
      state.currentLevel = level
    },

    PUSHBREAD(state, data) {
      state.breadcrumbName.push(data)
    },
    POPBREAD(state, index) {
      state.breadcrumbName.splice(index, state.breadcrumbName.length)
    },
    CLEARBREAD(state) {
      state.breadcrumbName = []
    },

    PUSHUSER (state, data) {
      // 只存在单选
      state.memberData.push(data)
    },
    SPLICEUSER (state, data) {
      let Ids = state.memberData.map(item => {
        return item.id
      })
      let index = Ids.indexOf(data.id);
      if (index > -1) {
        state.memberData.splice(index, 1)
      }
    },
    CLEARUSER (state) {
      state.memberData = []
    },
    SHOWDIALOG (state, data) {
      state.dialogMemberVisible = true
    },
    HIDEDIALOG (state, data) {
      state.dialogMemberVisible = false
    }
  }
}

export default memberList