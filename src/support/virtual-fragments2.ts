import { createSliderBuilder } from './slide-builder';


export const createVirtualFragments2 = (iframe: any) => {
  const fragmentListSetup = JSON.parse(iframe.dataset.virtualIframe);
  const fragmentList = createFragmentToggleList(fragmentListSetup, virtualNext)

  function virtualNext() {
    const contentWindow = iframe.contentWindow;
    contentWindow.postMessage("virtual:next", "*");
  }

  function virtualPrev() {
    const contentWindow = iframe.contentWindow;
    contentWindow.postMessage("virtual:prev", "*");
  }


  const prepare = (direction: number) => {
    const contentWindow = iframe.contentWindow;

    //make sure iframe is loaded before sending message
    function loaded() {
      iframe.removeEventListener('load', loaded);

      if (direction >= 0) {
        contentWindow.postMessage("virtual:prepare:forwards", "*");
      } else {
        contentWindow.postMessage("virtual:prepare:backwards", "*");
      }
    }

    iframe.addEventListener('load', loaded);
  }


  const slide = iframe.closest('section');
  const slideBuilder = createSliderBuilder(slide, virtualPrev)

  slideBuilder.shown(prepare)

  slideBuilder.init(fragmentList)

}

export function setupVirtualIframes() {
  const iframes = document.querySelectorAll('[data-virtual-iframe]');
  const elements = Array.from(iframes);
  elements.forEach(iframe => {
    createVirtualFragments2(iframe);
  })
}

const NOOP = () => {
};

function createFragmentToggleList(list: number[], callback: Function) {
  return list.map((value: any) => {
    if (value > 0) {
      return callback
    } else {
      return NOOP
    }
  })
}


