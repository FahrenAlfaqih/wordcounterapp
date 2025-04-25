import Link from "next/link";

export default function Navbar() {
  return (
    <nav className=" text-white shadow-md mt-4">
      <div className="container mx-auto px-6 py-4">
        <ul className="flex justify-center gap-8 text-lg font-semibold">
          <li>
            <Link href="/" className="hover:text-yellow-300 transition-colors">Home</Link>
          </li>
          <li>
            <Link href="/guide" className="hover:text-yellow-300 transition-colors">Panduan</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}
