import React, { PropsWithChildren } from "react";

interface IProps {
  title: string;
}
const Sidebar = (props: PropsWithChildren<IProps>) => {
  const { title, children } = props;
  return (
    <div className="flex flex-col h-screen p-3 bg-white shadow w-60">
      <div className="space-y-3">
        <div className="flex items-center">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">{children}</ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
