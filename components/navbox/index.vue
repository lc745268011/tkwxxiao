<template>
  <div class="navbox">
    <ul class="clearfix">
      <li v-for="(n,index) in navlist" :key="index" class="sicon">
		<navigator :url="`../list/index?id=${n.id}`">
          <image :src="`/static/navlist/icon${index+1}.png`" alt></image>
          <div>{{n.name}}</div>
		</navigator>
      </li>
    </ul>
    <ul class="clearfix" style="margin: 20px 0 10px;">
      <li v-for="(m,index) in navlist1" :key="index" class="bicon">
		<navigator :url="`../list/index?id=${m.id}`">
          <image :src="`/static/navlist/icon${index+11}.jpg`" alt></image>
		</navigator>
      </li>
    </ul>
  </div>
</template>
<script>
	import {  
		mapState,  
		mapMutations  
	} from 'vuex';  
	export default {
	  name: 'navbox',
	  data () {
		return {}
	  },
	  computed: {
		  ...mapState(['navlist','navlist1'])
	  }
	}
</script>
<style lang="scss">
	page{
		background: #fff;
	}
.navbox {
  padding: 0 30rpx;
  margin-top: 40rpx;
  width:690rpx;
  .sicon {
    width: 138rpx;
    float: left;
    text-align: center;
    padding: 10rpx;
    box-sizing: border-box;
	  div {
		font-size: 24rpx;
		margin-top: 20rpx;
	  }
	  image {
		width: 106rpx;
		height: 106rpx;
	  }
  }
  .bicon {
    width: 345rpx;
    float: left;
    height: 213rpx;
    padding: 20rpx;
    box-sizing: border-box;
    border-right: 1px solid #efefef;
    image {
      width: 300rpx;
	  height: 180rpx;
    }
  }
  .bicon:nth-child(2n) {
    border-right: 0;
  }
  .bicon:nth-child(n + 1) {
    border-top: 1px solid #efefef;
  }
  .bicon:nth-child(n + 3) {
    border-bottom: 1px solid #efefef;
  }
}
</style>
