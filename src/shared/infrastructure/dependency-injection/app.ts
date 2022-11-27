import { Container } from 'inversify';
import { setSharedModule } from './shared.module';
import { setDnsRecordsModule } from '../../../dns-records/infrastructure/dependency-injection/module';

export class App {
  private static instance: App;
  private container: Container;
  private settedModules: string[];

  private constructor() {
    this.container = new Container();
    this.settedModules = [];
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }

    return App.instance;
  }

  public getContainer(): Container {
    return this.container;
  }

  public setSharedModule() {
    if (this.settedModules.includes(setSharedModule.name)) return;
    setSharedModule(this.container);
    this.settedModules.push(setSharedModule.name);
  }

  public setDnsRecordsModule() {
    if (this.settedModules.includes(setDnsRecordsModule.name)) return;
    setDnsRecordsModule(this.container);
    this.settedModules.push(setDnsRecordsModule.name);
  }
}
