import { Color4 } from '@combeenation/3d-viewer';
import { CmpUtils } from '@combeenation/custom-js-utils';
import { CmpNames, InstanceNames, ViewerParameters, CameraPlacements } from './constants';

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
}

/**
 * Update all viewer parameter based on the current values of cmp "ViewerParams"
 *
 * @param {Viewer} viewer
 */
function _updateViewerParams(viewer) {
  const newParams = /** @type{ViewerParamsRecord} */ (CmpUtils.getRecordCmpValue(CmpNames.ViewerParams));

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
function _changeVariant(viewer) {
  const dimension = /** @type{DimensionsRecord} */ (CmpUtils.getRecordCmpValue(CmpNames.Dimensions));
  const variantInstanceName = 1 === dimension.Key ? InstanceNames.Bin_20_30_Instance : InstanceNames.Bin_30_40_Instance;
  viewer.variantInstances.show(variantInstanceName, true);
}

/**
 * Adjust default viewer scene settings
 *
 * @param {Viewer} viewer
 */
function _setSceneSettings(viewer) {
  viewer.scene.clearColor = new Color4(0, 0, 0, 0);

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
  const animation = animate ? { ease: 'Power3.easeInOut', duration: 0.8 } : undefined;
  viewer.moveActiveCameraTo(camPlacementName, animation);
}
