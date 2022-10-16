import { AnyRecord, MxRecord, NaptrRecord, SoaRecord, SrvRecord } from 'dns';

export interface DnsLookup {
  getServers(): string[];
  resolve(
    domain: string,
    rrType: string,
  ): Promise<{
    [rrType: string]:
      | string[]
      | SoaRecord
      | MxRecord[]
      | SrvRecord[]
      | string[][]
      | NaptrRecord[]
      | AnyRecord[];
  }>;
}
