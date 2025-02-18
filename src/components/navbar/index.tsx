// components/MainNav.tsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { PiCirclesFourLight } from "react-icons/pi";
import { MdDeliveryDining } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { TbMotorbike } from "react-icons/tb";
import { IoPersonSharp } from "react-icons/io5";
import Button from "../shared/Button";
import AddIcon from "../../../public/assets/AddIcon";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: <PiCirclesFourLight />, label: "Overview", href: "/empty/dashboard" },
  {
    icon: <MdDeliveryDining />,
    label: "Deliveries",
    href: "/empty/deliveries"
  },
  { icon: <IoIosPeople />, label: "Patients", href: "/patients" },
  {
    icon: <TbMotorbike />,
    label: "Dispatch Riders",
    href: "/empty/dispatch-riders"
  },
  { icon: <IoPersonSharp />, label: "Admin", href: "/empty/admin" }
];

export default function MainNav() {
  const pathname = usePathname();
  const [headingUrl, setheadingUrl] = useState("");
  const [nextDeliveryInfo, setNextDeliveryInfo] = useState<string | null>(null);
  const router = useRouter();

  useEffect(
    () => {
      const paths = pathname.split("/").filter(Boolean);

      if (paths.length >= 1) {
        // Start with the first path segment
        let formattedUrl = paths[0].charAt(0).toUpperCase() + paths[0].slice(1);

        // Add each subsequent path segment with proper formatting
        for (let i = 1; i < paths.length; i++) {
          const formattedSegment = paths[i]
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          formattedUrl += ` / ${formattedSegment}`;
        }

        setheadingUrl(formattedUrl);
      } else {
        setheadingUrl("");
      }

      console.log(pathname);

      if (
        pathname.includes("/patients/") &&
        pathname.includes("view") &&
        !pathname.includes("assign")
      ) {
        setNextDeliveryInfo(
          "Patient's next delivery date is 14th November 2020, in 2 days"
        );
      } else {
        setNextDeliveryInfo(null);
      }
    },
    [pathname]
  );

  return (
    <div className="w-full border-b bg-white mb-10">
      <div className="">
        <div className="max-w-7xl px-4  mx-auto  flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex-shrink-0">
            <Image
              src="/assets/hosp-logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          <nav className="flex-1 flex items-center justify-center px-8">
            <div className="relative">
              <div className="flex space-x-8">
                {navItems.map(item => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex items-center px-3 py-4 text-sm font-medium relative
                        ${isActive
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-gray-700"}
                      `}
                    >
                      <span className="mr-2">
                        {item.icon}
                      </span>
                      {item.label}
                      {isActive &&
                        <div className="absolute -bottom-[6px] left-0 w-full h-0.5 bg-blue-600 transition-all duration-300" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          <div className="flex items-center">
            <div className="flex items-center">
              <Image
                src="/assets/JohnDoe.png"
                alt="Emmanuel Adigwe"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                Emmanuel Adigwe
              </span>
              <button className="ml-2">
                <span className="text-gray-400">▼</span>
              </button>
            </div>
          </div>
        </div>

        <hr className="w-screen" />

        <div className=" max-w-7xl px-4  mx-auto  flex items-center justify-between py-4">
          {headingUrl &&
            <div className="text-sm text-gray-500">
              {headingUrl}
            </div>}
          {nextDeliveryInfo &&
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {nextDeliveryInfo}
              </span>
              <div>
                <Button
                  onClick={() =>
                    router.push(`/patients/view-patient/assign-package-to-patient`)}
                  variant="filled"
                >
                  Assign Package to Patient
                </Button>
              </div>
            </div>}

          {pathname === "/patients" &&
            <div className="flex w-full items-center justify-between">
              <p>Patients</p>
              <div>
                <Button prefixIcon={AddIcon}>Add patient</Button>
              </div>
            </div>}
        </div>
      </div>
    </div>
  );
}
