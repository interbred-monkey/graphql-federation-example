import { Directive } from '@nestjs/graphql';
import { NodeInterface, NodeType, ResolvedGlobalId } from 'nestjs-relay';

interface Organization {
  id: string;
}

export const TYPENAME = 'Organization' as const;

@NodeType(TYPENAME)
@Directive('@key(fields:"id")')
export class OrganizationModel extends NodeInterface {
  constructor(user: Organization) {
    super();
    this.id = OrganizationModel.keyToId(user.id);
  }

  private static keyToId(id: string): ResolvedGlobalId {
    return new ResolvedGlobalId({ type: TYPENAME, id });
  }
}
