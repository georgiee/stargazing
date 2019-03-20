const NOOP = 'noop';

export function virtualIframeFragments(iframe) {

  const fragmentListSetup = JSON.parse(iframe.dataset.virtualIframe);

  let fragmentList = [];

  if(typeof fragmentListSetup === 'object') {
    fragmentList = createFragmentToggleList({
      list: fragmentListSetup, callback: next
    });
  }else {
    fragmentList = createFragments({repeat: fragmentListSetup, callback: next});
  }

  // always offset by it's own fragment offset + 1 so the revealing
  // won't start before the iframe itself is visible
  const fragmentIndex = 1 + (parseInt(iframe.dataset.fragmentIndex) || 0);
  const fragmentOffset = fragmentIndex + (parseInt(iframe.dataset.virtualIframeOffset) || 0);

  const slide = iframe.closest('section');

  function next() {
    const contentWindow = iframe.contentWindow;
    contentWindow.postMessage("virtual:next", "*");
  }

  function prev(event) {
    const contentWindow = iframe.contentWindow;
    contentWindow.postMessage("virtual:prev", "*");
  }

  function prepare(direction) {
    const contentWindow = iframe.contentWindow;
    let message;

    if(direction >=0){
      message = "virtual:prepare:forwards";
    }else {
      message = "virtual:prepare:backwards";
    }

    //make sure iframe is loaded before sending message
    function loaded() {
      iframe.removeEventListener('load', loaded);
      contentWindow.postMessage(message, "*");
    }

    iframe.addEventListener('load', loaded);
  }


  const slideBuilder = new SlideBuilder(slide, fragmentOffset);
  slideBuilder
  .shown(({direction}) => prepare(direction))
  .fragments(fragmentList, prev);

}


function createFragments({repeat, callback}) {
  return Array(repeat).fill(0).map(_ => callback);
}

function createFragmentToggleList({list, callback}) {
  return list.map(value => {
    if(value > 0) {
      return callback
    }else{
      return NOOP
    }
  })
}