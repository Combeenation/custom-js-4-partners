import { CmpUtils } from "@combeenation/custom-js-utils";
import { CmpNames, InstanceNames, VariantNames, ViewerParameters, CameraPlacements, Animations } from "./constants";

/**
 * @return {StructureJson}
 */
export function createSpec() {
  const modelUrl = CmpUtils.getTextCmpValue(CmpNames.ModelGlbUrl);
  const modelEnv = CmpUtils.getTextCmpValue(CmpNames.ModelEnvUrl);

  return {
    scene: {
      parameters: {
        environment: modelEnv,
      },
      engine: {
        antialiasing: true,
        options: {
          preserveDrawingBuffer: true,
          stencil: true,
        },
      },
      scene: {
        globals: {},
        lights: {},
        cameras: {},
      },
      placements: {
        [CameraPlacements.Height60]: {
          position: "(-0.6073864925275645, 0.4765578799104585, -1.284793058907506)",
          target: "(-0.030564361711816836, 0.26223482532257786, -0.1034106283975893)",
        },
        [CameraPlacements.Height100]: {
          position: "(-0.5034608339970097, 0.9162828478182772, -1.4399870356436006)",
          target: "(0.11190323895696523, 0.47328146232722085, -0.016705972101674342)",
        },
      },
      animations: {
        [Animations.DefaultCameraAnimation]: {
          ease: 'Power3.easeInOut',
          duration: 0.8,
        },
      },
    },
    setup: {
      instances: [
        {
          name: InstanceNames.Bin_20_30_Instance,
          variant: `${VariantNames.AllBins}.${VariantNames.Bin_20_30}`,
          lazy: false,
          parameters: {
            visible: true,
            scaling: "( 1, 1, -1 )",
            position: "( 0, 0, 0 )",
            rotation: "( 0, 0, 0 )",
          },
        },
        {
          name: InstanceNames.Bin_30_40_Instance,
          variant: `${VariantNames.AllBins}.${VariantNames.Bin_30_40}`,
          lazy: false,
          parameters: {
            visible: false,
            scaling: "( 1, 1, -1 )",
            position: "( 0, 0, 0 )",
            rotation: "( 0, 0, 0 )",
          },
        },
        {
          name: InstanceNames.Bin_Graphics_Instance,
          variant: `${VariantNames.AllBins}.${VariantNames.Bin_Graphics}`,
          lazy: false,
          parameters: {
            visible: true,
            scaling: '( 1, 1, -1 )',
            position: '( 0, 0, 0 )',
            rotation: '( 0, 0, 0 )',
          },
        },
      ],
    },
    parameterDeclaration: {
      [ViewerParameters.TopColor]: { type: "color" },
      [ViewerParameters.BottomColor]: { type: "color" },
      [ViewerParameters.HeightIs60]: { type: "boolean" },
      [ViewerParameters.HeightIs100]: { type: "boolean" },
      [ViewerParameters.CapPosY]: { type: "number" },
      [ViewerParameters.CapTypeIs1]: { type: "boolean" },
      [ViewerParameters.CapTypeIs2]: { type: "boolean" },
      [ViewerParameters.CapTypeIs3]: { type: "boolean" },
      [ViewerParameters.GraphicPosZ]: { type: 'number' },
      [ViewerParameters.GraphicPosY]: { type: 'number' },
    },
    parameters: {
      [ViewerParameters.TopColor]: "#ABABAB",
      [ViewerParameters.BottomColor]: "#000000",
      [ViewerParameters.HeightIs60]: true,
      [ViewerParameters.HeightIs100]: false,
      [ViewerParameters.CapPosY]: 0,
      [ViewerParameters.CapTypeIs1]: false,
      [ViewerParameters.CapTypeIs2]: false,
      [ViewerParameters.CapTypeIs3]: true,
      [ViewerParameters.GraphicPosZ]: 0,
      [ViewerParameters.GraphicPosY]: 0,
    },
    variants: {
      [VariantNames.AllBins]: {
        glTF: modelUrl,

        variants: {
          [VariantNames.Bin_20_30]: {
            parameters: {
              "Bin60.visible": "${" + ViewerParameters.HeightIs60 + "}",
              "Bin100.visible": "${" + ViewerParameters.HeightIs100 + "}",
              "Bin60.material.color": "${" + ViewerParameters.BottomColor + "}",
              "Bin100.material.color": "${" + ViewerParameters.BottomColor + "}",

              "CapType1.position": "( 0, ${" + ViewerParameters.CapPosY + "}, 0 )",
              "CapType2.position": "( 0, ${" + ViewerParameters.CapPosY + "}, 0 )",
              "CapType3.position": "( 0, ${" + ViewerParameters.CapPosY + "}, 0 )",

              "CapType1.material.color": "${" + ViewerParameters.TopColor + "}",
              "CapType2.material.color": "${" + ViewerParameters.TopColor + "}",
              "CapType3.material.color": "${" + ViewerParameters.TopColor + "}",

              "CapType1.visible": "${" + ViewerParameters.CapTypeIs1 + "}",
              "CapType2.visible": "${" + ViewerParameters.CapTypeIs2 + "}",
              "CapType3.visible": "${" + ViewerParameters.CapTypeIs3 + "}",

              "Text.position": "( 0, ${" + ViewerParameters.CapPosY + "}, 0 )",
            },
            elements: {
              Bin60: ["__root__.bin.20_30_60"],
              Bin100: ["__root__.bin.20_30_100"],
              CapType1: ["__root__.top.20_30_bo"],
              CapType2: ["__root__.top.20_30_cl"],
              CapType3: ["__root__.top.20_30_re"],
              Text: ["__root__.top.txt_20_30"],
            },
          },
          [VariantNames.Bin_30_40]: {
            parameters: {
              "Bin60.visible": "${" + ViewerParameters.HeightIs60 + "}",
              "Bin100.visible": "${" + ViewerParameters.HeightIs100 + "}",
              "Bin60.material.color": "${" + ViewerParameters.BottomColor + "}",
              "Bin100.material.color": "${" + ViewerParameters.BottomColor + "}",

              "CapType1.position": "( 0, ${" + ViewerParameters.CapPosY + "}, 0 )",
              "CapType2.position": "( 0, ${" + ViewerParameters.CapPosY + "}, 0 )",
              "CapType3.position": "( 0, ${" + ViewerParameters.CapPosY + "}, 0 )",

              "CapType1.material.color": "${" + ViewerParameters.TopColor + "}",
              "CapType2.material.color": "${" + ViewerParameters.TopColor + "}",
              "CapType3.material.color": "${" + ViewerParameters.TopColor + "}",

              "CapType1.visible": "${" + ViewerParameters.CapTypeIs1 + "}",
              "CapType2.visible": "${" + ViewerParameters.CapTypeIs2 + "}",
              "CapType3.visible": "${" + ViewerParameters.CapTypeIs3 + "}",

              "Text.position": "( 0, ${" + ViewerParameters.CapPosY + "}, 0 )",
            },
            elements: {
              Bin60: ["__root__.bin.30_40_60"],
              Bin100: ["__root__.bin.30_40_100"],
              CapType1: ["__root__.top.30_40_bo"],
              CapType2: ["__root__.top.30_40_cl"],
              CapType3: ["__root__.top.30_40_re"],
              Text: ["__root__.top.txt_30_40"],
            },
          },

          [VariantNames.Bin_Graphics]: {
            parameters: {
              'GraphicPanel.position': '( 0, ${' + ViewerParameters.GraphicPosY + '}, ${' + ViewerParameters.GraphicPosZ + '} )',
            },
            elements: {
              GraphicPanel: {
                paths: {
                  include: ['__root__.bin.Paintable'],
                },
                paintables: {
                  LogoPaintable: {
                    path: '__root__.bin.Paintable',
                    textureOptions: 512,
                  },
                },
              },
            },
          },
        },
      },
    },
  };
}
