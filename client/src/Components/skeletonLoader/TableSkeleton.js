import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function TableSkeleton() {
  return (
    <Box className="w-full h-full bg-custom-600 px-4 ">
      <div className="flex justify-center items-center gap-2">
        <Skeleton
          variant="circular"
          width={50}
          height={50}
          className="bg-gray-500  "
        />
        <Skeleton
          width="100%"
          height={90}
          color="gray"
          className="bg-gray-500  "
        />
      </div>
      <div className="flex justify-center items-center gap-2">
        <Skeleton
          variant="circular"
          width={50}
          height={50}
          className="bg-gray-500  "
        />
        <Skeleton
          width="100%"
          height={90}
          color="gray"
          className="bg-gray-500  "
        />
      </div>

      <div className="flex justify-center items-center gap-2">
        <Skeleton
          variant="circular"
          width={50}
          height={50}
          className="bg-gray-500  "
        />
        <Skeleton
          width="100%"
          height={90}
          color="gray"
          className="bg-gray-500  "
        />
      </div>

      <div className="flex justify-center items-center gap-2">
        <Skeleton
          variant="circular"
          width={50}
          height={50}
          className="bg-gray-500  "
        />
        <Skeleton
          width="100%"
          height={90}
          color="gray"
          className="bg-gray-500  "
        />
      </div>

      <div className="flex justify-center items-center gap-2">
        <Skeleton
          variant="circular"
          width={50}
          height={50}
          className="bg-gray-500  "
        />
        <Skeleton
          width="100%"
          height={90}
          color="gray"
          className="bg-gray-500  "
        />
      </div>
    </Box>
  );
}
