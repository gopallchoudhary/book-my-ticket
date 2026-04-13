class ApiError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }

    static unauthorized(message = 'unauthorized') {
        return new ApiError(401, message)
    }

    static notFound(message = 'not found') {
        return new ApiError(404, message) 
    }

    static badRequest(message = 'bad request') {
        return new ApiError(400, message)
    }

    static forbidden(message = 'forbidden') {
        return new ApiError(403, message)
    }

    static conflcit(message = 'conflict') {
        return new ApiError(409, message)
    }

    static notImplemented(message = 'not implemented') {
        return new ApiError(501, message)
    }

    static internalServerError(message = 'internal server error') {
        return new ApiError(500, message)
    }
}


export default ApiError