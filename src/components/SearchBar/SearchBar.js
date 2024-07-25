import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { ButtonGroup } from "@mui/material";

// styles
import useStyles from "./styles";

export default function SearchBar(props) {
  var classes = useStyles();
  const {title, button, 
    onClickSelect, onClickAdd, onClickSave, onClickDel, onClickUpload, 
    onClickCustom1, onClickCustom2, onClickCustom3, onClickCustom4,
    onClickCustomNm1, onClickCustomNm2, onClickCustomNm3, onClickCustomNm4,
    children} = props;
  return (
    <Box
      className={classes.pageTitleContainer}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
      style={{marginBottom:'0px', padding:'5px'}}
    >
      {children}
      <ButtonGroup size="small" aria-label="small outlined button group">
        {
          onClickSelect ?
            <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={onClickSelect}
            startIcon={<SearchIcon />}
          >
            조회
          </Button>
          :
          ''
        }
        {onClickAdd ? 
        <Button
          variant="outlined"
          className={classes.button}
          onClick={onClickAdd}
          startIcon={<AddIcon />}
        >
          신규
        </Button>
        : 
        ''}
        {onClickSave ? 
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={onClickSave}
          startIcon={<SaveIcon />}
        >
          저장
        </Button>
        :
        ''
        }

        {onClickDel ? 
        <Button
          variant="outlined"
          className={classes.button}
          onClick={onClickDel}
          startIcon={<DeleteIcon />}
          >
          삭제
        </Button>
        :
        ''
        }
        {onClickUpload ?
        <Button
          variant="outlined"
          className={classes.button}
          onClick={onClickUpload}
          startIcon={<CloudUploadIcon />}
        >
          업로드
        </Button>
        :
        ''
        }
        {onClickCustom1 ? 
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={onClickCustom1}
          startIcon={<SaveIcon />}
        >
          {onClickCustomNm1 ? onClickCustomNm1 : '커스텀버튼1'}
        </Button>
        :
        ''
        }
        {onClickCustom2 ? 
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={onClickCustom2}
          startIcon={<SaveIcon />}
        >
          {onClickCustomNm2 ? onClickCustomNm2 : '커스텀버튼2'}
        </Button>
        :
        ''
        }
        {onClickCustom3 ? 
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={onClickCustom3}
          startIcon={<SaveIcon />}
        >
          {onClickCustomNm3 ? onClickCustomNm3 : '커스텀버튼3'}
        </Button>
        :
        ''
        }
        {onClickCustom4 ? 
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={onClickCustom4}
          startIcon={<SaveIcon />}
        >
          {onClickCustomNm4 ? onClickCustomNm4 : '커스텀버튼4'}
        </Button>
        :
        ''
        }
      </ButtonGroup>
    </Box>
  );
}
