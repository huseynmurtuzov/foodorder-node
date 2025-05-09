import { UnauthenticatedError } from '../errors/unauthenticated';
import { UnauthorizedError } from '../errors/unauthorized';
import {isTokenValid} from '../utils/functions/jwtFunctions';
import { NextFunction, Request,Response } from 'express';
const authenticateUser = async(req:any,res:Response,next:NextFunction) => {
    const token = req.signedCookies.token;
    if(!token){
        throw new UnauthorizedError("Authentication Invalid");
    }
    try {
        const {name,userId,role} = token;
        req.user = {name,userId,role};
        next()
    } catch (error) {
        throw new UnauthenticatedError("Authentication Invalid")
    }
}

const authorizePermissions = (...roles:any) => {
    return (req:any,res:Response,next:NextFunction) => {
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError("Unauthorized to access this route")
        }
        next();
    }
}

export  {
    authenticateUser,
    authorizePermissions
}
