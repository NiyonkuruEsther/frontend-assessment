"use client";
import Link from "next/link";
import MainNav from "../navbar";
import SideContentMainContentLayout from "./SidebarContentLayout";
import { usePathname } from "next/navigation";
import PatientInfo, { PatientInfoProps } from "../PatientInfo";
import { PatientProvider } from "@/contexts/PatientContext";

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
  children,
  patientData
}: {
  children: React.ReactNode;
  patientData?: PatientInfoProps;
}) {
  // const router = useRouter();
  const pathname = usePathname();
  return (
    <main className="h-screen w-full overflow-scroll">
      <PatientProvider>
        <header className="bg-white">
          <MainNav />
        </header>
        <div className="flex max-w-7xl mx-auto justify-between">
          {pathname.includes("assign-package")
            ? <PatientInfo patientData={patientData} />
            : <SideContentMainContentLayout
                SideComponent={<PatientNavigation />}
              />}
          {children}
        </div>
      </PatientProvider>
    </main>
  );
}
