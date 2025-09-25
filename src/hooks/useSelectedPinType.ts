import { useSearchParams } from "react-router";
import { PinType } from "../store/pinsStore";
import { isValidPinType } from "../helpers/helpers";

export const useSelectedPinType = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const typeParam = searchParams.get("type");

  const selectedPinType =
    typeParam && isValidPinType(typeParam) ? typeParam : PinType.All;

  const setSelectedPinType = (type: PinType) => {
    if (type === PinType.All) {
      searchParams.delete("type");
    } else {
      searchParams.set("type", type);
    }
    setSearchParams(searchParams);
  };

  return { selectedPinType, setSelectedPinType };
};
