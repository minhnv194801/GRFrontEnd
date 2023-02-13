import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Report.css'

function Report() {
    const [reportList, setReportList] = useState([{}])

    const getReportStatusHTML = (status) => {
        if (status === 0) {
            return (<h5 className='report-status'>Trạng thái:<h5 className='unfinished-report'> Chưa xử lý</h5></h5>)
        } else if (status === 1) {
            return (<h5 className='report-status'>Trạng thái:<h5 className='finished-report'> Đã xử lý</h5></h5>)
        }
    }

    useEffect(() => {
        // TODO: Fetch report list of user from backend
        let fetchedReportList = [
            {
                'chapterId': 'Chapter 1',
                'chapterCover': 'https://st.ntcdntempv3.com/data/comics/220/naruto-cuu-vi-ho-ly.jpg',
                'chapterTitle': 'Chapter 1',
                'timeCreated': '18:00 10/02/2023',
                'content': 'ảnh bị lỗi',
                'status': 1,
                'response': 'Lỗi đã được xử lý, xin cám ơn vì bạn đã báo lại và xin lỗi vì sự bất tiện đã xảy ra'
            },
            {
                'chapterId': 'Chapter 2',
                'chapterCover': 'https://st.ntcdntempv3.com/data/comics/220/naruto-cuu-vi-ho-ly.jpg',
                'chapterTitle': 'Chapter 2',
                'timeCreated': '18:00 11/02/2023',
                'content': 'nội dung truyện bị sai',
                'status': 0,
                'response': ''
            },
            {
                'chapterId': 'Chapter 3',
                'chapterCover': 'https://st.ntcdntempv3.com/data/comics/220/naruto-cuu-vi-ho-ly.jpg',
                'chapterTitle': 'Chapter 3',
                'timeCreated': '18:00 12/02/2023',
                'content': 'fdsfsdfvsdfvsdvfsdvfsdfvsdvfsdvfsd\nfsdfvsdfvsdfvsdfvs\nácdcasdcasdcascdas',
                'status': 1,
                'response': ''
            },
        ]

        setReportList(fetchedReportList)
    }, [])

    return (
        <InfiniteScroll
            dataLength={reportList.length}
            height={660}
        >
            {reportList.map((report) => 
                <div className='report-list-wrapper'>
                    <Grid container sx={{marginTop:'30px'}}>
                        <Grid item xs={4} sx={{textAlign:'center'}}>
                            <a href={'/read/'+report.chapterId}>
                                <img className='report-chapter-cover' src={report.chapterCover} alt='report-cover'/>
                            </a>
                        </Grid>
                        <Grid item xs={8}>
                            <div className='report-chapter-title-wrapper'>
                                <a href={'/read/'+report.chapterId}>
                                    <h3 className='report-chapter-title'>{report.chapterTitle}</h3>
                                </a>
                                <div></div>
                            </div>
                            <h6 className='report-timeCreated'>{report.timeCreated}</h6>
                            <h5 className='report-content'>{'Nội dung: '+report.content}</h5>
                            {getReportStatusHTML(report.status)}
                            <h5 className='report-response'>{'Phản hồi: '+report.response}</h5>
                        </Grid>
                    </Grid>
                </div>
            )}
        </InfiniteScroll>
    )
}

export default Report