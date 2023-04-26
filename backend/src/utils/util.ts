// Models
import ResponseModel from "@models/response";
import ProductModel, {} from '@models/product';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
/**
 * Validate values against constraints
 * @param values
 * @param constraints
 * @return {Promise<any>}
 */
export const validateCreateRequest = (data: ProductModel ) => {
    return new Promise<ProductModel>((resolve, reject) => {
        let validation = {};
        const request = data.getEntityMappings();

        if (request.name === "") {
            validation["name"] = "Name of the product is required field."
        }

        if (request.description === "") {
            validation["description"] = "Description of the product is required field."
        }

        if (request.price <= 0) {
            validation["price"] = "Price of the product is required field."
        }

        if (request.imageUrl === "") {
            validation["imageUrl"] = "Product image URL is required field."
        }else if (!validateUrl(request.imageUrl)){
            validation["imageUrl"] = "Product image URL is not valid."
        }

        if (Object.keys(validation).length > 0){
            reject(new ResponseModel({ error: validation }, 422, 'Invalid input in the fields.'));
        } else {
            resolve(data);
        }
    });
};

export const validateUrl = (url: string) => {
    if(/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url)) {
        return true;
    }
    return false;
};

export const jsonToAttributeMap = (product: any) => {
    const putItem = marshall(product);
    return putItem;
};

export const attributeMapToJson = (item: any) =>  {
    delete item.pk;
    const product = unmarshall(item);
    return product
};
