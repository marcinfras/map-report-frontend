import { useQuery } from "@tanstack/react-query";
import { getPinCounts } from "../pages/map/actions";

export const usePinCounts = () => {
  const { data: counts = { all: 0, damage: 0, change: 0, idea: 0 }, ...query } =
    useQuery({
      queryKey: ["pinCounts"],
      queryFn: getPinCounts,
    });

  return { counts, ...query };
};
