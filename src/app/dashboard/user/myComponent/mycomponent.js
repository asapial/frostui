"use server";
import { collectionList, dbConnect } from "@/lib/dbConnect";

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
