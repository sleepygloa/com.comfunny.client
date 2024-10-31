import { styled } from "@mui/system";

export default styled(theme => ({
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    // marginBottom: theme.spacing(4),
    // marginTop: theme.spacing(5),
    marginBottom: '10px',
    marginTop: '10px',
  },
  typo: {
    // color: theme.palette.text.hint,
  },
  button: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    "&:active": {
      boxShadow: theme.customShadows.widgetWide,
    },
  },
}));
