const {
  pluginToTemplateProtocol,
  commonProtocol,
} = require("'../../../core/src/configs/protocol.ts'");
module.exports = (generatorAPI) => {
  generatorAPI.extendPackage({
    dependencies: {
      "element-plus": "^2.7.8",
    },
    devDependencies: {
      "unplugin-element-plus": "^0.8.0",
    },
  });
  generatorAPI.protocolGenerate({
    [commonProtocol.ENTRY_FILE]: {
      // 入口文件引入全局 scss 文件
      params: {
        affects: {
          template: {
            description: "影响框架入口文件配置",
            changes: {
              description: "入口引入全局element-plus",
              content: `
    import ElementPlus from 'element-plus'
    import 'element-plus/dist/index.css'
  `,
            },
          },
        },
      },
      priority: 1, // 优先级
    },
    [pluginToTemplateProtocol.INSERT_ROOTFILE]: {
      params: {
        affects: {
          template: {
            description: "影响框架根入口文件配置",
            changes: {
              description: "增加useElementPlus",
              content: "app.use(ElementPlus)",
            },
          },
        },
      },
      priority: 2,
    },
  });
};
