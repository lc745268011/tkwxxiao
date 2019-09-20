<template>
  <view class="setting">
	  <ul>
		  <li>个人信息</li>
		  <li>账户安全</li>
	  </ul>
	  <ul>
		  <li>会员等级</li>
		  <li class="clearfix"><text class="fl">填写邀请码</text><text class="fr" v-if="keystatus">已绑定</text><text class="fr" v-if="!keystatus" @click="invitioncode">未绑定</text></li>
	  </ul>
	  <popup :show="show" :width="600" height="300" :title="title" @cancal="cancalFun" @confirm="confirmFun">
		  <input type="text" value="" v-model="key" class="code-input"/>
	  </popup>
  </view>
</template>
<script>
import popup from '../../components/popup.vue'
export default {
  name: 'setting',
  data () {
    return {
		show:false,
		title:'请输入邀请码',
		key:'',
		// token:'',
		keystatus:0
    }
  },
  mounted(){
	  var that=this
	  uni.getStorage({
	      key: 'user',
	      success: function (res) {
	          that.keystatus=res.data.agentid
	      }
	  });
  },
  components:{
	popup
  },
  methods:{
	  invitioncode(){
		  this.show=true;
	  },
	  cancalFun(){
		  this.show=false;
	  },
	  confirmFun(){
		  var that=this
		  uni.request({
		  	url: getApp().globalData.APIurl+'/api/wxapp/member/bindActikey',
		  	data: {
		  	    key: that.key,
		  	},
		  	header: {
		  	    'Token': that.token ,
		  		'Device-Type':'wxapp'
		  	},
		  	success: (res) => {
		  		if(res.data.code){
		  			uni.showToast({
		  			    title: '绑定成功',
		  				icon:'none',
		  			    duration: 2000,
		  				success:function(){
		  					setTimeout(()=>{
								that.show=false;
								uni.setStorage({
								    key: 'user',
								    data:res.data.data,
								    success: function () {
								        console.log('success');
								    }
								});
								that.keystatus=res.data.data.agentid
		  					},2000)
		  					
		  				}
		  			});
		  		}else{
					uni.showToast({
					    title: '绑定失败',
						icon:'none',
					    duration: 2000,
						success:function(){
							
						}
					});
				}
		  	}
		  })
	  }
  }
}
</script>
<style lang="scss">
	.setting{
		._ul{
			margin-bottom: 20rpx;
			background-color:#fff;
			li{
				padding: 0 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				border-bottom:1px solid #ebebeb;
			}
			li:last-child{
				border-bottom:0;
			}
		}
		.code-input{
			border:1px solid #ebebeb;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
		}
	}
</style>
