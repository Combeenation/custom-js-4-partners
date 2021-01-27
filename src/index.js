import { CfgrUtils, CmpUtils, CtrlUtils } from '@combeenation/custom-js-utils';
import * as Constants from './constants';
import { bootstrapViewer } from './viewer';

CfgrUtils.onCfgrReady(async () => {
  const viewer = await bootstrapViewer();
  window.CfgrJS = { CfgrUtils, CmpUtils, CtrlUtils, Constants, viewer };
});
