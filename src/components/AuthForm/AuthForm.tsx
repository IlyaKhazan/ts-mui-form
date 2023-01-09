import React, { useState } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import './AuthForm.css';
import { fieldValidation } from './validation';
import { delSpaces } from '../../util';
import axios from 'axios'

interface IForm {
    name: string;
    phone: string;
    text: string;
}

export const AuthForm: React.FC = () => {
    const { handleSubmit, control } = useForm<IForm>();
    const { errors } = useFormState({ control });

    const [postedData, setPostedData] = useState(null)

    const onSubmit: SubmitHandler<IForm> = (data) => {

        axios.post('https://jsonplaceholder.typicode.com/posts', { ...data, phone: delSpaces(data.phone) })
            .then(response => setPostedData(response.data))
            .catch(error => {
                console.log(error)
            })
    }
    console.log(postedData)

    return (
        <div className='auth-form'>
            <Typography variant="h4" component="div">
                Вход
            </Typography>
            <Typography variant="subtitle1" component="div" gutterBottom={true} className="auth-form__subtitle">
                Авторизуйтесь для получения доступа
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
                <Button type="submit" variant="contained" fullWidth={true} sx={{ mt: 2 }}>Войти</Button>
            </form>
            {/* //  {postedData && <ul>{postedData.map(el => <li>el</li>)}</ul>} */}
        </div >
    )
}