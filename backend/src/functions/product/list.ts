import {
  APIGatewayProxyHandler,
  APIGatewayEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import { QueryInput } from "@aws-sdk/client-dynamodb";
import ResponseModel from "@models/response";
import DatabaseService from "@services/database.service";
import { attributeMapToJson, jsonToAttributeMap } from "@utils/util";

export const listProducts: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  let response: ResponseModel;
  let fromIndex = new Date().getTime();
  let limit = 25;
  let forward = ""
  const { queryStringParameters: queryParams } = event;
  if (queryParams) {
    fromIndex =
      queryParams.fromIndex && !isNaN(parseInt(queryParams.fromIndex))
        ? parseInt(queryParams.fromIndex)
        : fromIndex;
    limit =
      queryParams.limit && !isNaN(parseInt(queryParams.limit))
        ? parseInt(queryParams.limit)
        : limit;
    forward = queryParams.forward;
  }

  const databaseService = new DatabaseService();
  const attributeValues = jsonToAttributeMap({
    ":partKey": "item-key",
    ":startIndex": fromIndex,
  });
  const scanForward = (forward && forward === "1")
  const query = (scanForward) ? "#pk = :partKey AND #id > :startIndex" : "#pk = :partKey AND #id < :startIndex"
  const params: QueryInput = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: query,
    ExpressionAttributeValues: attributeValues,
    ScanIndexForward: scanForward,
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#id": "id",
    },
    Limit: limit ? limit : 25,
  };
  try {
    const results = await databaseService.query(params);
    const products = results.Items.map((item) => attributeMapToJson(item));
    response = new ResponseModel(
      { products },
      200,
      `returned ${results.Count}`
    );
  } catch (error) {
    response =
      error instanceof ResponseModel
        ? error
        : new ResponseModel({ error }, 500, "Product cannot be created.");
  }
  return response.generate();
};

export const main = listProducts;
