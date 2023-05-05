import { PrismLineHighlighter } from '../prism-highlighter';

export function lineFragments() {
  const prismElements: HTMLElement[] = document.querySelectorAll('[data-line-fragments]') as any;
  const elements = Array.from(prismElements);

  elements.forEach(element => {
    const showFirst = element.dataset.lineFragmentsStart === 'first';
    const highlighter = new PrismLineHighlighter(element as HTMLPreElement, showFirst);
    // highlighter.setMode(PRISM_LINE_HIGHLIGHTER_MODE_ABSOLUTE);
  })

}
