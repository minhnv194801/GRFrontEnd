import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux'
import { displaySuccess } from '../../../components/topalert/TopAlertSlice'
import { setUserAvatar, setUsername } from '../UserSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Favorite.css'

function Favorite() {
    const [favoriteMangaList, setFavoriteMangaList] = useState([
        {
            "id": "",
            "cover": "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
            "name": "Loading...",
            "chapters": []
        }
    ])

    useEffect(() => {
        //TODO: fetch favorite manga list from server
        //TODO: update time from unix to relative time
        let fetchedFavoriteManga = [
            {
                'id': 'item',
                'title': 'Item 1',
                'cover': 'https://st.ntcdntempv3.com/data/comics/220/naruto-cuu-vi-ho-ly.jpg',
                'chapters': [
                    {
                        "id": "Chapter 3",
                        "title": "Chapter 3",
                        "updateTime": "1 ngày trước",
                      },
                      {
                        "id": "Chapter 2",
                        "title": "Chapter 2",
                        "updateTime": "7 ngày trước",
                      },
                      {
                        "id": "Chapter 1",
                        "title": "Chapter 1",
                        "updateTime": "14 ngày trước",
                      }
                ],
            },
            {
                'id': 'item',
                'title': 'Item 2',
                'cover': 'https://st.ntcdntempv3.com/data/comics/220/naruto-cuu-vi-ho-ly.jpg',
                'chapters': [
                    {
                        "id": "Chapter 3",
                        "title": "Chapter 3",
                        "updateTime": "1 ngày trước",
                      },
                      {
                        "id": "Chapter 2",
                        "title": "Chapter 2",
                        "updateTime": "7 ngày trước",
                      },
                      {
                        "id": "Chapter 1",
                        "title": "Chapter 1",
                        "updateTime": "14 ngày trước",
                      }
                ],
            },
            {
                'id': 'item',
                'title': 'Item 3',
                'cover': 'https://st.ntcdntempv3.com/data/comics/220/naruto-cuu-vi-ho-ly.jpg',
                'chapters': [
                    {
                        "id": "Chapter 3",
                        "title": "Chapter 3",
                        "updateTime": "1 ngày trước",
                      },
                      {
                        "id": "Chapter 2",
                        "title": "Chapter 2",
                        "updateTime": "7 ngày trước",
                      },
                      {
                        "id": "Chapter 1",
                        "title": "Chapter 1",
                        "updateTime": "14 ngày trước",
                      }
                ],
            },
        ]

        setFavoriteMangaList(fetchedFavoriteManga)
    }, [])

    return (
        <InfiniteScroll
            dataLength={favoriteMangaList.length}
            height={660}
        >
            {favoriteMangaList.map((favoriteManga) => 
                <div className='favorite-wrapper'>
                    <Grid container sx={{marginTop:'30px'}}>
                        <Grid item xs={4} sx={{textAlign:'center'}}>
                            <a href={'/manga/'+favoriteManga.id}>
                                <img className='favorite-manga-cover' src={favoriteManga.cover} alt='manga-cover'/>
                            </a>
                        </Grid>
                        <Grid item xs={8} columnSpacing={3}>
                            <div className='favorite-title-wrapper'>    
                                <a href={'/manga/'+favoriteManga.id}>
                                    <h3 className='favorite-title'>{favoriteManga.title}</h3>
                                </a>
                            </div>
                            {favoriteManga.chapters.map((chapter) =>
                                <div className='favorite-chapter'>
                                    <a href={'/read/'+chapter.id}>
                                        <h4>{chapter.title}</h4>
                                    </a>
                                    <h7 className='favorite-chapter-updatetime'>{'(Cập nhật: '+chapter.updateTime+')'}</h7>
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </div>
            )}
        </InfiniteScroll>
    )
}

export default Favorite