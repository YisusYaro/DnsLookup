import 'reflect-metadata';
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { handleErrors } from '../../shared/interface/handlers';
import { dnsLookup } from './dns-records.port';

export const dnsLookupHandler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  const body = JSON.parse(event.body ?? '{}');
  const params = event.pathParameters;

  return await handleErrors(async () => {
    await dnsLookup({ ...params, ...body });
    return {
      statusCode: 204,
    };
  });
};
