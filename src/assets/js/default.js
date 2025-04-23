// Touch Prevent
function lockTouch(e){
	e.stopImmediatePropagation();
}


$.fn.hasScrollBar = function() {
    return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0) || (this.prop("scrollHeight") > this.prop("clientHeight"));
};


//make selectbox
function makeSelect(obj, fn) {
	if(obj.parent().hasClass('selectStyle')) {
		return false;
	}

	// 부모 감싸기
	obj.wrap('<div class="selectStyle"></div>');
	obj.after('<div class="selectList"></div>');

	$selectBox = obj.closest('.selectboxWrap').eq(0);
	$selectBox.find('.selectStyle').each(function(){

		//select가 selected일때 a태그로 추출
		$(this).find('.select').after('<a href="#" class="selectResult" data-sticker="'+$(this).find('.select option:selected').attr('data-sticker')+'"><span>'+$(this).find('.select option:selected').html()+'</span></a>');

		for(var i=0;i<=$(this).find('.select option').length-1;i++){
			var value = $(this).find('.select option').eq(i).attr('value');

			if(value){
				value = ' data-value="' + value + '"';
			}else{
				value = '';
			}

			$(this).find('.selectList').append('<div class="option" data-sticker="'+$(this).find('.select option').eq(i).attr('data-sticker')+'"><a href="#"' + value + ' ><span>'+$(this).find('.select option').eq(i).html()+'</span></a></div>');

		}

		//option에 selected 일때
		$(this).find('select').find('option').each(function(idx, obj){
			if($(obj).is(':selected')){
				var index = $(obj).index();

				$(this).closest($selectBox).find('.selectList .option').removeClass('on');
				$(this).closest($selectBox).find('.selectList .option').eq(index).addClass('on');
			}
		});

		// select option 정의
		$(this).find('.selectList .option').each(function(idx, obj){
			if($(obj).hasClass('on')){
				$(obj).attr('data-selected', true);
			}
			else{
				$(obj).attr('data-selected', false);
			}
		});

		//select가 disabled 일때
		if($(this).find('.select').is(':disabled')){
			$(this).find('.selectResult').addClass('disabled');

			return;
		}

		//select option이 disabled 일때
		$(this).find('.select').find('option').each(function(idx, obj){
			if($(obj).is(':disabled')){
				var index = $(obj).index();

				$(this).closest($selectBox).find('.selectList .option').eq(index).addClass('disabled');

				return
			}
		});

	});

	$selectBox.find('.selectResult').on({
		click : function(e){
			e.preventDefault();

			var windowInnerHeight = window.innerHeight || $(window).height();
			var $list = $(this).next('.selectList');

			//select가 disabled 일때
			if($(this).prev('.select').is(':disabled')){
				$list.removeClass('on');

				return;
			}

			if($list.hasClass('on')){
				$list.removeClass('on').hide().css({zIndex: 5});
				$(this).removeClass('active');
			}
			else{
				$('.selectStyle').find('.selectList').removeClass('on').hide().css({zIndex: 5});
				$list.addClass('on').show().css({zIndex: 10});
				$('.selectStyle').find('.selectResult').removeClass('active');
				$(this).addClass('active');

				setTimeout(function(){
					if($list.find('.option[data-selected=true]').length > 0){
						$list.find('.option[data-selected=true] a').focus();
					}
				}, 0);
			}

			// 위치 체크
			if($(this).next('.selectList').hasClass('reversal')){
				$list.removeClass('reversal');
			}else{
				if(windowInnerHeight > $list.height() && $(this).offset().top + $(this).height() + $list.height() - $(window).scrollTop() > windowInnerHeight){
					$list.addClass('reversal');
				}else{
					$list.removeClass('reversal');
				}
			}

			// 타켓이 바깥일 경우
			$(document).off('click.closeEvent').on('click.closeEvent' , function(e){
				// option disabled 클릭시
				if($(e.target)[0].parentElement == $('div.option.disabled')[0]){
					return;
				}

				if($(e.target).next('.selectList').length == 0) {
					$('.selectStyle').find('.selectList').removeClass('on').hide().css({zIndex: 5});
					$('.selectStyle').find('.selectResult').removeClass('active');
					$('.selectList').removeClass('reversal');
				}
			});
		}
	});
	$selectBox.find('.selectList .option a').on({
		click : function(e){
			e.preventDefault();

			// option이 disabled 일때
			if($(this).closest('.option').hasClass('disabled')){
				return;
			}

			var selectText = $(this).html();
		    var idx = $(this).closest('.option').index();

		    $(this).closest('.selectStyle').find('.selectResult').html(selectText).attr('data-sticker' , $(this).closest('.option').attr('data-sticker'));
			$(this).closest('.selectList').removeClass('reversal');

		    var $selectStyle = $(this).closest('.selectStyle');

		    $(this).closest('.selectList').removeClass('on').hide().css({zIndex: 5});

		    //selected 초기화..
		    $selectStyle.find('.select option').prop('selected', false);
		    $selectStyle.find('.select option').eq(idx).prop('selected' , 'selected');
			$selectStyle.find('.select').trigger("change");
			$selectStyle.find('.selectList .option').attr({'data-selected': false}).removeClass('on');
			$(this).closest('.option').attr({'data-selected': true}).addClass('on');
		    $selectStyle.find('.selectResult').eq(0).focus();
		    $(this).closest('.selectStyle').find('.selectResult').focus();

		    fn && fn(); //callback

		}
	});
}

// 레이어 팝업
function gfnOpenLayer(popupContent){
	var settings = {
		opacity : 0,
		//scale : 0.5,
	}

	TweenMax.set(popupContent, settings);

	popupContent.show();
	popupContent.attr('tabIndex' , -1).focus();

	TweenMax.to(popupContent, 0.5, {
		opacity : 1,
		//scale : 1,
		onComplete : function() {
			popupContent.css({
				transform : 'initial'
			});
		}
	});
	// 레이어 닫기
	popupContent.find('.btnLayerClose').off('click.closeEvent').on('click.closeEvent', function(e){
		e.preventDefault();
		$(this).closest(popupContent).hide();

		if(window.focusBtn){
			window.focusBtn.focus();
		}
	});
}

// 플로팅
var isitClick = false;
const floatMotion = () => {
	const el = $('.btnFloat');
	if(el.length <= 0 ){
		return;
	}

	setTimeout(function(){
		TweenMax.to(el, 0.5 , {scale :1 ,x : 0})
	}, 1000);

	el.on('click' , (e)=>{
		e.preventDefault();


		TweenMax.to(el, 0.4 , {background : '#4870E0'})

		isitClick = true;

		TweenMax.to('.thumbWrap' , 0.3, {delay : 0.5, opacity: 0 , ease : 'cubic-bezier(0.550, 0.055, 0.675, 0.190)', onComplete : function(){
			$('.thumbWrap').hide();
		}})
		TweenMax.to(el , 0.75 , {scale : 35, ease : 'cubic-bezier(0.550, 0.055, 0.675, 0.190)'});
		TweenMax.to(el , 0.75 , {delay : 0.6, opacity : 0, ease : 'cubic-bezier(0.550, 0.055, 0.675, 0.190)', onComplete : function(){
			TweenMax.set(el , {clearProps: "all"});
			el.remove();

			isitClick = false;
		}});

		TweenMax.to('.wrap.main' , 0.3 , {delay : 0.4, opacity : 1 , onComplete : function(){
			$('.wrap.main').addClass('active');
		}});
	})
}


// inputRange
const inputRange = () => {
    var el = $('.rangeSlider')

    if(el.length <= 0){
        return;
    }

    const slider_input = document.getElementById('slider_input'),
      slider_thumb = document.getElementById('slider_thumb'),
	  slider_value = document.getElementById('slider_value'),
      slider_line = document.getElementById('slider_line');

    function showSliderValue() {
        slider_value.innerHTML = slider_input.value * 20 + ' 만원';
        const bulletPosition = (slider_input.value /slider_input.max  ),
                space = slider_input.offsetWidth - slider_thumb.offsetWidth;

        slider_thumb.style.left = (bulletPosition * space) + 'px';
        slider_line.style.width = slider_input.value*100 + '%';
    }

    showSliderValue();
    window.addEventListener("resize",showSliderValue);
    slider_input.addEventListener('input', showSliderValue, false);
}

// sourcepos
const sourcepos = (target, time) => {
	const el  = $('[data-sourcepos]');

	if(el.length <= 0 || $(target).hasClass('complete')){
		return;
	}

	setTimeout(function(){
		$(target).find(el).each(function(idx, obj){
			const timmer = $(obj).attr('data-sourcepos');
			const objLength = $(target).find(el).length;

			const textWrapper = $(obj)[0];
			const contents = $(obj).contents();

			let onlyText = contents.length > 0 && contents.filter(function() {
				return this.nodeType !== 3 || $.trim(this.nodeValue) === "";
			}).length === 0;

			if (onlyText) {
				const lines = textWrapper.textContent.split('\n');
				textWrapper.innerHTML = lines.map(line => {
					return line.replace(/./g, function(c) {
						if (c === " ") return "<span class='letter space'>&nbsp;</span>";
						else return "<span class='letter'>" + c + "</span>";
					});
				}).join('<br>');
			}

			setTimeout(function(){
				setTimeout(function(){
					$(obj).addClass('active');
					countUp($(obj));

					if (onlyText) {
						if($(obj).hasClass('complete')){
							return;
						}
						anime.timeline({loop: false}).add({
							targets: $(obj).filter('.active').find('.letter').toArray(),
							scale: [0.3,1],
							opacity: [0,1],
							translateZ: 0,
							easing: "easeOutExpo",
							duration: 600,
							delay: (el, i) => 7 * (i+1),
							complete  : function(){
								$(obj).addClass('complete');
							}
						})
					}
					else{
						$(obj).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){
							$(obj).addClass('complete')
						})
					}


					if(idx >= objLength-1){
						//$(target).addClass('complete')
					}
				},100);
			}, timmer*350);
		});
	}, time);
}

// sourcepos
const sourcepos02 = (target, time) => {
	const el  = $('[data-sourcepos02]');

	if(el.length <= 0 || $(target).hasClass('complete')){
		return;
	}

	setTimeout(function(){
		$(target).find(el).each(function(idx, obj){
			const timmer = $(obj).attr('data-sourcepos02');
			const objLength = $(target).find(el).length;

			const textWrapper = $(obj)[0];
			const contents = $(obj).contents();

			let onlyText = contents.length > 0 && contents.filter(function() {
				return this.nodeType !== 3 || $.trim(this.nodeValue) === "";
			}).length === 0;

			if (onlyText) {
				const lines = textWrapper.textContent.split('\n');
				textWrapper.innerHTML = lines.map(line => {
					return line.replace(/./g, function(c) {
						if (c === " ") return "<span class='letter space'>&nbsp;</span>";
						else return "<span class='letter'>" + c + "</span>";
					});
				}).join('<br>');
			}

			setTimeout(function(){
				setTimeout(function(){
					$(obj).addClass('active');
					countUp($(obj));

					if (onlyText) {
						if($(obj).hasClass('complete')){
							return;
						}
						anime.timeline({loop: false}).add({
							targets: $(obj).filter('.active').find('.letter').toArray(),
							scale: [0.3,1],
							opacity: [0,1],
							translateZ: 0,
							easing: "easeOutExpo",
							duration: 600,
							delay: (el, i) => 7 * (i+1),
							complete  : function(){
								$(obj).addClass('complete');
							}
						})
					}
					else{
						$(obj).on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(){
							$(obj).addClass('complete')
						})
					}


					if(idx >= objLength-1){
						//$(target).addClass('complete')
					}
				},100);
			}, timmer*350);
		});
	}, time);

}

// draw
function draw(el, percent, color, timmer) {
	var pieHtml = '';
	pieHtml += '<div class="pie">',
	pieHtml += '<div class="left-side half-circle"></div>',
	pieHtml += '<div class="right-side half-circle"></div>',
	pieHtml += '</div>',
	pieHtml += '<div class="shadow"></div>',

	$(el).each(function(idx, obj){
		$(obj).append(pieHtml);
	});

	percent = Math.round(percent);
	var idx=0;
	var func1 = setInterval(function(){
		if(idx<percent){
			idx++;
			percentMove(idx);
		} else{
			clearInterval(func1);
		}
	},timmer);

	function percentMove(percent){
		if (percent > 100) {
			percent = 100;
		} else if (percent < 0) {
			percent = 0;
		}
		var deg = Math.round(360 * (percent / 100));

		if (percent > 50) {
			$(el).addClass('p50');
		} else {
			$(el).removeClass('p50');
		}
		$(el + ' .left-side').css('transform', 'rotate(' + deg + 'deg)');
		$(el + ' .half-circle').css({'border-color' : color});
		$('#chartPercentage').html(percent);
	}
}

// 아코디언
function accodianUI() {
	var el;

	el = $('.accordianList');

	if(el.length <= 0){
		return;
	}

	bindEvents();

	function bindEvents(){
		el.find('>ul>li>dl>dt>button').off('click.accodianEvt').on('click.accodianEvt', function(e){
			e.preventDefault();

			var index = $(this).closest('li').index();

			el.find('>ul>li').each(function(idx, obj){
				if(idx == index){
					if($(obj).hasClass('on')){
						$(obj).removeClass('on');
						$(obj).find('dl>dt>button').find('span.hide_txt').remove();
					}else{
						$(obj).addClass('on');
						$(obj).find('dl>dt>button').find('span.hide_txt').remove();
					}
				}else{
					$(obj).find('dl>dt>button').find('span.hide_txt').remove();
					$(obj).removeClass('on');
				}
			});

		});
	}
}

// scrollToBottomUI
const scrollToBottomUI = (target) => {
	const $scrollBox = $(target);
	const objLength = $scrollBox.find('[data-sourcepos]').length;

	const scrollInterval = setInterval(function(){
		$scrollBox[0].scrollTo({
			top : $scrollBox[0].scrollHeight,
			behavior: "smooth"
		});

		if($scrollBox.find('[data-sourcepos]').eq(objLength-1).hasClass('complete')){
			clearInterval(scrollInterval)
		}
	});

}


// countUp
const countUp = (target) => {
	const el = target.find('[data-count]');

	if(el.length <= 0){
		return;
	}
	//천단위 콤마 Function
	function addComma(value){
		var len, point, str;

		value = value + "";
		point = value.length % 3 ;
		len = value.length;

		str = value.substring(0, point);

		while (point < len) {
			if (str != "") str += ",";
			str += value.substring(point, point + 3);
			point += 3;
		}

		// 마이너스 추가될 경우 쉼표 제거
		if(str.substring(0, 1) == '-' && str.substr(1, 1) == ','){
			str = '-' + str.slice(2) ;
		}

		return str;
	}

	// count append
	el.each(function(idx, obj){
		var count = addComma($(obj).attr('data-count').toString());

		$(obj).text('');
		for(i=0; i< count.length;i++){
			$(obj).append('<span class="countUp"><span style="animation-delay:'+0.2*+i+'s;will-change:transform">' + count[i] + '</span></span>');

			if($(obj).find('.countUp').find('span')[i].innerText == ','){
				$(obj).find('.countUp').last().addClass('rest');
			}
		}
	});
}

var cursorClone;
// imgCursorHover
function imgCursorHover(){
	var cursor = document.querySelector(".cursor:not(.clone)");

	document.querySelectorAll("[data-click='true'], .gateMenu a, [data-hover='true']").forEach(function (el) {
		el.addEventListener("mouseover", function () {
			cursor.style.opacity = 1;
			cursor.classList.add('is-hover');

			$('html').addClass('cursor-ing');

		});

		el.addEventListener("mouseout", function () {
			cursor.style.opacity = 0;
			cursor.classList.remove('is-hover');

			$('html').removeClass('cursor-ing');
		  });
	});

	document.querySelectorAll(".gateNavi").forEach(function (el) {
		el.addEventListener("mouseover", function () {
			cursor.classList.add('is-navi-hover');

		});

		el.addEventListener("mouseout", function () {
			cursor.classList.remove('is-navi-hover');
		  });
	});

	 document.addEventListener("mouseout", () => {
    	cursor.style.opacity = 0;

    });

	document.addEventListener("click", () => {
    	cursor.classList.add('is-click');
		setTimeout(function(){
			cursor.classList.remove('is-click');
		}, 200);
    });
}

// LayerPopup
var idxLayPop = 0;
var fscrollTop = 0;
function modalPop(n, target){
	if(n == 'open'){
		fscrollTop = $(document).scrollTop();
		idxLayPop = idxLayPop + 1;

		TweenMax.set($('.modalPop'+target), {zIndex : 1000 + idxLayPop});
		$('.modalPop'+target).addClass('show');
		setTimeout(function(){
			$('.modalPop'+target).addClass('active');
		}, 50);

		document.addEventListener('touchmove' , lockTouch, false);

		// full Popup일경우
		if($('.modalPop'+target).hasClass('full') && $('.modalPop'+target).filter('.full').find('.buttonFixed').length <= 0){
			$('.modalPop'+target).filter('.full').find('.modalBody').css({bottom: 0});
		}

		$('.modalPop'+target).one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() {
			$('html').addClass('closeHidden');

			// 얼럿 레이어가 있을 경우 닫기
			if($('.modalAlert').hasClass('active')){
				TweenMax.to($('.modalAlert.active') , 0.4 ,{y : -100 , display : 'none' , opacity : 0, onComplete : function(){
					$('.modalAlert.active').next('.modalPopBg').stop().fadeOut(function(){
						$(this).remove();
						document.removeEventListener('touchmove' , lockTouch, false);
					});
					$('.modalAlert.active').removeClass('active').removeAttr('style');
					$('.wrap').removeAttr('style');
				}});
			}
		});
	}else{
		$('.modalPop'+target).css('z-index' , '');
		$('.modalPop'+target).removeClass('show').removeClass('active');
		$('html').removeClass('closeHidden');
		$('.modalPop'+target).one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function() {
			document.removeEventListener('touchmove' , lockTouch, false);
		});
	}
}

$(function(){
	floatMotion();
	inputRange();
	accodianUI();

	var vh = window.innerHeight;
	var vw = (window.innerWidth >= 1920) ? 1920 : window.innerWidth;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
	document.documentElement.style.setProperty("--vw", `${vw}px`);

	window.addEventListener("resize", () => {
		var vh = window.innerHeight;
		var vw = (window.innerWidth >= 1920) ? 1920 : window.innerWidth;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
		document.documentElement.style.setProperty("--vw", `${vw}px`);
	});

	if($('.cursor').length > 0){

		var cursor = document.querySelector(".cursor:not(.clone)");
		var timeout;

		document.addEventListener("mousemove", (e) => {
			var y = e.clientY
			var x = e.clientX;

			cursor.style.top = y + "px";
			cursor.style.left = x + "px";
			cursor.style.opacity = 1;

			function mouseStopped(){
				cursor.style.opacity = 0;

				$('html').removeClass('cursor-ing');
			}
			clearTimeout(timeout);
			timeout = setTimeout(mouseStopped, 5000);
		});

		imgCursorHover();
	}

});
