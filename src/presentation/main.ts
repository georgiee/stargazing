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
  const prismElements: HTMLElement[] = document.querySelectorAll('[data-line-fragments]') as any;
  const elements = Array.from(prismElements);

  elements.forEach(element => {
    const showFirst = element.dataset.lineFragmentsStart === 'first';
    const highlighter = new PrismLineHighlighter(element as HTMLPreElement, showFirst);
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
    console.log('play all cosntellations')
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
  // many bugs in the past finding the correct one.
  // so I query this stack with a long selector and I return ALL findings
  const candidates = document.querySelectorAll('.backgrounds > .slide-background.present > .slide-background.present iframe');
  console.log('bg iframe candidates', candidates);
  const iframe = candidates[candidates.length - 1];
  // const iframe = document.querySelector('.slide-background:not(.stack).present iframe') as HTMLIFrameElement;;
  console.log('getBackgroundIframe', iframe);
  return iframe as HTMLIFrameElement;
}
