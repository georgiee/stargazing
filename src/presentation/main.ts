import { virtualIframeFragments } from './virtual-fragments';
import { completeConstellation } from './support/complete-constellation';
import { thankYou } from './support/thank-you';
import { lineFragments } from './support/line-fragments';

document.addEventListener('DOMContentLoaded', run);

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


