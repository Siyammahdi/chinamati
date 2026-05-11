import Hero from '../components/Home/Hero'
import ProductSlider from '../components/Home/ProductSlider'
import ProductGrid from '../components/Home/ProductGrid'
import SubscribeBanner from '../components/Home/SubscribeBanner'
import BrandFeature from '../components/Home/BrandFeature'
import Reviews from '../components/Home/Reviews'
import ChallengeBanner from '../components/Home/ChallengeBanner'
import FeatureBar from '../components/Home/FeatureBar'

export default function Home() {
  return (
    <>

      <Hero />
      <FeatureBar />
      <ProductGrid />
      <ProductSlider />
      <SubscribeBanner />
      <BrandFeature />
      <Reviews />
      <ChallengeBanner />
    </>
  )
}
