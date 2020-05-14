import { Controller } from 'egg';
import { RouterControllerMapping, RouterGetMapping } from 'egg-router-mapping';

@RouterControllerMapping('userMapping')
export default class UserController extends Controller {
  @RouterGetMapping('indexMapping')
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('index');
  }
  @RouterGetMapping('index2Mapping')
  async index2() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('index2');
  }
}
