import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { login } from '../../AppSlice';
import { displayFailure, displaySuccess } from '../../components/topalert/TopAlertSlice';
import './Register.css'
import { useEffect } from 'react';

const textfieldStyle = {
    borderRadius: '25px',
    backgroundColor: '#d9d9d9',
    borderColor: '#ff0000',
    border: 'none', "& fieldset": { border: 'none' }
}

const errorTextfieldStyle = {
    borderRadius: '25px',
    backgroundColor: '#d9d9d9',
    borderColor: '#ff0000',
    border: 'solid red'
}

const buttonStyle = {
    backgroundColor: '#ed2939',
    "&:hover": { backgroundColor: "#cc0023" },
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: '25px',
    height: '5vh',
    minHeight: '25px',
    fontSize: '1.375rem',
}

function Register() {
    const [errorMessage, setErrorMessage] = useState("")
    const [emailContent, setEmailContent] = useState("")
    const [passwordContent, setPasswordContent] = useState("")
    const [rePasswordContent, setRePasswordContent] = useState("")
    const dispatch = useDispatch()
    const isLogin = useSelector((state) => state.app.isLogin)

    const handleSignup = (e) => {
        e.preventDefault()

        const postRegister = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/auth/register', {
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
                    dispatch(login(json))
                    setErrorMessage("")
                    window.location.href = "/user"
                    dispatch(displaySuccess({
                        "title": "Thành công",
                        "content": "Chúc mừng bạn đã đăng ký thành công",
                    }))
                } else {
                    setErrorMessage(json.message)
                }
            } catch (error) {
                dispatch(displayFailure({
                    "title": "Lỗi kết nối",
                    "content": "Kết nối với server thất bại",
                }))
            }
        }

        postRegister()
    }

    useEffect(() => {
        if (isLogin) {
            window.location.href = '/user'
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='register-outer'>
            <div className='register-inner'>
                <h1 className='register-title'>
                    Đăng ký
                </h1>
                <div className='register-input-wrapper'>
                    <form onSubmit={handleSignup}>
                        <div className='register-textfield-wrapper'>
                            <h2 className='register-textfield-label'>Email:</h2>
                            <FormControl variant="standard" fullWidth>
                                <TextField
                                    size='small'
                                    sx={errorMessage === "" ? textfieldStyle : errorTextfieldStyle}
                                    fullWidth
                                    onChange={(e) => { setEmailContent(e.target.value) }} />
                            </FormControl>
                        </div>
                        <div className='register-textfield-wrapper'>
                            <h2 className='register-textfield-label'>Mật khẩu:</h2>
                            <FormControl variant="standard" fullWidth>
                                <TextField
                                    size='small'
                                    type='password'
                                    sx={errorMessage === "" ? textfieldStyle : errorTextfieldStyle}
                                    fullWidth
                                    onChange={(e) => { setPasswordContent(e.target.value) }} />
                            </FormControl>
                        </div>
                        <div className='register-textfield-wrapper'>
                            <h2 className='register-textfield-label'>Nhập lại mật khẩu:</h2>
                            <FormControl variant="standard" fullWidth>
                                <TextField
                                    size='small'
                                    type='password'
                                    sx={errorMessage === "" ? textfieldStyle : errorTextfieldStyle}
                                    fullWidth
                                    onChange={(e) => { setRePasswordContent(e.target.value) }} />
                            </FormControl>
                        </div>
                        <div className='error-message-wrapper'>
                            <p className='error-message'>{errorMessage === "" ? "" : '* ' + errorMessage}</p>
                        </div>
                        <Button
                            sx={buttonStyle}
                            fullWidth
                            variant="contained"
                            onClick={handleSignup}>
                            Đăng ký
                        </Button>
                        <div className='register-footer'>
                            <a href='/login' className='register-href'>{'< Quay về đăng nhập'}</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
