import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import configure from '@vendia/serverless-express';
import { APIGatewayProxyHandler, Handler } from 'aws-lambda';
import express from 'express';
import { AppModule } from './app.module';

const SERVICE_PORT = 3000;

let cachedApp: Handler;

export default class Application {
  static isLocal = () => process.env?.STAGE === undefined;

  constructor() {
    console.info('starting in local mode');
    Application.create().then();
  }

  static async create(): Promise<APIGatewayProxyHandler> {
    console.info('creating application');
    if (cachedApp !== undefined) {
      console.info('Found a cached app, returning that');
      return cachedApp;
    }

    console.info('creating new express instance');
    const app = express();

    console.info('creating nest application');
    const nestApp = await NestFactory.create<NestExpressApplication>(AppModule);
    nestApp.useGlobalPipes(new ValidationPipe({}));
    nestApp.enableCors();

    await nestApp.listen(SERVICE_PORT);
    console.info(
      `Application is running on: ${await nestApp.getUrl()}/graphql`
    );

    cachedApp = configure({ app });
    return cachedApp;
  }
}
