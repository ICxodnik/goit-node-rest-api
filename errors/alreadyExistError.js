export class AlreadyExistError extends Error {
    constructor(message = "Conflict") {
        super(message);
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
    }
}
