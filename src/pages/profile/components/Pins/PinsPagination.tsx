import { Pagination } from "@mui/material";

export const PinsPagination = ({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: (newPage: number) => void;
  totalPages: number;
}) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={handleChange}
      color="primary"
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "16px",
      }}
    />
  );
};
