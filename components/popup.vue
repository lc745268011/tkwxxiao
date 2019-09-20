<template>
	<view class="popup" v-if="show">
		<view class="popup-box" :style="{'width':width+'rpx','height':height+'rpx'}">
			<view class="popup-title">
				{{title}}
			</view>
			<view class="popup-content">
				<slot></slot>
			</view>
			<view class="popup-bottom clearfix">
				<view class="cancal fl" @click="cancal">
					取消
				</view>
				<view class="confirm fl" @click="confirm">
					确认
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'popup',
		data() {
			return {
				
			};
		},
		props:['show','height','width','title'],
		methods:{
			cancal(){
				this.$emit('cancal')
			},
			confirm(){
				this.$emit('confirm')
			},
		}
	}
</script>

<style lang="scss" scoped>
.popup{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background: rgba(0,0,0,0.6);
	.popup-box{
		background: #fff;
		position: absolute;
		margin: auto;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		.popup-title{
			height: 60rpx;
			text-align: center;
			margin: 30rpx 0 0;
		}
		.popup-content{
			padding: 20rpx;
		}
		.popup-bottom{
			position: absolute;
			bottom:0;
			left:0;
			right:0;
			border-top:1px solid #ebebeb;
			view{
				width: 50%;
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
				box-sizing: border-box;
			}
			view.confirm{
				color: #ff7640;
				border-left:1px solid #ebebeb;
			}
		}
	}
}
</style>
