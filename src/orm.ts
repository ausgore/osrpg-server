import { EntityManager, MikroORM } from '@mikro-orm/mysql';
import config from './mikro-orm.config';


export interface Services {
  orm: MikroORM;
  em: EntityManager;
}

let cache: Services;

export async function initORM() {
  if (cache) return cache;
  const orm = await MikroORM.init(config);
  return cache = { orm, em: orm.em };
}