import { PropsWithChildren, ReactNode } from "react";

export default function SideContentMainContentLayout({
  SideComponent
}: PropsWithChildren<{ SideComponent: ReactNode }>) {
  return (
    <section className="flex gap-10">
      {SideComponent &&
        <div className="">
          {SideComponent}
        </div>}
    </section>
  );
}
