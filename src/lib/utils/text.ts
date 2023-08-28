export const slugify = (str: string) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, '')  // Remove leading/trailing hyphens
        .replace(/-{2,}/g, '-');  // Replace consecutive hyphens with a single hyphen
}


export const generateInviteToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 16;
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};
