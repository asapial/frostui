const { dbConnect, collectionList } = require("@/lib/dbConnect")


const getDataFromComponentsCollection= async (email) => {

    try {
        
        const collectionCursor= await dbConnect(collectionList.componentsCollection);
        const data =await collectionCursor.find({creatorEmail:email, privacy:'private'}).toArray();
        return data;
    } catch (error) {
        
    }
}


export default getDataFromComponentsCollection;