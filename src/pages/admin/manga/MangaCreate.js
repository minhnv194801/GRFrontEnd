import React from 'react';
import { BooleanInput, Create, SimpleForm, TextInput } from 'react-admin';

const MangaCreate = (props) => {
    return (
        <Create title='Create Manga' mutationMode="pessimistic">
            <SimpleForm>
                <TextInput source="Name" />
                <TextInput source="AlternateName" />
                <TextInput source="Author" />
                <TextInput source="Cover" />
                <TextInput source="Description" />
                <BooleanInput source="IsRecommended" />
                <TextInput source="Tags" />
            </SimpleForm>
        </Create>
    )
}

export default MangaCreate