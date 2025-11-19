import React, {useEffect, useState} from "react";
//Modal
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Button from '@mui/material/Button';

export default function CommonModal(props){
    return (
        <div >
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle id="responsive-dialog-title">
            {props.title}
            </DialogTitle>
            <DialogContent style={{height:'600px', width:'550px'}}>
                {props.content}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleSubmit}>확인</Button>
                <Button onClick={props.onClose}>닫기</Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}
