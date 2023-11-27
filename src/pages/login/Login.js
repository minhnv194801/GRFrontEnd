import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { login } from '../../AppSlice';
import { displayFailure, displaySuccess } from '../../components/topalert/TopAlertSlice';
import './Login.css'

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

function Login() {
    const [errorMessage, setErrorMessage] = useState("")
    const [emailContent, setEmailContent] = useState("")
    const [passwordContent, setPasswordContent] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const isLogin = useSelector((state) => state.app.isLogin)

    const handleLogin = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const postLogin = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_ENDPOINT + '/auth/login', {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'email': emailContent,
                        'password': passwordContent
                    })
                })
                const json = await response.json();
                if (response.ok) {
                    dispatch(login(json))
                    setErrorMessage("")
                    window.location.href = "/user"
                    dispatch(displaySuccess({
                        "title": "Thành công",
                        "content": "Chúc mừng bạn đã đăng nhập thành công",
                    }))
                } else {
                    setIsLoading(false)
                    setErrorMessage(json.message)
                }
            } catch (error) {
                dispatch(displayFailure({
                    "title": "Lỗi kết nối",
                    "content": "Kết nối với server thất bại",
                }))
                setIsLoading(false)
            }
        }

        postLogin()
    }

    useEffect(() => {
        if (isLogin) {
            window.location.href = '/user'
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='login-outer'>
            <div className='login-inner'>
                <h1 className='login-title'>
                    Đăng nhập
                </h1>
                <div className='login-input-wrapper'>
                    <form onSubmit={handleLogin}>
                        <div className='login-textfield-wrapper'>
                            <h2 className='login-textfield-label'>Email:</h2>
                            <FormControl variant="standard" fullWidth>
                                <TextField
                                    size='small'
                                    sx={errorMessage === "" ? textfieldStyle : errorTextfieldStyle}
                                    fullWidth
                                    onChange={(e) => setEmailContent(e.target.value)} />
                            </FormControl>
                        </div>
                        <div className='login-textfield-wrapper'>
                            <h2 className='login-textfield-label'>Mật khẩu:</h2>
                            <FormControl variant="standard" fullWidth>
                                <TextField
                                    size='small'
                                    sx={errorMessage === "" ? textfieldStyle : errorTextfieldStyle}
                                    fullWidth
                                    type='password'
                                    onChange={(e) => setPasswordContent(e.target.value)} />
                            </FormControl>
                        </div>
                        <div className='error-message-wrapper'>
                            <p className='error-message'>{errorMessage === "" ? "" : '* ' + errorMessage}</p>
                        </div>
                        <Button
                            type='submit'
                            sx={buttonStyle}
                            fullWidth
                            variant="contained">
                            Đăng nhập
                        </Button>
                        <div className='login-footer'>
                            Chưa có tài khoản?
                            <a href='/register' className='register-href'>Đăng ký</a>
                        </div>
                    </form>
                </div>
            </div>
        {isLoading?<div className='login-loading-fade'></div>:<></>}
        </div>
    );
}

export default Login;
