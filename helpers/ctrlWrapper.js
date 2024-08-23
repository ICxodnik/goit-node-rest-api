import { ItemNotFoundError } from "../errors/itemNotFoundError.js";
import httpError from "../errors/httpError.js";

const ctrlWrapper = (ctrl) => {
    const func = async (req, res, next) => {
        try {
            await ctrl(req, res, next);
        } catch (error) {
            switch (true) {
                case error instanceof ItemNotFoundError:
                    next(httpError(404, error.message));
                    break;
                default:
                    next(error);
            }
        }
    };

    return func;
};

export default ctrlWrapper;
