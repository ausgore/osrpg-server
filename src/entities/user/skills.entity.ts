import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class Skills {
  @OneToOne(() => User, { owner: true, primary: true })
  user!: User;

  @Property({ default: 0 })
  agility!: number;

  @Property({ default: 0 })
  fishing!: number;

  @Property({ default: 0 })
  cooking!: number;
}