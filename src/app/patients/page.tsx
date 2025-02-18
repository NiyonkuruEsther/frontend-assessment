"use client";
import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import Badge from "../../components/shared/Badge";
import Button from "../../components/shared/Button";
import InputField from "../../components/shared/InputField";
import Select from "../../components/shared/Select";
import SerachIcon from "../../../public/assets/SearchIcon";
import MainNav from "@/components/navbar";
import { usePatient } from "@/contexts/PatientContext";

interface PatientInfo {
  hospitalId: string;
  patientName: string;
  phoneNumber: string;
  nextDeliveryDate: string;
  location: string;
  status: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  deliveryAddress?: string;
}

enum Status {
  completed,
  duePaid,
  dueUnpaid,
  assigned,
  paid
}

function generateBadge(
  status: Status
): ["info" | "success" | "warning" | "error", string] {
  switch (status) {
    case Status.completed:
      return ["success", "Completed"];
    case Status.duePaid:
      return ["warning", "Due & Paid"];
    case Status.dueUnpaid:
      return ["error", "Due & Unpaid"];
    case Status.assigned:
      return ["info", "Assigned"];
    case Status.paid:
      return ["success", "Completed"];
    default:
      return ["info", "Assigned"];
  }
}

const StatusArray = [
  Status.completed,
  Status.duePaid,
  Status.dueUnpaid,
  Status.assigned,
  Status.paid
];

const defaultData: PatientInfo[] = Array(50).fill(1).map((_, index) => ({
  hospitalId: "1AFHiiiiiH093",
  patientName: "Oluwaseun Aregbesola Omotoye",
  phoneNumber: "+2347068642920",
  nextDeliveryDate: "12th September 2020",
  location: "Vl, Lagos",
  status: StatusArray[index % 5],
  email: "patient@example.com",
  firstName: "Oluwaseun",
  lastName: "Omotoye",
  gender: "Male",
  deliveryAddress: "Vl, Lagos"
}));

const columnHelper = createColumnHelper<PatientInfo>();

const ViewCell = ({ patient }: { patient: PatientInfo }) => {
  const { handleViewPatient } = usePatient();
  const [badgeVariant, badgeText] = generateBadge(patient.status as Status);

  return (
    <div className="flex justify-between">
      <Badge variant={badgeVariant} text={badgeText} className="!w-fit" />
      <Button
        onClick={() => handleViewPatient(patient)}
        variant="outlined"
        className="!w-fit"
      >
        View
      </Button>
    </div>
  );
};

const columns = [
  columnHelper.accessor("hospitalId", {
    cell: info =>
      <i>
        {info.getValue()}
      </i>,
    header: () => <span>Hospital Id</span>
  }),
  columnHelper.accessor("patientName", {
    cell: info =>
      <i>
        {info.getValue()}
      </i>,
    header: () => <span>{`Patient's Name`}</span>
  }),
  columnHelper.accessor("phoneNumber", {
    cell: info =>
      <i>
        {info.getValue()}
      </i>,
    header: () => <span>Phone Number</span>
  }),
  columnHelper.accessor("nextDeliveryDate", {
    cell: info =>
      <i>
        {info.getValue()}
      </i>,
    header: () => <span>Next Delivery Date</span>
  }),
  columnHelper.accessor("location", {
    cell: info =>
      <i>
        {info.getValue()}
      </i>,
    header: () => <span>Location</span>
  }),
  columnHelper.accessor("status", {
    cell: info => {
      const patient = info.row.original;
      return <ViewCell patient={patient} />;
    },
    header: () => <span>Status</span>
  })
];

export default function One() {
  const [data] = useState(() => [...defaultData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="w-full mx-auto">
      <MainNav />
      <hr className="my-5 bg-[#CFCFCF]" />

      <div className="flex pb-[42px] max-w-7xl mx-auto p-10 bg-white items-center justify-between">
        <div className="flex gap-[13px] items-center">
          <span className="text-sm text-opacity">Sort By</span>
          <span className="font-semibold text-base">
            <Select
              options={["Hospital ID", "Patient's Name", "Phone Number"]}
            />
          </span>
        </div>
        <div className="text-sm !font-thin">
          <InputField
            prefixIcon={SerachIcon}
            placeholder="Search by patient name, id"
            className="font-thin"
          />
        </div>
      </div>

      <div className=" max-w-7xl mx-auto bg-white p-10">
        <table className="w-full md:px-16 text-lg">
          <thead className="border-b">
            {table.getHeaderGroups().map(headerGroup =>
              <tr key={headerGroup.id} className="*:py-5">
                {headerGroup.headers.map(header =>
                  <th
                    key={header.id}
                    className="text-sm text-start font-semibold text-opacity"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                )}
              </tr>
            )}
          </thead>
          <tbody className="overflow-scroll">
            {table.getRowModel().rows.map(row =>
              <tr
                className="border-b text-sm font-thin text-opacity  *:py-5"
                key={row.id}
              >
                {row.getVisibleCells().map(cell =>
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
