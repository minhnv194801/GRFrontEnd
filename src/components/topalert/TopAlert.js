import { useDispatch, useSelector } from 'react-redux'
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Fade from "@mui/material/Fade";
import { setCloseTime, closeTopAlert } from './TopAlertSlice';
import './TopAlert.css'
import { useEffect } from 'react';

function TopAlert() {
    const alertVisibility = useSelector((state) => state.topAlert.alertVisibility)
    const alertSeverity = useSelector((state) => state.topAlert.alertSeverity)
    const alertTitle = useSelector((state) => state.topAlert.alertTitle)
    const alertContent = useSelector((state) => state.topAlert.alertContent)
    const alertCloseTime = useSelector((state) => state.topAlert.closeTime)
    const dispatch = useDispatch()

    useEffect(() => {
        if (alertVisibility === true) {
            dispatch(setCloseTime(Date.now() + 2000))
            setTimeout(() => {
                console.log(Date.now())
                console.log(alertCloseTime)
                if (Date.now() >= alertCloseTime) {
                    dispatch(closeTopAlert())
                }
            }, 2000)
        }
        // eslint-disable-next-line
    }, [alertVisibility])

    return (
        <div className={alertVisibility ? 'alert-wrapper' : 'hidden-alert-wrapper'}>
            <Fade
                in={alertVisibility}
                timeout={{ enter: 1000, exit: 1000 }}
            >
                <Alert severity={alertSeverity} variant="standard" className="alert">
                    <AlertTitle>{alertTitle}</AlertTitle>
                    {alertContent}
                </Alert>
            </Fade>
        </div>
    )
}

export default TopAlert