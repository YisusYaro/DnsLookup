#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DnsRecordsStack } from '../lib/dns-records-stack';

const app = new cdk.App();
new DnsRecordsStack(app, 'dns-lookup-dns-records-stack', {});
