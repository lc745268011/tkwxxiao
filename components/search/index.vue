<template>
  <view class="search">
    <view class="s-left">
      <!-- <van-icon name="search"/> -->
      <input type="text" v-model="searchText" :placeholder="placeholder">
    </view>
    <view class="s-right" @click="search">搜索</view>
  </view>
</template>
<script>
export default {
  name: 'search',
  data () {
    return {
      searchText: ''
    }
  },
  props:['placeholder'],
  onLoad(options) {
	  this.searchText = options.keywords
  },
  watch: {
    $route () {
      this.searchText = this.$route.query.keywords
    }
  },
  methods: {
    search () {
		uni.navigateTo({
		  url: `/pages/search/index?keyword=${this.searchText}`
		})
    }
  }
}
</script>
<style lang="scss">
	.search {
	  width: 689rpx;
	  border-radius: 40rpx;
	  background: #fff;
	  height: 80rpx;
	  display: flex;
	  align-items: center;
	  margin: 40rpx auto 0;
	  overflow: hidden;
	  .s-left {
		width: 580rpx;
		display: flex;
		align-items: center;
		background: rgba(238, 248, 255, 1);
		padding: 0 20rpx;
		box-sizing: border-box;
		i {
		  font-size: 40rpx;
		}
		input {
		  width: 500rpx;
		  display: inline-block;
		  height: 80rpx;
		  font-size: 28rpx;
		  padding: 0 20rpx;
		  background: transparent;
		}
	  }
	  .s-right {
		width: 110rpx;
		font-size: 28rpx;
		background: rgba(238, 121, 81, 1);
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #fff;
	  }
	}
</style>
