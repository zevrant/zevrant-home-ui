import {AWSError, SecretsManager} from 'aws-sdk';
import AWS = require('aws-sdk');
import {GetSecretValueResponse} from "aws-sdk/clients/secretsmanager";

export class SecretsManagerService {

  private secretsManager: SecretsManager;

  constructor() {
    this.secretsManager = new AWS.SecretsManager({apiVersion: '2017-10-17'});
  }

  public getSecret(secretPath: string, callback: (error: AWSError, data: GetSecretValueResponse) => any ) {
    var params = {
      SecretId: secretPath
    }
    this.secretsManager.getSecretValue(params, callback);
  }
}
