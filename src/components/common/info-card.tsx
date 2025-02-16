import React from "react";
import { Card } from "../ui/card";

const InfoCard = (p: { text: string }) => {
  return (
    <Card className="h-full grid place-content-center p-4">
      <p className="text-xs break-all">{p.text}</p>
    </Card>
  );
};

export default InfoCard;
