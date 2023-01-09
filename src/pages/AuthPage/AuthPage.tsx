import React, { useState } from 'react';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { Dialog, Button } from '@mui/material';
import './AuthPage.css';

export const AuthPage: React.FC = () => {
    const [isModalOpened, setIsModalOpened] = useState(false)

    const onBtnClick = () => {
        setIsModalOpened(prev => !isModalOpened)
    }

    return (
        <div className='auth-page'>
            <Dialog open={isModalOpened}>
                <AuthForm />
            </Dialog>
            <Button onClick={onBtnClick} variant='contained'>Отправить форму</Button>
        </div>
    )
}