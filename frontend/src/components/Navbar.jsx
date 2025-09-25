export default function Navbar() {
  return (
    <header className="bg-orange-400 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold">🍬 Sweet Shop</h1>

        {/* Navigation */}
        <nav className="space-x-6">
          <a href="/home" className="hover:text-orange-300">Home</a>
          <a href="/products" className="hover:text-orange-300">Products</a>
          <a href="/about" className="hover:text-orange-300">About</a>
          <a href="/contact" className="hover:text-orange-300">Contact</a>
        </nav>
      </div>
    </header>
  );
}
