import { forwardRef } from "react";

const StartingLine = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="flex items-center h-screen" {...props}>
      <div className="h-[calc(100vh-20px)] w-5 bg-finish-line border border-black ml-1"></div>
    </div>
  );
});

export default StartingLine;
