import { useState } from "react"
import ShopBanner from "../components/Shop/ShopBanner"
import ShopCategoryTabs from "../components/Shop/ShopCategoryTabs"
import ShopProducts from "../components/Shop/ShopProducts"
import { PRODUCTS } from "../data/products"

const ALL_PRODUCTS = Object.values(PRODUCTS)

// Get unique categories from products
const getCategories = () => {
  const categories = new Set()
  ALL_PRODUCTS.forEach(p => categories.add(p.category))
  return ["All products", ...Array.from(categories)]
}
const CATEGORY_LIST = getCategories()

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All products")
  const [page, setPage] = useState(1)
  const pageSize = 8

  // Filter products
  const filtered = selectedCategory === 'All products'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => p.category === selectedCategory)
  // Pagination
  const display = filtered.slice((page-1)*pageSize, page*pageSize)

  // On category change, reset to page 1
  const handleTab = (cat) => {
    setSelectedCategory(cat); setPage(1);
  }

  return (
    <>
      <ShopBanner />
      <ShopCategoryTabs selected={selectedCategory} onSelect={handleTab} categories={CATEGORY_LIST} />
      <ShopProducts products={display} page={page} setPage={setPage} pageSize={pageSize} total={filtered.length} />
    </>
  )
}


