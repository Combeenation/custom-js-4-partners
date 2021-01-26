import { CfgrUtils, CmpUtils, CtrlUtils } from '@combeenation/custom-js-utils';
import * as Constants from './constants';
import { initBootstrapViewer } from './viewer';

Cbn.utils.Log.add('Custom JS loaded', Cbn.utils.Log.Type.Misc)();

CfgrUtils.onCfgrReady(async () => {
  const viewer = await initBootstrapViewer();

  window.CfgrJS = { CfgrUtils, CmpUtils, CtrlUtils, Constants, viewer };
});
