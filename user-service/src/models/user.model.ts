import { Field, ObjectType } from '@nestjs/graphql';
import { NodeInterface, ResolvedGlobalId } from 'nestjs-relay';

interface User {
  id: string;
  name?: string;
  email?: string;
}

export const TYPENAME = 'User' as const;

@ObjectType(TYPENAME)
export class UserModel extends NodeInterface {
  constructor(user: User) {
    super();
    this.id = UserModel.keyToId(user.id);
    this.email = user.email;
    this.name = user.name;
  }

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  static keyToId(id: string): ResolvedGlobalId {
    return new ResolvedGlobalId({ type: TYPENAME, id });
  }
}
