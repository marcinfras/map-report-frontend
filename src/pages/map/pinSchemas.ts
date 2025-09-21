import * as yup from "yup";

export enum PinFormType {
  Damage = "damage",
  Change = "change",
  Idea = "idea",
}

export interface PinFormData {
  title: string;
  description: string;
  type: PinFormType;
  file?: File;
}

export const pinSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .max(100, "Title is too long (max 100 characters)"),
  description: yup
    .string()
    .trim()
    .required("Description is required")
    .max(500, "Description is too long (max 500 characters)"),
  type: yup
    .mixed<PinFormType>()
    .oneOf(Object.values(PinFormType))
    .required("Type is required"),
  file: yup
    .mixed<File>()
    .test(
      "fileSize",
      "File size is too large (max 5MB)",
      (value) => !value || (value && value.size <= 5 * 1024 * 1024)
    )
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value ||
        (value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
    ),
}) as yup.ObjectSchema<PinFormData>;
