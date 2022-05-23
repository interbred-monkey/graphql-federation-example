import { Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { UserModel } from '../models/user.model';

@Resolver(() => UserModel)
export class UserResolver {
  @Query(() => UserModel)
  user(): UserModel {
    const id = new Date().toISOString();
    return new UserModel({ id, name: 'Bob', email: 'bob@home.com' });
  }

  @ResolveReference()
  resolveReference() {
    const id = new Date().toISOString();
    return UserModel.keyToId(id);
  }
}
