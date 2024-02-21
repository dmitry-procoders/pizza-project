import Link from "next/link";
import './globals.css';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow dark:bg-gray-900">
        <div className="container px-4 lg:px-6">
          <nav className="flex items-center justify-between h-14">
            <div className="flex items-center space-x-3">
              <Link className="font-bold" href="#">
                <div />
              </Link>
              <Link
                className="font-medium underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-50"
                href="/"
              >
                Pending Orders for Kitchen
              </Link>
              <Link
                className="font-medium underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-50"
                href="/preparing"
              >
                Pizza in the Oven
              </Link>
              <Link
                className="font-medium underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-50"
                href="/pickup"
              >
                Pizza ready for pickup
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <section className="w-full py-6 md:py-12 lg:py-16 bg-gray-100">
        <div className="px-4 md:px-6">
        { children }
        </div>
      </section>
    </>
  )
}
