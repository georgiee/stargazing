/**
 * This class helps you to highlight prismjs block step by step.
 * 1. The steps are created with SlideBuilder (which creates virtual fragments)
 * 2. This class reads [data-line-fragments] for a list of lines to highlight
 * ```
 * Example:
 * <pre data-line-fragments='["5", "7", "9-11", "9-13, 1, 2, 3"]'>
 *   ///
 * ```
 *
 * Important: It's being parsed as json so use an array and double quotes
 *
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
  private _showFirst = true;

  _slideBuilder: any;

  constructor(
    private _prismElement: HTMLPreElement,
    showFirst = false
  ) {
    this._showFirst = showFirst;

    const stepsDataInput = this._prismElement.dataset.lineFragments;
    const mode = this._prismElement.dataset.lineFragmentsMode;

    // is a fragment index applied to the pre?
    const fragmentIndex = parseInt(this._prismElement.dataset.fragmentIndex) || 0;
    // we need to let the virtual fragments appear after the block itself apperas
    const ownFragmentIndex = fragmentIndex + 1;

    if(mode) {
      if(mode === 'absolute') {
        this.setMode(PRISM_LINE_HIGHLIGHTER_MODE_ABSOLUTE);
      }else if(mode === 'build') {
        this.setMode(PRISM_LINE_HIGHLIGHTER_MODE_BUILD);
      }
    }

    this._steps = JSON.parse(stepsDataInput) as Array<string>
    this._slideBuilder = new SlideBuilder(this.slide, ownFragmentIndex);

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
      const steps = [null, ...this._steps];
      stepList = steps.slice(0, this._cursor + 1);

    } else if(this._mode === PRISM_LINE_HIGHLIGHTER_MODE_ABSOLUTE) {
      // in absolute build mode we only want to use the given
      // lines at the specified cursor position

      // ensure that the first step is empty so we can start with no highlight
      const prefix = this._showFirst ? [] : [null];
      const steps = [...prefix, ...this._steps];
      const item = steps[this._cursor];
      stepList = [item];
    }

    // get all lines, remove null values (our sentinel for no highlight)
    let currentLines = stepList.filter(value => !!value).join(',');
    // make sure that an empty array get represetend as an space otheriwse
    // prism won't remove our highlight
    if(currentLines.length ===0) {
      currentLines = " "
    }
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

    Reveal.syncFragments(this._prismElement.closest('section'));
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
