import jwt from 'jsonwebtoken'
import { Response } from 'express';
const createJWT = (userToken:any) => {
    const token = jwt.sign(userToken,String(process.env.JWT_SECRET),{expiresIn:'1d'});
    return token;
}

const attachCookieToResponse = (res:Response,userToken:any) => {
    const token = createJWT(userToken);
    res.cookie('token',token,{
        httpOnly:true,
        expires:new Date(Date.now() + 1000*60*60*24),
        secure:process.env.NODE_ENV === 'production',
        signed:true
    })
}

const isTokenValid = (token:string) => jwt.verify(token,String(process.env.JWT_SECRET));

export {
    createJWT,
    attachCookieToResponse,
    isTokenValid
}
