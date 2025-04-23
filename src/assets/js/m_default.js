// Touch Prevent
function lockTouch(e){
	e.stopImmediatePropagation();
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
// 아코디언
function accodianUI() {
	var el;

	el = $('.accordianList');

	if(el.length <= 0){
		return;
	}

	bindEvents();

	function bindEvents(){
		el.find('>ul>li>dl>dt>a').off('click.accodianEvt').on('click.accodianEvt', function(e){
			e.preventDefault();

			var index = $(this).closest('li').index();

			el.find('>ul>li').each(function(idx, obj){
				if(idx == index){
					if($(obj).hasClass('on')){
						$(obj).removeClass('on');
						$(obj).find('dl>dt>a').find('span.hide_txt').remove();
					}else{
						$(obj).addClass('on');
						$(obj).find('dl>dt>a').find('span.hide_txt').remove();
					}
				}else{
					$(obj).find('dl>dt>a').find('span.hide_txt').remove();
					$(obj).removeClass('on');
				}
			});

		});
	}
}

// scrollToBottomUI
const scrollToBottomUI = (target, className, onComplete) => {
	const $scrollBox = $(target);
	const objLength = (target == '.analyzeViewInner') ?  $scrollBox.find('[data-sourcepos]').length : $scrollBox.find('.chartMsgItem.active' + className).find('[data-sourcepos]').length;

	if (objLength === 0) return;

	const scrollInterval = setInterval(function() {
		$scrollBox[0].scrollTo({
			top : $scrollBox[0].scrollHeight,
			behavior: "smooth"
		});

		console.log($scrollBox.find('.chartMsgItem.step03.active').find('[data-sourcepos]').eq(objLength - 1).hasClass('complete'), objLength)
		if ($scrollBox.find('.chartMsgItem.active' + className).find('[data-sourcepos]').eq(objLength - 1).hasClass('complete')) {
			clearInterval(scrollInterval);
			$scrollBox.find('.chartMsgItem.active').addClass('complete');

			if (typeof onComplete === 'function') {
				onComplete();
			}
		}

		if(target == '.analyzeViewInner'){
			if ($scrollBox.find('[data-sourcepos]').eq(objLength - 1).hasClass('complete')) {
				clearInterval(scrollInterval);
				$scrollBox.addClass('complete');

				if (typeof onComplete === 'function') {
					onComplete();
				}
			}
		}
	}, 200);
};

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

// 레이어 팝업
function gfnOpenLayer(popupContent){
	var settings = {
		opacity : 0,
	}

	TweenMax.set(popupContent, settings);

	popupContent.show();
	popupContent.attr('tabIndex' , -1).focus();

	TweenMax.to(popupContent, 0.3, {
		opacity : 1,
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

// scrollContentMove
const scrollContentMove = () => {
	const $sections = $('.chartMsgItem');
    let currentIndex = 0;

	if($sections.length <= 0){
		return;
	}

	function scrollToSection(index) {
		const offsetTop =  $sections.eq(index).offset().top + $('.chatCont').scrollTop() - 175;
		$('.chatCont').stop().animate({ scrollTop: offsetTop }, 500);
	}

	$('.btnCtrlMove .btnMove.up').on('click', function (e) {
		e.preventDefault();

		if (currentIndex > 0) {
			currentIndex--;
			scrollToSection(currentIndex);
		}
	});

	$('.btnCtrlMove .btnMove.down').on('click', function (e) {
		e.preventDefault();

		if (currentIndex < $sections.length - 1) {
			currentIndex++;
			scrollToSection(currentIndex);
		}
	});

	// 현재 스크롤 위치 기준으로 인덱스 초기화 (선택사항)
	$('.chatCont').on('scroll', function () {
		$sections.each(function (i, el) {
			const top = $(el).offset().top - 10;
			if ($('.chatCont').scrollTop() >= top) {
				currentIndex = i;
			}
		});
	});
}

$(function(){
	accodianUI();
	scrollContentMove();

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
