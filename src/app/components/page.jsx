import SectionContainer from "@/Utils/SectionContainer";

import ComponentsClient from "./ComponentsClient";
import { dbConnect } from "@/lib/dbConnect";


export default async function ComponentsPage() {
  const collection = await dbConnect("componentsCollection");
  const data = await collection.find({}).toArray();

  // Convert MongoDB ObjectIds to strings
  const components = data.map(item => ({
    ...item,
    _id: item._id.toString(),
  }));

  return (
    <SectionContainer className="bg-gray-900">
      <ComponentsClient initialComponents={components} />
    </SectionContainer>
  );
}
