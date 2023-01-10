import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import './AuthForm.css';
import { fieldValidation } from './validation';
import { delSpaces } from '../../util';
import { IForm, IModal } from '../../types';
import axios from 'axios'

export const AuthForm: React.FC<IModal> = ({ isModalOpened, setIsModalOpened, isPosted, setIsPosted }) => {
    const API_URL = 'https://jsonplaceholder.typicode.com/posts'

    const [postedData, setPostedData] = useState<IForm>({ name: '', phone: '', text: '' })
    const [isError, setIsError] = useState(false)
    const { handleSubmit, control } = useForm<IForm>();
    const { errors } = useFormState({ control });

    const onInfoCloseClick = () => {
        setIsModalOpened((prev: boolean) => !isModalOpened);
        setIsPosted((prev: boolean) => !isPosted);
    }

    const onSubmit: SubmitHandler<IForm> = (data) => {
        axios.post(API_URL, { ...data, phone: delSpaces(data.phone) })
            .then(response => {
                setPostedData(response.data);
                setIsPosted((prev: boolean) => !isPosted)
            })
            .catch(error => {
                setIsError((prev: boolean) => !isError)
            })
    }

    return (
        <div className='auth-form'>
            {(!isPosted && !isError) ? (
                <>
                    <Typography variant="h4" component="div">
                        Заявка на обратный звонок
                    </Typography>
                    <Typography variant="subtitle1" component="div" gutterBottom={true} className="auth-form__subtitle">
                        Заполните форму
                    </Typography>
                    <form className='auth-form__form' onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            control={control}
                            name="name"
                            rules={fieldValidation}
                            render={({ field }) => (
                                <TextField
                                    id="outlined-textarea"
                                    label="Имя"
                                    size="medium"
                                    margin="normal"
                                    className="auth-form__input"
                                    fullWidth={true}
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    error={!!errors.name?.message}
                                    placeholder="Введите логин"
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="phone"
                            rules={{ validate: matchIsValidTel, required: 'asd' }}
                            render={({ field, fieldState }) => (
                                <MuiTelInput className='form__phone-input'
                                    {...field}
                                    label="Телефон"
                                    size="medium"
                                    margin="normal"
                                    fullWidth={true}
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    helperText={fieldState.error ? "Введите корректный номер телефона" : null}
                                    error={!!fieldState.error}
                                    disableDropdown
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="text"
                            rules={fieldValidation}
                            render={({ field }) => (
                                <TextField
                                    id="outlined-textarea"
                                    label="Сообщение"
                                    size="medium"
                                    margin="normal"
                                    className="auth-form__input"
                                    fullWidth={true}
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value}
                                    error={!!errors.text?.message}
                                    placeholder="Введите сообщение"
                                    helperText={errors.text?.message}
                                    multiline
                                />
                            )}
                        />
                        <Button type="submit" variant="contained" fullWidth={true} size='large' sx={{ mt: 3 }}>Отправить</Button>
                    </form>
                </>
            ) : (!isError ? (
                <>
                    <Typography className='authform__success-text' variant="h6" component="p" sx={{ mb: 3 }}>
                        Заявка успешно отправлена!
                    </Typography>
                    <Typography variant="body1" component="p">
                        Ваше имя: {postedData?.name}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Ваш телефон: {postedData?.phone}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Ваше сообщение: {postedData?.text}
                    </Typography>
                    <Button onClick={onInfoCloseClick} variant='contained' sx={{ mt: 3 }}>ОК</Button>
                </>) : <>
                <Typography variant="h6" component="p" color="error" sx={{ mb: 3 }}>
                    Ошибка отправки формы
                </Typography>
            </>)}
        </div >
    )
}