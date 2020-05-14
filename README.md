# egg-router-mapping

The plugin is based on egg.js

**This plugin is used for router settings.**

## Installation

```bash
$ npm i egg-router-mapping --save
```

## Background

* add routes is too tedious, so we can to add routes by this plugin and decorator

## Use

### Registered router
 
 ```js
 // {app_root}/app/router.js
 import { Application } from 'egg';
 + import { routerMapping } from 'egg-router-mapping';
 
 export default (app) => {
   + routerMapping(app);
 };
 ```
### Example

```js
// {app_root}/app/controller/home.js
+ import { RouterController, RouterGet } from 'egg-router-mapping';
+ @RouterController
export default class HomeController extends Controller {
  + @RouterGet
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('index');
  }
}
// {app_root}/app/controller/user.js
+ import { RouterControllerMapping, RouterGetMapping } from 'egg-router-mapping';
+ @RouterControllerMapping('userMapping')
export default class UserController extends Controller {
  + @RouterGetMapping('indexMapping')
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('index');
  }
  + @RouterGetMapping('index2Mapping')
  async index2() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('index2');
  }
}
```

### Method

```js
import { RouterController, RouterGet, ... } from 'egg-router-mapping';
```
| 方法 / 装饰器|说明|参数|默认值|是否必填|
| ----------- | :-----------: | :-----------: | :-----------: | :-----------: |
| routerMapping: Function |映射路由|app: Application| |Yes|
| RouterController: Decorator|类装饰器| | | |
| RouterAll: Decorator|方法装饰器| | | |
| RouterGet: Decorator|方法装饰器| | | |
| RouterPost: Decorator|类装饰器| | | |
| RouterPut: Decorator|方法装饰器| | | |
| RouterDelete: Decorator|方法装饰器| | | |
| RouterPatch: Decorator|方法装饰器| | | |
| RouterOptions: Decorator|方法装饰器| | | |
| RouterHead: Decorator|方法装饰器| | | |
| RouterControllerMapping: Decorator|类装饰器|name: string| | yes |
| RouterAllMapping: Decorator|方法装饰器|name: string| | yes |
| RouterGetMapping: Decorator|方法装饰器|name: string| | yes |
| RouterPostMapping: Decorator|方法装饰器|name: string| | yes |
| RouterPutMapping: Decorator|方法装饰器|name: string| | yes |
| RouterDeleteMapping: Decorator|方法装饰器|name: string| | yes |
| RouterOptionsMapping: Decorator|方法装饰器|name: string| | yes |
| RouterHeadMapping: Decorator|方法装饰器|name: string| | yes |

