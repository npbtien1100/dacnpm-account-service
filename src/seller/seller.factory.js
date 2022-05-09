import joi from "@hapi/joi";

import { Seller } from "./seller.domainModel";

const createSeller = (data) => {
    const Seller = joi.object({
        phone: joi.optional(),
        address: joi.string().optional(),
        password: joi.string().required(),
        email: joi.string().email().required(),
        fullName: joi.string().min(2).max(50).required(),
    });

    const newSeller = {
        info: {},
        errMessage: '',
    };
    const validationResult = Seller.validate(data);

    if (validationResult.error) {
        console.log(validationResult.error.details[0].message);
        newSeller.errMessage = validationResult.error.details[0].message;
    } else {
        newSeller.info = new Seller(data.email, data.password, data.fullName, data.phone, data.address);
        newSeller.message = 'Seller created successfully';
    }

    return newSeller;
}

export { createSeller };