<template>
	<view class="mine">
		<view class="mine-top">
			<view class="set clearfix">
				<i class="iconfont fr">&#xe603;</i>
				<navigator url="../setting/index">
					<i class="iconfont fr">&#xe65a;</i>
				</navigator>
			</view>
			<view class="" v-if="!token">
				<button
				class='loginbtn'
				open-type="getUserInfo"
				@getuserinfo="getuserinfo"
				withCredentials="true"
				>
				登录
				</button>
			</view>
			<view v-if="token" class="vcenter hasuser">
				<image :src="user.avatar" mode="" class="avatar"></image>
				<view class="nickname">
					{{user.user_nickname}}
				</view>
			</view>
			<ul class="user-bottom clearfix vcenter">
				<li class="fl">
					<view class="li-title">
						未到账收益
					</view>
					<view class="">
						<span>100</span>积分
					</view>
				</li>
				<li class="fl">
					<view class="li-title">
						已到账收益
					</view>
					<view class="">
						<span>100</span>积分
					</view>
				</li>
			</ul>
		</view>
		<view class="mine-bottom">
			<ul>
				<li><navigator url="../order/index">我的订单</navigator></li>
				<li><navigator url="../group/index">我的团队</navigator></li>
				<li @click="invition">我的邀请</li>
			</ul>
			<ul>
				<li>新人教程</li>
				<li>联系客服</li>
				<li>关于我们</li>
			</ul>
		</view>
		<popup :show="show" :width="600" height="300" :title="title" @cancal="cancalFun" @confirm="confirmFun">
				  <view class="center">
				  	{{user.user_activation_key}}<text @click="copy" class="copy">复制</text>
				  </view> 
		</popup>
	</view>
</template>

<script>
	import popup from '../../components/popup.vue'
	export default {
		data() {
			return {
				code: 0,
				token:'',
				user:{},
				show:false,
				title:'您的专属邀请码'
			}
		},
		components:{
			popup
		},
		onLoad() {
			var that=this
			uni.login({
			  success (res) {
			    if (res.code) {
					that.code=res.code
			    } else {
			      console.log('登录失败！' + res.errMsg)
			    }
			  }
			})
			uni.getStorage({
			    key: 'token',
			    success: function (res) {
			        that.token=res.data
			    }
			});
			uni.getStorage({
			    key: 'user',
			    success: function (res) {
			        that.user=res.data
			    }
			});
		},
		methods: {
			getuserinfo(e){
				var that=this
				uni.getSetting({
				  success(res) {
				    if (!res.authSetting['scope.userInfo']) {
				      uni.authorize({
				        scope: 'scope.userInfo',
				        success () {
				        }
				      })
				    }else{
						uni.request({
						    url: getApp().globalData.APIurl+'/api/wxapp/index/login', 
						    data: {
						        code: that.code,
								encrypted_data:e.detail.encryptedData,
								iv:e.detail.iv
						    },
						    header: {
						        'Token': '' ,
								'Device-Type':'wxapp'
						    },
						    success: (res) => {
								that.token=res.data.data.token;
								that.user=res.data.data.user;
								uni.setStorage({
								    key: 'token',
								    data: res.data.data.token,
								    success: function () {
								        console.log('success');
								    }
								});
								uni.setStorage({
								    key: 'user',
								    data: res.data.data.user,
								    success: function () {
								        console.log('success');
								    }
								});
								if(!res.data.data.user.mobile){
									uni.navigateTo({
									    url: '/pages/login/index'
									});
								}
						    }
						});
					}
				  }
				})
			},
			invition(){
				this.show=true
			},
			cancalFun(){
			  this.show=false;
			},
			confirmFun(){
				this.show=false;
			},
			copy(){
				uni.setClipboardData({
				    data: this.user.user_activation_key,
				    success: function () {
				        uni.showToast({
				            title: '复制成功，快去分享给你的朋友们吧',
				        	icon:'none',
				            duration: 2000,
				        	success:function(){
				        		
				        	}
				        });
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.mine-top{
			width: 750rpx;
			height: 260rpx;
			position:relative;
			background: #ff9640;
			padding: 20rpx 0;
			.loginbtn{
				color: #fff;
				background: none;
				text-align: left;
				padding: 0 35rpx;
			}
			.loginbtn:after{
				border: 0;
			}
			.set{
				padding:0 35rpx;
				margin-bottom:20rpx;
				.iconfont{
					color: #fff;
					font-size: 44rpx;
					margin-left: 20rpx;
				}
			}
			.hasuser{
				padding: 0 35rpx;
				.avatar{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					margin-right: 30rpx;
				}
				.nickname{
					color: #fff;
				}
			}
			.user-bottom{
				width: 620rpx;
				height: 160rpx;
				background: #fff;
				border-radius: 20rpx;
				position: absolute;
				margin: 0 auto;
				left: 0;
				right: 0;
				bottom: -120rpx;
				padding: 0 30rpx;
				justify-content: center;
				li:first-child{
					border-right:1px solid #ebebeb;
					margin-right: 30rpx;
					padding-right: 30rpx;
				}
				li{
					text-align: center;
					width: 50%;
					font-size:30rpx;
					.li-title{
						font-size: 32rpx;
						color: #ff7640;
						margin-bottom: 20rpx;
					}
					span{
						color: #ff7640;
						font-size: 36rpx;
						margin-right: 20rpx;
					}
				}
			}
		}
		.mine-bottom{
			margin-top: 160rpx;
			width: 100%;
			ul{
				background: #fff;
				padding:0 30rpx;
				width:620rpx;
				margin:0 auto 20rpx;
				border-radius: 20rpx;
				li{
					line-height: 100rpx;
					border-bottom: 1px solid #ebebeb;
				}
				li:last-child{
					border-bottom: 0;
				}
			}
		}
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
	.copy{
		font-size: 28rpx;
		color: #fff;
		background: #ff7640;
		display: inline-block;
		border-radius: 20rpx;
		padding: 2px 5px;
		margin-left: 20rpx;
	}
</style>
