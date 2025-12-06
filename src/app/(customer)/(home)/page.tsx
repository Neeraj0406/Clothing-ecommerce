import { Footer } from "@/app/components/footer/footer";
import { Header } from "@/app/components/header/header";

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Silk Summer Dress',
      price: '$89',
      tag: 'New',
      image: '/products/dress-1.jpg',
    },
    {
      id: 2,
      name: 'Minimal Leather Bag',
      price: '$120',
      tag: '-20%',
      image: '/products/bag-1.jpg',
    },
    {
      id: 3,
      name: 'Oversized Denim Jacket',
      price: '$110',
      tag: 'Trending',
      image: '/products/jacket-1.jpg',
    },
    {
      id: 4,
      name: 'Classic White Sneakers',
      price: '$99',
      tag: 'Bestseller',
      image: '/products/shoes-1.jpg',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      {/* Navbar */}
    <Header/>

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-12 md:flex-row md:py-16">
        <div className="w-full space-y-6 md:w-1/2">
          <p className="inline-flex items-center rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-pink-700">
            New drop • Summer ‘25
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-purple-900 sm:text-5xl">
            Elevate your daily style with curated fashion.
          </h1>
          <p className="max-w-md text-sm text-gray-600 sm:text-base">
            Discover handpicked pieces from emerging designers and iconic brands,
            tailored for your everyday moments and special nights out.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#featured"
              className="rounded-full bg-gradient-to-r from-pink-400 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-pink-500 hover:to-purple-600"
            >
              Shop new arrivals
            </a>
            <button className="text-sm font-medium text-purple-800 hover:underline">
              Explore lookbook
            </button>
          </div>
          <div className="flex items-center gap-6 pt-2 text-xs text-gray-500 sm:text-sm">
            <div>
              <p className="font-semibold text-purple-800">Free shipping</p>
              <p>On orders over $80</p>
            </div>
            <div>
              <p className="font-semibold text-purple-800">Easy returns</p>
              <p>30-day return policy</p>
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-1/2">
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-pink-200 blur-2xl" />
          <div className="absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-purple-200 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-purple-900 via-purple-700 to-pink-500 p-1 shadow-2xl">
            <div className="flex h-full w-full flex-col justify-between rounded-3xl bg-[url('/hero-fashion.jpg')] bg-cover bg-center bg-no-repeat p-5 sm:p-7">
              <div className="flex items-center justify-between text-xs text-white/80">
                <span className="rounded-full bg-white/15 px-3 py-1">
                  Curated Looks
                </span>
                <span>Over 500+ styles</span>
              </div>
              <div className="mt-16 max-w-xs rounded-2xl bg-white/80 p-4 text-xs text-gray-800 backdrop-blur-sm sm:text-sm">
                <p className="font-semibold text-purple-900">
                  “Feels like scrolling a designer\'s private wardrobe.”
                </p>
                <p className="mt-1 text-gray-600">– Happy customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section
        id="featured"
        className="mx-auto max-w-6xl px-4 pb-16 pt-4 md:pt-0"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-purple-900">
              Featured picks
            </h2>
            <p className="text-sm text-gray-500">
              Hand-selected styles trending this week.
            </p>
          </div>
          <button className="text-sm font-medium text-purple-700 hover:underline">
            View all
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-pink-50 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-purple-800">
                  {product.tag}
                </span>
                <button className="absolute bottom-3 right-3 rounded-full bg-white/90 p-2 text-gray-800 shadow-sm hover:bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 6h12m-7-6v6m4-6v6"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-1 px-4 py-3">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm font-medium text-purple-800">
                  {product.price}
                </p>
                <button className="mt-1 w-full rounded-full border border-purple-100 bg-purple-50 py-1.5 text-xs font-semibold text-purple-800 transition group-hover:bg-purple-600 group-hover:text-white">
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer/>
    </main>
  );
}
