import React from 'react';
import { Create, SelectInput, SimpleForm, TextInput } from 'react-admin';

const UserCreate = (props) => {
    return (
        <Create title='Create User' mutationMode="pessimistic">
            <SimpleForm>
                <TextInput source="Email" required type='email' />
                <TextInput source="Password" required type='password' />
                <SelectInput source="Role" required choices={[
                    { id: 'Người dùng', name: 'Người dùng' },
                    { id: 'Quản trị viên', name: 'Quản trị viên' },
                ]} />
            </SimpleForm>
        </Create>
    )
}

export default UserCreate