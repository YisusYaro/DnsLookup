#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DnsLookupStack } from '../lib/dns-lookup-stack';

const app = new cdk.App();
new DnsLookupStack(app, 'DnsLookupStack', {});
