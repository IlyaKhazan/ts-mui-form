import React from 'react';
import { AuthForm } from '../../components/AuthForm';
import { Typography } from '@mui/material';
import './AuthPage.css';

export const AuthPage: React.FC = () => {
    return (
        <div className='auth-page'>
            <AuthForm />
        </div>
    )
}