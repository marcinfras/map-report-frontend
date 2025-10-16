import * as yup from "yup";

export type ProfileFormData = {
  fullName: string;
  avatar?: File;
};

export type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const profileSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  avatar: yup
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
}) as yup.ObjectSchema<ProfileFormData>;

export const passwordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(6, "At least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm Password is required"),
});
