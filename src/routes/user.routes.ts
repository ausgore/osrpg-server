import { FastifyPluginAsync } from 'fastify';
import { initORM } from '../orm';
import { User } from '../entities/user/user.entity';

const app: FastifyPluginAsync = async (app) => {
  const db = await initORM();

  app.get<{ Params: { id: string } }>('/users/:id', async (req, res) => {
    return await db.em.findOne(User, req.params.id, { populate: ['*'] });
  });

  app.get('/users', async (req, res) => {
    return await db.em.findAll(User, { populate: ['*'] });
  });

  app.post<{ Params: { id: string } }>('/users/create/:id', async (req, res) => {
    const user = new User(req.params.id);
    await db.em.persistAndFlush(user);
    return user;
  });

  app.get<{ Params: { uid: string, id: number }}>('/users/:uid/set-offhand/:id', async (req, res) => {    
    const { uid, id } = req.params; 
    const user = await db.em.findOne(User, { id: uid });
    if (!user) return res.status(404).send({ message: 'User cannot be found'});

    user.gear.offhand = id;
    await db.em.persistAndFlush(user);
    return user;
  });  
}

export default app;