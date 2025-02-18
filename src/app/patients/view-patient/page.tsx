"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Badge from "../../../components/shared/Badge";
import Button from "../../../components/shared/Button";
import InputField from "../../../components/shared/InputField";
import EditIcon from "../../../../public/assets/EditIcon";
import MainLayout from "@/components/layouts/MainLayout";
import { usePatient } from "@/contexts/PatientContext";

export default function ViewPatient() {
  const { selectedPatient, isLoading, error  } = usePatient();
  const [firstName, lastName] = selectedPatient?.patientName.split(' ') || ['', ''];

  console.log(selectedPatient, "selected patient");
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div className="">
      <MainLayout>
        <div className="w-[80%] pl-8">
          <div className="flex justify-between bg-white">
            <div className="w-full">
              <TabGroup>
                <header className="flex justify-between  border-b mb-8">
                  <div className="flex text-nowrap items-center gap-5 px-5">
                    <span>Payment Status</span>
                    <Badge text="Paid" variant="success" />
                  </div>
                  <TabList className="text-right flex items-end justify-end gap-10 px-10">
                    <Tab className="data-[selected]:text-primary data-[selected]:font-medium data-[selected]:border-b-4 p-4 outline-none data-[selected]:border-primary">
                      Payment Information
                    </Tab>
                    <Tab className="data-[selected]:text-primary data-[selected]:font-medium data-[selected]:border-b-4 p-4 outline-none data-[selected]:border-primary">
                      Delivery Information
                    </Tab>
                  </TabList>
                </header>
                <TabPanels className="w-full px-5 border-b">
      <TabPanel className="mb-10">
        <div className="flex items-start gap-10 text-nowrap">
          <div className="flex flex-col gap-5">
            <span className="font-bold">
              {"Patient's Information"}
            </span>
            <span className="text-sm">
              Personal information about Patient.
            </span>
            <Button variant="outlined" prefixIcon={EditIcon}>
              {"Edit Patient's Information"}
            </Button>
          </div>
          <div className="*:bg-tertiary-50/50 flex flex-col gap-5 w-full px-10">
            <InputField 
              label="Hospital Id" 
              value={selectedPatient?.hospitalId} 
            />
            <div className="grid grid-cols-2 gap-5">
              <InputField 
                label="First Name" 
                value={firstName} 
              />
              <InputField 
                label="Last Name" 
                value={lastName} 
              />
              <InputField 
                label="Gender" 
                value={selectedPatient?.gender || 'Not specified'} 
              />
              <InputField
                label="Phone Number"
                value={selectedPatient?.phoneNumber}
              />
            </div>
            <InputField
              label="Email address"
              value={selectedPatient?.email || 'Not specified'}
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel className="mb-10">
        <div className="flex items-start gap-10 text-nowrap">
          <div className="flex flex-col gap-5">
            <span className="font-bold">
              {"Delivery Information"}
            </span>
            <span className="text-sm">
              Information about delivery status.
            </span>
            <Button variant="outlined" prefixIcon={EditIcon}>
              {"Edit Delivery Information"}
            </Button>
          </div>
          <div className="*:bg-tertiary-50/50 flex flex-col gap-5 w-full px-10">
            <InputField
              label="Next Delivery Date"
              value={selectedPatient?.nextDeliveryDate}
            />
            <InputField 
              label="Delivery Area" 
              value={selectedPatient?.location} 
            />
            <InputField
              label="Delivery Address"
              value={selectedPatient?.deliveryAddress || 'Not specified'}
            />
            <div className="w-[50%]">
              <InputField 
                label="Payment Status" 
                value={getPaymentStatus(selectedPatient?.status)} 
              />
            </div>
          </div>
        </div>
      </TabPanel>
    </TabPanels>

                <div className="w-fit my-3 p-5 pr-16 ml-auto">
                  <Button className="w-fit" disabled={true}>
                    Save Changes
                  </Button>
                </div>
              </TabGroup>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}

function getPaymentStatus(status: number | undefined): string {
  switch (status) {
    case 0: return 'Completed';
    case 1: return 'Due Paid';
    case 2: return 'Due Unpaid';
    case 3: return 'Assigned';
    case 4: return 'Paid';
    default: return 'Unknown';
  }
}
