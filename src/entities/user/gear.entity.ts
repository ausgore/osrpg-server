import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class Gear {
  @OneToOne(() => User, user => user.gear, { owner: true, primary: true })
  user!: User;

  @Property()
  offhand?: number;
}