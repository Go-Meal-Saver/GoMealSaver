import Hero from '@/components/Hero';
import HomeMealsPage from '@/components/HomeMeals';
import InfoBoxes from '@/components/InfoBoxs';
import HomeSection from '@/components/HomeSection';
import TestimonialSection from '@/components/TestimonialPage';

export default function Home() {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeMealsPage />
      <HomeSection />
      <TestimonialSection />
    </>
  );
}
