import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword, updateProfile } from "../pages/profile/actions";
import { useSnackbarStore } from "@store/snackbarStore";

export const useProfileMutations = (onSuccessCallback?: () => void) => {
  const { show } = useSnackbarStore();
  const queryClient = useQueryClient();

  const updateMutate = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
    },
    onError: (error) => {
      show("Error", error.message, "error");
    },
  });

  const changePasswordMutate = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      show("Success", "Password updated successfully", "success");
      onSuccessCallback?.();
    },
    onError: (error) => {
      show("Error", error.message || "Failed to update password", "error");
    },
  });

  return { updateMutate, changePasswordMutate };
};
