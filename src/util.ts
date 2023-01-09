export const delSpaces = (str: string) => {
    return str.split('').filter(e => e.trim().length).join('')
}