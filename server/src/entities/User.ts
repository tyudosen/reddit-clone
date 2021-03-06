import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryKey()
  @Field()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt? = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt? = new Date();

  @Field(() => String)
  @Property({ type: 'text', unique: true, })
  username!: string;

  @Property({ type: 'text' })
  password!: string;
}
