// prettier-ignore
/**
 * Convention:
 * Prefix names of ctrls which are "used" in custom JS with "JS_". Whilst this is not technically necessary, it helps
 * "keep track". E.g. when renaming a ctrl in the editor, the prefix immediately reminds that the renaming must also
 * be applied in custom JS.
 */
export class CtrlNames {
  static get JS_ExampleLabel() { return 'JS_ExampleLabel'; }
}

// prettier-ignore
/**
 * Always keep in sync with cmps "CustomJSCmps".
 * See description inside the cmps for details about why this is needed.
 *
 * Explicit naming like the "JS_" prefix like we use it for "CtrlNames" is not needed here, since it the "CustomJSCmps"
 * implicitly tells us which cmps are used in custom JS.
 */
export class CmpNames {
  static get ExampleComponent() { return 'ExampleComponent'; }
}
