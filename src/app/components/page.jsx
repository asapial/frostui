import SectionContainer from "@/Utils/SectionContainer";

import ComponentsClient from "./ComponentsClient";
import { dbConnect } from "@/lib/dbConnect";


export default async function ComponentsPage() {
  const collection = await dbConnect("componentsCollection");
  // Only fetch necessary fields and limit the number of components
  const data = await collection.find({}).limit(50).toArray();

  // Convert MongoDB ObjectIds to strings and only include necessary fields
  const components = data.map(item => ({
    _id: item._id.toString(),
    title: item.title,
    category: item.category,
    price: item.price,
    downloads: item.downloads,
    previewCode: item.previewCode,
    date: item.date
  }));

  return (
      <ComponentsClient initialComponents={components} />
  );
}
