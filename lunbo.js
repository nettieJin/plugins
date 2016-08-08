//结构
/*<div class="autoplay" id="autoplay">
	<div class="pics" id="pics">
		<img src="images/d1.jpg">
		<img src="images/d2.jpg">
		<img src="images/d3.jpg">
		<img src="images/d4.jpg">
	</div>
	<ul id="auto_dot">
		<li class="cur"></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>					
</div>*/	


/* 轮播公共样式 */
/*.autoplay{
	width:100%;
	overflow: hidden; 
	height: 30%;
	@include pos;
	.pics{
		height:100%;
		@include pos(absolute);
		top:0;
		left: 0; 
		img{
			float: left;
			height:auto;
			font-size: 0;
		}
	}
	ul{
		@include pos(absolute);
		bottom:10%;
		left:50%;
		width:40%;
		margin-left: -20%;
		display:-webkit-flex;
		li{
			-webkit-flex:1;
			&:before{
				content:"";
				display: block;
				width:10px;
				height: 10px;
				background: rgba(255,255,255,0.8);
				box-shadow: 1px 1px 1px #000;
				margin: 0 auto;
				border-radius: 50%;

			};
			&.cur:before{
				width:30px;
				background: #fff;
				border-radius: 5px;
			};
		}
	}		
}*/




;(function($){
	function lunbo(options){
		var defaults={
			section:"autoplay",//轮播大盒子id
			pics:"pics",//图片移动盒子id
			dot:"auto_dot",//焦点图盒子id
			dot_style:"cur"//焦点图切换class样式
		}

		var settings=$.extend({},defaults,options);//替换拓展参数
		//console.log(settings.section);
		var startX=0,moveX=0,n=0,n_cur=0,timer;
		//动态设置轮播哦img宽度
		var winW=$(window).width();
		$("#"+settings.section).find("img").css({
			"width":winW+"px",
			"height":"100%"
		});		
		var len=$("#"+settings.section).find("img").size();
		$("#"+settings.pics).width($(window).width()*len);		

	//轮播事件
	$("#"+settings.pics).on("touchstart",function(e){
		e.preventDefault();
		startX=e.touches[0].pageX;
		clearInterval(timer);
		if(n==0){
			//最后一个放到最前面
			$("#"+settings.pics).find("img").eq(len-1).prependTo("#"+settings.pics);
			n++;
			$("#"+settings.pics).css("left",-winW+"px");			
		}

	}).on("touchmove",function(e){
		moveX=e.touches[0].pageX;
		clearInterval(timer);
		$("#"+settings.pics).css({
			"left":-(startX-moveX+winW)+"px"
		})
	}).on("touchend",function(e){
		autoplay_timer()
		if(moveX-startX>50){//手指往右滑动
			$("#"+settings.pics).animate({"left":0},500);	
			n=0;
			n_cur--;
			if(n_cur<0)n_cur=len-1;
			$("#"+settings.dot).find("li").eq(n_cur).addClass(settings.dot_style).siblings().removeClass(settings.dot_style);
		}else if(moveX-startX<-50){//手指往左
			play(2,2);
		}else{
			$("#"+settings.pics).animate({"left":-winW+"px"},500);
		}
	})

	function play(w,l){
		$("#"+settings.pics).animate({"left":-winW*w+"px"},500,function(){
			//前两张移动到最后
			$("#"+settings.pics).find("img").slice(0,l).appendTo("#"+settings.pics);
			$("#"+settings.pics).css("left",0);
			n=0;
		});	
		n_cur++;
		if(n_cur>len-1)n_cur=0;
		$("#"+settings.dot).find("li").eq(n_cur).addClass(settings.dot_style).siblings().removeClass(settings.dot_style);				
	}
	//自动轮播
	autoplay_timer()
	function autoplay_timer(){
		timer=setInterval(function(){
			play(1,1);
		},3000);
	}

	}
	//封装底层函数
	$.autoPlay=function(options){
		return new lunbo(options);
	}
})(Zepto)


/*//轮播
	var startX=0,moveX=0,n=0,n_cur=0,timer;
	//动态设置轮播哦img宽度
	var winW=$(window).width();
	$(".autoplay").find("img").css({
		"width":winW+"px",
		"height":"100%"
	});
	var len=$(".autoplay").find("img").size();
	$(".pics").width($(window).width()*len);
	//轮播事件
	$(".autoplay .pics").on("touchstart",function(e){
		e.preventDefault();
		startX=e.touches[0].pageX;
		clearInterval(timer);
		if(n==0){
			//最后一个放到最前面
			$(".pics").find("img").eq(len-1).prependTo(".pics");
			n++;
			$(".pics").css("left",-winW+"px");			
		}

	}).on("touchmove",function(e){
		moveX=e.touches[0].pageX;
		clearInterval(timer);
		$(".pics").css({
			"left":-(startX-moveX+winW)+"px"
		})
	}).on("touchend",function(e){
		autoplay_timer()
		if(moveX-startX>50){//手指往右滑动
			$(".pics").animate({"left":0},500);	
			n=0;
			n_cur--;
			if(n_cur<0)n_cur=len-1;
			$(".autoplay ul li").eq(n_cur).addClass("cur").siblings().removeClass("cur");
		}else if(moveX-startX<-50){//手指往左
			play(2,2);
		}else{
			$(".pics").animate({"left":-winW+"px"},500);
		}
	})
	function play(w,l){
		$(".autoplay .pics").animate({"left":-winW*w+"px"},500,function(){
			//前两张移动到最后
			$(".pics").find("img").slice(0,l).appendTo(".pics");
			$(".pics").css("left",0);
			n=0;
		});	
		n_cur++;
		if(n_cur>len-1)n_cur=0;
		$(".autoplay ul li").eq(n_cur).addClass("cur").siblings().removeClass("cur");				
	}
	//自动轮播
	autoplay_timer()
	function autoplay_timer(){
		timer=setInterval(function(){
			play(1,1);
		},3000);
	}*/