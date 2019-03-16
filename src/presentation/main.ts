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
  dashDemo();
  completeConstellation();
}

function lineFragments() {
  const prismElements = document.querySelectorAll('[data-line-fragments]');
  const elements = Array.from(prismElements);
  elements.forEach(element => {
    const highlighter = new PrismLineHighlighter(element as HTMLPreElement);
    // highlighter.setMode(PRISM_LINE_HIGHLIGHTER_MODE_ABSOLUTE);
  })

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

  // Reveal.addEventListener( 'slidechanged', function( event ) {

  //   if(event.currentSlide === slideSection) {
  //     play();
  //   }
  // });

  const slideBuilder = new SlideBuilder(slideSection);

  // const fragmentList = createFragments({
  //   repeat: 4,
  //   callback: function() {
  //     const iframeWindow = getBackgroundIframe().contentWindow;
  //     iframeWindow.postMessage("next-constellation", "*");
  //   }}
  // );

  // function previousCallback() {
  //   const iframeWindow = getBackgroundIframe().contentWindow;
  //   iframeWindow.postMessage("previous-constellation", "*");
  // }

  function play() {
    const iframeWindow = getBackgroundIframe().contentWindow;
      iframeWindow.postMessage("play", "*");
  }

  const fragmentList = [ play ]
  slideBuilder
  .fragments(fragmentList);

}


// reveals own full size background iframe
function getBackgroundIframe() {
  return document.querySelector('.slide-background-content iframe') as HTMLIFrameElement;
}
