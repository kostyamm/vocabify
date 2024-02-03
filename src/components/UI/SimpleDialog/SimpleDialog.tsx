import { ReactNode } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material';

type SimpleDialogProps = {
    isOpen: boolean;
    hideDialog: () => void;
    confirmButton?: ReactNode
    content?: ReactNode
    PaperProps?: DialogProps['PaperProps']
}

export const SimpleDialog = ({ hideDialog, isOpen, content, PaperProps, confirmButton }: SimpleDialogProps) => {
    return (
        <Dialog
            onClose={hideDialog}
            open={isOpen}
            PaperProps={PaperProps}
        >
            <DialogTitle>Set backup account</DialogTitle>
            {content && (
                <DialogContent>{content}</DialogContent>
            )}
            <DialogActions>
                {confirmButton}
                <Button onClick={hideDialog}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}