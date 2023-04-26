interface IProductInterface {
    id?: number;
    name?: string;
    description?: string;
    imageUrl?: string;
    price?: number;
}

export default class ProductModel {

    private baseProduct: IProductInterface

    constructor({ id = 0, name = '', description = '', imageUrl = '', price = 0}: IProductInterface) {
        id = id > 0 ? id : new Date().getTime();
        this.baseProduct = {
            id,
            name,
            description,
            imageUrl,
            price
        };
    }


    /**
     * Get Base entity mappings
     * @return {IProductInterface}
     */
    getEntityMappings(): IProductInterface {
        return this.baseProduct;
    }
};
