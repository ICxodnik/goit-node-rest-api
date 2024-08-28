import { ApiError } from "../errors/ApiError.js";
import { AppError, errorTypes } from "../errors/AppError.js";

const ctrlWrapper = (ctrl) => {
    const func = async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            if (error instanceof ApiError) {
                return next(ApiError(error.statusCode, error.message));
            }
            if (error instanceof AppError) {
                switch (error.errorType) {
                    case errorTypes.ALREADY_EXIST:
                        next(new ApiError(409, error.message));
                        break;
                    case errorTypes.NOT_FOUND:
                        next(new ApiError(404, error.message));
                        break;
                    case errorTypes.INVALID_CRED:
                        next(new ApiError(401, error.message));
                        break;
                    case errorTypes.INVALID_TOKEN:
                        next(new ApiError(401, error.message));
                        break;
                    default:
                        next(error);
                }
                return;
            }
            next(error);
        }
    };

    return func;
};

export default ctrlWrapper;
