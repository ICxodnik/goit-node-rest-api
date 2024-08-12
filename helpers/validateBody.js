import HttpError from "./HttpError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(HttpError(422, error.message));
    }
    req.body = value;
    next();
  };

  return func;
};

export default validateBody;
