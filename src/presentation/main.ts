import { PrismLineHighlighter } from './prism-highlighter';
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
  completeConstellation();
  thankYou();
}

function lineFragments() {
  const prismElements = document.querySelectorAll('[data-line-fragments]');
  const elements = Array.from(prismElements);
  elements.forEach(element => {
    const highlighter = new PrismLineHighlighter(element as HTMLPreElement);
    // highlighter.setMode(PRISM_LINE_HIGHLIGHTER_MODE_ABSOLUTE);
  })

}

function thankYou() {
  const slideSection = document.querySelector('#thankYou');
  Reveal.addEventListener('ready', m => {
    // ensure that the slide starts when directly loaded
    if(m.currentSlide === slideSection) {

      const iframe = getBackgroundIframe();
      iframe.addEventListener('load', loaded);

      //make sure iframe is loaded before sending message
      function loaded() {
        iframe.removeEventListener('load', loaded);
        iframe.contentWindow.postMessage('slide:start', "*");
      }
    }
  })
}

function completeConstellation() {
  const slideSection = document.querySelector('#constellationComplete');
  const slideBuilder = new SlideBuilder(slideSection);


  function play() {
    const iframeWindow = getBackgroundIframe().contentWindow;
    console.log('play', iframeWindow.frameElement)
    iframeWindow.postMessage("play", "*");
  }

  Reveal.addEventListener('ready', m => {
    // ensure that the slide starts when directly loaded
    if(m.currentSlide === slideSection) {

      const iframe = getBackgroundIframe();
      iframe.addEventListener('load', loaded);

      //make sure iframe is loaded before sending message
      function loaded() {
        iframe.removeEventListener('load', loaded);
        iframe.contentWindow.postMessage('slide:start', "*");
      }
    }
  })

  const fragmentList = [ play ]
  slideBuilder
  .fragments(fragmentList);

}


// reveals own full size background iframe
function getBackgroundIframe() {
  return document.querySelector('.slide-background:not(.stack).present iframe') as HTMLIFrameElement;
}
