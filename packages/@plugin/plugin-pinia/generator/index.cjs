const {
  pluginToTemplateProtocol,
  commonProtocol,
} = require("'../../../core/src/configs/protocol.ts'");
module.exports = (generatorAPI) => {
  generatorAPI.extendPackage({
    dependencies: {
      pinia: "^2.2.2",
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
              description: "入口引入全局Pinia",
              content: "import { createPinia } from 'pinia' ",
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
            changes: [
              {
                description: "创建Pinia实例",
                content: "const Pinia=createPinia()",
              },
              {
                description: "增加use",
                content: "app.use(Pinia)",
              },
            ],
          },
        },
      },
      priority: 2,
    },
  });
};
