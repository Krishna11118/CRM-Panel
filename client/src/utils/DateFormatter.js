
export const formatDate = (date) => {
    if (!(date instanceof Date)) {
      throw new Error("Invalid date object");
    }
  
    return date.toLocaleDateString("en-US", {
      month: "short", 
      day: "2-digit",
      year: "numeric",
    }).split(",").join(""); 
  };
  