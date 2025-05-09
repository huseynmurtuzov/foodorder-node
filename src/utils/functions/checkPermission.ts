import { UnauthorizedError } from "../../errors/unauthorized";

export const checkPermission = (requestingUser:any,sourceUserId:any)=>{
    if(requestingUser.role == 'admin') return
    if(requestingUser.userId == sourceUserId.toString()) return;
    throw new UnauthorizedError("You cant access that data!")
}
