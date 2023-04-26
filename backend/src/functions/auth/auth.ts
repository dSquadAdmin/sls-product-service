import {
  APIGatewayRequestAuthorizerEventV2,
  APIGatewaySimpleAuthorizerWithContextResult,
} from "aws-lambda";

export interface AuthContext {
  userId: string;
}

interface AuthSimpleResponse {
  isAuthorized: boolean;
  context: AuthContext;
}

export const authorizerHandler = async (
  authorizerEventV2: APIGatewayRequestAuthorizerEventV2
): Promise<APIGatewaySimpleAuthorizerWithContextResult<AuthContext>> => {
  const response: AuthSimpleResponse = {
    isAuthorized: false,
    context: {
      userId: "",
    },
  };

  const authToken = authorizerEventV2.identitySource[0];
  const secretKey = process.env.AUTH_SECRET_KEY;

  // here JWT or other auth mechanism need to be implemented
  if (authToken === secretKey) {
    response.isAuthorized = true;
    response.context.userId = "authorizedUser";
  }

  return response;
};
