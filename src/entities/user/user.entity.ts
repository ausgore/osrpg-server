import { Cascade, Entity, OneToOne, PrimaryKey } from '@mikro-orm/core';
import { Gear } from './gear.entity';
import { Skills } from './skills.entity';

@Entity()
export class User {
  @PrimaryKey()
  id!: string;

  @OneToOne(() => Gear, gear => gear.user, { cascade: [Cascade.PERSIST, Cascade.REMOVE], nullable: false })
  gear!: Gear;

  @OneToOne(() => Skills, sklil => sklil.user, { cascade: [Cascade.PERSIST, Cascade.REMOVE], nullable: false })
  skills!: Gear;

  constructor(id: string) {
    this.id = id;
    this.gear = new Gear();
    this.skills = new Skills();
  }
}