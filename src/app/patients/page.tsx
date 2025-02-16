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
import AddIcon from "../../../public/assets/AddIcon";
import SerachIcon from "../../../public/assets/SearchIcon";
import { useRouter } from "next/navigation";
import MainNav from "@/components/navbar";

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

enum Status {
  completed,
  duePaid,
  dueUnpaid,
  assigned,
  paid
}

const StatusArray = [
  Status.completed,
  Status.duePaid,
  Status.dueUnpaid,
  Status.assigned,
  Status.paid
];

type Patients = {
  hospitalId: string;
  patientName: string;
  phoneNumber: string;
  nextDeliveryDate: string;
  location: string;
  status: Status;
};

const defaultData: Patients[] = [
  ...Array(50).fill(1).map((_, index) => ({
    hospitalId: "1AFHFH093",
    patientName: "Oluwaseun Aregbesola Omotoye",
    phoneNumber: "+2347068642920",
    nextDeliveryDate: "12th September 2020",
    location: "Vl, Lagos",
    status: StatusArray[index % 5]
  }))
];

const columnHelper = createColumnHelper<Patients>();

const columns = [
  // columnHelper.accessor('hospitalId', {
  //   cell: (info) => info.getValue(),
  //   footer: (info) => info.column.id,
  // }),
  columnHelper.accessor(row => row.hospitalId, {
    id: "hospitalId",
    cell: info =>
      <i>
        {info.getValue()}
      </i>,
    header: () => <span>Hospital Id</span>
  }),
  columnHelper.accessor("patientName", {
    id: "patientName",
    cell: info =>
      <i>
        {info.getValue()}
      </i>,
    header: () => <span>{`Patient's Name`}</span>
  }),
  columnHelper.accessor("phoneNumber", {
    id: "phoneNumber",
    cell: info =>
      <i>
        {info.getValue()}
      </i>,
    header: () => <span>Phone Number</span>
  }),
  columnHelper.accessor("nextDeliveryDate", {
    id: "nextDeliveryDate",
    cell: info =>
      <i>
        {info.getValue()}
      </i>,
    header: () => <span>Next Delivery Date</span>
  }),
  columnHelper.accessor("location", {
    id: "location",
    cell: info =>
      <i>
        {info.getValue()}
      </i>,
    header: () => <span>location</span>
  }),
  columnHelper.accessor("status", {
    id: "status",
    cell: function(info) {
      const [badgeVariant, badgeText] = generateBadge(info.getValue());

      return (
        <div className="flex justify-between">
          <Badge variant={badgeVariant} text={badgeText} className="!w-fit" />
          <Button variant="outlined" className="!w-fit">
            View
          </Button>
        </div>
      );
    },
    header: () => <span>Status</span>
  })
];

export default function One() {
  const [data, _setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="w-full mx-auto">
      <MainNav />

      {/* <div className="w-custom-fit-screen  flex justify-between items-center">
        <span className=" text-lg">Patients</span>
        <span>
          <Button prefixIcon={AddIcon} onClick={() => router.push(`/patients/add-patient`)}>
            Add patient
          </Button>
        </span>
      </div> */}
      <hr className="my-5" />

      <div className="w-custom-fit-screen flex py-5 items-center justify-between ">
        <div className="flex gap-5">
          <span>sort By</span>
          <span className="font-bold">
            <Select
              options={["Hospital ID", "Patient's Name", "Phone Number"]}
            />
          </span>
        </div>
        <div>
          <InputField
            prefixIcon={SerachIcon}
            placeholder="Search by patient name, id"
          />
        </div>
      </div>

      <div className="w-custom-fit-screen ">
        <table className="w-full md:px-16 text-lg">
          <thead className="border-b">
            {table.getHeaderGroups().map(headerGroup =>
              <tr key={headerGroup.id} className="*:py-5">
                {headerGroup.headers.map(header =>
                  <th key={header.id} className="font-light text-left">
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
          <tbody className="font-light overflow-scroll">
            {table.getRowModel().rows.map(row =>
              <tr className=" border-b *:py-5" key={row.id}>
                {row.getVisibleCells().map(cell =>
                  <td key={cell.id} className="">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div />
    </div>
  );
}
