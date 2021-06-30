import { CmpUtils, CtrlUtils } from '@combeenation/custom-js-utils';
import { CmpNames, InstanceNames, ViewerParameters, CameraPlacements, Animations, CtrlNames } from './constants';

/** @type {ViewerParamsRecord} */
let _prevViewerParams = undefined;

/**
 * Set up the Scene and register Listeners.
 *
 * @param {Viewer} viewer
 */
export function initSceneManager(viewer) {
  _setSceneSettings(viewer);

  CmpUtils.onCmpValueChanged(CmpNames.ViewerParams, () => _updateViewerParams(viewer), true);
  CmpUtils.onCmpValueChanged(CmpNames.Dimensions, () => _changeVariant(viewer), true);
  CmpUtils.onCmpValueChanged(CmpNames.UploadGraphics3dView, () => _updateGraphic(viewer), false);
  CmpUtils.onCmpValueChanged(CmpNames.UserImageVisible, () => _toggleGraphic(viewer), false);
}

/**
 * Update all viewer parameter based on the current values of cmp "ViewerParams"
 *
 * @param {Viewer} viewer
 */
function _updateViewerParams(viewer) {
  const newParams = /** @type {ViewerParamsRecord} */ (CmpUtils.getRecordCmpValue(CmpNames.ViewerParams));

  viewer.variantInstances.commitParameters(
    {
      [ViewerParameters.TopColor]: newParams.TopColor,
      [ViewerParameters.BottomColor]: newParams.BottomColor,
      [ViewerParameters.HeightIs60]: newParams.HeightIs60,
      [ViewerParameters.HeightIs100]: newParams.HeightIs100,
      [ViewerParameters.CapPosY]: newParams.CapPosY,
      [ViewerParameters.CapTypeIs1]: newParams.CapTypeIs1,
      [ViewerParameters.CapTypeIs2]: newParams.CapTypeIs2,
      [ViewerParameters.CapTypeIs3]: newParams.CapTypeIs3,
      [ViewerParameters.GraphicPosZ]: newParams.GraphicPosZ,
      [ViewerParameters.GraphicPosY]: newParams.GraphicPosY,
    },
    false
  );

  if (_prevViewerParams?.HeightIs100 !== newParams.HeightIs100) {
    // Height has changed -> Update camera...
    const isFirstCall = undefined === _prevViewerParams;
    _setCameraPos(viewer, !isFirstCall);
  }
  _prevViewerParams = newParams;
}

/**
 * @param {Viewer} viewer
 */
async function _changeVariant(viewer) {
  const dimension = /** @type {DimensionsRecord} */ (CmpUtils.getRecordCmpValue(CmpNames.Dimensions));
  const variantInstanceName = 1 === dimension.Key ? InstanceNames.Bin_20_30_Instance : InstanceNames.Bin_30_40_Instance;
  await viewer.variantInstances.show(variantInstanceName, true);
  _toggleGraphic(viewer);
}

/**
 * Adjust default viewer scene settings
 *
 * @param {Viewer} viewer
 */
function _setSceneSettings(viewer) {
  const camera = /** @type {ArcRotateCamera} */ (viewer.scene.cameras[0]);
  camera.wheelPrecision = 100;
  camera.panningSensibility = 2400;
  camera.minZ = 0;
  camera.panningDistanceLimit = 0.6;
  camera.upperBetaLimit = 1.7;
}

/**
 * Move camera to default position for currently selected bin height
 *
 * @param {Viewer}  viewer
 * @param {boolean} [animate] True to animate the camera movement. Default = false.
 */
function _setCameraPos(viewer, animate) {
  const isHeight100 = CmpUtils.getRecordCmpKeyValue(CmpNames.Bin3DHeight) === '100';
  const camPlacementName = isHeight100 ? CameraPlacements.Height100 : CameraPlacements.Height60;
  viewer.moveActiveCameraTo(camPlacementName, Animations.DefaultCameraAnimation);
}

/**
 * @param {Viewer} viewer
 */
 async function _updateGraphic(viewer) {
  viewer.variantInstances.show(InstanceNames.Bin_Graphics_Instance, false);

  const svgSrc = CtrlUtils.getGraphicViewSvgSrc(CtrlNames.JS_UploadGraphicView);
  const graphicsInstance = await viewer.variantInstances.get(InstanceNames.Bin_Graphics_Instance);
  const graphicsPanelEl = await graphicsInstance.variant.getElement('GraphicPanel');
  graphicsPanelEl.drawPaintableFromSvg('LogoPaintable', svgSrc);
}

/**
 * @param {Viewer} viewer
 */
async function _toggleGraphic(viewer) {
  const show = CmpUtils.getLogicCmpValue(CmpNames.UserImageVisible);
  const graphicsVariant = (await viewer.variantInstances.get(InstanceNames.Bin_Graphics_Instance)).variant;

  if (show) {
    graphicsVariant.show();
  } else {
    graphicsVariant.hide();
  }
}
