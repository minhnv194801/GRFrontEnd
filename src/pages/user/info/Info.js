import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux'
import { displayFailure, displaySuccess } from '../../../components/topalert/TopAlertSlice'
import { setUserAvatar, setUsername } from '../UserSlice';
import { setAvatar as setNavbarAvatar, setUsername as setNavbarUsername } from '../../../AppSlice';
import './Info.css'
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../../../AppSlice';
import refreshTokenIfNeeded from '../../../common/JWT';

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
    const navigate = useNavigate()

    const username = useSelector((state) => state.app.username)
    const sessionkey = useSelector((state) => state.app.sessionkey)
    const refreshkey = useSelector((state) => state.app.refreshkey)
    const currentUsername = useSelector((state) => state.user.username)
    const currentAvatar = useSelector((state) => state.user.avatar)
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
        setGender(parseInt(e.target.value))
    }

    const onFileInputChange = (e) => {
        const file = e.target?.files?.[0];
        if (file) {
          getBase64(file).then((base64) => {
            dispatch(setUserAvatar(base64))
          });
        }
    }

    const handleUpdate = (e) => {
        //TODO: Send user info update to server
        const refresh = async() => {
            var res = await refreshTokenIfNeeded(sessionkey, refreshkey)
            if (res.isRefresh) {
              if (res.sessionkey) {
                dispatch(login(res))
              } else {
                dispatch(logout())
                navigate('/')
                dispatch(displayFailure({
                  "title": "Đăng xuất",
                  "content": "Phiên đăng nhập của bạn đã hết hạn. Xin hãy đăng nhập lại",
                }))
              }
            }
        }

        const postUserInfo = async() => {
            await refresh()
            try {
                const response = await fetch('http://localhost:8080/api/v1/user/info', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionkey,
                    },
                    body: JSON.stringify({ 
                        "firstName": firstName,
                        "lastName": lastName,
                        "gender": gender,
                        "username": currentUsername,
                        "avatar": currentAvatar,
                    })
                })
                if (response.ok) {
                    dispatch(setNavbarUsername(currentUsername))
                    dispatch(setNavbarAvatar(currentAvatar))
                    dispatch(displaySuccess({
                        "title": "Thành công",
                        "content": "Thông tin cá nhân của bạn đã được cập nhật thành công"
                    }))    
                } else {
                    if (response.status === 401) {
                        navigate("/")
                        dispatch(displayFailure({
                            "title": "Đăng xuất",
                            "content": "Phiên đăng nhập của bạn đã hết hạn",
                        }))    
                    }
                    var json = await response.json()
                    dispatch(displayFailure({
                        "title": "Thất bại",
                        "content": json.message,
                    }))
                }
            } catch (error) {
                dispatch(displayFailure({
                    "title": "Lỗi kết nối",
                    "content": "Kết nối với server thất bại",
                }))
            }

        }
        postUserInfo()
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/user/info', {
                    method: 'GET',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionkey,
                    },
                });
                if (response.ok) {
                    // convert data to json
                    const json = await response.json();
                    console.log(json)
                    setEmail(json.email)
                    setFirstName(json.firstName)
                    setLastName(json.lastName)
                    setGender(json.gender)
                    setRole(json.role)
                } else {
                    dispatch(displayFailure({
                        "title": "Lỗi hệ thống",
                        "content": "Gặp lỗi hệ thống khi tải thông tin người dùng, xin vui lòng thử tải lại trang",
                    }))
                }
            } catch (error) {
                dispatch(displayFailure({
                    "title": "Lỗi kết nối",
                    "content": "Kết nối với server thất bại",
                }))
            }
        }

        fetchUserInfo()
    }, [])
    
    return (
        <Grid container sx={{marginTop:'30px'}}>
            <Grid item xs={12} md={2} sx={{textAlign:"left"}}>
                <h3 className='info-header'>Họ:</h3>
            </Grid>
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={1} sx={{textAlign:"left"}}>
                <h3 className='info-header'>Tên:</h3>
            </Grid>
            <Grid item xs={12} md={5}>
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
            <Grid item xs={12} md={2} sx={{marginTop:'30px'}}>
                <h3 className='info-header'>Email:</h3>
            </Grid>
            <Grid item xs={12} md={10} sx={{marginTop:'30px'}}>
                <h3 className='info-content'>{email}</h3>
            </Grid>
            <Grid item xs={12} md={2} sx={{marginTop:'30px'}}>
                <h3 className='info-header'>Tên hiển thị:</h3>
            </Grid>
            <Grid item xs={12} md={10} sx={{marginTop:'30px'}}>
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
            <Grid item xs={12} md={2} sx={{marginTop:'30px'}}>
                <h3 className='info-header'>Ảnh đại diện:</h3>
            </Grid>
            <Grid item xs={12} md={10} sx={{marginTop:'30px'}}>
                <input
                    onChange={onFileInputChange}
                    type="file"
                    accept="image/png,image/jpeg,image/gif"
                />  
            </Grid>
            <Grid item xs={12} md={2} sx={{marginTop:'30px'}}>
                <h3 className='info-header'>Giới tính:</h3>
            </Grid>
            <Grid item xs={12} md={10} sx={{marginTop:'30px'}}>
                <select className='gender-selector' value={gender} onChange={handleGenderChange}>
                    <option value={0}>Nam</option>
                    <option value={1}>Nữ</option>
                    <option value={2}>Không xác đinh</option>
                </select>
            </Grid>
            <Grid item xs={12} md={2} sx={{marginTop:'30px'}}>
                <h3 className='info-header'>Vai trò:</h3>
            </Grid>
            <Grid item xs={12} md={10} sx={{marginTop:'30px'}}>
                <h3 className='info-content'>{role}</h3>
            </Grid>
            <Grid item xs={12} md={12} sx={{marginTop:'30px', marginBottom:'30px', textAlign:'right'}}>
                <Button sx={{ color: "#fff", backgroundColor: "#ed2939", marginRight:'5%', "&:hover": { backgroundColor: "#cc0023" } }} onClick={handleUpdate} variant="contained">Cập nhật</Button>
            </Grid>
        </Grid>
    )
}

export default Info