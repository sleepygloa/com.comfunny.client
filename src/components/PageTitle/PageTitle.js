import React from "react";
import { styled } from "@mui/system";
import { Typography } from "../Wrappers";

// 스타일 정의
const PageTitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  marginTop: "10px",
});

const TitleTypography = styled(Typography)({
  textTransform: "none",
  "&:active": {
    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px",
  },
});

// PageTitle 컴포넌트
export default function PageTitle(props) {
  const { title } = props;

  return (
    <PageTitleContainer>
      <TitleTypography variant="h1" size="xs">
        {title}
      </TitleTypography>
    </PageTitleContainer>
  );
}
