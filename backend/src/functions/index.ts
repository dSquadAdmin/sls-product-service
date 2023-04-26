import { handlerPath } from "@libs/handler-resolver";

export const handler = {
  authorizeApi: {
    name: "apiAuthorizer",
    handler: `${handlerPath(__dirname)}/handler.authorizerHandler`,
  },
  createProduct: {
    handler: `${handlerPath(__dirname)}/handler.createProduct`,
    events: [
      {
        httpApi: {
          method: "post",
          path: "/products",
          authorizer: {
            name: "apiAuthorizer",
          },
        },
      },
    ],
  },
  listProducts: {
    handler: `${handlerPath(__dirname)}/handler.listProducts`,
    events: [
      {
        httpApi: {
          method: "get",
          path: "/products",
        },
      },
    ],
  },
  deleteProduct: {
    handler: `${handlerPath(__dirname)}/handler.deleteProduct`,
    events: [
      {
        httpApi: {
          method: "delete",
          path: "/products/{id}",
          authorizer: {
            name: "apiAuthorizer",
          },
        },
      },
    ],
  },
};
