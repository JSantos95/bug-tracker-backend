class ErrorResponse extends Error {
    message: any;
    statusCode: any;

    constructor(message: any, statusCode: any) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;