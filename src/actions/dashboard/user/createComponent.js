'use server';
import { collectionList, dbConnect } from "@/lib/dbConnect";



const handleCreateComponent =async (payload)=>{

    console.log("Creating component with payload:", payload);

    try {
        
        const componentCursor= await dbConnect(collectionList.componentsCollection);
        const res =await componentCursor.insertOne(payload);
        console.log("Component creation result:", res);
        return {isCreated:true};
    } catch (error) {
        
    }
}


export default handleCreateComponent;