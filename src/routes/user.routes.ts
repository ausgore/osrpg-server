import { FastifyPluginAsync } from 'fastify';
import { initORM } from '../orm';
import { User } from '../entities/user/user.entity';
import { Gear } from '../entities/user/gear.entity';
import { Skills } from '../entities/user/skills.entity';

const app: FastifyPluginAsync = async (app) => {
  const db = await initORM();

  app.get('/', async (req, res) => {
    return await db.em.findAll(User, { populate: ['*'] });
  });

  app.get<{ Params: { id: string } }>('/create/:id', async (req, res) => {
    const user = new User(req.params.id);
    user.gear = new Gear();
    user.skills = new Skills();
    await db.em.persistAndFlush(user);
    return user;
  });

  app.get<{ Params: { uid: string, id: number }}>('/:uid/set-offhand/:id', async (req, res) => {    
    const { uid, id } = req.params; 
    const user = await db.em.findOne(User, { id: uid });
    if (!user) return res.status(404).send({ message: 'User cannot be found'});

    user.gear.offhand = id;
    await db.em.persistAndFlush(user);
    return user;
  });  
}

export default app;