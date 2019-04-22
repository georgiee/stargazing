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
    // there can be multiple fragments being shown at the same time
    event.fragments.forEach(
      fragment => fragment.dispatchEvent(shown)
    );
  })

  Reveal.addEventListener( 'fragmenthidden', function( event ) {
    // there can be multiple fragments being shown at the same time
    event.fragments.forEach(
      fragment => fragment.dispatchEvent(hidden)
    );
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


  function SlideBuilder(element, offset = 0){
    this.slide_el = element;
    this.offset = offset;

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

  SlideBuilder.prototype.addFragment = function(index){
    var el = document.createElement('div');
    el.className = 'fragment';
    el.dataset.fragmentIndex = index;

    this.slide_el.appendChild(el);

    return el;
  }

  // shorthand
  SlideBuilder.prototype.fragments = function(callbacks, hiddenFn){
    var self = this;
    callbacks.forEach((fn, index) => {
      const fragment = self.addFragment(this.offset + index);

      // we can pass non-function values
      // to create noop fragments (to align with other fragments, requried by the firame virtual fragments format)
      // data-virtual-iframe="[1,1,0,1]" -> the 0 would generate a "NOOP" stirng instead of a real callback
      // in the virtual iframe builder
      if(typeof fn === 'function') {
        fragment.addEventListener('shown', fn);
      }

      if(hiddenFn) {
        if(typeof fn === 'function') {
        fragment.addEventListener('hidden', hiddenFn);
        }
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