const wrapResponse = {
    success: (statusCode, body) => {
        return {
            status: 'success',
            statusCode,
            result: body
        }
    }, 
    error: (statusCode, message) => {
        return {
            statusCode,
            status: 'error',
            message
        }
    }
}

export default wrapResponse;