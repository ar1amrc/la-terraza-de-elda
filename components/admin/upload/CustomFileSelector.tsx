import { Input } from "@/components/ui/input";
import React, { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"input">;

const CustomFileSelector = (props: Props) => {
  return (
    <Input
      {...props}
      type="file"
      name="images"
      multiple
      // className={
      //   "file:bg-violet-50 file:text-violet-500 hover:file:bg-violet-100 file:rounded-lg file:rounded-tr-none file:rounded-br-none file:px-4 file:py-2 file:mr-4 file:border-none hover:cursor-pointer border rounded-lg text-gray-400"
      // }
    />
  );
};

export default CustomFileSelector;
