import Link from "next/link"
import './global.css'

export default function Component({children}: {children: React.ReactNode}) {
  return (
    <div>
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
                Home
              </Link>
              <Link
                className="font-medium underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-50"
                href="/cart"
              >
                Cart
              </Link>
              {/* <Link
                className="font-medium underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-50"
                href="/order"
              >
                Order status
              </Link> */}
            </div>
          </nav>
        </div>
      </header>
      <section className="w-full py-12 md:py-24 lg:py-32">
       {children}
      </section>
    </div>
  )
}
