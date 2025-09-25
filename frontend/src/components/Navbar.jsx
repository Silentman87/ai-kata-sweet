export default function Navbar() {
  return (
    <header className="bg-gradient-to-r from-indigo-400 ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-lg">
          🍬 Sweet Shop
        </h1>

        {/* Navigation */}
        <nav className="space-x-6 text-lg font-medium">
          <a 
            href="/home" 
            className="transition-colors duration-300 hover:text-yellow-200"
          >
            Home
          </a>
          <a 
            href="/products" 
            className="transition-colors duration-300 hover:text-yellow-200"
          >
            Products
          </a>
          <a 
            href="/about" 
            className="transition-colors duration-300 hover:text-yellow-200"
          >
            About
          </a>
          <a 
            href="/contact" 
            className="transition-colors duration-300 hover:text-yellow-200"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
