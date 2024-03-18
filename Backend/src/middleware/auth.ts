import { Request,Response,NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { IncomingHttpHeaders } from 'http';
import jwt from "jsonwebtoken"
import User from "../models/user";
// jwtCheck - check the authorization header or bearer token 

declare global { 
    namespace Express{ 
        interface Request{ 
            userId:string, 
            auth0Id:string 
        }
    }
}
//custom properties for express     
export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL:process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  }); 

export const jwtParse=async(req:Request, res:Response, next: NextFunction)=>{ 
    const { authorization} =req.headers 
    if( !authorization || !authorization.startsWith("Bearer")){ 
        return res.sendStatus(401)
    }  
    const token=authorization.split(" ")[1]; 

    //get token 
    try { 
        const decoded=jwt.decode(token) as jwt.JwtPayload //decode the token  
        const auth0Id=decoded.sub; 
        const user=await User.findOne({auth0Id}) 
        if(!user){ 
            return res.sendStatus(401); 

        }
        req.auth0Id=auth0Id as string ; 
        req.userId=user._id.toString() 
        next() //call the next function that we finish the middleware
    }catch(error){ 
        return res.sendStatus(401) 
    }
    

}