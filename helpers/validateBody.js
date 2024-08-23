import httpError from "../errors/httpError.js";

const validateBody = (schema) => {
    const func = (req, _, next) => {
        const { error, value } = schema.validate(req.body, { allowUnknown: true, stripUnknown: true });
        if (error) {
            return next(httpError(400, error.message));
        }
        req.body = value;
        next();
    };

    return func;
};

export default validateBody;
