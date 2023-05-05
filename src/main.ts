import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown';
import RevealNotes from 'reveal.js/plugin/notes/notes'

import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/night.css'

import "prismjs"
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'
import 'prismjs/plugins/line-highlight/prism-line-highlight.js'
import 'prismjs/plugins/file-highlight/prism-file-highlight.js'
import "./custom-prism-theme.scss"

import "./styles.scss"
import { setupVirtualIframes } from './support/virtual-fragments2';
import { PrismLineHighlighter } from './support/prism-highlighter';


Reveal.initialize({
  transition: 'none',
  history: true,
  progress: false,
  controlsTutorial: false,
  controls: false,
  keyboard: {
    39: 'next',
    37: 'prev'
  } as any,
  plugins: [Markdown, RevealNotes]
}).then(() => {
  setupVirtualIframes()
  lineFragments()
})


function lineFragments() {
  const prismElements: HTMLElement[] = document.querySelectorAll('[data-line-fragments]') as any;
  const elements = Array.from(prismElements);

  elements.forEach(element => {
    const showFirst = element.dataset.lineFragmentsStart === 'first';
    const highlighter = new PrismLineHighlighter(element as HTMLPreElement, showFirst);
    highlighter.init();
  })

}
