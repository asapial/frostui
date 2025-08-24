"use server";

import { collectionList, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// Fetch a component by ID
export async function getComponentById(id) {
  const res = await (
    await dbConnect(collectionList.componentsCollection)
  )
    .find({ _id: new ObjectId(id) })
    .toArray();

  console.log(res);

  const data = res.map((component) => ({
    ...component,
    _id: component._id.toString(),
  }));

  console.log(data);

  return data;
}

// Update a component by ID
export async function updateComponent(id, updatedData) {
  try {
    const collection = await dbConnect(collectionList.componentsCollection);

    // Make sure _id is not overwritten
    const { _id, ...dataToUpdate } = updatedData;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) }, // filter by ID
      { $set: dataToUpdate } // update fields
    );

    if (result.modifiedCount > 0) {
      return { success: true, message: "Component updated successfully" };
    } else {
      return { success: false, message: "No changes made to the component" };
    }
  } catch (error) {
    console.error("Update failed:", error);
    return { success: false, message: "Update failed", error };
  }
}
