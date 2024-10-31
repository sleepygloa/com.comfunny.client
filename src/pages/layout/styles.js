import { styled } from "@mui/system";

export default styled(theme => ({
  contentsArea: {
    position: "fixed",
    left: "240px",
    top: "50px",
    padding: "10px 10px 10px 10px",
    width: "calc(100% - 260px)"
  },  
  contentsAreaLeftSide: {
    position: "fixed",
    left: "0px",
    top: "50px",
    padding: "10px 10px 10px 10px",
    width: "calc(100% - 10px)"
  },
  contents: {
    margin: "0px"
  }
}));
