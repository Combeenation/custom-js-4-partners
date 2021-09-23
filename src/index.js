import { CfgrUtils, CmpUtils, CtrlUtils } from '@combeenation/custom-js-utils';
import * as Constants from './constants';
import { bootstrapViewer } from './viewer';
import HiveTypings from './typings-generated-objs/index.hive.d-ti';

CfgrUtils.onCfgrReady(async () => {
  CmpUtils.registerInterfaceSuite(HiveTypings, { namePostfix: 'Record' });
  const viewer = await bootstrapViewer();
  window.CfgrJS = { CfgrUtils, CmpUtils, CtrlUtils, Constants, viewer };
});
