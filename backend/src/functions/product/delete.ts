import {
  APIGatewayProxyHandler,
  APIGatewayEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import { DeleteItemInput } from "@aws-sdk/client-dynamodb";
import ResponseModel from "@models/response";
import DatabaseService from "@services/database.service";

export const deleteProduct: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  let response: ResponseModel;
  try {
    const { id } = event.pathParameters;
    const databaseService = new DatabaseService();
    const params: DeleteItemInput = {
      Key: { pk: { S: "item-key" }, id: { N: id } },
      TableName: process.env.TABLE_NAME,
    };
    await databaseService.delete(params);
    response = new ResponseModel({}, 200, `deleted item with id: ${id}`);
  } catch (error) {
    response =
      error instanceof ResponseModel
        ? error
        : new ResponseModel({ error }, 500, "Product cannot be created.");
  }
  return response.generate();
};

export const main = deleteProduct;
