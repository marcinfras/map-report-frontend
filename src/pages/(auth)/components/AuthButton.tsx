import { Button, CircularProgress, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
}));

export const AuthButton = ({
  isSubmitting,
  text,
}: {
  isSubmitting: boolean;
  text: string;
}) => {
  return (
    <StyledButton
      type="submit"
      fullWidth
      variant="contained"
      size="large"
      disabled={isSubmitting}
    >
      {isSubmitting ? <CircularProgress size={24} /> : `${text}`}
    </StyledButton>
  );
};
