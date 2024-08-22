import Hero from '@/components/Hero';
import Infoboxes from '@/components/Infoboxes';
import HomeProperty from '@/components/HomeProperty';
import FeaturedProperties from '@/components/FeaturedProperties';

const HomePage = () => {

  return (
    <div>
      <Hero />
      <Infoboxes />
      <FeaturedProperties />
      <HomeProperty />
    </div>
  )
}

export default HomePage
