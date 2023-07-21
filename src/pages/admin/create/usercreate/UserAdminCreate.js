import React, { useState } from "react"
import './UserAdminCreate.css'
import '../AdminCreate.css'
import { Button, TextField } from "@mui/material"
import { Save } from "@mui/icons-material"
import { useSelector } from "react-redux"

const UserAdminCreate = (props) => {
    const sessionkey = useSelector((state) => state.app.sessionkey)

    const [emailTextFieldValue, setEmailTextFieldValue] = useState("")
    const [passwordTextFieldValue, setPasswordTextFieldValue] = useState("")
    const [roleValue, setRoleValue] = useState("Người dùng")

    const [isEmailTextFieldError, setIsEmailTextFieldError] = useState(false)
    const [isPasswordTextFieldError, setIsPasswordTextFieldError] = useState(false)
    const [emailTextFieldErrorMsg, setEmailTextFieldErrorMsg] = useState(false)
    const [passwordTextFieldErrorMsg, setPasswordTextFieldErrorMsg] = useState(false)

    const handleEmailTextFieldChange = (e) => {
        setEmailTextFieldValue(e.target.value)
    }

    const handlePasswordTextFieldChange = (e) => {
        setPasswordTextFieldValue(e.target.value)
    }

    const handleRoleChange = (e) => {
        setRoleValue(e.target.value)
    }

    const submitForm = (e) => {
        //TODO: sent request to backend
        const putBackend = async () => {
            const response = await fetch('http://localhost:8081/api/v1/admin/users', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Authorization': sessionkey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'Email': emailTextFieldValue,
                    'Password': passwordTextFieldValue,
                    'Role': roleValue,
                })
            })

            if (response.ok) {
                const json = await response.json();
                window.location.href = '/admin/user/show/' + json.id
            } else {
                const json = await response.json();
                if (json.errors && json.errors.Email) {
                    setIsEmailTextFieldError(true)
                    setEmailTextFieldErrorMsg(json.errors.Email)
                }
                if (json.errors && json.errors.Password) {
                    setIsEmailTextFieldError(true)
                    setEmailTextFieldErrorMsg(json.errors.Password)
                }
            }
        }

        putBackend()
    }

    return (
        <>
            <h1 className="admin-create-header">Tạo tài khoản mới</h1>
            <div className="create-admin-wrapper">
                <div className="flex-create-admin-textfield ">
                    <p>Email:</p>
                    <TextField
                        label='email'
                        error={isEmailTextFieldError}
                        helperText={emailTextFieldErrorMsg}
                        onChange={handleEmailTextFieldChange}
                        required />
                </div>
                <div className="flex-create-admin-textfield ">
                    <p>Password:</p>
                    <TextField
                        label='password'
                        type='password'
                        error={isPasswordTextFieldError}
                        helperText={passwordTextFieldErrorMsg}
                        onChange={handlePasswordTextFieldChange}
                        required />
                </div>
                <div className="flex-create-admin-textfield ">
                    <p>Role:</p>
                    <select id='role-create' value={roleValue} onChange={handleRoleChange}>
                        <option value={'Người dùng'}>Người dùng</option>
                        <option value={'Quản trị viên'}>Quản trị viên</option>
                    </select>
                </div>
                <div className="flex-create-admin-textfield ">
                    <Button startIcon={<Save />} onClick={submitForm}>
                        Lưu
                    </Button>
                </div>
            </div>
        </>
    )
}

export default UserAdminCreate