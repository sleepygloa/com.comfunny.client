import { styled } from "@mui/system";

export default styled(theme => ({
  root: {
    maxWidth: "100vw",
    height: `calc(100vh-100px)`,
    overflow:"auto",
    flexDirection:'column',
    padding:'40px 10px 10px 10px'
  },
  content: {
    flexGrow: 1,
    marginLeft:'40px',
    overflowY: "auto",
    width: `calc(100vw - 100px)`,
    height: `calc(100vh - 60px)`,
  },
  contentShift: {
    marginLeft:'240px',
    width: `calc(100vw - 280px)`,
    height: `calc(100vh - 60px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fakeToolbar: {
    // marginTop:40
  },
  link: {
    '&:not(:first-child)': {
      paddingLeft: 15
    }
  }
}));
