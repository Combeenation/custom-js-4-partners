import { CtrlUtils } from '@combeenation/custom-js-utils';
import { Viewer } from '@combeenation/3d-viewer';
import { createSpec } from './spec';
import { initSceneManager } from './viewer-mgr';
import { CtrlNames } from './constants';

export async function initBootstrapViewer() {
  Cbn.utils.Log.add(`Bootstrapping viewer v${Viewer.version}`, Cbn.utils.Log.Type.Misc)();

  const $JQCanvas = $(CtrlUtils.getLabel(CtrlNames.JS_3dViewerLabel).el.dom).find('canvas');
  const canvas = /** @type {HTMLCanvasElement} */ (/** @type {unknown} */ ($JQCanvas.get(0)));
  const spec = createSpec();
  const viewer = new Viewer(canvas, spec);

  await viewer.bootstrap();

  // Ensure that viewer is properly resized e.g. when resizeing the window, it's visibility changed etc.
  Cbn.utils.ResizeEvents.addResizeListener(canvas.parentElement, () => viewer.resize());
  CtrlUtils.onCtrlVisibilityChanged(CtrlNames.JS_Babylon_LAY, () => viewer.resize());

  initSceneManager(viewer);

  return viewer;
}
