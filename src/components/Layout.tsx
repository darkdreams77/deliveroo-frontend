import { type PropsWithChildren } from "react";

export const Container = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={`m-auto w-[96vw] max-w-300 px-4 ${className}`}>
      {children}
    </div>
  );
};
