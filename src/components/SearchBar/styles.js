import { styled } from "@mui/system";

export default styled(theme => ({
  div3:{

  },
  div4:{

  },
  pageTitleContainer: {
    display: "flex",
    flexWrap:'wrap',
    justifyContent: "space-between",
    // marginBottom: theme.spacing(4),
    // marginTop: theme.spacing(5),
    padding: '10px 20px 10px 20px',
    marginBottom: '10px',
    marginTop: '10px',
    border : '0.5px solid gray'
  },
  typo: {
    color: theme.palette.text.hint,
  },
  button: {
    // boxShadow: theme.customShadows.widget,
    // textTransform: "none",
    // "&:active": {
    //   boxShadow: theme.customShadows.widgetWide,
    // },
    // margin: theme.spacing(1),
    marginTop: theme.spacing(3),
    height: '30px',
  },
}));
