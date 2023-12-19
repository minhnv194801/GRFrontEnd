import React, { useEffect, useState } from "react"
import { Button, IconButton, TextField } from "@mui/material"
import { Add, Clear, Save } from "@mui/icons-material"
import { useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import './ChapterAdminCreate.css'
import '../AdminCreate.css'

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

const iconStyle = {
    'color': '#0099FF',
}

const ChapterAdminCreate = (props) => {
    const [searchParams] = useSearchParams()
    const sessionkey = useSelector((state) => state.app.sessionkey)
    const [mangaTextFieldValue, setMangaTextFieldValue] = useState(searchParams.get('manga') ? searchParams.get('manga') : "")
    const [titleTextFieldValue, setTitleTextFieldValue] = useState("")
    const [coverValue, setCoverValue] = useState("")
    const [priceValue, setPriceValue] = useState(0)
    const [imagesValue, setImagesValue] = useState([])
    const [manga, setManga] = useState(null)

    const [isMangaTextFieldError, setIsMangaTextFieldError] = useState(false)
    const [mangaTextFieldErrorMsg, setMangaTextFieldErrorMsg] = useState(false)

    useEffect(() => {
        const fetchMangaReference = async (mangaId) => {
            let apiUrl = process.env.REACT_APP_API_ENDPOINT+'/admin/mangas/reference/' + mangaId

            const response = await fetch(apiUrl, {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Authorization': sessionkey,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                // convert data to json
                const json = await response.json()
                json.id = mangaId
                setManga(json)
            } else {
                setManga({})
            }
        }

        if (mangaTextFieldValue.trim() !== '') {
            fetchMangaReference(mangaTextFieldValue)
        }
    // eslint-disable-next-line
    }, [mangaTextFieldValue])

    const handleMangaTextFieldChange = (e) => {
        setMangaTextFieldValue(e.target.value)
    }

    const handleTitleTextFieldChange = (e) => {
        setTitleTextFieldValue(e.target.value)
    }

    const handlePriceValueChange = (e) => {
        setPriceValue(e.target.value)
    }

    const handleCoverChange = (e) => {
        const file = e.target?.files?.[0];
        if (file) {
            getBase64(file).then((base64) => {
                setCoverValue(base64)
            });
        }
    }

    const addImage = (e) => {
        const file = e.target?.files?.[0];
        if (file) {
            getBase64(file).then((base64) => {
                handleChangeImages(base64, imagesValue.length)
            });
        }
    }

    const handleChangeImages = (value, index) => {
        let newImages = [...imagesValue]
        newImages[index] = value
        setImagesValue(newImages)
    }

    const removeImage = (index) => {
        let newImages = [...imagesValue]
        newImages.splice(index, 1)
        setImagesValue(newImages)
    }

    const submitForm = (e) => {
        const putBackend = async () => {
            const response = await fetch(process.env.REACT_APP_API_ENDPOINT+'/admin/chapters', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Authorization': sessionkey,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'Manga': mangaTextFieldValue,
                    'Title': titleTextFieldValue,
                    'Cover': coverValue,
                    'Price': parseInt(priceValue),
                    'Images': imagesValue
                })
            })

            if (response.ok) {
                const json = await response.json();
                window.location.href = '/admin/chapter/show/' + json.id
            } else {
                const json = await response.json();
                if (json.errors && json.errors.Manga) {
                    setIsMangaTextFieldError(true)
                    setMangaTextFieldErrorMsg(json.errors.Manga)
                }
            }
        }

        putBackend()
    }

    return (
        <>
            <h1 className="admin-create-header">Tạo chương truyện mới</h1>
            <div className="create-admin-wrapper">
                <div className="flex-create-admin-textfield">
                    <p>Manga:</p>
                    <TextField
                        label='manga'
                        value={mangaTextFieldValue}
                        onChange={handleMangaTextFieldChange}
                        error={isMangaTextFieldError}
                        helperText={mangaTextFieldErrorMsg}
                        required />
                    <div className='admin-chapter-manga-card-wrapper' onClick={() => { if (manga.id) window.location.href = '/admin/manga/show/' + manga.id }}>
                        <div className='admin-chapter-manga-card-cover-wrapper'>
                            <img className='admin-chapter-manga-card-cover' src={manga ? manga.cover : ''} alt='card-cover' />
                        </div>
                        <div className='admin-chapter-manga-card-title-wrapper'>
                            <p className='admin-chapter-manga-title'>{manga ? manga.title : ''}</p>
                        </div>
                    </div>
                </div>
                <div className="flex-create-admin-textfield">
                    <p>Title:</p>
                    <TextField
                        label='title'
                        onChange={handleTitleTextFieldChange}
                        required />
                </div>
                <div className="flex-create-admin-vertical">
                    <p>Cover:</p>
                    <div className="flex-create-admin-textfield">
                        <input
                            id='cover-file-input'
                            onChange={handleCoverChange}
                            type="file"
                            accept="image/png,image/jpeg,image/gif"
                        />
                        <img className='chapter-admin-create-cover-preview' src={coverValue} alt='cover-preview' />
                    </div>
                </div>
                <div className="flex-create-admin-textfield">
                    <p>Price:</p>
                    <TextField
                        label='price'
                        type='number'
                        onChange={handlePriceValueChange}
                        required />
                </div>
                <div className="flex-create-admin-vertical">
                    <p>Images:</p>
                    {imagesValue.map((img, index) => (
                        <div className="manga-admin-show-editable-wrapper">
                            <img className="chapter-admin-create-preview-page" src={img} alt='' />
                            <IconButton onClick={(e) => removeImage(index)}>
                                <Clear sx={iconStyle} />
                            </IconButton>
                        </div>
                    ))}
                    <input
                        id='images-file-input'
                        hidden
                        onChange={addImage}
                        type="file"
                        accept="image/png,image/jpeg,image/gif"
                    />
                    <label htmlFor="images-file-input">
                        <IconButton component='span'>
                            <Add sx={iconStyle} />
                        </IconButton>
                    </label>
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

export default ChapterAdminCreate