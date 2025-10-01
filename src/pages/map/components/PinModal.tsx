import { Dialog, DialogTitle, DialogContent, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../hooks/useAuth";
import { usePinsStore } from "../../../store/pinsStore";
import { useSnackbarStore } from "../../../store/snackbarStore";
import { PinFormType, pinSchema, type PinFormData } from "../pinSchemas";
import { PinModalButtons } from "./PinModal/PinModalButtons";
import { PinModalNotAuth } from "./PinModal/PinModalNotAuth";
import { PinModalTitleField } from "./PinModal/PinModalTitleField";
import { PinModalTypeField } from "./PinModal/PinModalTypeField";
import { PinModalDescriptionField } from "./PinModal/PinModalDescriptionField";
import { PinModalFileField } from "./PinModal/PinModalFileField";
import { usePinMutations } from "../../../hooks/usePinMutations";
import { useEffect } from "react";

interface PinModalProps {
  pinToEdit?: PinFormData & { id: string };
}

export const PinModal = ({ pinToEdit }: PinModalProps) => {
  const { addPinModalOpen, setIsAddPinModalOpen, newPinCoords } =
    usePinsStore();
  const { show } = useSnackbarStore();

  const onCloseModal = () => {
    setIsAddPinModalOpen(false);
    reset();
  };

  const { createMutate, updateMutate } = usePinMutations(onCloseModal);

  const { control, handleSubmit, reset } = useForm<PinFormData>({
    resolver: yupResolver(pinSchema),
    defaultValues: pinToEdit
      ? { ...pinToEdit, file: undefined }
      : {
          title: "",
          description: "",
          type: PinFormType.Damage,
          file: undefined,
        },
  });

  const onSubmit = handleSubmit((data) => {
    if (!pinToEdit && !newPinCoords) {
      show("Error", "Coordinates are missing", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("type", data.type);

    if (!pinToEdit && newPinCoords) {
      formData.append("lat", newPinCoords.lat.toString());
      formData.append("lng", newPinCoords.lng.toString());
    }

    if (data.file) {
      formData.append("image", data.file);
    }

    if (pinToEdit) {
      updateMutate.mutate({ id: pinToEdit.id, data: formData });
    } else {
      createMutate.mutate(formData);
    }
  });

  useEffect(() => {
    if (pinToEdit) {
      reset({
        title: pinToEdit.title,
        description: pinToEdit.description,
        type: pinToEdit.type,
        file: undefined,
      });
    } else {
      reset({
        title: "",
        description: "",
        type: PinFormType.Damage,
        file: undefined,
      });
    }
  }, [pinToEdit, reset]);

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
      <DialogTitle>{pinToEdit ? "Edit Pin" : "Add New Pin"}</DialogTitle>
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
        <PinModalButtons
          onCloseModal={onCloseModal}
          isPending={
            pinToEdit ? updateMutate.isPending : createMutate.isPending
          }
          isEdit={!!pinToEdit}
        />
      </Box>
    </Dialog>
  );
};
