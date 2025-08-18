// app/page.tsx

import HomePage from './homepage/page'; // Import the HomePage component
import { fetchProducts } from './lib/saleor/queries/fetchProducts';
import './styles/global.css'

// Server component: Fetch data and pass it to the client component
const Page = async () => {
  // Fetch products server-side
  const products = await fetchProducts();

  // Pass the products data to the client-side component
  return (
    <div>
      {/* <Header/> */}
  <HomePage products={products} />
  {/* <Footer/> */}
    </div>
    
);
};

export default Page;
