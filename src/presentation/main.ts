
document.addEventListener('DOMContentLoaded', run);


function lineFragments() {
  const prismElement = document.querySelector('[data-line-fragments]') as HTMLElement;
  const steps = prismElement.dataset.lineFragments;
  const stepsArray = JSON.parse(steps) as Array<string>
  const TOTAL_FRAGMENTS = stepsArray.length;

  const slide = prismElement.closest('section');
  const dashDemoFragments = new SlideBuilder(slide);

  let cursor = 0;

  function update() {
    let currentLines = getLinesAtCursor();
    prismElement.dataset.line = currentLines;
    console.log('prismElement', prismElement)

    // use highlightAllUnder, highlightElement is dysfunctional at the moment
    Prism.highlightAllUnder(slide)
  }

  function getLinesAtCursor() {
    const stepList = stepsArray.slice(0, cursor)
    return stepList.join(', ');
  }

  function next() {
    cursor++;
    update();
  }

  function previous() {
    cursor--;
    update();
  }

  const fragmentList = createFragments({
    repeat: stepsArray.length,
    callback: next
  });

  function setup({direction}) {
    if(direction >=0){
      cursor = 0;
    } else {
      cursor = TOTAL_FRAGMENTS;
    }

    update();
  }

  dashDemoFragments
  .shown(setup)
  .fragments(fragmentList, previous)
}

lineFragments();

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

function run() {
  generalFragmentListening();
  showConstellationResult();
  dashDemo();
  // completeConstellation();
}


// reveals own full size background iframe
function getBackgroundIframe() {
  return document.querySelector('.slide-background-content iframe') as HTMLIFrameElement;
}


function createFragments({repeat, callback}) {
  return Array(repeat).fill(0).map(_ => callback);
}
