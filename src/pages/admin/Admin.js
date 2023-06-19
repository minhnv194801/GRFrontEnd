import React from 'react';
import { Admin, Resource, EditGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import UserList from './user/UserList';
import UserCreate from './user/UserCreate';
import UserShow from './user/UserShow';
import UserEdit from './user/UserEdit';
import MangaList from './manga/MangaList';
import ChapterList from './chapter/ChapterList';
import CommentList from './comment/CommentList';
import ReportList from './report/ReportList';
import MangaShow from './manga/MangaShow';
import ChapterShow from './chapter/ChapterShow';
import CommentShow from './comment/CommentShow';
import ReportShow from './report/ReportShow';
import MangaCreate from './manga/MangaCreate';
import ChapterCreate from './chapter/ChapterCreate';

const CustomAdmin = (props) => {
    const dataProvider = simpleRestProvider('http://localhost:8081/api/v1/admin');

    return (
        <Admin basename='/admin' dataProvider={dataProvider}>
            <Resource name="users" list={UserList} create={UserCreate} show={UserShow} edit={UserEdit}/>
            <Resource name="mangas" list={MangaList} create={MangaCreate} show={MangaShow} edit={EditGuesser}/>
            <Resource name="chapters" list={ChapterList} create={ChapterCreate} show={ChapterShow} edit={EditGuesser}/>
            <Resource name="comments" list={CommentList} show={CommentShow} edit={EditGuesser}/>
            <Resource name="reports" list={ReportList} show={ReportShow} edit={EditGuesser}/>
        </Admin>
    )
}

export default CustomAdmin