const {
  pluginToTemplateProtocol,
  commonProtocol,
} = require("'../../../core/src/configs/protocol.ts'"); // todo: 新增 alias

module.exports = (generatorAPI) => {
  generatorAPI.extendPackage({
    devDependencies: {
      scss: "latest", // todo: 暂时的版本
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
              description: "入口引入全局scss文件",
              content: "import './style/index.scss'",
            },
          },
        },
      },
      priority: 1, // 优先级
    },
    [pluginToTemplateProtocol.INSERT_STYLE]: {
      params: {
        affects: {
          template: {
            description: "影响框架根组件文件配置",
            changes: {
              description: "根组件引入scss",
              content: '<style lang="scss">',
            },
          },
        },
      },
      priority: 2,
    },
  });
};
