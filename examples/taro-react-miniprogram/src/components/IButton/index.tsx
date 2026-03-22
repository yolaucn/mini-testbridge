import React, { ReactNode } from "react";
import { useTestNode } from "@/hooks/useTestBridge";
import { Button } from "@tarojs/components";

type IButtonProps = {
  testid: string;
  children: ReactNode;
  onClick: () => void;
};

export const IButton = ({ testid, children, onClick }: IButtonProps) => {
  useTestNode(testid, {
    tap: onClick,
  });

  return <Button onClick={onClick}>{children}</Button>;
};
