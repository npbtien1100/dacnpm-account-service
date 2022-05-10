class SellerSequelize extends BaseSequelize {
    constructor() {
        super(sellerModel);
        autoBind(this);
    }
}

export default SellerSequelize;