import { DnsLookup } from '../../domain/dns-lookup';
import dns from 'dns';
import { injectable } from 'inversify';

@injectable()
export class DnsLookupImpl implements DnsLookup {
  private dnsClient = new dns.promises.Resolver();
  async resolve(domain: string, rrType: string) {
    const dnsResult = await this.dnsClient.resolve(domain, rrType);
    return {
      [rrType]: dnsResult,
    };
  }

  public getServers() {
    return this.dnsClient.getServers();
  }
}
