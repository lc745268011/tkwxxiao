<template>
  <view id="index">
    <search placeholder="快来搜索你心爱的东西吧"></search>
    <nav-box></nav-box>
    <view class="guesslike">
      <img src="/static/navlist/icon15.png" alt>
    </view>
    <goodslist
      v-if="goodslist.length>0"
      :goodslist="goodslist"
      :loadingstatus="loadingstatus"
      @loading="loading"
      :arrangement="arrangement"
    ></goodslist>
  </view>
</template>
<script>
import search from '../../components/search'
import navBox from '../../components/navbox'
import goodslist from '../../components/goodslist'
export default {
  name: 'index',
  data () {
    return {
      goodslist: [],
      loadingstatus: false,
      page: 1,
      arrangement: 'h'
    }
  },
  mounted () {
    this.nextPage()
  },
  components: {
    navBox,
    search,
    goodslist
  },
  onReachBottom(){
	  this.pageChange()
  },
  methods: {
    pageChange () {
      this.page = this.page + 1
      this.nextPage()
    },
    loading (s) {
      this.loadingstatus = s
    },
    nextPage () {
		var that=this
		uni.request({
			url: getApp().globalData.APIurl+'/portal/index/getTbkMaterial',
			data: {
			    page: this.page,
			    material_id: 4092
			},
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
  }
}
</script>
<style lang="scss">
.guesslike {
  padding: 0 15px;
  img{
    width: 100%;
	height: 44rpx;
  }
}
#goodslist {
  .listH {
    li:nth-child(-n + 2) {
      margin-top: 0;
    }
  }
}
</style>
