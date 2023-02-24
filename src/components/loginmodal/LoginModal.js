import { React, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { openLoginModal, closeLoginModal, openSignupModal } from './LoginModalSlice';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import './LoginModal.css'
import { setAvatar, setIsLogin, setRefreshkey, setSessionkey, setUserId, setUsername } from '../navbar/NavbarSlice';
import { displaySuccess } from '../topalert/TopAlertSlice';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    padding: 0,
};

const LoginModal = () => {
    const modalVisibility = useSelector((state) => state.loginModal.modalVisibility)
    const isLogin = useSelector((state) => state.loginModal.isLogin)
    const [emailContent, setEmailContent] = useState("")
    const [passwordContent, setPasswordContent] = useState("")
    const [rePasswordContent, setRePasswordContent] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const dispatch = useDispatch()

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(emailContent)
        console.log(passwordContent)
        const postLogin = async () => {
            const response = await fetch('http://localhost:8080/api/v1/user/login', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    'email': emailContent,
                    'password': passwordContent
                })
            });
            // convert data to json
            const json = await response.json();
            if (response.ok) {
                dispatch(setSessionkey(json.sessionkey))
                dispatch(setRefreshkey(json.refreshkey))
                dispatch(setUserId(json.id))
                dispatch(setIsLogin(json.isLogin))
                dispatch(setUsername(json.username))
                dispatch(setAvatar(json.avatar))
                dispatch(closeLoginModal())
                setErrorMessage("")
                dispatch(displaySuccess({
                    "title": "Thành công",
                    "content": "Chúc mừng bạn đã đăng nhập thành công",
                }))
            } else {
                setErrorMessage(json.message)
            }
        }

        postLogin()
    }

    const handleSignup = (e) => {
        e.preventDefault()
        console.log(emailContent)
        console.log(passwordContent)
        console.log(rePasswordContent)
        
        const postRegister = async () => {
            const response = await fetch('http://localhost:8080/api/v1/user/register', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    'email': emailContent,
                    'password': passwordContent,
                    'repassword': rePasswordContent,
                })
            });
            // convert data to json
            const json = await response.json();
            if (response.ok) {
                dispatch(setSessionkey(json.sessionkey))
                dispatch(setRefreshkey(json.refreshkey))
                dispatch(setUserId(json.id))
                dispatch(setIsLogin(json.isLogin))
                dispatch(setUsername(json.username))
                dispatch(setAvatar(json.avatar))
                dispatch(closeLoginModal())
                setErrorMessage("")
                dispatch(displaySuccess({
                    "title": "Thành công",
                    "content": "Chúc mừng bạn đã đăng ký thành công",
                }))
            } else {
                setErrorMessage(json.message)
            }
        }

        postRegister()
    }

    return (
        <Modal
        open={modalVisibility}
        onClose={() => {dispatch(closeLoginModal())}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <form onSubmit={isLogin?handleLogin:handleSignup}>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className={isLogin?'active-modal-button':'modal-button'} onClick={() => dispatch(openLoginModal())}>
                                <h5 className='login-modal-button-title'>Đăng nhập</h5>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={!isLogin?'active-modal-button':'modal-button'} onClick={() => dispatch(openSignupModal())}>
                                <h5 className='login-modal-button-title'>Đăng ký</h5>
                            </div>
                        </Grid>
                    </Grid>
                    <p className='login-modal-title'>Email:</p>
                    <div className='textfield-modal-wrapper'>
                        <TextField
                        placeholder="Email"
                        sx={{width: "95%"}}
                        rows={1}
                        variant="outlined"
                        onChange={(e) => setEmailContent(e.target.value)}
                        />
                    </div>
                    <p className='login-modal-title'>Mật khẩu:</p>
                    <div className='textfield-modal-wrapper'>
                        <TextField
                        placeholder="Mật khẩu"
                        sx={{width: "95%"}}
                        rows={1}
                        variant="outlined"
                        type="password"
                        onChange={(e) => setPasswordContent(e.target.value)}
                        />
                    </div>
                    {   !isLogin?
                        <div>
                            <p className='login-modal-title'>Nhập lại mật khẩu:</p>
                            <div className='textfield-modal-wrapper'>
                                <TextField
                                placeholder="Nhập lại mật khẩu"
                                sx={{width: "95%"}}
                                rows={1}
                                variant="outlined"
                                type="password"
                                onChange={(e) => setRePasswordContent(e.target.value)}
                                />
                            </div>
                        </div>:<div></div>
                    }
                    <div className='error-message-wrapper'>
                        <p className='error-message'>{errorMessage}</p>
                    </div>
                    <div className='modal-button-wrapper'>
                        {isLogin?
                            <Button 
                                type='submit'
                                sx={{backgroundColor: "#990000", color: "#ffffff", "&:hover": {backgroundColor: "#C00000"}, marginRight:'5%', placeSelf:'right'}}
                                variant="outlined"
                            >
                                Đăng nhập
                            </Button>
                            :
                            <Button 
                                type='submit'
                                sx={{backgroundColor: "#990000", color: "#ffffff", "&:hover": {backgroundColor: "#C00000"}, marginRight:'5%', placeSelf:'right'}}
                                variant="outlined"
                            >
                                Đăng ký
                            </Button>   
                        }
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

export default LoginModal;