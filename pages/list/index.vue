<template>
  <div class="list">
    <!-- <div class="kb"></div> -->
    <goodslist v-if="goodslist.length>0&&id!=4071" :goodslist="goodslist" :loadingstatus="loadingstatus" @pageChange="pageChange" @loading="loading" :arrangement="arrangement"></goodslist>
    <grouplist v-if="goodslist.length>0&&id==4071" :goodslist="goodslist" :loadingstatus="loadingstatus" @pageChange="pageChange" @loading="loading" :arrangement="arrangement"></grouplist>
  </div>
</template>
<script>
import goodslist from '../../components/goodslist'
import grouplist from '../../components/grouplist'
export default {
  name: 'list',
  data () {
    return {
      goodslist: [],
      loadingstatus: false,
      page: 1,
      arrangement: 'h',
      id: 0
    }
  },
  onLoad(options) {
  	  this.id = options.id
	  this.$store.commit('obtaintitle', this.id)
	  uni.setNavigationBarTitle({
		  title:this.title
	  });
  },
  onReachBottom(){
  	  this.pageChange()
  },
  mounted () {
    this.nextPage()
  },
  computed: {
    // 计算属性的 getter
    title () {
      // `this` 指向 vm 实例
      return this.$store.state.title
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    pageChange () {
      this.page = this.page + 1
      this.nextPage()
    },
    loading (s) {
      this.loadingstatus = s
    },
	nextPage () {
		var that=this
		var url = ''
		var data = {}
		if (parseInt(this.id) === 4071) {
		  url = '/portal/index/getTbkGroups'
		  data = {
		    page: this.page
		  }
		} else {
		  url = '/portal/index/getTbkMaterial'
		  data = {
		    page: this.page,
		    material_id: this.id
		  }
		}
		uni.request({
			url: getApp().globalData.APIurl+url,
			data: data,
			header: {
			    'Token': that.token ,
				'Device-Type':'wxapp'
			},
			success: (res) => {
				if(res.data.code){
					that.loadingstatus = false
					var list = res.data.data.list
					that.goodslist = that.goodslist.concat(list)
				}
			}
		})
	}
  },
  components: {
    goodslist, 
	grouplist
  }
}
</script>
<style lang="scss">
.list {
  background: #f9f9f9;
  .kb {
    height: 46px;
  }
}
</style>
