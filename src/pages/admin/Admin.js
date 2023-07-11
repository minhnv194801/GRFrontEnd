import React from 'react';
import AdminNavbar from './navbar/AdminNavbar'
import './Admin.css'

const CustomAdmin = (props) => {
    return (
        // <Admin basename='/admin' dataProvider={dataProvider}>
        //     <Resource name="users" list={UserList} create={UserCreate} show={UserShow} edit={UserEdit} />
        //     <Resource name="mangas" list={MangaList} create={MangaCreate} show={MangaShow} edit={EditGuesser} />
        //     <Resource name="chapters" list={ChapterList} create={ChapterCreate} show={ChapterShow} edit={EditGuesser} />
        //     <Resource name="comments" list={CommentList} show={CommentShow} edit={EditGuesser} />
        //     <Resource name="reports" list={ReportList} show={ReportShow} edit={EditGuesser} />
        // </Admin>
        <div>
            <AdminNavbar selected={props.selected}/>
            <div className='admin-outer'>
                {props.adminContent}
            </div>
        </div>
    )
}

export default CustomAdmin