import { Build, Lightbulb, ReportProblem } from "@mui/icons-material";

export const getTypeConfig = (type: string) => {
  const configs = {
    damage: {
      color: "error",
      label: "Damage Report",
      icon: <ReportProblem />,
    },
    change: { color: "warning", label: "Change Request", icon: <Build /> },
    idea: { color: "success", label: "Community Idea", icon: <Lightbulb /> },
  };
  return configs[type as keyof typeof configs] || configs.damage;
};
