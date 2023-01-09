import React from 'react';
import { Typography } from '@mui/material';
import './AuthForm.css';

export const AuthForm: React.FC = () => {
    return (
        <div className='auth-form'>
            <Typography variant="h4" component="div">
                Вход
            </Typography>
            <Typography variant="subtitle1" component="div" gutterBottom={true} className="auth-form__subtitle">
                Авторизуйтесь для получения доступа
            </Typography>
        </div>
    )
}