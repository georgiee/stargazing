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
export declare const PRISM_LINE_HIGHLIGHTER_MODE_BUILD = 1;
export declare const PRISM_LINE_HIGHLIGHTER_MODE_ABSOLUTE = 2;
export declare class PrismLineHighlighter {
    private _prismElement;
    private _steps;
    private _cursor;
    private _mode;
    private _showFirst;
    _slideBuilder: any;
    constructor(_prismElement: HTMLPreElement, showFirst?: boolean);
    setMode(value: any): void;
    init(): void;
    getCurrentStepValue(): string;
    update(): void;
    prepare(direction: any): void;
    next(): void;
    previous(): void;
    readonly totalStepCount: number;
    readonly slide: HTMLElement;
}
