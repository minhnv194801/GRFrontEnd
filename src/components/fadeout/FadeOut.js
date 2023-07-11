import React from "react";
import "./FadeOut.css"
import { useEffect } from "react";

const FadeOut = ({open, close}) => {
    useEffect(() => {
        setTimeout(close, 300)
    }, [open])

    return (
        <div>
            {open ? <div className='gray-fadeout' /> : <></>}
        </div>
    )
}

export default FadeOut