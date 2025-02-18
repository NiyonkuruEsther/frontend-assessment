"use client";
import { useState } from "react";
import Image from "next/image";

interface ScanPackageProps {
  patientName: string;
}

export function ScanPackage({ patientName }: ScanPackageProps) {
  const [manualCode, setManualCode] = useState("");

  return (
    <div className="flex flex-col max-h-[50vh] items-center gap-6 py-8">
      <h2 className="text-gray-700 text-center">
        Scan a package to assign it to {patientName}
      </h2>

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

        <div className="flex flex-col">
          <div className="h-full" />
          <span className="flex items-center text-gray-500">OR</span>
          <div className="h-full border border-x" />
          <div />
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-gray-600">
            <p>Trouble scanning QR Code?</p>
            <p>Enter manually</p>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={manualCode}
              onChange={e => setManualCode(e.target.value)}
              placeholder="Enter Code"
              className="border border-gray-300 rounded-lg px-4 py-2 w-[300px]"
            />
          </div>

          <button
            className={`border border-blue-500 text-blue-500 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors ${!manualCode
              ? "opacity-50 cursor-not-allowed"
              : ""}`}
            disabled={!manualCode}
          >
            Submit Code
          </button>
        </div>
      </div>
    </div>
  );
}
