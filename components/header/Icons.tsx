import { ComponentProps, FunctionComponent } from "react";

interface IProps {
  Icon: FunctionComponent<ComponentProps<"svg">>;
  title: string;
  handleStateChange: (prop: string) => void;
}

function Icons({ Icon, title, handleStateChange }: IProps) {
  return (
    <div
      className="flex items-center justify-center cursor-pointer"
      onClick={() => handleStateChange(title)}
    >
      <Icon className="h-7 w-7 text-black" />
    </div>
  );
}
export default Icons;
