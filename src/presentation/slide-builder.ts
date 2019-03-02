// const shown = new CustomEvent("shown", {});
// const hidden = new CustomEvent("hidden", {});

// export class SlideBuilder {
//   private currentSlide = null;

//   constructor(
//     private _slide: HTMLElement
//   ) {
//     this.init();
//   }

//   init() {


//     Reveal.addEventListener( 'fragmentshown', event => {
//       event.fragment.dispatchEvent(shown);
//     })

//     Reveal.addEventListener( 'fragmenthidden', event => {
//       event.fragment.dispatchEvent(hidden);
//     });

//     Reveal.addEventListener( 'slidechanged', event => {
//       if(event.previousSlide) event.previousSlide.dispatchEvent(hidden);
//       if(event.currentSlide)  event.currentSlide.dispatchEvent(shown);

//       this.currentSlide = event.currentSlide;
//     });

//     Reveal.addEventListener( 'ready', function( event ) {
//       this.currentSlide = event.currentSlide;
//     });
//   }

//   addFragments(...fragments) {

//   }

//   addFragment({show, hide = null}) {
//     const fragment = this._createFragment();
//     fragment.addEventListener('shown', show);

//     if(hide) {
//       fragment.addEventListener('hidden', hide);
//     }
//   }

//   _createFragment(){
//     var el = document.createElement('div');
//     el.className = 'fragment';
//     this._slide.appendChild(el);

//     return el;
//   }
// }


// // ;(function(global, Reveal){


// //   function SlideBuilder(element){
// //     this.slide_el = element;

// //     // if this is loaded dynamically, reveal might have loaded
// //     // check to see if we're displayed
// //     if(element === currentSlide) {
// //       setTimeout(() =>{
// //         element.dispatchEvent(shown)
// //       }, 10)
// //     }
// //   }

// //   // forward event listeners to slide element
// //   SlideBuilder.prototype.addEventListener = function( type, listener, useCapture ) {
// //     if( 'addEventListener' in window ) {
// //       this.slide_el.addEventListener( type, listener, useCapture );
// //     }

// //     return this;
// //   }


// //   // shorthand
// //   SlideBuilder.prototype.fragments = function(callbacks, hiddenFn){
// //     var self = this;
// //     callbacks.forEach(function(fn){
// //       const fragment = self.addFragment();
// //       fragment.addEventListener('shown', fn);

// //       if(hiddenFn) {
// //         fragment.addEventListener('hidden', hiddenFn);
// //       }

// //     })

// //     return this
// //   }


// //   SlideBuilder.prototype.shown = function(fn) {
// //     this.addEventListener('shown', fn)
// //     return this
// //   }

// //   SlideBuilder.prototype.hidden = function(fn) {
// //     this.addEventListener('hidden', fn)
// //     return this
// //   }


// //   global.SlideBuilder = SlideBuilder;

// // })(this, Reveal);