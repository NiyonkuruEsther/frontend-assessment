"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ScanPackageProps {
  patientName: string;
}

const ScanPackage1 = () => {
  return (
    <div className="flex gap-12 items-center">
      <div className="relative">
        <Image
          src="/assets/blue-qr.png"
          alt="QR Scanner"
          width={300}
          height={300}
          className=" object-cover"
        />

        <button className="mt-4 w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">
          Scan Package
        </button>
      </div>

      <span className="flex items-center text-gray-500">OR</span>

      <div className="flex flex-col gap-4">
        <div className="text-gray-600">
          <p>Trouble scanning QR Code?</p>
          <p>Enter manually</p>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter Code"
            className="border border-gray-300 rounded-lg px-4 py-2 w-[300px]"
          />
        </div>

        <button
          className={`border border-blue-500 text-blue-500 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors`}
        >
          Submit Code
        </button>
      </div>
    </div>
  );
};

const ScanPackage2 = () => {
  return (
    <div>
      <Image
        src="/assets/loading-qr.png"
        alt="QR Scanner"
        width={300}
        height={300}
        className=" object-cover"
      />
      <p className="text-center">Scanning package....</p>
    </div>
  );
};

const ScanPackage3 = () => {
  return (
    <div>
      <Image
        src="/assets/checked-qr.png"
        alt="QR Scanner"
        width={300}
        height={300}
        className=" object-cover"
      />
      <p className="text-center">Package successfully scanned!</p>
    </div>
  );
};

const ScanPackage4 = () => {
  return (
    <div>
      <p className="text-opacity mb-5">Package Code</p>
      <div className="bg-tertiary-50 px-10 py-5">
        <p className="text-lg">5673AD</p>
      </div>
    </div>
  );
};

export function ScanPackage({ patientName }: ScanPackageProps) {
  const router = useRouter();
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);

  const components = [
    <ScanPackage1 key="component1" />,
    <ScanPackage2 key="component2" />,
    <ScanPackage3 key="component3" />,
    <ScanPackage4 key="component4" />
  ];

  const displayTime = 1000;

  const redirectPath = "/patients";

  useEffect(
    () => {
      if (typeof window === "undefined") return;

      const timer = setTimeout(() => {
        if (currentComponentIndex < components.length - 1) {
          setCurrentComponentIndex(prevIndex => prevIndex + 1);
        } else {
          router.push(redirectPath);
        }
      }, displayTime);

      return () => clearTimeout(timer);
    },
    [currentComponentIndex, router]
  );

  return (
    <div className="flex flex-col max-h-[50vh] items-center gap-6 py-8">
      <h2 className="text-gray-700 text-center">
        Scan a package to assign it to {patientName}
      </h2>
      {components[currentComponentIndex]}
    </div>
  );
}
