var swiper = new Swiper('.swiper-container', {
	direction: 'vertical',
	slidesPerView: 1,
	spaceBetween: 0,
	mousewheelControl: true
});

//img
var canvas = document.getElementById('canvas'),
	upBtn = document.getElementById('File'),
	upImg = document.getElementById('imgUpload'),
	progress = document.getElementById('progress'),

	bgImg = new Image(),
	bgImgB = new Image(),
	bgImgC = new Image();

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
bgImg.src = 'images/9/Q9bg-top.jpg';
bgImgB.src = 'images/9/Q9bg-bot.jpg';
bgImgC.src = 'images/9/Q9bg-mid.png';

ctx = canvas.getContext('2d');
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
drawLoadedImg(bgImg, ctx, 0, 0, 640, 210);
drawLoadedImg(bgImgB, ctx, 0, canvas.height - 159, 640, 159);
drawLoadedImg(bgImgC, ctx, 60, 213, canvas.width*0.8+10, canvas.height-369);
upBtn.onchange = function() {
	var upFile = this.files[0];
	upImg.src = window.URL.createObjectURL(upFile);

	drawLoadedImg(upImg, ctx, 65, 218, canvas.width*0.8, canvas.height-369);
	ctx.fillStyle = '#000';
	ctx.fillRect(60, 213, canvas.width*0.8+10, canvas.height-359);
	this.parentNode.style.zIndex = '-1';
	
	var pop = document.getElementById('showPop');
	progress.style.display='block';
	setTimeout(function() {
		pop.style.display = 'block';
		setTimeout(function() {
			pop.style.display = 'none';
			var imag = canvas.toDataURL("image/png");
			document.getElementById('page9').innerHTML = "<img src='" + imag + "' alt='from canvas'/>";
		}, 1500);
	}, 500)
}


//img2
var canvast = document.getElementById('canvast'),
	upBtnt = document.getElementById('Filet'),
	upImgt = document.getElementById('imgUploadt'),
	progresst = document.getElementById('progresst'),

	bgImgt = new Image(),
	bgImgBt = new Image(),
	bgImgCt = new Image();

canvast.width = document.documentElement.clientWidth;
canvast.height = document.documentElement.clientHeight;
bgImgt.src = 'images/9-1/Q9_01.jpg';
bgImgBt.src = 'images/9-1/Q9_03.jpg';
bgImgCt.src = 'images/9-1/Q9_02.jpg';

ctxt = canvast.getContext('2d');
ctxt.fillStyle = '#fff';
ctxt.fillRect(0, 0, canvast.width, canvast.height);
drawLoadedImg(bgImgt, ctxt, 0, 0, 640, 210);
drawLoadedImg(bgImgBt, ctxt, 0, canvast.height - 490, 640, 490);
drawLoadedImg(bgImgCt, ctxt, 60, 213, canvast.width*0.8+10, canvast.height-700);
upBtnt.onchange = function() {
	var upFilet = this.files[0];
	upImgt.src = window.URL.createObjectURL(upFilet);

	drawLoadedImg(upImgt, ctxt, 65, 218, canvast.width*0.8, canvast.height-700);
	ctxt.fillStyle = '#000';
	ctxt.fillRect(60, 213, canvast.width*0.8+10, canvast.height-690);
	this.parentNode.style.zIndex = '-1';
	
	var popt = document.getElementById('showPopt');
	progresst.style.display='block';
	setTimeout(function() {
		popt.style.display = 'block';
		setTimeout(function() {
			popt.style.display = 'none';
			var imagt = canvast.toDataURL("image/png");
			document.getElementById('page9t').innerHTML = "<img src='" + imagt + "' alt='from canvas'/>";
		}, 1500);
	}, 500)
}

function drawLoadedImg(img, ct, moveX, moveY, W, H) {
	img.onload = function() {
		progress.style.display='none';
		progresst.style.display='none';
		ct.drawImage(img, moveX, moveY, W, H);
	}
}

//cj
var luck = {
	index: 0, //当前转动到哪个位置，起点位置
	count: 8, //总共有多少个位置
	timer: 0, //setTimeout的ID，用clearTimeout清除
	speed: 20, //初始转动速度
	times: 16, //转动次数
	cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize: -1, //中奖位置
	init: function(id) {
		if($("#" + id).find(".jp").length > 0) {
			$luck = $("#" + id);
			$units = $luck.find(".jp");
			this.obj = $luck;
			this.count = $units.length;
			$luck.find(".jp" + this.index).addClass("active");
		};
	},

	roll: function() {
		var index = this.index;
		var count = this.count;
		var luck = this.obj;
		$(luck).find(".jp" + index).removeClass("active");
		index += 1;
		if(index > count - 1) {
			index = 0;
		};
		$(luck).find(".jp" + index).addClass("active");
		this.index = index;
		return false;
	},
	stop: function(index) {
		this.prize = index;
		return false;
	}
};

function roll() {
	luck.times += 1;
	luck.roll();
	if(luck.times > luck.cycle + 10 && luck.prize == luck.index) {
		clearTimeout(luck.timer);
		luck.prize = -1;
		luck.times = 0;
		click = false;
	} else {
		if(luck.times < luck.cycle) {
			luck.speed -= 10;
		} else if(luck.times == luck.cycle) {
			var index = luck.prize;
			luck.prize = index;
		} else {
			if(luck.times > luck.cycle + 10 && ((luck.prize == 0 && luck.index == 7) || luck.prize == luck.index + 1)) {
				luck.speed += 110;
			} else {
				luck.speed += 20;
			}
		}
		if(luck.speed < 40) {
			luck.speed = 40;
		};

		luck.timer = setTimeout(roll, luck.speed);
	}
	return false;
}

var click = false;
$(function() {
	luck.init('cjWrap');
	$("#btn").click(function() {

		if(click) {
			return false;
		} else {
			luck.speed = 100;
			luck.prize = 1;
			roll();
			click = true;
			return false;
		}

	});
})

//音乐
var anipaly=true;
$('#audio_btn').click(function(){
	if(anipaly){
		$('#audio_btn').css('-webkit-animation','none');
		$('.musicbg').removeClass('active');
		anipaly=false;
	}else{
		$('#audio_btn').css('-webkit-animation','rout linear 2s infinite');
		$('.musicbg').addClass('active');
		anipaly=true;
	}
	
//判断音乐暂停
  var audio = document.getElementById('media'); 
 	if(audio!==null){             
  	if(audio.paused){                 
      	audio.play();	//audio.play();// 播放  
      	$('.musicbg').addClass('active');
  	}else{
   		audio.pause();// 暂停
      	$('.musicbg').removeClass('active');
	  	}
	} 
})