import Link from "next/link"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <>
      <div className="bg-gray-50/90 w-full py-6">
        <div className="container flex items-center justify-center px-4 text-gray-100 md:px-6">
          <div className="space-x-4">
            <Link className="text-sm font-medium hover:underline" href="#">
              Home
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              Pricing
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              Contact Sales
            </Link>
          </div>
          <div className="flex-1" />
          <div className="space-x-4">
            <Link className="text-sm font-medium hover:underline" href="#">
              Documentation
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              GitHub
            </Link>
            <Link className="inline-flex text-sm font-medium underline hover:no-underline" href="#">
              <span className="hidden md:inline">Contact</span>
              <div className="w-5 h-5 ml-2.5" />
            </Link>
          </div>
        </div>
      </div>
      <header className="w-full py-4 md:py-6">
        <div className="container flex items-center justify-center px-4 md:px-6">
          <Link className="inline-flex items-center space-x-2" href="#">
            {/* <PizzaIcon className="h-6 w-6" /> */}
            <span className="font-bold tracking-tighter text-2xl sm:text-3xl">Pizza Now</span>
          </Link>
        </div>
      </header>
      <main className="w-full py-6 md:py-12">
        <div className="container grid items-start gap-4 px-4 text-center md:gap-8 md:px-6 lg:grid-cols-3 lg:text-left">
          <div className="space-y-4 border rounded-xl overflow-hidden divide-y dark:divide-gray-800">
            <div className="grid grid-cols-2 items-center p-4">
              <h3 className="text-lg font-bold">Size</h3>
              <div className="w-full max-w-[200px] justify-self-start">
                <div>Small</div>
                <div>Medium</div>
                <div>Large</div>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center p-4">
              <h3 className="text-lg font-bold">Type</h3>
              <div className="w-full max-w-[200px] justify-self-start">
                <div>Cheese</div>
                <div>Pepperoni</div>
                <div>Veggie</div>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center p-4">
              <h3 className="text-lg font-bold">Toppings</h3>
              {/* <Checkbox id="pepperoni" label="Pepperoni" value="pepperoni" />
              <Checkbox id="mushrooms" label="Mushrooms" value="mushrooms" />
              <Checkbox id="onions" label="Onions" value="onions" /> */}
            </div>
          </div>
          <div className="space-y-4 md:col-span-2">
            <img
              alt="Pizza"
              className="aspect-[4/3] overflow-hidden rounded-lg object-cover object-center mx-auto"
              height="400"
              src="/placeholder.svg"
              width="600"
            />
          </div>
        </div>
      </main>
      <footer className="w-full py-6">
        <div className="container flex items-center justify-center gap-4 px-4 text-center md:px-6">
          {/* <Button size="lg">Submit Order</Button> */}
        </div>
      </footer>
    </>
  )
}

// function PizzaIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M15 11h.01" />
//       <path d="M11 15h.01" />
//       <path d="M16 16h.01" />
//       <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16" />
//       <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4" />
//     </svg>
//   )
// }
