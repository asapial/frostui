"use server";
import { collectionList, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function getMyComponent(email) {
  const res = await (await dbConnect(collectionList.componentsCollection))
    .find({ creatorEmail: email })
    .toArray();

  console.log(res);

  const data = res.map((component) => ({
    ...component,
    _id: component._id.toString(),
  }));

  console.log(data);

  return data;
}

export async function deleteMyComponent(id) {
  const res = await (await dbConnect(collectionList.componentsCollection)).deleteOne({_id:new ObjectId(id)});

  console.log(res);


  return res;
}
