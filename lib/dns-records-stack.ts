import {
  CorsHttpMethod,
  HttpApi,
  HttpStage,
} from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import * as cdk from 'aws-cdk-lib';
import { CfnOutput, Duration } from 'aws-cdk-lib';
import { HttpMethod } from 'aws-cdk-lib/aws-events';
import { NodejsFunction, SourceMapMode } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as path from 'path';

export class DnsRecordsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stackEnv = process.env.STACK_ENV ?? 'test';
    const stackName = 'dns-records';

    const environment = {
      STACK_ENV: stackEnv,
      STACK_NAME: stackName,
      REGION: 'us-east-1',
    };

    const bundling = {
      minify: false,
      sourceMap: true,
      sourceMapMode: SourceMapMode.INLINE,
      sourcesContent: false,
      target: 'ES2018',
      nodeModules: ['winston'],
    };

    const projectRoot = path.resolve(__dirname, '../');

    const depsLockFilePath = path.resolve(__dirname, '../package-lock.json');

    const timeout = Duration.seconds(6);

    const httpDnsRecordsApi = new HttpApi(
      this,
      `${stackEnv}-${stackName}-http-api`,
      {
        corsPreflight: {
          allowHeaders: [
            'Content-Type',
            'X-Amz-Date',
            'Authorization',
            'X-Api-Key',
          ],
          allowMethods: [
            CorsHttpMethod.OPTIONS,
            CorsHttpMethod.GET,
            CorsHttpMethod.POST,
            CorsHttpMethod.PUT,
            CorsHttpMethod.PATCH,
            CorsHttpMethod.DELETE,
          ],
          allowCredentials: false,
          allowOrigins: ['*'],
        },
      },
    );

    const httpDnsRecordsStage = new HttpStage(
      this,
      `${stackEnv}-${stackName}-http-stage`,
      {
        httpApi: httpDnsRecordsApi,
        stageName: stackEnv,
        autoDeploy: true,
      },
    );

    const dnsLookupHandlerFunction = new NodejsFunction(
      this,
      `${stackEnv}-${stackName}-dns-lookup-function`,
      {
        entry: path.resolve(
          __dirname,
          '../dist/src/dns-records/interface/handlers.js',
        ),
        functionName: `${stackEnv}-dns-records-dns-lookup-function`,
        handler: 'dnsLookupHandler',
        bundling,
        projectRoot,
        depsLockFilePath,
        timeout,
        environment,
      },
    );

    httpDnsRecordsApi.addRoutes({
      path: '/rrTypes/{rrType}/dnsRecords/{domain}',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration(
        `${stackEnv}-${stackName}-dns-records-dns-lookup-integration`,
        dnsLookupHandlerFunction,
      ),
    });

    new CfnOutput(this, 'http-dns-records-stage', {
      value: httpDnsRecordsStage.url,
    });
  }
}
