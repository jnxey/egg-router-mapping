import { Controller } from 'egg';
import { RouterController, RouterGet } from 'egg-router-mapping';

@RouterController
export default class HomeController extends Controller {
  @RouterGet
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('index');
  }
  @RouterGet
  async index2() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('index2');
  }
}
