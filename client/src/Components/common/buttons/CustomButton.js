import * as React from "react";
import Button from "@mui/material/Button";

export default function CustomButton({ text, customClass }) {
  return (
    <>
      <div className="flex justify-center">
        <div variant="contained" className={customClass}>
          {text}
        </div>
      </div>
    </>

    
  );
}
