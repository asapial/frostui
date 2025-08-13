import Banner from "@/Components/Home/Banner";
import ComponentCategories from "@/Components/Home/ComponentCategories";
import FeaturedCreators from "@/Components/Home/FeaturedCreators";
import NewsletterSubscription from "@/Components/Home/NewsletterSubscription";
import RecentUpdates from "@/Components/Home/RecentUpdates";
import SubscriptionModel from "@/Components/Home/SubscriptionModel";
import Testimonials from "@/Components/Home/Testimonials";
import TrendingComponents from "@/Components/Home/TrendingComponents";
import Image from "next/image";

export default function Home() {
  return (
<div>
  <Banner></Banner>
  <SubscriptionModel></SubscriptionModel>
  <ComponentCategories></ComponentCategories>
  <TrendingComponents></TrendingComponents>
  <FeaturedCreators></FeaturedCreators>
  <RecentUpdates></RecentUpdates>
  <Testimonials></Testimonials>
  <NewsletterSubscription></NewsletterSubscription>
</div>
  );
}
