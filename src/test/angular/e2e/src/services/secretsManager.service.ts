import {AWSError, SecretsManager} from 'aws-sdk';
import AWS = require('aws-sdk');
import {GetSecretValueResponse} from "aws-sdk/clients/secretsmanager";
import {Request} from "aws-sdk/lib/request";

export class SecretsManagerService {

  private secretsManager: SecretsManager;

  constructor() {
    this.secretsManager = new AWS.SecretsManager({apiVersion: '2017-10-17', region: "us-east-1"});
  }

  public getSecret(secretPath: string): Request<SecretsManager.Types.GetSecretValueResponse, AWSError> {
    var params = {
      SecretId: secretPath
    }
    return this.secretsManager.getSecretValue(params);
  }
}
