import React from "react";
import { styled } from "@mui/system";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

// 스타일 컴포넌트
const PageTitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  marginTop: "10px",
});

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px",
  backgroundColor: "#f5f5f5",
  borderRadius: "4px",
  marginBottom: "8px",
});

const StyledButtonGroup = styled(ButtonGroup)({
  "& .MuiButton-root": {
    fontSize: "0.875rem",
    padding: "4px 8px",
    minWidth: "80px", // 최소 너비 설정
    marginLeft: "4px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // 버튼 쉐도우
    textTransform: "none",
    "&:active": {
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
  },
});

// PageTitle Props 인터페이스
interface PageTitleProps {
  title: string;
}

export function PageTitle({ title }: PageTitleProps) {
  return (
    <PageTitleContainer>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
        {title}
      </Typography>
    </PageTitleContainer>
  );
}

// SearchBar Props 인터페이스
interface SearchBarProps {
  onClickSelect?: () => void;
  onClickAdd?: () => void;
  onClickSave?: () => void;
  onClickDel?: () => void;
  onClickUpload?: () => void;
  onClickCustom1?: () => void;
  onClickCustom2?: () => void;
  onClickCustom3?: () => void;
  onClickCustom4?: () => void;
  onClickCustomNm1?: string;
  onClickCustomNm2?: string;
  onClickCustomNm3?: string;
  onClickCustomNm4?: string;
  children?: React.ReactNode;
}

export function SearchBar(props: SearchBarProps) {
  const {
    onClickSelect,
    onClickAdd,
    onClickSave,
    onClickDel,
    onClickUpload,
    onClickCustom1,
    onClickCustom2,
    onClickCustom3,
    onClickCustom4,
    onClickCustomNm1,
    onClickCustomNm2,
    onClickCustomNm3,
    onClickCustomNm4,
    children,
  } = props;

  return (
    <StyledBox component="form"  >
      <Box>{children}</Box>
      <StyledButtonGroup size="small" aria-label="button group">
        {onClickSelect && (
          <Button variant="outlined" color="primary" onClick={onClickSelect} startIcon={<SearchIcon />}>
            조회
          </Button>
        )}
        {onClickAdd && (
          <Button variant="outlined" onClick={onClickAdd} startIcon={<AddIcon />}>
            신규
          </Button>
        )}
        {onClickSave && (
          <Button variant="outlined" onClick={onClickSave} startIcon={<SaveIcon />}>
            저장
          </Button>
        )}
        {onClickDel && (
          <Button variant="outlined" onClick={onClickDel} startIcon={<DeleteIcon />}>
            삭제
          </Button>
        )}
        {onClickUpload && (
          <Button variant="outlined" onClick={onClickUpload} startIcon={<CloudUploadIcon />}>
            업로드
          </Button>
        )}
        {onClickCustom1 && (
          <Button variant="outlined" onClick={onClickCustom1} startIcon={<SaveIcon />}>
            {onClickCustomNm1 || "커스텀1"}
          </Button>
        )}
        {onClickCustom2 && (
          <Button variant="outlined" onClick={onClickCustom2} startIcon={<SaveIcon />}>
            {onClickCustomNm2 || "커스텀2"}
          </Button>
        )}
        {onClickCustom3 && (
          <Button variant="outlined" onClick={onClickCustom3} startIcon={<SaveIcon />}>
            {onClickCustomNm3 || "커스텀3"}
          </Button>
        )}
        {onClickCustom4 && (
          <Button variant="outlined" onClick={onClickCustom4} startIcon={<SaveIcon />}>
            {onClickCustomNm4 || "커스텀4"}
          </Button>
        )}
      </StyledButtonGroup>
    </StyledBox>
  );
}