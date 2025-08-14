"use server";

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

const handleRegister=async (payload)=>{

const userCursor=await dbConnect('userCollection');
const isPreviousUser= await userCursor.findOne({email:payload.email});

if(Boolean(isPreviousUser)){
    return {isCreated:false};
}

const hashPassword= await bcrypt.hash(payload.password, 10);
payload.password=hashPassword;
payload.role="user";
payload.status='active';
payload.createdAt= new Date();

const user = await userCursor.insertOne(payload);
const isCreated=true;

if(user.acknowledged){
    return {insertedId:user.insertedId,isCreated};
}
else
{
    return {isCreated:false};
}
console.log(payload, user);

}

export default handleRegister;