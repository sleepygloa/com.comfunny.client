import React from 'react';
import { useMediaQuery, useTheme, Dialog, DialogActions, DialogContent, DialogTitle, Button, Divider } from '@mui/material';
import { useModal } from "../../context/ModalContext";

const Modals = () => {
    const { modals, closeModal } = useModal();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSubmit = (key) => {
      const modalInfo = modals[key];
      if (modalInfo.callback) {
          const result = modalInfo.callback(modalInfo.data);
          if (result == false) return;
      }
      closeModal(key);
    };

    return (
      <>
        {Object.entries(modals).map(([key, { open, title, content, width, height }]) => (
          <Dialog
            key={key}
            open={open}
            onClose={() => closeModal(key)}
            PaperProps={{
              sx: {
                width: isMobile ? '100%' : width || '300px',
                height: isMobile ? '100%' : height || '150px',
                maxWidth: '100vw', // Ensure the modal does not exceed the viewport width
                maxHeight: '100vh', // Ensure the modal does not exceed the viewport height
                m: 0 // Remove margin in full screen mode
              }
            }}
          >
            <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, color: '#fff' }}>
              {!(title == 'C' || title == 'I' || title == 'A') && (
                <>
                {title}
                </>
              )}
              </DialogTitle>
            <Divider />
            {(title == '' || title == 'C') && (
              <>
                <DialogContent>
                {content}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleSubmit(key)}>확인</Button>
                    <Button onClick={() => closeModal(key)}>닫기</Button>
                </DialogActions>
              </>
            )}
            {(title == 'I' || title == 'A') && (
              <>
                <DialogContent>
                {content}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeModal(key)}>닫기</Button>
                </DialogActions>
              </>
            )}
            {(title != '' && !(title == 'A' || title == 'I' || title == 'C')) && (
              <>
              {content}
              </>
            )}
          </Dialog>
        ))}
      </>
    );
};

export default Modals;
