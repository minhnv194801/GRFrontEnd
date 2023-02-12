import { useDispatch, useSelector } from 'react-redux'
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Fade from "@mui/material/Fade";
import { closeTopAlert } from './TopAlertSlice';
import './TopAlert.css'

function TopAlert() {
    const alertVisibility = useSelector((state) => state.topAlert.alertVisibility)
    const alertSeverity = useSelector((state) => state.topAlert.alertSeverity)
    const alertTitle = useSelector((state) => state.topAlert.alertTitle)
    const alertContent = useSelector((state) => state.topAlert.alertContent)
    const dispatch = useDispatch()

    return (
        <div className='alert-wrapper'>
            <Fade
                in={alertVisibility}
                timeout={{ enter: 1000, exit: 1000 }}
                addEndListener={() => {
                setTimeout(() => {
                    dispatch(closeTopAlert())
                }, 2000);
                }}
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