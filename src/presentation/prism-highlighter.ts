/**
 * This class helps you to highlight prismjs block step by step.
 * 1. The steps are created with SlideBuilder (which creates virtual fragments)
 * 2. This class reads [data-line-fragments] for a list of lines to highlight
 * ```
 * Example:
 * <pre data-line-fragments='["5", "7", "9-11", "9-13, 1, 2, 3"]'>
 *   ///
 * ```
 * 3. In normal mode (BUILD) the lines will be accumulated, the fina result: show all lines
 * 4. You can enable absolute mode (ABSOLUTE) which will show each entry individually.
 * e.g. first "5", then "7", then "9-11", then lines "9-13, 1, 2, 3". This gives you full control over
 * the displayed highlighted code.
 */

export const PRISM_LINE_HIGHLIGHTER_MODE_BUILD = 1;
export const PRISM_LINE_HIGHLIGHTER_MODE_ABSOLUTE = 2;

export class PrismLineHighlighter {
  private _steps: string[] = [];
  private _cursor = 0;
  private _mode = PRISM_LINE_HIGHLIGHTER_MODE_BUILD;
  _slideBuilder: any;

  constructor(
    private _prismElement: HTMLPreElement
  ) {
    const stepsDataInput = this._prismElement.dataset.lineFragments;
    this._steps = JSON.parse(stepsDataInput) as Array<string>
    this._slideBuilder = new SlideBuilder(this.slide);

    this.init();
  }
  // choose how to reveal your lines. defaults to PRISM_LINE_HIGHLIGHTER_MODE_BUILD
  setMode(value) {
    this._mode = value;
  }

  init() {
    const fragmentList = createFragments({
      repeat: this.totalStepCount,
      callback: () => this.next()
    });

    this._slideBuilder
    .shown(({direction}) => this.prepare(direction))
    .fragments(fragmentList, () => this.previous())
  }

  getCurrentStepValue() {
    let stepList = [];

    if(this._mode === PRISM_LINE_HIGHLIGHTER_MODE_BUILD) {
      // just extract the window marked with 0 -> cursor
      stepList = this._steps.slice(0, this._cursor);

    } else if(this._mode === PRISM_LINE_HIGHLIGHTER_MODE_ABSOLUTE) {
      // in absolute build mode we only want to use the given
      // lines at the specified cursor position

      // ensure that the first step is empty so we can start with no highlight
      const steps = [null, ...this._steps];
      const item = steps[this._cursor];
      stepList = [item];
    }

    // get all lines, remove null values (our sentinel for no highlight)
    let currentLines = stepList.filter(value => !!value).join(',');
    return currentLines;
  }

  update() {
    this._prismElement.dataset.line = this.getCurrentStepValue()
    Prism.highlightAllUnder(this.slide);
  }

  prepare(direction) {
    if(direction >=0){
      this._cursor = 0;
    } else {
      this._cursor = this.totalStepCount;
    }
    this.update();
  }

  next() {
    this._cursor++;
    this.update();
  }

  previous() {
    this._cursor--;
    this.update();
  }

  get totalStepCount () {
    return this._steps.length;
  }

  get slide() {
    return this._prismElement.closest('section');
  }
}

function createFragments({repeat, callback}) {
  return Array(repeat).fill(0).map(_ => callback);
}
