import * as React from "react";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
});

const UsePagination = () => {
  const { items } = usePagination({
    count: 10,
  });

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "10px",
        marginRight: "12px",
      }}
    >
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <button
                type="button"
                style={{
                  fontWeight: selected ? "bold" : undefined,
                  marginRight: "8px", // Adjust the value to set the desired gap
                }}
                {...item}
              >
                {page}
              </button>
            );
          } else {
            children = (
              <button
                type="button"
                style={{
                  marginRight: "8px",
                }}
                {...item}
              >
                {type}
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </nav>
  );
};

export default UsePagination;
