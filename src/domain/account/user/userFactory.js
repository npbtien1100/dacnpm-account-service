import { User } from './userDomainModel';

export const createUser = async (data) => {
    const user = joi.object({
        phone: joi.optional(),
        address: joi.string().optional(),
        password: joi.string().required(),
        email: joi.string().email().required(),
        fullName: joi.string().min(2).max(50).required(),
    });

    const newUser = {
        info: {},
        Message: "",
        error: false
    };
    const validationResult = user.validate(data);

    if (validationResult.error) {
        newUser.error = true
        newUser.Message = validationResult.error.details[0].message;
    } else {
        newUser.info = new User(
            data.email,
            data.password,
            data.fullName,
            data.phone,
            data.address,
        );
    }
    return newUser;
}