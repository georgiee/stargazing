import Reveal from 'reveal.js';

export const DIRECTION_FORWARDS = 1;
export const DIRECTION_BACKWARDS = -1;
export const DIRECTION_INITIAL = 0;

export function getDirection(currentSlide: any, previousSlide: any) {
  if (previousSlide) {
    if (previousSlide.nextElementSibling === currentSlide) {
      return DIRECTION_FORWARDS;
    } else if (previousSlide.previousElementSibling === currentSlide) {
      return DIRECTION_BACKWARDS;
    }
  }

  return DIRECTION_INITIAL;
}


const EVENT_SHOWN = new CustomEvent("fragment-shown", {});
const EVENT_HIDDEN = new CustomEvent("fragment-hidden", {});

const EVENT_SLIDE_SHOWN = new CustomEvent("slide-shown", {});
const EVENT_SLIDE_HIDDEN = new CustomEvent("slide-hidden", {});


let __registered = false
const context = {} as any;


const registerListeners = () => {
  Reveal.addEventListener('fragmentshown', function (event: any) {
    event.fragments.forEach((fragment: any) => fragment.dispatchEvent(EVENT_SHOWN));
  })

  Reveal.addEventListener('fragmenthidden', function (event: any) {
    event.fragments.forEach((fragment: any) => fragment.dispatchEvent(EVENT_HIDDEN));
  })

  Reveal.addEventListener('slidechanged', function (event: any) {
    if (event.previousSlide) {
      event.previousSlide.dispatchEvent(EVENT_SLIDE_HIDDEN);
    }

    if (event.currentSlide) {
      const direction = getDirection(event.currentSlide, event.previousSlide);
      event.currentSlide.dispatchEvent(new CustomEvent(EVENT_SLIDE_SHOWN.type, {detail: {direction}}));
    }

    context.currentSlide = event.currentSlide;
  });

}

export const createSliderBuilder = (slide: HTMLElement, hiddenCallbackFn?: Function, offset = 0) => {
  if (!__registered) {
    __registered = true
    registerListeners()
  }

  const addFragment = (index: number) => {
    const el = document.createElement('div');
    el.className = 'fragment';
    el.dataset.fragmentIndex = String(index);

    slide.appendChild(el);

    return el;
  }

  const init = (fragments: any) => {
    context.currentSlide = Reveal.getCurrentSlide()

    fragments.forEach((callbackFn: Function, index: number) => {
      const fragment = addFragment(offset + index);
      fragment.addEventListener(EVENT_SHOWN.type, () => {
        console.log('call')
        callbackFn && callbackFn()
      });
      hiddenCallbackFn && fragment.addEventListener(EVENT_HIDDEN.type, () => hiddenCallbackFn && hiddenCallbackFn());
    })


    if (slide === context.currentSlide) {
      slide.dispatchEvent(EVENT_SLIDE_SHOWN)
    }
  }


  const shown = (callback: Function) => {
    slide.addEventListener(EVENT_SLIDE_SHOWN.type, (event: any) => {
      callback(event?.detail?.direction || DIRECTION_INITIAL)
    })
  }


  const slideHidden = () => {

  }

  slide.addEventListener(EVENT_SLIDE_HIDDEN.type, slideHidden)

  return {
    addFragment,
    init,
    shown: shown
  }
}
