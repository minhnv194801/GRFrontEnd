import React from 'react';
import { Create, NumberInput, SimpleForm, TextInput } from 'react-admin';

const ChapterCreate = (props) => {
    return (
        <Create title='Create Chapter' mutationMode="pessimistic">
            <SimpleForm>
                <TextInput source="Manga" />
                <TextInput source="title" />
                <TextInput source="Cover" />
                <NumberInput source="Price" />
                <TextInput source="Images" />
            </SimpleForm>
        </Create>
    )
}

export default ChapterCreate