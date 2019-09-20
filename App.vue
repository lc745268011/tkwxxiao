<script>
	export default {
		globalData: {  
			APIurl: 'https://edu.ccfancy.com' ,
		},  
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page{
		font-size: 32rpx;
		background: #f9f9f9;
		min-height: 100vh;
		color: #666;
	}
	input{  
	  letter-spacing:2px;
	}  
	.vcenter{
		display: flex;
		align-items: center;
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.clearfix:before,
	.clearfix:after {
	    content: "";
	    display: table;
	}
	
	.clearfix:after {
	    clear: both;
	}
	.iconfont{
		font-family:"iconfont" !important;
		font-size:16px;font-style:normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}	
	@font-face {
	  font-family: 'iconfont';  
	  src: url('https://at.alicdn.com/t/font_1395801_oix8ujav7qb.eot');
	  src: url('https://at.alicdn.com/t/font_1395801_oix8ujav7qb.eot?#iefix') format('embedded-opentype'),
	  url('https://at.alicdn.com/t/font_1395801_oix8ujav7qb.woff2') format('woff2'),
	  url('https://at.alicdn.com/t/font_1395801_oix8ujav7qb.woff') format('woff'),
	  url('https://at.alicdn.com/t/font_1395801_oix8ujav7qb.ttf') format('truetype'),
	  url('https://at.alicdn.com/t/font_1395801_oix8ujav7qb.svg#iconfont') format('svg');
	}
	.center{
		text-align: center;
	}
</style>
