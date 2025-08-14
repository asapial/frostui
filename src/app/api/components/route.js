import { dbConnect } from "@/lib/dbConnect";


export async function GET() {
  const collection = await dbConnect("componentsCollection");
  const items = await collection.find({}).toArray();
// const items={data:'hi abdullah'};
  console.log("items : ",items);
  return Response.json({ items })
}

export async function POST(req) {
  const collection = await dbConnect("componentsCollection");
  const result = await collection.insertOne(await req.json());
  console.log("Inserted:", result);
  return Response.json({ result });
}