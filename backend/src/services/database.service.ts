import {
    PutItemInput, 
    PutItemOutput,
    QueryInput,
    QueryOutput,
    DeleteItemInput,
    DeleteItemOutput,
    DynamoDBClient,
    PutItemCommand,
    QueryCommand,
    DeleteItemCommand,
} from '@aws-sdk/client-dynamodb';

import ResponseModel from '../models/response';

export default class DatabaseService {
    private documentClient: DynamoDBClient
    constructor() {
        this.documentClient = new DynamoDBClient({});
    }

    create = async(params: PutItemInput): Promise<PutItemOutput> => {
        try {
            const command = new PutItemCommand(params);
            return await this.documentClient.send(command);
        } catch (error) {
            throw new ResponseModel({error}, 500, `error inserting object in the database`);
        }
    }

    query = async (params: QueryInput): Promise<QueryOutput> => {
        try {
            const command = new QueryCommand(params);
            return await this.documentClient.send(command);
        } catch (error) {
            throw new ResponseModel({error}, 500, `error querying database.`);
        }
    }

    delete = async (params: DeleteItemInput): Promise<DeleteItemOutput> => {
        try {
            const command = new DeleteItemCommand(params);
            return await this.documentClient.send(command);
        } catch (error) {
            throw new ResponseModel({error}, 500, `error deleting object in database.`);
        }
    }
};
