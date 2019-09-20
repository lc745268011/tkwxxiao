<template>
	<view class="login">
		<image src="/static/loginbg.png" mode="" class="loginbg"></image>
		<view class="bindphone">
			<p>绑定手机号</p>
			<view class="input">
				<view :class="[{tipsfoucs:type=='phone'||userphone},'tips']">
					请输入手机号
				</view>
				<input class="tk-input tk-userphone" v-model="userphone" @change="changeBox"  @focus="focusBox('phone')" @blur="blurBox"/>
				<view class="line1">
				</view>
				<view :class="[{abc:type=='phone'},'line2']">
				</view>
			</view>
			<view class="input" v-if="next">
				<view :class="[{tipsfoucs:type=='code'||usercode},'tips']">
					请输入验证码
				</view>
				<input class="tk-input tk-usercode" v-model="usercode"  @focus="focusBox('code')" @blur="blurBox"/>
				<view class="line1">
				</view>
				<view :class="[{abc:type=='code'},'line2']">
				</view>
			</view>
			<view class="input" v-if="next">
				<view :class="[{tipsfoucs:type=='pwd'||userpwd},'tips']">
					请输入新密码
				</view>
				<input class="tk-input tk-userpwd" v-model="userpwd"  @focus="focusBox('pwd')" @blur="blurBox"/>
				<view class="line1">
				</view>
				<view :class="[{abc:type=='pwd'},'line2']">
				</view>
			</view>
		</view>
		<button v-if="!next" class="checkphone" hover-class="h-checkphone" @click="checkmobile()">验证手机号</button>
		<button v-if="next" class="checkphone" hover-class="h-checkphone" @click="tosubmit()">绑定</button>
		<!-- <input class="tk-usercode" v-model="usercode" placeholder="验证码" />
		<input class="tk-userpwd" v-model="userpwd" placeholder="密码" />
		<button @click="tosubmit">提交</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userphone: '',
				usercode:'',
				userpwd:'',
				type:'',
				next:false
			}
		},
		onLoad() {

		},
		methods: {
			checkmobile(){
				var token,that=this
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(that.userphone))){ 
					uni.showToast({
					    title: '请填写正确手机号',
						 icon: 'none',
					    duration: 2000
					});
					return false; 
				} 
				uni.getStorage({
					key: 'token',
					success: function (res) {
						token=res.data
						uni.request({
							url: getApp().globalData.APIurl+'/api/wxapp/index/checkMobile',
							data: {
							    mobile: that.userphone,
							},
							header: {
							    'Token': token ,
								'Device-Type':'wxapp'
							},
							success: (res) => {
								if(res.data.code){
									that.next=true
								}else{
									uni.showToast({
									    title: '该手机号已被绑定',
										 icon: 'none',
									    duration: 2000
									});
								}
							}
							
						})
					}
				});
			},
			tosubmit(){
				var token,that=this
				uni.getStorage({
					key: 'token',
					success: function (res) {
						token=res.data
						uni.request({
							url: getApp().globalData.APIurl+'/api/user/Profile/bindingMobile',
							data: {
							    mobile: that.userphone,
								verification_code:that.usercode,
								password:that.userpwd
							},
							header: {
							    'Token': token ,
								'Device-Type':'wxapp'
							},
							success: (res) => {
								console.log(res)
								if(res.data.code){
									uni.showToast({
									    title: '绑定成功',
										icon:'none',
									    duration: 2000,
										success:function(){
											setTimeout(()=>{
												uni.switchTab({
												    url: '/pages/mine/index'
												});
											},2000)
											
										}
									});
								}
							}
						})
					}
				});
			},
			focusBox(t){
				this.type=t
			},
			blurBox(){
				this.type=''
			},
			changeBox(){
				this.next=false
			}
		}
	}
</script>

<style scoped lang="scss">
	.login{
		.loginbg{
			width: 750rpx;
			height: 328rpx;
		}
		.bindphone{
			margin:70rpx 40rpx;
			p{
				color: #ff5600;
				font-size: 46rpx;
			}
			.input{
				position: relative;
				margin:60rpx 0 100rpx;
				.tips{
					position: absolute;
					left: 0;
					bottom: 0;
					transition: 0.5s;
				}
				.tipsfoucs{
					bottom: 60rpx;
					font-size: 24rpx;
				}
				.line1,.line2{
					position: absolute;
					bottom: -20rpx;
					left: 0;
					right: 0;
					height: 1px;
					background: #efefef;
					width: 100%;
					transition: 0.5s;
				}
				.line2{
					background: #ff5600;
					width: 0;
					margin: 0 auto;
					height: 2px;
				}
				.abc{
					width: 100%;
				}
			}
			.tk-input {
				font-size: 32rpx;
				margin-bottom: 20rpx;
				// padding: 0 30rpx;;
			}
		}
		.checkphone{
			width: 670rpx;
			margin: 200rpx auto 0;
			height: 100rpx;
			color: #fff;
			background: #ff8040;
			border: 0;
			border-radius: 100rpx;
		}
		.h-checkphone{
			opacity: 0.8;
		}
	}
</style>
