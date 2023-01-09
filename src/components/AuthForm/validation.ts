const REQUIRED_FIELD = 'Обязательно для заполнения'


export const fieldValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if (value.match(/(?=.*[!@#$%^&*])/g)) {
            return "Данное поле не может содержать спецсимволы"
        }

        return true;
    }
}

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {

        if (value.length < 7) {
            return "Пароль должен содержать не менее 5 символов"
        }

        return true
    }
}