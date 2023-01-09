import React from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useForm, Controller, SubmitHandler, useFormState } from 'react-hook-form';
import './AuthForm.css';
import { fieldValidation, passwordValidation } from './validation';

interface IForm {
    name: string;
    phone?: string;
    text: string;
}

export const AuthForm: React.FC = () => {

    const { handleSubmit, control } = useForm<IForm>();
    const { errors } = useFormState({ control });


    const onSubmit: SubmitHandler<IForm> = (data) => console.log(data);
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
                <Button type="submit" variant="contained" fullWidth={true}>Войти</Button>
            </form>
        </div >
    )
}