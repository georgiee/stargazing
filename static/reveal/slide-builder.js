const DIRECTION_FORWARDS = 1;
const DIRECTION_BACKWARDS = -1;
const DIRECTION_INITIAL = 0;

function getDirection(currentSlide, previousSlide) {
  if(!currentSlide) {
    return null; // undefined state
  }

  if(previousSlide) {
    if(previousSlide.nextElementSibling === currentSlide) {
      return DIRECTION_FORWARDS;
    }else if(previousSlide.previousElementSibling === currentSlide) {
      return DIRECTION_BACKWARDS;
    }
  } else {
    return DIRECTION_INITIAL;
  }
}

;(function(global, Reveal){

  // pass shown/hidden events down to the fragments and slides

  var shown = new CustomEvent("shown", {}),
      hidden = new CustomEvent("hidden", {}),
      currentSlide;

  Reveal.addEventListener( 'fragmentshown', function( event ) {
    event.fragment.dispatchEvent(shown);
  })

  Reveal.addEventListener( 'fragmenthidden', function( event ) {
    event.fragment.dispatchEvent(hidden);
  });

  Reveal.addEventListener( 'slidechanged', function( event ) {
    if(event.previousSlide) event.previousSlide.dispatchEvent(hidden);
    if(event.currentSlide) {
      const direction = getDirection(event.currentSlide, event.previousSlide);
      event.currentSlide.dispatchEvent(new CustomEvent("shown", {detail: {direction}}));
    }

    currentSlide = event.currentSlide;
  });

  Reveal.addEventListener( 'ready', function( event ) {
    currentSlide = event.currentSlide;
  });


  function SlideBuilder(element){
    this.slide_el = element;

    // if this is loaded dynamically, reveal might have loaded
    // check to see if we're displayed
    if(element === currentSlide) {
      setTimeout(() =>{
        element.dispatchEvent(shown)
      }, 10)
    }
  }

  // forward event listeners to slide element
  SlideBuilder.prototype.addEventListener = function( type, listener, useCapture ) {
    if( 'addEventListener' in window ) {
      this.slide_el.addEventListener( type, listener, useCapture );
    }

    return this;
  }

  SlideBuilder.prototype.addFragment = function(text){

    var el = document.createElement('div');
    el.className = 'fragment';
    el.innerText = text || '';

    this.slide_el.appendChild(el);

    return el;
  }

  // shorthand
  SlideBuilder.prototype.fragments = function(callbacks, hiddenFn){
    var self = this;
    callbacks.forEach(function(fn){
      const fragment = self.addFragment();
      fragment.addEventListener('shown', fn);

      if(hiddenFn) {
        fragment.addEventListener('hidden', hiddenFn);
      }

    })

    return this
  }


  SlideBuilder.prototype.shown = function(fn) {
    this.addEventListener('shown', ({detail}) => {
      fn(detail)
    })
    return this
  }

  SlideBuilder.prototype.hidden = function(fn) {
    this.addEventListener('hidden', fn)
    return this
  }


  global.SlideBuilder = SlideBuilder;

})(this, Reveal);