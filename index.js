const RouterTargets = {};

const SensitiveWords = ['constructor', 'pathName', 'fullPath'];

function getFunctionName(fn) {
  return typeof fn === 'function' ? Object.getOwnPropertyDescriptors(fn).name.value : null;
}

function setController(target, name) {
  const fnName = getFunctionName(target);
  const controllName = fnName.replace('Controller', '').toLowerCase();
  name = name || controllName;
  RouterTargets[fnName] = {
    controller: controllName,
    module: name,
    paths: [],
  };
  Object.getOwnPropertyNames(target.prototype).forEach((name) => {
    if (!SensitiveWords.includes(name)) {
      const routerInfo = target.prototype[name].ROUTER_INFO;
      RouterTargets[fnName].paths.push(routerInfo);
    }
  });
}

function setTargetMetadata(descriptor, key, path, method) {
  path = path || key;
  descriptor.value.ROUTER_INFO = { key, path, method };
}

module.exports = {
  routerJSON: RouterTargets,
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
  RouterController(target) {
    setController(target);
  },
  RouterAll(target, key, descriptor) {
    setTargetMetadata(descriptor, key, '', 'all');
  },
  RouterGet(target, key, descriptor) {
    setTargetMetadata(descriptor, key, '', 'get');
  },
  RouterPost(target, key, descriptor) {
    setTargetMetadata(descriptor, key, '', 'post');
  },
  RouterPut(target, key, descriptor) {
    setTargetMetadata(descriptor, key, '', 'put');
  },
  RouterDelete(target, key, descriptor) {
    setTargetMetadata(descriptor, key, '', 'delete');
  },
  RouterPatch(target, key, descriptor) {
    setTargetMetadata(descriptor, key, '', 'patch');
  },
  RouterOptions(target, key, descriptor) {
    setTargetMetadata(descriptor, key, '', 'options');
  },
  RouterHead(target, key, descriptor) {
    setTargetMetadata(descriptor, key, '', 'head');
  },
  RouterControllerMapping(name) {
    return function (target) {
      setController(target, name);
    };
  },
  RouterAllMapping(name) {
    return function (target, key, descriptor) {
      setTargetMetadata(descriptor, key, name, 'all');
    };
  },
  RouterGetMapping(name) {
    return function (target, key, descriptor) {
      setTargetMetadata(descriptor, key, name, 'get');
    };
  },
  RouterPostMapping(name) {
    return function (target, key, descriptor) {
      setTargetMetadata(descriptor, key, name, 'post');
    };
  },
  RouterPutMapping(name) {
    return function (target, key, descriptor) {
      setTargetMetadata(descriptor, key, name, 'put');
    };
  },
  RouterDeleteMapping(name) {
    return function (target, key, descriptor) {
      setTargetMetadata(descriptor, key, name, 'delete');
    };
  },
  RouterPatchMapping(name) {
    return function (target, key, descriptor) {
      setTargetMetadata(descriptor, key, name, 'patch');
    };
  },
  RouterOptionsMapping(name) {
    return function (target, key, descriptor) {
      setTargetMetadata(descriptor, key, name, 'options');
    };
  },
  RouterHeadMapping(name) {
    return function (target, key, descriptor) {
      setTargetMetadata(descriptor, key, name, 'head');
    };
  },
};
