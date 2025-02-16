import React from "react";
import { Card } from "../ui/card";
import { Loader } from "lucide-react";

const LoadingCard = () => {
  return (
    <Card className="h-full grid place-content-center">
      <Loader className="animate-spin" />
    </Card>
  );
};

export default LoadingCard;
