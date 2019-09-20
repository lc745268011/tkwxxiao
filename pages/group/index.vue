<template>
	<view class="group">
		<ul>
			<li v-for="(item,index) in grouplist" :key="index" class="vcenter">
				<view class="vcenter">
					<image :src="item.avatar" mode="" class="avatar"></image>
					{{item.user_nickname}}
				</view>
				<view class="">
					{{item.name}}
				</view>
			</li>
		</ul>
	</view>
</template>

<script>
	export default {
		name:'group',
		data() {
			return {
				grouplist:[]
			}
		},
		mounted(){
			var that=this
			uni.request({
				url: getApp().globalData.APIurl+'/api/wxapp/member/groupList',
				data: {
				},
				header: {
				    'Token': that.token ,
					'Device-Type':'wxapp'
				},
				success: (res) => {
					if(res.data.code){
						that.grouplist=res.data.data.list
					}
				}
			})
		},
	}
</script>

<style scoped lang="scss">
	.group{
		ul{
			background: #fff;
			li{
				height: 120rpx;
				line-height: 120rpx;
				padding: 0 30rpx;
				justify-content: space-between;
				border-bottom: 1px solid #ebebeb;
				.avatar{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 30rpx;
				}
			}
			li:last-child{
				border-bottom: 0;
			}
		}
	}
</style>
