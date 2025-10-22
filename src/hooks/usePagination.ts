import { useSearchParams } from "react-router";

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  const resetToFirstPage = (params?: URLSearchParams) => {
    const updatedParams = params
      ? new URLSearchParams(params.toString())
      : new URLSearchParams(searchParams.toString());
    updatedParams.delete("page");
    return updatedParams;
  };

  return { page, setPage, resetToFirstPage };
};
