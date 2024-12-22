import 'module-alias/register';

import fastify from 'fastify';
import cors from '@fastify/cors';
import autoload from '@fastify/autoload';
import dotenv from 'dotenv';
import path from 'path';
import { initORM } from './orm';
import { RequestContext } from '@mikro-orm/core';
import swagger from "./plugins/swagger.plugin";

dotenv.config({ path: process.env.NODE_ENV });

const initialise = async () => {
  const db = await initORM();
  const app = fastify();
  
  app.register(cors, { origin: process.env.ORIGIN });
  app.register(swagger);
  app.register(autoload, { dir: path.join(__dirname, 'routes') });
  
  app.addHook("onRequest", (req, res, done) => RequestContext.create(db.orm.em, done));
  app.addHook("onClose", () => db.orm.close());
  
  await app.ready();
  app.swagger();

  await app.listen({ 
    host: process.env.SERVER_HOST,
    port: Number(process.env.SERVER_PORT) 
  }, (err, address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    else console.log(`Listening to ${address}`);
  });
}

initialise();
