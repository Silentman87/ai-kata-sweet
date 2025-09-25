export default function Footer() {
  return (
    <footer className="bg-indigo-400 text-gray-300 mt-10 ">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-800">
        <p className="mb-2 text-gray-800">© {new Date().getFullYear()} Sweet Shop. All rights reserved.</p>
        <div className="space-x-4">
          <a href="/privacy" className="hover:text-white text-black">Privacy Policy</a>
          <a href="/terms" className="hover:text-white text-black">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
