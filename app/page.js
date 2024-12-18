import Hero from '@/components/Hero';
import HomeMealsPage from '@/components/HomeMeals';
import InfoBoxes from '@/components/InfoBoxs';
import HomeSection from '@/components/HomeSection';
import CustomerReviews from '@/components/ReviewHome';

export default function Home() {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeMealsPage />
      <HomeSection />
      <CustomerReviews />
    </>
  );
}
