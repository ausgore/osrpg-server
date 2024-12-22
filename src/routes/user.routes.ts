import { initORM } from '../orm';
import { User } from '../entities/user/user.entity';
import { Type } from "@sinclair/typebox";
import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";

const app: FastifyPluginAsyncTypebox = async (app) => {
  const db = await initORM();

  app.get('/users', {
    schema: {
      tags: ['users']
    }
  }, async (req, res) => {
    return await db.em.findAll(User, { populate: ['*'] });
  });

  app.get('/users/:id', {
    schema: {
      tags: ['users'],
      params: Type.Object({ id: Type.String() })
    }
  }, async (req, res) => {
    return await db.em.findOne(User, req.params.id, { populate: ['*'] });
  });

  app.post('/users/create/:id', {
    schema: {
      tags: ['users'],
      params: Type.Object({ id: Type.String() }),
    }
  }, async (req, res) => {
    const user = new User(req.params.id);
    await db.em.persistAndFlush(user);
    return user;
  });

  app.get('/users/:uid/set-offhand/:id', {
    schema: {
      tags: ['users'],
      params: Type.Object({
        uid: Type.String(),
        id: Type.Number()
      })
    }
  }, async (req, res) => {
    const { uid, id } = req.params;
    const user = await db.em.findOne(User, { id: uid });
    if (!user) return res.status(404).send({ message: 'User cannot be found' });

    user.gear.offhand = id;
    await db.em.persistAndFlush(user);
    return user;
  });
}

export default app;