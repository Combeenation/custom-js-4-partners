import { CfgrUtils, CmpUtils, CtrlUtils } from "@combeenation/custom-js-utils";
import * as Constants from "./constants";
import HiveTypings from "./typings-generated-objs/index.hive.d-ti";

Cbn.utils.Log.add("Custom JS loaded", Cbn.utils.Log.Type.Misc)();

/**
 * Perform initialisation by registering some events after the configurator is ready (controls created, rendered,
 * product plan has already been loaded etc.)
 */
CfgrUtils.onCfgrReady(async () => {
  // Register record interfaces, see https://cjs.docs.combeenation.com/pages/Documentation/hive-itf-registration.html
  CmpUtils.registerInterfaceSuite(HiveTypings, { namePostfix: "Record" });

  // TODO: add your initialization code here

  // Make some functions accessible in the global window object (e.g. for debugging in the console etc.)
  // Can be extended as needed.
  window.CfgrJS = { CfgrUtils, CmpUtils, CtrlUtils, Constants };
});
