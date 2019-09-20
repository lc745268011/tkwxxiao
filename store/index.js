import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    navlist: [
      {
        id: 3767, name: '女装'
      },
      {
        id: 3764, name: '男装'
      },
      {
        id: 3763, name: '美妆个护'
      },
      {
        id: 3762, name: '鞋包配饰'
      },
      {
        id: 3760, name: '母婴'
      },
      {
        id: 3765, name: '内衣'
      },
      {
        id: 3761, name: '美食'
      },
      {
        id: 3759, name: '数码家电'
      },
      {
        id: 3758, name: '家居家装'
      },
      {
        id: 3766, name: '运动户外'
      }
    ],
    navlist1: [
      {
        id: 3786, name: '品牌特卖'
      },
      {
        id: 4071, name: '聚划算'
      },
      {
        id: 9660, name: '实惠购'
      },
      {
        id: 4094, name: '热销榜'
      }
    ],
    title: ''
  },
  getters: {
  },
  mutations: {
    obtaintitle (state, id) {
      var n = state.navlist.concat(state.navlist1)
      n.forEach(l => {
        if (l.id === parseInt(id)) {
          state.title = l.name
        }
      })
    }
  }
})
export default store
