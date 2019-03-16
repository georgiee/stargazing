import { PrismLineHighlighter, PRISM_LINE_HIGHLIGHTER_MODE_ABSOLUTE } from './prism-highlighter';
import { virtualIframeFragments } from './virtual-fragments';

document.addEventListener('DOMContentLoaded', run);



function createFragments({repeat, callback}) {
  return Array(repeat).fill(0).map(_ => callback);
}


function setpVirtualIframes() {
  const iframes = document.querySelectorAll('[data-virtual-iframe]');
  const elements = Array.from(iframes);

  elements.forEach(iframe => {
    virtualIframeFragments(iframe);
  })
}

function run() {
  setpVirtualIframes();
  lineFragments();
  generalFragmentListening();
  showConstellationResult();
  dashDemo();
  // completeConstellation();
}

function lineFragments() {
  const prismElements = document.querySelectorAll('[data-line-fragments]');
  const elements = Array.from(prismElements);
  elements.forEach(element => {
    const highlighter = new PrismLineHighlighter(element as HTMLPreElement);
    // highlighter.setMode(PRISM_LINE_HIGHLIGHTER_MODE_ABSOLUTE);
  })

}

function showConstellationResult() {
  const slideSection = document.querySelector('#iframeConstellation09');
  const dashDemoFragments = new SlideBuilder(slideSection);

  function play() {
    const iframe = slideSection as HTMLIFrameElement;
    const content = iframe.contentWindow;;
    content.postMessage("play", "*");
  }

  dashDemoFragments.fragments([play]);
}

function dashDemo() {
  const slideSection = document.querySelector('#dashdemo');
  const dashDemoFragments = new SlideBuilder(slideSection);

  const fragmentList = createFragments({
    repeat: 6,
    callback: () => nextFrame()
  });

  dashDemoFragments.fragments(fragmentList, previousCallback);

  function previousCallback() {
    previousFrame();
  }

  function nextFrame() {
    const iframe = slideSection as HTMLIFrameElement;
    const content = iframe.contentWindow;;
    content.postMessage("next-topic", "*");
  }

  function previousFrame() {
    const iframe = slideSection as HTMLIFrameElement;
    const content = iframe.contentWindow;;
    content.postMessage("previous-topic", "*");
  }
}

function completeConstellation() {
  const slideSection = document.querySelector('#constellationComplete');
  const slideBuilder = new SlideBuilder(slideSection);

  const fragmentList = createFragments({
    repeat: 4,
    callback: function() {
      const iframeWindow = getBackgroundIframe().contentWindow;
      iframeWindow.postMessage("next-constellation", "*");
    }}
  );

  function previousCallback() {
    const iframeWindow = getBackgroundIframe().contentWindow;
    iframeWindow.postMessage("previous-constellation", "*");
  }

  slideBuilder
  .fragments(fragmentList, previousCallback);

}

function generalFragmentListening() {
  const SHOW_HOTPINK = 'show-hotpink-correct-length';
  const SHOW_DELAYS = 'show-line-aniamtion-delays';

  function getIframeWindow(selector) {
    const iframe = document.querySelector(selector) as HTMLIFrameElement;
    return iframe.contentWindow;
  }

  Reveal.addEventListener('fragmenthidden', event => {
    const iframe07Window = getIframeWindow('#iframeConstellation07');
    const iframe08Window = getIframeWindow('#iframeConstellation08');

    const SHOW_HOTPINK = 'show-hotpink-correct-length';
    const data = event.fragment.dataset.fragmentData;
    if(!data) {
      return;
    }

    if(data === SHOW_HOTPINK) {
      iframe07Window.postMessage("remove-length", "*");
    }

    if(data === SHOW_DELAYS) {
      iframe08Window.postMessage("remove-delays", "*");
    }
  });

  Reveal.addEventListener('fragmentshown', event => {
    const iframe07Window = getIframeWindow('#iframeConstellation07');
    const iframe08Window = getIframeWindow('#iframeConstellation08');

    const data = event.fragment.dataset.fragmentData;
    if(!data) {
      return;
    }

    if(data === SHOW_HOTPINK) {
      iframe07Window.postMessage("update-length", "*");
    }

    if(data === SHOW_DELAYS) {
      iframe08Window.postMessage("use-delays", "*");
    }
  });
}



// reveals own full size background iframe
function getBackgroundIframe() {
  return document.querySelector('.slide-background-content iframe') as HTMLIFrameElement;
}
