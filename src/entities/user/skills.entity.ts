import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class Skills {
  @OneToOne(() => User, user => user.skills, { owner: true, primary: true })
  user!: User;

  @Property({ default: 0 })
  agility!: number;
}