import { getBackgroundIframe } from './complete-constellation';

export function thankYou() {
  const slideSection = document.querySelector('#thankYou');
  Reveal.addEventListener('ready', m => {
    // ensure that the slide starts when directly loaded
    if (m.currentSlide === slideSection) {

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
