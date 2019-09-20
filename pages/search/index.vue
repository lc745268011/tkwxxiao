<template>
  <div id="searchlist">
    <search placeholder="快来搜索你心爱的东西吧"></search>
    <goodslist v-if="goodslist.length>0" :goodslist="goodslist" :loadingstatus="loadingstatus" @pageChange="pageChange" @loading="loading" :arrangement="arrangement"></goodslist>
  </div>
</template>
<script>
import search from '../../components/search'
import goodslist from '../../components/goodslist'
export default {
  name: 'searchlist',
  data () {
    return {
      keywords: '',
      page: 1,
      goodslist: [],
      loadingstatus: false,
      arrangement: 'h'
    }
  },
  onLoad(options) {
	  this.keywords = options.keyword
	  this.searchlist()
  	  uni.setNavigationBarTitle({
  		  title:this.keywords
  	  });
  },
  onReachBottom(){
  	  this.pageChange()
  },
  /**
   * keep-alive钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。
   */
  activated () {
    this.keywords = this.id
    this.searchlist()
  },
  methods: {
    searchlist () {
		uni.request({
		    url: getApp().globalData.APIurl+'/portal/index/SerchGoodsCoupon', 
		    data: {
		        page: this.page,
		        keyword: this.keywords
		    },
		    header: {
		        'Token': '' ,
				'Device-Type':'wxapp'
		    },
		    success: (res) => {
				this.loadingstatus = false
				var list = res.data.data[0]
				if (this.page === 1) {
				  this.goodslist = list
				} else {
				  this.goodslist = this.goodslist.concat(list)
				}
		    }
		});
    },
    // onClickLeft () {
    //   this.$router.go(-1)
    // },
    pageChange () {
      this.page = this.page + 1
      this.searchlist()
    },
    // loading (s) {
    //   this.loadingstatus = s
    // }
  },
  components: {
    search, goodslist
  }
}
</script>
<style lang="scss">
#searchlist{
  background: #f9f9f9;
  .kb{
    height: 46px;
  }
}
</style>
