class apiError extends Error{
    constructor(
        statusCode,
        message="Something Went wrong",
        errors=[],
        stack = ""
    ){
        super(message)
        this.ststusCode= statusCode
        this.data = null,
        yhis.message = message ,
        this.success = false;
        this.errors = errors

        if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this, thhis.constructor)
        }
    }
}

export {apiError}