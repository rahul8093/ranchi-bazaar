import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Logo + tagline */}
        <div>
          <Link href="/" className="text-2xl font-bold text-white">
            Ranchi Bazaar
          </Link>
          <p className="mt-2 text-sm text-gray-400">
            Your one-stop shop for everything awesome.
          </p>
        </div>

        {/* Column 2: Shop Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-white">All Products</Link></li>
            <li><Link href="/collections/sale" className="hover:text-white">Sale</Link></li>
            <li><Link href="/collections/new" className="hover:text-white">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
          </ul>
        </div>

        {/* Column 4: Social / Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-3">Stay Connected</h4>
          <p className="text-sm mb-3 text-gray-400">Subscribe to our newsletter for updates.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md text-sm text-black"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Ranchi Bazaar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
