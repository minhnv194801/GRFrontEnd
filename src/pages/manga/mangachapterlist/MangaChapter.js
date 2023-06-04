import { Button, Grid } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import './MangaChapter.css'

const MangaChapter = (props) => {
    const navigate = useNavigate()

    const handleReadChapter = (e) => {
        navigate('/read/' + e.target.value)
    }

    return (
        <div className='single-chapter-wrapper'>
            <Grid container spacing={1} justify="flex-end" alignItems="center">
                <Grid sx={{ textAlign: "center" }} item xs={4} md={3}>
                    <img className='chapter-cover' src={props.chapter.cover} alt="Bìa chương truyện" />
                </Grid>
                <Grid item xs={8} md={9}>
                    <div className='chapter-info-wrapper'>
                        <h3 className='manga-chapter-title'>
                            {props.chapter.title}
                        </h3>
                        <p className='chapter-updatetime'>
                            {"(Cập nhật: " + props.chapter.updateTime + ")"}
                        </p>
                        {
                            (!props.chapter.isOwned) ?
                                <div>
                                    <h6>
                                        {props.chapter.price + " VND"}
                                    </h6>
                                    <Button sx={{ borderRadius: '25px', backgroundColor: "#4169E1", "&:hover": { backgroundColor: "#cc0023" } }} variant="contained">Mua</Button>
                                </div>
                                :
                                <div>
                                    <Button sx={{ borderRadius: '25px', backgroundColor: "#ED2939", "&:hover": { backgroundColor: "#C00000" } }} value={props.chapter.id} onClick={handleReadChapter} variant="contained">Đọc</Button>
                                </div>
                        }
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default MangaChapter