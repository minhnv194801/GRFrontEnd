import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux'
import { displaySuccess } from '../../../components/topalert/TopAlertSlice'
import { setUserAvatar, setUsername } from '../UserSlice';
import './Info.css'

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject(error)
        };
    })
}

function Info() {
    const dispatch = useDispatch()

    const username = useSelector((state) => state.user.username)
    const userAvatar = useSelector((state) => state.user.avatar)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState(0)
    const [role, setRole] = useState("")

    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }    
    const handleUsernameChange = (e) => {
        dispatch(setUsername(e.target.value))
    }
    const handleGenderChange = (e) => {
        console.log(e.target.value)
        setGender(e.target.value)
    }

    const onFileInputChange = (e) => {
        const file = e.target?.files?.[0];
        if (file) {
          getBase64(file).then((base64) => {
            console.log(base64)
            dispatch(setUserAvatar(base64))
          });
        }
    }

    const handleUpdate = (e) => {
        //TODO: Send user info update to server
        dispatch(displaySuccess({
            "title": "Thành công",
            "content": "Thông tin cá nhân của bạn đã được cập nhật thành công"
        }))    
    }

    useEffect(() => {
        //TODO: fetch user personal information from server
        let fetchedUserInfo = {
            'lastName': 'Last Name',
            'firstName': 'First Name',
            'email': 'placeholderemail@somemailservice.com',
            'gender': 0,
            'role': 'Người dùng'
        }
        setLastName(fetchedUserInfo.lastName)
        setFirstName(fetchedUserInfo.firstName)
        setEmail(fetchedUserInfo.email)
        setGender(fetchedUserInfo.gender)
        setRole(fetchedUserInfo.role)
    
    }, [])
    
    return (
        <Grid container sx={{marginTop:'30px'}}>
            <Grid item xs={2} sx={{textAlign:"left"}}>
                <h3 className='info-header'>Họ:</h3>
            </Grid>
            <Grid item xs={4}>
                <TextField
                sx={{
                    background: "#ffff",
                    height: "80%",
                    width: "95%",
                }}
                value={lastName}
                onChange={handleLastNameChange}
                hiddenLabel
                placeholder="Xin hãy cập nhật họ của bạn"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                />
            </Grid>
            <Grid item xs={1} sx={{textAlign:"left"}}>
                <h3 className='info-header'>Tên:</h3>
            </Grid>
            <Grid item xs={5}>
                <TextField
                sx={{
                    background: "#ffff",
                    height: "80%",
                    width: "90%",
                }}
                value={firstName}
                onChange={handleFirstNameChange}
                fullWidth
                hiddenLabel
                placeholder="Xin hãy cập nhật tên của bạn"
                variant="standard"
                InputProps={{ disableUnderline: true }}
                />
            </Grid>
            <Grid item xs={2} sx={{marginTop:'30px'}}>
                <h3 className='info-header'>Email:</h3>
            </Grid>
            <Grid item xs={10} sx={{marginTop:'30px'}}>
                <h3 className='info-content'>{email}</h3>
            </Grid>
            <Grid item xs={2} sx={{marginTop:'30px'}}>
                <h3 className='info-header'>Tên hiển thị:</h3>
            </Grid>
            <Grid item xs={10} sx={{marginTop:'30px'}}>
                <TextField
                    sx={{
                        background: "#ffff",
                        height: "80%",
                        width: "95%",
                    }}
                    fullWidth
                    hiddenLabel
                    defaultValue={username}
                    onChange={handleUsernameChange}
                    placeholder="Xin hãy cập nhật tên hiển thị của bạn"
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                />
            </Grid>
            <Grid item xs={2} sx={{marginTop:'30px'}}>
                <h3 className='info-header'>Ảnh đại diện:</h3>
            </Grid>
            <Grid item xs={10} sx={{marginTop:'30px'}}>
                <input
                    onChange={onFileInputChange}
                    type="file"
                    accept="image/png,image/jpeg,image/gif"
                />  
            </Grid>
            <Grid item xs={2} sx={{marginTop:'30px'}}>
                <h3 className='info-header'>Giới tính:</h3>
            </Grid>
            <Grid item xs={10} sx={{marginTop:'30px'}}>
                <select className='gender-selector' value={gender} onChange={handleGenderChange}>
                    <option value={0}>Nam</option>
                    <option value={1}>Nữ</option>
                    <option value={2}>Không xác đinh</option>
                </select>
            </Grid>
            <Grid item xs={2} sx={{marginTop:'30px'}}>
                <h3 className='info-header'>Vai trò:</h3>
            </Grid>
            <Grid item xs={10} sx={{marginTop:'30px'}}>
                <h3 className='info-content'>{role}</h3>
            </Grid>
            <Grid item xs={12} sx={{marginTop:'30px', marginBottom:'30px', textAlign:'right'}}>
                <Button sx={{ color: "#fff", backgroundColor: "#ed2939", marginRight:'5%', "&:hover": { backgroundColor: "#cc0023" } }} onClick={handleUpdate} variant="contained">Cập nhật</Button>
            </Grid>
        </Grid>
    )
}

export default Info