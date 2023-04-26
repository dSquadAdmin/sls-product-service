import type { AWS } from '@serverless/typescript';
import { handler }from '@functions/index';

const serverlessConfiguration: AWS = {
  service: '${file(../config.json):service}',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    httpApi: {
      shouldStartNameWithService: true,
      cors: {
        allowedOrigins: ['*'],
        allowedMethods: ['GET', 'POST', 'DELETE']
      },
      authorizers: {
        "apiAuthorizer": {
          type:"request",
          functionName: "authorizeApi",
          managedExternally: false,
          enableSimpleResponses: true,
          identitySource: ["$request.header.Authorization"]
        }
      }
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
            'dynamodb:DescribeTable',
            'dynamodb:Query',
            'dynamodb:Scan',
            'dynamodb:GetItem',
            'dynamodb:PutItem',
            'dynamodb:UpdateItem',
            'dynamodb:DeleteItem'
        ],
        Resource: [
          {"Fn::GetAtt": [ 'ProductTable', 'Arn' ]},
        ]
      }
    ],
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      TABLE_NAME: '${self:custom.tableName}',
      AUTH_SECRET_KEY: '${env:AUTH_SECRET_KEY}'
    },
  },
  // import the function via paths
  functions: handler,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    tableName: '${self:service}-${sls:stage}-product-table',
  },
  resources: {
    Resources: {
      ProductTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Delete', // use Retain to stop deleting table on stack delete
        Properties: {
          TableName: '${self:custom.tableName}',
          AttributeDefinitions: [
            { AttributeName: 'pk', AttributeType: 'S' },
            { AttributeName: 'id', AttributeType: 'N' },
          ],
          KeySchema: [
            { AttributeName: 'pk', KeyType: 'HASH' },
            { AttributeName: 'id', KeyType: 'RANGE' }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      },
    }
  }
};

module.exports = serverlessConfiguration;
