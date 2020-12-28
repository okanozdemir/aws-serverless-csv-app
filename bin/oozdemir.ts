#!/usr/bin/env node

import cdk = require('@aws-cdk/core');
import oozdemir_service = require('../lib/oozdemir_service');

export class OozdemirServiceStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
  
      new oozdemir_service.OozdemirService(this, 'Oozdemir');
    }
  }

const app = new cdk.App();
new OozdemirServiceStack(app, 'OozdemirServiceStack');
app.synth();
