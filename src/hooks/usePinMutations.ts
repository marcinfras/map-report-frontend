import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbarStore } from "../store/snackbarStore";
import { createPin, deletePin, updatePin } from "../pages/map/actions";

export const usePinMutations = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { show } = useSnackbarStore();

  const handleSuccess = (message: string) => {
    queryClient.invalidateQueries({ queryKey: ["pins"] });
    queryClient.invalidateQueries({ queryKey: ["pinCounts"] });
    show("Success", message, "success");
    onSuccessCallback?.();
  };

  const handleError = (error: Error) => {
    show("Error", error.message, "error");
  };

  const createMutate = useMutation({
    mutationFn: (data: FormData) => createPin(data),
    onSuccess: () => handleSuccess("Pin created successfully"),
    onError: handleError,
  });

  const updateMutate = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updatePin(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(["pin", data._id], data.pin);
      queryClient.invalidateQueries({ queryKey: ["pin", data.pin._id] });
      handleSuccess("Pin updated successfully");
    },
    onError: handleError,
  });

  const deleteMutate = useMutation({
    mutationFn: (id: string) => deletePin(id),
    onSuccess: (data) => {
      queryClient.setQueryData(["pin", data._id], null);
      queryClient.invalidateQueries({ queryKey: ["pin", data.pin._id] });
      handleSuccess("Pin deleted successfully");
    },
  });

  return { createMutate, updateMutate, deleteMutate };
};
