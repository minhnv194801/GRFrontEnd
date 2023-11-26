import React from "react";
import "./FadeOut.css"

const FadeOut = ({open, close}) => {
    // useEffect(() => {
    //     setTimeout(close, 300)
    // }, [open])

    return (
        <>
            {open ? <div className='gray-fadeout' /> : <></>}
        </>
    )
}

export default FadeOut