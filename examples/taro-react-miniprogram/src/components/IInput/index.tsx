import React, { ReactNode } from "react";
import { Input } from "@tarojs/components";
import { useTestNode } from "@/hooks";

type IInputProps = {
  testid: string;
  value: any;
  placeholder?: string;
  onInput: (e: { detail: { value: string } }) => void;
};
export const IInput = ({ placeholder, testid, value, onInput }: IInputProps) => {
  useTestNode(testid, {
    input: (v: string) => onInput({ detail: { value: v } }),
  });

  return <Input placeholder={placeholder} value={value} onInput={onInput} />;
};
