import 'reflect-metadata';
import { Container } from 'inversify';
import {
  cleanUpMetadata,
  InversifyExpressServer,
} from 'inversify-express-utils';
import request from 'supertest';
import { App } from '../../../src/shared/infrastructure/dependency-injection/app';
import { buildExpressApp } from '../../helpers/build-express-app';
import '../../../src/dns-records/interface/dns-records.controller';

describe('Health check', () => {
  let app: any;
  let container: Container;

  beforeAll(() => {
    container = App.getInstance().getContainer();
    App.getInstance().setDependencyInjectionApp();
    const server = new InversifyExpressServer(container);
    app = buildExpressApp(server);
  });

  beforeEach(() => {
    container.snapshot();
    cleanUpMetadata();
  });

  afterEach(() => container.restore());

  describe('execute', () => {
    it('should return successful http status', async () => {
      const result = await request(app).get(
        '/rrTypes/CAA/dnsRecords/jesusyaro.com',
      );

      console.log(result.body);
    });
  });
});
