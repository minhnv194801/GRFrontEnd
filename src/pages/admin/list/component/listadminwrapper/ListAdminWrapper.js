import React from 'react';
import './ListAdminWrapper.css';

//TODO: connect to backend
const ListAdminWrapper = (props) => {
    return (
        <div className='list-admin-wrapper'>
            {props.children}
        </div>
    )
}

export default ListAdminWrapper