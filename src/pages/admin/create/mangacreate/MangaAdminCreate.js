import React, { useState } from "react"
import './MangaAdminCreate.css'
import '../AdminCreate.css'
import { Button, IconButton, TextField } from "@mui/material"
import { Add, Clear, Save } from "@mui/icons-material"
import CONFIG from "../../../../common/Config"
import { useSelector } from "react-redux"

const iconStyle = {
    'color': '#0099FF',
}

const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function (error) {
            reject(error)
        };
    })
}

const MangaAdminCreate = (props) => {
    const sessionkey = useSelector((state) => state.app.sessionkey)

    const [nameTextFieldValue, setNameTextFieldValue] = useState("")
    const [altNamesTextFieldValue, setAltNamesTextFieldValue] = useState([])
    const [authorTextFieldValue, setAuthorTextFieldValue] = useState("")
    const [coverValue, setCoverValue] = useState("")
    const [descriptionTextFieldValue, setDescriptionTextFieldValue] = useState("")
    const [isRecommendedValue, setIsRecommendValue] = useState(false)
    const [tagsValue, setTagsValue] = useState([])

    const handleNameTextFieldChange = (e) => {
        setNameTextFieldValue(e.target.value)
    }

    const handleAuthorTextFieldChange = (e) => {
        setAuthorTextFieldValue(e.target.value)
    }

    const handleDescriptionTextFieldChange = (e) => {
        setDescriptionTextFieldValue(e.target.value)
    }

    const handleIsRecommendedChange = (e) => {
        setIsRecommendValue(e.target.value === '0' ? false : true)
    }

    const handleCoverChange = (e) => {
        const file = e.target?.files?.[0];
        if (file) {
            getBase64(file).then((base64) => {
                setCoverValue(base64)
            });
        }
    }

    const handleChangeAltNames = (value, index) => {
        let newAltName = [...altNamesTextFieldValue]
        newAltName[index] = value
        setAltNamesTextFieldValue(newAltName)
    }

    const removeAltName = (index) => {
        let newAltName = [...altNamesTextFieldValue]
        newAltName.splice(index, 1)
        setAltNamesTextFieldValue(newAltName)
    }

    const addAltName = (e) => {
        let newAltName = [...altNamesTextFieldValue]
        newAltName[newAltName.length] = ''
        setAltNamesTextFieldValue(newAltName)
    }

    const handleChangeTag = (value, index) => {
        let selectedTags = [...tagsValue]
        selectedTags[index] = value
        setTagsValue(selectedTags)
    }

    const addTag = (e) => {
        let availableTags = CONFIG.TAG_LIST.filter(value => !tagsValue.includes(value))
        if (availableTags.length > 0) {
            let newTagValues = [...tagsValue]
            newTagValues[newTagValues.length] = availableTags[0]
            setTagsValue(newTagValues)
        }
    }

    const removeTag = (index) => {
        let selectedTags = [...tagsValue]
        selectedTags.splice(index, 1)
        setTagsValue(selectedTags)
    }

    const submitForm = (e) => {
        const putBackend = async () => {
            const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/mangas', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Authorization': sessionkey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'Name': nameTextFieldValue,
                    'AlternateName': altNamesTextFieldValue,
                    'Author': authorTextFieldValue,
                    'Cover': coverValue,
                    'Description': descriptionTextFieldValue,
                    'IsRecommend': isRecommendedValue,
                    'Tags': tagsValue,
                })
            })

            if (response.ok) {
                const json = await response.json();
                window.location.href = '/admin/manga/show/' + json.id
            }
        }

        putBackend()
    }

    return (
        <>
            <h1 className="admin-create-header">Tạo bộ truyện mới</h1>
            <div className="create-admin-wrapper">
                <div className="flex-create-admin-textfield ">
                    <p>Name:</p>
                    <TextField
                        label='name'
                        onChange={handleNameTextFieldChange}
                        required />
                </div>
                <div className="flex-create-admin-vertical">
                    <p>AlternateNames:</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '30vw' }}>
                        {
                            altNamesTextFieldValue.map((altName, index) => (
                                <div className="manga-admin-show-editable-wrapper">
                                    <TextField
                                        value={altName}
                                        onChange={(e) => handleChangeAltNames(e.target.value, index)}
                                    />
                                    <IconButton onClick={(e) => removeAltName(index)}>
                                        <Clear sx={iconStyle} />
                                    </IconButton>
                                </div>
                            ))
                        }
                        <IconButton onClick={addAltName} sx={{ width: '40px' }}>
                            <Add sx={iconStyle} />
                        </IconButton>
                    </div>
                </div>
                <div className="flex-create-admin-textfield ">
                    <p>Author:</p>
                    <TextField
                        label='author'
                        onChange={handleAuthorTextFieldChange}
                        required />
                </div>
                <div className="flex-create-admin-vertical ">
                    <p>Cover:</p>
                    <div className="flex-create-admin-textfield">
                        <input
                            id='cover-file-input'
                            onChange={handleCoverChange}
                            type="file"
                            accept="image/png,image/jpeg,image/gif"
                        />
                        <img className='manga-admin-create-cover-preview' src={coverValue} alt='cover-preview' />
                    </div>
                </div>
                <div className="flex-create-admin-textfield ">
                    <p>Description:</p>
                    <TextField
                        label='description'
                        onChange={handleDescriptionTextFieldChange}
                        required />
                </div>
                <div className="flex-create-admin-vertical">
                    <p>IsRecommeded:</p>
                    <div>
                        <select id="isRecommended" onChange={handleIsRecommendedChange}>
                            <option value={0}>False</option>
                            <option value={1}>True</option>
                        </select>
                    </div>
                </div>
                <div className="flex-create-admin-vertical">
                    <p>Tags:</p>
                    <div>
                        {
                            tagsValue.map((tag, index) => (
                                <div className="manga-admin-show-editable-wrapper">
                                    <select value={tag} onChange={(e) => handleChangeTag(e.target.value, index)}>
                                        {CONFIG.TAG_LIST.map((tag) => (
                                            <option value={tag} hidden={tagsValue.includes(tag)}>{tag}</option>
                                        ))}
                                    </select>
                                    <IconButton onClick={(e) => removeTag(index)}>
                                        <Clear sx={iconStyle} />
                                    </IconButton>
                                </div>
                            ))
                        }
                        <IconButton onClick={addTag}>
                            <Add sx={iconStyle} />
                        </IconButton>
                    </div>
                </div>
                <div className="flex-create-admin-textfield ">
                    <Button startIcon={<Save />} onClick={submitForm}>
                        Lưu
                    </Button>
                </div>
            </div>
        </>
    )
}

export default MangaAdminCreate