import React from "react";
import { Button } from "../ui/button";
import { SubmittedForm } from ".";

type QRCodeShare = {
  submittedForm: SubmittedForm | null;
};

const QRCodeShare = ({ submittedForm }: QRCodeShare) => {
  return (
    <div>
      <div className="flex">
        {JSON.stringify(submittedForm)}
        <Button onClick={() => console.log(close)}>Close</Button>
      </div>
    </div>
  );
};

export default QRCodeShare;
