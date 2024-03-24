import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import React, {useEffect} from 'react';
import usePaintingStore from '../stores/PaintingStore';

export default function AlertDialog() {
    const deletePainting = usePaintingStore();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(true); // Open the dialog when component mounts
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>
                {'Are you sure you want to delete this item?'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button
                    onClick={() => {
                        deletePainting;
                    }}
                    autoFocus
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
