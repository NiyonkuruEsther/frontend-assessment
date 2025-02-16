import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Badge from "../../../components/shared/Badge";
import Button from "../../../components/shared/Button";
import InputField from "../../../components/shared/InputField";
import EditIcon from "../../../../public/assets/EditIcon";
import MainLayout from "@/components/layouts/MainLayout";

export default function ViewPatient() {
  return (
    <div className="w-custom-fit-screen">
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
                    <Tab className="data-[selected]:text-primary data-[selected]:font-medium data-[selected]:border-b-4 p-4 data-[selected]:border-primary">
                      Payment Information
                    </Tab>
                    <Tab className="data-[selected]:text-primary data-[selected]:font-medium data-[selected]:border-b-4 p-4 data-[selected]:border-primary">
                      Delivery Information
                    </Tab>
                  </TabList>
                </header>
                <TabPanels className="w-full px-5 border-b">
                  <TabPanel className="mb-10">
                    <div className="flex items-start gap-10 text-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold ">
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
                        <InputField label="Hospital Id" value="2aB458375" />
                        <div className="grid grid-cols-2 gap-5">
                          <InputField label="First Name" value="Oluwaseun" />
                          <InputField label="Last Name" value="Aregbesola" />
                          <InputField label="Gender" value="Male" />
                          <InputField
                            label="Phone Number"
                            value="+2348123456789"
                          />
                        </div>
                        <InputField
                          label="Email address"
                          value="seunregbesola@gmail.com"
                        />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel className="mb-10">
                    <div className="flex items-start gap-10 text-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold ">
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
                          value="14th November 2020"
                        />
                        <InputField label="Delivery Area" value="Yaba, Lagos" />
                        <InputField label="Gender" value="Male" />
                        <InputField
                          label="Delivery Adress"
                          value="19, Mohammed Abiola street, Akoka, Lagos"
                        />
                        <div className="w-[50%]">
                          <InputField label="Payment Status" value="Paid" />
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
