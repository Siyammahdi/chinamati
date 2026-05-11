import FeatureBar from '../Home/FeatureBar'

export default function ShopBanner() {
  return (
    <div className='max-w-[1600px] mx-auto py-8 sm:py-12'>
      <div className='px-4 sm:px-6 lg:px-8 text-center'>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 mb-4'>Shop Our Products</h1>
        <p className='text-lg text-neutral-600 max-w-2xl mx-auto'>Discover our collection of premium gadgets and accessories designed for your modern lifestyle.</p>
      </div>
      <FeatureBar />
    </div>
  )
}
