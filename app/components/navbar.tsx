import Link from "next/link";

export default function Navbar() {
  return (
    <nav className=" text-white shadow-md mt-4 bg-white rounded-2xl ml-2.5 mr-2.5">
      <div className="container mx-auto px-6 py-4">
        <ul className="flex justify-end gap-8 text-lg font-semibold">
          <li>
            <Link
              href="/"
              className="text-black hover:text-blue-950 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/guide"
              className="text-black  hover:text-blue-950 transition-colors"
            >
              Panduan
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
