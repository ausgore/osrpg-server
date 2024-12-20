import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class Gear {
  @OneToOne(() => User, { owner: true, primary: true })
  user!: User;

  @Property()
  mainhand?: number;

  @Property()
  offhand?: number;
}