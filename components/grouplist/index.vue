<template>
  <div class="goodslist">
    <ul v-if="goodslist&&arrangement=='v'" class="listV">
      <li v-for="(goods , index) in goodslist" :key="index" class="clearfix coupon">
        <div class="coupon-left">
          <div>
            <div class="fl goodsPic">
              <img :src="`https://${goods.pict_url}`" alt>
            </div>
            <div class="fl goodsInfo">
              <div class="title">{{goods.title}}</div>
              <div>
                <s>现价：{{goods.zk_final_price}}</s>
                <span>已售{{goods.volume}} 件</span>
              </div>
              <div class="curPrice">券后价￥{{sub(goods.zk_final_price,goods.coupon_amount)}}</div>
            </div>
          </div>
        </div>
        <div class="coupon-con goodsCoupon">
          <div>
            <div class="amount">{{goods.coupon_amount}}</div>
            <div>优惠券</div>
            <div class="couponBtn" id="couponBtn" @click="getCoupon(goods)">领券买</div>
          </div>
        </div>
      </li>
    </ul>
    <ul v-if="goodslist&&arrangement=='h'" class="listH clearfix">
      <li v-for="(goods , index) in goodslist" :key="index" class="fl coupon">
        <div class="top" v-if="goods">
          <div class="goodsPic">
            <div class="amount">{{goods.jdd_num}}人团</div>
              <img :src="`https://${goods.pict_url}`" alt>
          </div>
        </div>
        <div class="bottom" v-if="goods">
          <div class="goodsInfo">
            <div class="title">{{goods.title}}</div>
            <div class="clearfix">
              <s class="fl">单买价：{{goods.orig_price}}</s>
              <span class="fr">已售{{goods.sell_num}} 件</span>
            </div>
            <div class="goodsCoupon">
              <div class="curPrice">拼团价￥{{goods.jdd_price}}</div>
            </div>
            <div class="clearfix">
              <div class="couponBtn fr" id="couponBtn" @click="getCoupon(goods)">发起拼团</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'goodslist',
  data () {
    return {
      tlink: '',
      copyBtn: null,
      show: false,
      copyText: '一键复制'
    }
  },
  props: ['goodslist', 'loadingstatus', 'arrangement'],
  methods: {
    /**
     * JS实现精确减法计算
     */
    sub (arg1, arg2) {
      var r1, r2, m, n
      try {
        r1 = arg1.toString().split('.')[1].length
      } catch (e) {
        r1 = 0
      }
      try {
        r2 = arg2.toString().split('.')[1].length
      } catch (e) {
        r2 = 0
      }
      m = Math.pow(10, Math.max(r1, r2))
      // last modify by deeka
      // 动态控制精度长度
      n = r1 >= r2 ? r1 : r2
      return ((arg1 * m - arg2 * m) / m).toFixed(n)
    },
    /**
     * 获得淘口令
     */
    getCoupon (goods) {
    	var that=this
    	uni.request({
    		url: getApp().globalData.APIurl+'/portal/index/sortMaterialUrl',
    		data: {
    		    url: goods.click_url,
    		    title: goods.title,
    		    img_url: goods.pict_url
    		},
    		header: {
    		    'Token': that.token ,
    			'Device-Type':'wxapp'
    		},
    		success: (res) => {
    			if(res.data.code){
    				that.tlink = res.data.data.info
    				uni.setClipboardData({
    				    data: that.tlink,
    				    success: function () {
    				        uni.showToast({
    				            title: '复制成功，打开【手机淘宝APP】即可【领取优惠券】并购买',
    				        	icon:'none',
    				            duration: 2000,
    				        	success:function(){
    				        		
    				        	}
    				        });
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
.goodslist {
  padding: 0 30rpx;
  .listV {
    padding-bottom:30rpx;
    .coupon {
      overflow: hidden;
      border-radius: 20rpx;
    }
    .coupon-left {
      float: left;
      width: 520rpx;
      height: 260rpx;
      position: relative;
      > view {
        position: absolute;
        width: 480rpx;
        height: 220rpx;
        margin: auto;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 9;
        display: flex;
        align-items: center;
      }
    }
    .coupon-left::before {
      content: "";
      position: absolute;
      top: -820rpx;
      display: block;
      right: -820rpx;
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      border: 800rpx solid #f7f7f7;
      clip: rect(auto, auto, 1060rpx, auto);
    }
    .coupon-left::after {
      content: "";
      position: absolute;
      bottom: -820rpx;
      display: block;
      right: -820rpx;
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      border: 800rpx solid #f7f7f7;
      clip: rect(580rpx, auto, auto, auto);
    }
    .coupon-con {
      float: left;
      width: 170rpx;
      height: 260rpx;
      position: relative;
      > view {
        position: absolute;
        width: 170rpx;
        height: 170rpx;
        margin: auto;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 9;
        padding: 0 20rpx;
        box-sizing: border-box;
        border-left: 1px dashed #dcdcdc;
      }
    }
    .coupon-con::before {
      content: "";
      position: absolute;
      top: -820rpx;
      display: block;
      left: -820rpx;
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      border: 800rpx solid #f7f7f7;
      clip: rect(0, auto, 970rpx, 820rpx);
    }
    .coupon-con::after {
      content: "";
      position: absolute;
      bottom: -820rpx;
      display: block;
      left: -820rpx;
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      border: 800rpx solid #f7f7f7;
      clip: rect(670rpx, auto, auto, 820rpx);
    }
    li {
      width: 100%;
      margin-top: 30rpx;
      border-radius: 20rpx;
      overflow: hidden;
      .goodsPic {
        width: 160rpx;
        height: 160rpx;
        margin-right: 20rpx;
        img {
          width: 160rpx;
          height: 160rpx;
        }
      }
      .goodsInfo {
        width: 300rpx;
        font-size: 24rpx;
        color: #999;
        .title {
          font-size: 28rpx;
          margin-bottom: 20rpx;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          color: #6b4d37;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .curPrice {
          color: red;
          margin-top: 20rpx;
          font-size: 28rpx;
        }
      }
      .goodsCoupon {
        width: 170rpx;
        text-align: center;
        font-size: 24rpx;
        color: #999;
        .amount {
          color: red;
          font-size: 44rpx;
        }
      }
    }
  }
  .listH {
    padding-bottom:30rpx;
    li {
      width: 330rpx;
      margin-right: 30rpx;
      padding: 20rpx;
      background: #fff;
      box-sizing: border-box;
      box-shadow: 0 12rpx 24rpx 0 rgba(0,0,0,.1);
      margin-top: 30rpx;
      border-radius: 20rpx;
      .goodsPic {
        width: 290rpx;
        height: 290rpx;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .amount {
          width: 100%;
          height: 60rpx;
          text-align: center;
          line-height: 60rpx;
          color: #fff;
          background: rgba(241, 46, 46, 0.6);
          position: absolute;
          bottom: 0;
          left: 0;
		  font-size: 24rpx;
        }
      }
      .goodsInfo {
        margin: 10rpx 0;
        font-size: 24rpx;
        color: #999;
        .title {
          font-size: 28rpx;
          margin-bottom: 20rpx;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          color: #333;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
      .curPrice {
        font-size: 28rpx;
        color: red;
        margin: 10rpx 0;
      }
      .couponBtn{
        display: inline-block;
        margin-top: 0;
      }
      .goodsCoupon{
        margin: 16rpx 0;
      }
    }
    li:nth-child(2n) {
      margin-right: 0;
    }
  }
  .couponBtn {
    background: red;
    color: #fff;
    padding: 10rpx 20rpx;
    margin-top: 20rpx;
    border-radius: 32rpx;
  }
  .tlinkbox {
      padding: 40rpx 60rpx;
      .right {
        text-align: right;
      }
      .btn {
        padding: 10rpx 20rpx;
        border-radius: 20rpx;
        background: red;
        color: #fff;
        display: inline-block;
        font-size: 24rpx;
      }
    }
}
.van-loading {
    margin: 0 auto;
}
</style>
