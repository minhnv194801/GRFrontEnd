import { React } from 'react';
import { Star, Circle } from '@mui/icons-material';
import './SearchResult.css'

const SearchResult = (props) => {
    const navigateToMangaPage = (id) => {
        window.location.href = "/manga/" + id;
    }

    return (
        <div className='navbar-searchresult-wrapper'>
            {props.items.map((item) =>
                <div className='navbar-single-search-result-wrapper'  onMouseDown={(e) => navigateToMangaPage(item.id)}>
                    <div className='navbar-searchresult-cover-wrapper'>
                        <img className='navbar-searchresult-cover' src={item.cover} alt='NavbarSearchResultCover'/>
                    </div>
                    <div className='navbar-searchresult-content-wrapper'>
                        <h2 className='navbar-searchresult-title'>{item.title}</h2>
                        <div className='searchresult-info-wrapper'>
                            <div className='searchresult-rating-status-wrapper'>
                                <div className='searchresult-rating-wrapper'>
                                    <Star sx={{ color: 'yellow' }} fontSize='small' />
                                    {item.rating === 0 ? 'N/a' : Number(item.rating).toFixed(2)}
                                </div>
                                <div className='searchresult-status-wrapper'>
                                    <Circle sx={{ color: item.status === 0 ? '#00FF00' : '#87CEEB' }} fontSize='small' />
                                    {item.status === 0 ? "Đang tiến hành" : "Đã hoàn thành"}
                                </div>
                            </div>
                            <div>
                                <div className="searchresult-tag-list-wrapper">
                                    {item.tags === undefined ? null : item.tags.map((tag) => <div className="searchresult-tag-wrapper">{tag}</div>)}
                                </div>
                            </div>
                            <div className='searchresult-description-wrapper'>{item.description}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchResult;