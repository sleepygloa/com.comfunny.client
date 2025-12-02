import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

// 스타일 정의
const PageTitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  marginTop: "10px",
});

const TitleTypography = styled(Typography)({
  textTransform: "none",
  fontWeight: "bold", // 원본 Typography의 size="xs", variant="h1" 대신 스타일 조정
  color: "#4A4A4A",   // 일반적인 제목 색상 (필요시 조정)
  "&:active": {
    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px",
  },
});

// Props 인터페이스 정의
interface PageTitleProps {
  title: string;
}

// PageTitle 컴포넌트
export default function PageTitle(props: PageTitleProps) {
  const { title } = props;

  return (
    <PageTitleContainer>
      <TitleTypography variant="h4">
        {title}
      </TitleTypography>
    </PageTitleContainer>
  );
}