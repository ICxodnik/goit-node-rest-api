export class ItemNotFoundError extends Error {
    constructor(itemId) {
        const message = "Not found";
        super(message);
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        this.itemId = itemId;
    }
}
