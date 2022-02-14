import { ComponentProps, FunctionComponent } from "react";

interface IProps {
  Icon: FunctionComponent<ComponentProps<"svg">>;
  title: string;
  handleStateChange: (prop: string) => void;
  handleClick?: () => void;
}

function Icons({ Icon, title, handleStateChange, handleClick }: IProps) {
  return (
    <div
      className="flex items-center justify-center cursor-pointer"
      onClick={() => {
        handleStateChange(title);
        if (handleClick) handleClick();
      }}
    >
      <Icon className="h-7 w-7 text-black" />
    </div>
  );
}
export default Icons;
