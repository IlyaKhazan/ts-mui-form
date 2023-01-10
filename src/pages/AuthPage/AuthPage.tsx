import React, { useState } from 'react';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { Dialog, Button } from '@mui/material';
import './AuthPage.css';

export const AuthPage: React.FC = () => {
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
    const [isPosted, setIsPosted] = useState<boolean>(false)

    const onBtnClick = () => {
        setIsModalOpened((prev: boolean) => !isModalOpened)
    }

    return (
        <div className='auth-page'>
            <Dialog open={isModalOpened} onClose={onBtnClick}>
                <AuthForm isModalOpened={isModalOpened} setIsModalOpened={onBtnClick} isPosted={isPosted} setIsPosted={setIsPosted} />
            </Dialog>
            <Button onClick={onBtnClick} variant='contained' size='large'>Заполнить заявку</Button>
        </div>
    )
}