import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "./custom-api";

export class UnauthorizedError extends CustomAPIError{
    constructor(message:string){
        super(message);
            this.statusCode = StatusCodes.FORBIDDEN
    }
}


