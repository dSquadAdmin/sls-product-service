import {
  APIGatewayProxyHandler,
  APIGatewayEvent,
  Context,
  APIGatewayProxyResult,
} from "aws-lambda";
import { PutItemInput } from "@aws-sdk/client-dynamodb";
import ProductModel from "@models/product";
import ResponseModel from "@models/response";
import DatabaseService from "@services/database.service";
import { jsonToAttributeMap, validateCreateRequest } from "@utils/util";

export const createProduct: APIGatewayProxyHandler = async (
  event: APIGatewayEvent,
  _context: Context
): Promise<APIGatewayProxyResult> => {
  let response: ResponseModel;
  try {
    const requestData = JSON.parse(event.body);
    const productModel = await validateCreateRequest(
      new ProductModel(requestData)
    );
    const data = productModel.getEntityMappings();
    const putItem = jsonToAttributeMap({ ...data, pk: "item-key" });
    const databaseService = new DatabaseService();
    const params: PutItemInput = {
      TableName: process.env.TABLE_NAME,
      Item: putItem,
    };
    await databaseService.create(params);
    response = new ResponseModel(
      { data },
      200,
      "Product inserted successfully."
    );
  } catch (error) {
    response =
      error instanceof ResponseModel
        ? error
        : new ResponseModel({ error }, 500, "Product cannot be created.");
  }
  return response.generate();
};

