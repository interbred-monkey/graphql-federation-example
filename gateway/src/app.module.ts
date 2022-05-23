import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GlobalIdScalar } from 'nestjs-relay';
import { ResolversModule } from './resolvers/resolvers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        /* @ts-ignore */
        subscriptions: false,
        introspection: true,
        playground: true,
        context: (req) => req,
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: 'user-service',
              url: 'http://localhost:3000/graphql',
            },
          ],
        }),
      },
      autoSchemaFile: true,
      providers: [GlobalIdScalar],
    }),
    ResolversModule,
  ],
})
export class AppModule {}
