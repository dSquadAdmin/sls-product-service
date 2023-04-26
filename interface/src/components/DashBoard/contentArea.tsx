import React, { PropsWithChildren } from "react";

interface IProps {
  title: string;
}

const ContentArea = (props: PropsWithChildren<IProps>) => {
  const { title, children } = props;
  return (
    <div className="container mx-auto ml-5 mt-12 mr-5">
      <div className="flex">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
};
export default ContentArea;
