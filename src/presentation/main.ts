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
  // dashDemo();
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

function completeConstellation() {
  const slideSection = document.querySelector('#constellationComplete');
  const slideBuilder = new SlideBuilder(slideSection);

  function play() {
    console.log('play')
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
