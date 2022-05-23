import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import Application from './app';

if (Application.isLocal()) {
  new Application();
}

export async function handler(event: APIGatewayProxyEvent, context: Context) {
  const app = await Application.create();
  return app(event, context, () => {
    /* NOOP */
  });
}
