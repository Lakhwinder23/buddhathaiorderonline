(function($){
	$(document).ready(function() {	

		// Scroll to Top
		jQuery('.scrolltotop').click(function(){
			jQuery('html').animate({'scrollTop' : '0px'}, 400);
			return false;
		});
		jQuery(window).scroll(function(){
			var upto = jQuery(window).scrollTop();
			if(upto > 500) {
				jQuery('.scrolltotop').fadeIn();
			} else {
				jQuery('.scrolltotop').fadeOut();
			}
		});	

				
		
		// count-plugin

		$(function ($) {
            var options = {
                minimum: 1,
                maximize: 10,
                onChange: valChanged,
                onMinimum: function(e) {
                    console.log('reached minimum: '+e)
                },
                onMaximize: function(e) {
                    console.log('reached maximize'+e)
                }
            }
            $('#handleCounter').handleCounter(options)
            $('#handleCounter2').handleCounter(options)
            $('#handleCounter9').handleCounter(options)
            $('#handleCounter4').handleCounter(options)
            $('#handleCounter5').handleCounter(options)
            $('#handleCounter6').handleCounter(options)
            $('#handleCounter7').handleCounter(options)
            $('#handleCounter10').handleCounter(options)
            $('#handleCounter11').handleCounter(options)
            $('#handleCounter12').handleCounter(options)
            $('#handleCounter13').handleCounter(options)
            $('#handleCounter14').handleCounter(options)
			$('#handleCounter3').handleCounter({maximize: 100})
        })
        function valChanged(d) {
//            console.log(d)
        }



        // menu

        var forEach=function(t,o,r){if("[object Object]"===Object.prototype.toString.call(t))for(var c in t)Object.prototype.hasOwnProperty.call(t,c)&&o.call(r,t[c],c,t);else for(var e=0,l=t.length;l>e;e++)o.call(r,t[e],e,t)};
		    var hamburgers = document.querySelectorAll(".hamburger");
		    if (hamburgers.length > 0) {
		      forEach(hamburgers, function(hamburger) {
		        hamburger.addEventListener("click", function() {
		          this.classList.toggle("is-active");
		        }, false);
		      });
		    }
		
		
		
		
		
		
	});
})(jQuery);