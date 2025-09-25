import { Dialog, DialogTitle, DialogContent, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePinsStore } from "../../../store/pinsStore";
import { useSnackbarStore } from "../../../store/snackbarStore";
import { createPin } from "../actions";
import { PinFormType, pinSchema, type PinFormData } from "../pinSchemas";
import { PinModalButtons } from "./PinModal/PinModalButtons";
import { PinModalNotAuth } from "./PinModal/PinModalNotAuth";
import { PinModalTitleField } from "./PinModal/PinModalTitleField";
import { PinModalTypeField } from "./PinModal/PinModalTypeField";
import { PinModalDescriptionField } from "./PinModal/PinModalDescriptionField";
import { PinModalFileField } from "./PinModal/PinModalFileField";

export const PinModal = () => {
  const { addPinModalOpen, setIsAddPinModalOpen, newPinCoords } =
    usePinsStore();
  const { show } = useSnackbarStore();
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<PinFormData>({
    resolver: yupResolver(pinSchema),
    defaultValues: {
      title: "",
      description: "",
      type: PinFormType.Damage,
      file: undefined,
    },
  });

  const onCloseModal = () => {
    setIsAddPinModalOpen(false);
    reset();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createPin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pins"] });
      queryClient.invalidateQueries({ queryKey: ["pinCounts"] });
      onCloseModal();
      show("Success", "Pin created successfully", "success");
      reset();
    },
    onError: (error) => {
      show("Error", error.message, "error");
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (!newPinCoords) {
      show("Error", "Coordinates are missing", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("lat", newPinCoords.lat.toString());
    formData.append("lng", newPinCoords.lng.toString());

    if (data.file) {
      formData.append("image", data.file);
    }

    mutate(formData);
  });

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated)
    return (
      <PinModalNotAuth
        addPinModalOpen={addPinModalOpen}
        onCloseModal={onCloseModal}
      />
    );

  return (
    <Dialog
      open={addPinModalOpen}
      onClose={onCloseModal}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add New Pin</DialogTitle>
      <Box component="form" onSubmit={onSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PinModalTitleField field={field} error={error} />
              )}
            />
            <Controller
              name="type"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PinModalTypeField field={field} error={error} />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PinModalDescriptionField field={field} error={error} />
              )}
            />

            <Controller
              name="file"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <PinModalFileField field={field} error={error} />
              )}
            />
          </Box>
        </DialogContent>
        <PinModalButtons onCloseModal={onCloseModal} isPending={isPending} />
      </Box>
    </Dialog>
  );
};
