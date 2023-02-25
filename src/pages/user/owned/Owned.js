import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Owned.css'
import { useNavigate } from 'react-router-dom';

function Owned() {
    const navigate = useNavigate()
    const [ownedMangaList, setOwnedMangaList] = useState([{
        'id': '',
        'cover': '',
        'title': '',
        'chapters': []
    }])
    const [selectedChapterId, setSelectedChapterId] = useState("")

    const handleSelectChapter = (e) => {
        switch (e.detail) {
            case 1:
                setSelectedChapterId(e.target.id)
                break;
            case 2:
                navigate("/read/" + e.target.id)
                break;
            default:
        }
    }

    useEffect(() => {
        //TODO: fetch owned manga and chapters from backend
        let fetchedOwnedMangaList = [
            {
                'id': 'manga',
                'cover': 'https://st.ntcdntempv3.com/data/comics/220/naruto-cuu-vi-ho-ly.jpg',
                'title': 'Item',
                'chapters': [
                    {
                        'id': 'Chapter 1',
                        'title': 'Chapter 1'
                    },
                    {
                        'id': 'Chapter 2',
                        'title': 'Chapter 2'
                    },
                    {
                        'id': 'Chapter 3',
                        'title': 'Chapter 3'
                    },
                    {
                        'id': 'Chapter 4',
                        'title': 'Chapter 4'
                    },
                    {
                        'id': 'Chapter 5',
                        'title': 'Chapter 5'
                    },
                    {
                        'id': 'Chapter 6',
                        'title': 'Chapter 6'
                    },
                    {
                        'id': 'Chapter 7',
                        'title': 'Chapter 7'
                    },
                    {
                        'id': 'Chapter 8',
                        'title': 'Chapter 8'
                    },
                    {
                        'id': 'Chapter 9',
                        'title': 'Chapter 9'
                    },
                    {
                        'id': 'Chapter 10',
                        'title': 'Chapter 10'
                    }
                ]
            },
            {
                'id': 'manga',
                'cover': 'https://st.ntcdntempv3.com/data/comics/220/naruto-cuu-vi-ho-ly.jpg',
                'title': 'Item 2',
                'chapters': [
                    {
                        'id': 'Chapter x',
                        'title': 'Chapter 1'
                    },
                    {
                        'id': 'Chapter xx',
                        'title': 'Chapter 2'
                    },
                    {
                        'id': 'Chapter xxx',
                        'title': 'Chapter 3'
                    },
                ]
            },
            {
                'id': 'manga',
                'cover': 'https://st.ntcdntempv3.com/data/comics/220/naruto-cuu-vi-ho-ly.jpg',
                'title': 'Item 3',
                'chapters': [
                    {
                        'id': 'Chapter y',
                        'title': 'Chapter 1'
                    },
                    {
                        'id': 'Chapter yy',
                        'title': 'Chapter 2'
                    },
                    {
                        'id': 'Chapter yyy',
                        'title': 'Chapter 3'
                    },
                    {
                        'id': 'Chapter yyyy',
                        'title': 'Chapter 4'
                    },
                ]
            }
        ]

        setOwnedMangaList(fetchedOwnedMangaList)
    }, [])

    return (
        <InfiniteScroll
            dataLength={1}
            height={660}
        >
            {ownedMangaList.map((owned) =>
            <div className='owned-list-wrapper'>
                <Grid container sx={{ marginTop: '30px' }}>
                    <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                        <a href={'/manga/' + owned.id}>
                            <img className='owned-manga-cover' src={owned.cover} alt='owned-cover' />
                        </a>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <div className='owned-chapter-title-wrapper'>
                            <a className='owned-title-href' href={'/manga/' + owned.id}>
                                <h3 className='owned-chapter-title'>{owned.title}</h3>
                            </a>
                            <div></div>
                        </div>
                        <h3>Danh sách chương sở hữu:</h3>
                        <div className='scroll-wrapper'>
                            <InfiniteScroll
                                dataLength={3}
                                height={200}
                            >
                                {owned.chapters.map((chapter) =>
                                    <div className={selectedChapterId === chapter.id ? 'selected-owned-chapter-wrapper' : 'owned-chapter-wrapper'} id={chapter.id} onClick={handleSelectChapter}>
                                        {chapter.title}
                                    </div>
                                )}
                            </InfiniteScroll>
                        </div>
                    </Grid>
                </Grid>
            </div>
            )}
        </InfiniteScroll>
    )
}

export default Owned