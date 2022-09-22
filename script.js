function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  window.addEventListener("scroll", reveal);

  

  (function(){
    init();

    function init(){
        setStickyContainersSize();
        bindEvents();
    }

    function bindEvents(){
      trackScroll();
    }

    function setStickyContainersSize(){
        document.querySelectorAll('.sticky-container').forEach(function(container){
            const stikyContainerHeight = container.querySelector('main').scrollWidth;
            container.setAttribute('style', 'height: ' + stikyContainerHeight + 'px');
        });
    }

    function isElementInViewport (el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom >= document.documentElement.clientHeight;
    }

    function trackScroll(){
        const containerInViewPort = Array.from(document.querySelectorAll('.sticky-container')).filter(function(container){
            const isVisible = isElementInViewport(container);
            if(!isVisible){
              var position;
              var containerWidth = container.offsetTop + container.offsetWidth;
              if(containerWidth < window.pageYOffset){
                container.querySelector('main').scrollLeft = containerWidth;
              }else if(container.offsetTop < window.pageYOffset){
  
                container.querySelector('main').scrollLeft = 0;
              }
            }
            return isVisible;
        })[0];

        if(!containerInViewPort){
            requestAnimationFrame(trackScroll);
            return;
        }

        var isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
        var isPlaceHolderBelowBottom = containerInViewPort.offsetTop + containerInViewPort.offsetHeight > document.documentElement.scrollTop;
        let g_canScrollHorizontally = isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

        if(g_canScrollHorizontally){
            var pxToScroll = window.pageYOffset - containerInViewPort.offsetTop;
            containerInViewPort.querySelector('main').scrollLeft = pxToScroll;
        }
      
      requestAnimationFrame(trackScroll);
    }
})();

