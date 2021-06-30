// prettier-ignore
/**
 * Convention:
 * Prefix names of ctrls which are "used" in custom JS with "JS_". Whilst this is not technically necessary, it helps
 * "keep track". E.g. when renaming a ctrl in the editor, the prefix immediately reminds that the renaming must also
 * be applied in custom JS.
 */
export class CtrlNames {
  static get JS_3dViewerLabel() { return 'JS_3dViewerLabel'; }
  static get JS_Babylon_LAY()   { return 'JS_Babylon_LAY'; }
  static get JS_UploadGraphicView() { return 'JS_UploadGraphicView'; }
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
  static get ModelGlbUrl()  { return 'ModelGlbUrl'; }
  static get ModelEnvUrl()  { return 'ModelEnvUrl'; }
  static get Dimensions()   { return 'Dimensions'; }
  static get Bin3DHeight()  { return 'Bin3DHeight'; }
  static get ViewerParams() { return 'ViewerParams'; }
  static get UploadGraphics3dView()   { return 'UploadGraphics3dView'; }
  static get UserImageVisible()       { return 'UserImageVisible'; }
}

// prettier-ignore
export class InstanceNames {
  static get Bin_20_30_Instance() { return 'Bin_20_30_Instance'; }
  static get Bin_30_40_Instance() { return 'Bin_30_40_Instance'}
  static get Bin_Graphics_Instance()  { return 'Bin_Graphics_Instance'}
}

// prettier-ignore
export class VariantNames {
  static get AllBins()   { return 'AllBins'; }
  static get Bin_20_30() { return 'Bin_20_30'; }
  static get Bin_30_40() { return 'Bin_30_40'; }
  static get Bin_Graphics()  { return 'Bin_Graphics'; }
}

// prettier-ignore
export class ViewerParameters {
  static get TopColor()    { return 'TopColor'; }
  static get BottomColor() { return 'BottomColor'; }
  static get HeightIs60()  { return 'HeightIs60'; }
  static get HeightIs100() { return 'HeightIs100'; }
  static get CapPosY()     { return 'CapPosY'; }
  static get CapTypeIs1()  { return 'CapTypeIs1'; }
  static get CapTypeIs2()  { return 'CapTypeIs2'; }
  static get CapTypeIs3()  { return 'CapTypeIs3'; }
  static get GraphicPosZ()  { return 'GraphicPosZ'; }
  static get GraphicPosY()  { return 'GraphicPosY'; }
}

// prettier-ignore
export class CameraPlacements {
  static get Height60()  { return 'Height60'; }
  static get Height100() { return 'Height100'; }
}

// prettier-ignore
export class Animations {
  static get DefaultCameraAnimation() { return 'DefaultCameraAnimation'; }
}
