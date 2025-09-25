import { useSearchParams } from "react-router";

export const useSelectedPinId = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedPinId = searchParams.get("pin") || null;

  const setSelectedPinId = (pinId: string | null) => {
    if (pinId) {
      searchParams.set("pin", pinId);
    } else {
      searchParams.delete("pin");
    }
    setSearchParams(searchParams);
  };

  return { selectedPinId, setSelectedPinId };
};
