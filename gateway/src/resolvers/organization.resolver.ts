import { Query, Resolver } from '@nestjs/graphql';
import { OrganizationModel } from '../models/organization.model';

@Resolver(() => OrganizationModel)
export class OrganizationResolver {
  @Query(() => OrganizationModel)
  organization(): OrganizationModel {
    const id = new Date().toISOString();
    return new OrganizationModel({ id });
  }
}
