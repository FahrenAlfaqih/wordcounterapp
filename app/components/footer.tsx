import Link from "next/link";

export default function Footer() {
  return (
    <div className="container mx-auto px-6">
      <p className="flex justify-center gap-8 mb-4">
        &copy; {new Date().getFullYear()} Your Company Name. All Rights
        Reserved.
      </p>
      <div>
        <Link
          href="/privacy-policy"
          className="flex justify-center gap-8 text-sm text-gray-400 hover:text-yellow-300 mx-2"
        >
          Privacy Policy | Term Of Service
        </Link>
      </div>
    </div>
  );
}
