const REQUIRED_FIELD = 'Обязательно для заполнения'


export const fieldValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if (value.match(/(?=.*[!@#$%^&*])/g)) {
            return "Данное поле не может содержать спецсимволы"
        } else if (value == '') { return REQUIRED_FIELD }

        return true;
    }
}

