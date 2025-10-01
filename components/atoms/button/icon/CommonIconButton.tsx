import { Button } from "@/components/ui/button";
import React from "react";

export const CommonIconButton = ({
  icon,
  onClick,
  disabled = false,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) => {
  React;
  return (
    <Button variant="ghost" size="sm" onClick={onClick} disabled={disabled}>
      {icon}
    </Button>
  );
};
