import { Cascade, Entity, OneToOne, PrimaryKey } from '@mikro-orm/core';
import { Gear } from './gear.entity';
import { Skills } from './skills.entity';

@Entity()
export class User {
  @PrimaryKey()
  id!: string;

  @OneToOne(() => Gear, gear => gear.user, { cascade: [Cascade.PERSIST], nullable: false })
  gear!: Gear;

  @OneToOne(() => Skills, skills => skills.user, { cascade: [Cascade.PERSIST], nullable: false })
  skills!: Gear;

  constructor(id: string) {
    this.id = id;
  }
}