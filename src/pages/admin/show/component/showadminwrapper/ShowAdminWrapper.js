import React from 'react';
import './ShowAdminWrapper.css';
import { Delete } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const deleteIconStyle = {
    'width': '50px',
    'height': '50px',
    'color': 'red',
}

const deleteBtnStyle = {
    'color': 'red',
    'fontSize': '16px',
    'fontWeight': 'bold',
}

//TODO: connect to backend
const ShowAdminWrapper = (props) => {
    const [openAlert, setOpenAlert] = useState(false)
    const sessionkey = useSelector((state) => state.app.sessionkey)

    const handleOpenDialog = () => {
        setOpenAlert(true);
    };

    const handleClose = () => {
        setOpenAlert(false);
    };

    const handleDelete = (e) => {
        fetch(props.deleteAPIUrl, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                'Authorization': sessionkey,
                'Content-Type': 'application/json',
            }
        })
        window.location.reload(false)
    }

    return (
        <div>
            <div className='show-admin-header-wrapper'>
                <Button startIcon={<Delete sx={deleteIconStyle} />} sx={deleteBtnStyle} onClick={handleOpenDialog}>
                    DELETE
                </Button>
            </div>
            <div className='show-admin-wrapper'>
                {props.children}
            </div>
            <Dialog
                open={openAlert}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc bạn muốn xóa item này?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>Không</Button>
                    <Button onClick={handleDelete} sx={{backgroundColor:'red', color:'white', '&:hover': {backgroundColor:'#d00'}}}>
                        Có
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ShowAdminWrapper