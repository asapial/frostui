import Banner from "@/Components/Home/Banner";
import ComponentCategories from "@/Components/Home/ComponentCategories";
import SubscriptionModel from "@/Components/Home/SubscriptionModel";
import Image from "next/image";

export default function Home() {
  return (
<div>
  <Banner></Banner>
  <SubscriptionModel></SubscriptionModel>
  <ComponentCategories></ComponentCategories>
</div>
  );
}
