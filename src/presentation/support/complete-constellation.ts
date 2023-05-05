export function completeConstellation() {
  const slideSection = document.querySelector('#constellationComplete');
  const slideBuilder = new SlideBuilder(slideSection);


  function play() {
    const iframeWindow = getBackgroundIframe().contentWindow;
    console.log('play all cosntellations')
    iframeWindow.postMessage("play", "*");
  }

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

  const fragmentList = [play]
  slideBuilder
    .fragments(fragmentList);

}

// reveals own full size background iframe
export function getBackgroundIframe() {
  // many bugs in the past finding the correct one.
  // so I query this stack with a long selector and I return ALL findings
  const candidates = document.querySelectorAll('.backgrounds > .slide-background.present > .slide-background.present iframe');
  console.log('bg iframe candidates', candidates);
  const iframe = candidates[candidates.length - 1];
  // const iframe = document.querySelector('.slide-background:not(.stack).present iframe') as HTMLIFrameElement;;
  console.log('getBackgroundIframe', iframe);
  return iframe as HTMLIFrameElement;
}
