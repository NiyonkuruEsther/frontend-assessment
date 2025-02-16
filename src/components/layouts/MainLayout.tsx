// app/layout.tsx

import Link from "next/link";
import MainNav from "../navbar";
import SideContentMainContentLayout from "./SidebarContentLayout";

function PatientNavigation() {
  const Links = ["Patient", "Rider's Profile", "Delivery History"];
  return (
    <div className=" bg-white">
      <ul className="flex flex-col gap-4">
        {Links.map(link =>
          <Link
            href={`/empty/${link
              .toLowerCase()
              .replace(/[']/g, "")
              .replace(/\s+/g, "-")}`}
            key={link}
          >
            <li
              className={`p-5 pl-10 pr-24 text-nowrap ${link ===
                "Rider's Profile" &&
                "bg-primary/20 text-primary font-bold border-r-4 border-primary"}`}
            >
              {link}
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
}
export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-screen w-full overflow-scroll">
      <header className="bg-white">
        <MainNav />
      </header>
      <div className="flex justify-between">
        <SideContentMainContentLayout SideComponent={<PatientNavigation />} />
        {children}
      </div>
    </main>
  );
}
