import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GlobalIdScalar } from 'nestjs-relay';
import { ResolversModule } from './resolvers/resolvers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: ({ req }: { req: { headers: Record<string, unknown> } }) => {
        return {
          user: req.headers['gql-user'],
        };
      },
      playground: {
        endpoint: '/graphql',
      },
    }),
    ResolversModule,
  ],
  providers: [GlobalIdScalar],
})
export class AppModule {}
