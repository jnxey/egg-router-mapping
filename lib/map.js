const RouterTargets = {};

const SensitiveWords = ['constructor', 'pathName', 'fullPath'];

const methods = ['All', 'Get', 'Post', 'Put', 'Delete', 'Patch', 'Options', 'Head'];

/*
 * 获取方法名称
 * @param fn
 * @returns {*}
 */
function getFunctionName(fn) {
  return typeof fn === 'function' ? Object.getOwnPropertyDescriptors(fn).name.value : null;
}

/*
 * 添加控制器
 * @param target
 * @param options
 */
function setController(target, options = {}) {
  const _fName = getFunctionName(target);
  const _options = { ...{ name: _fName }, ...options };
  RouterTargets[_fName] = {
    controller: _fName,
    module: _options.name,
    paths: []
  };
  Object.getOwnPropertyNames(target.prototype).forEach((name) => {
    if (!SensitiveWords.includes(name)) {
      const routerInfo = target.prototype[name].ROUTER_INFO;
      RouterTargets[_fName].paths.push(routerInfo);
    }
  });
}

/*
 * 添加路径
 * @param descriptor
 * @param key
 * @param path
 * @param method
 */
function setTargetMetadata(descriptor, key, path, method) {
  path = path || key;
  descriptor.value.ROUTER_INFO = { key, path, method };
}

/*
 * 创建路由映射
 */
function createdRouterMapping() {
  // 声明路由工具
  const RouterMap = {
    // 映射路由
    routerMapping(app) {
      const { controller, router } = app;
      Object.keys(RouterTargets).forEach(function (sign) {
        const target = RouterTargets[sign];
        const paths = target.paths;
        paths.forEach((item) => {
          router[item.method]('/' + target.module + '/' + item.path, controller[target.controller][item.key]);
        });
      });
    },
    // 创建控制器
    RouterController(target) {
      setController(target);
    }
  };
  // 遍历添加支持的http
  methods.forEach((method) => {
    RouterMap[`Router${method}`] = function ({ target, key, descriptor, name, tips, accept, returns, middleware }) {
      if (target && key && descriptor) {
        setTargetMetadata(descriptor, key, '', method.toLowerCase());
      } else {
        const options = { name, tips, accept, returns, middleware };
        return function (target, key, descriptor) {
          setTargetMetadata(descriptor, key, options, method.toLowerCase());
        };
      }
    };
  });
  return RouterMap;
}

module.exports = {
  RouterTargets,
  ...createdRouterMapping()
};
