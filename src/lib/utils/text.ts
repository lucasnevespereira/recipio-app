export const slugify = (str: string) => {
    const map: { [key: string]: string } = {
        'á': 'a', 'à': 'a', 'ã': 'a', 'â': 'a', 'ä': 'a', 'å': 'a', 'æ': 'a',
        'ç': 'c',
        'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
        'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
        'ñ': 'n',
        'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o', 'œ': 'o',
        'ß': 's',
        'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
        'ý': 'y', 'ÿ': 'y',
        'ð': 'd', 'þ': 'th',
    };

    // convert special characters
    const convertedStr = str.toLowerCase().replace(/./g, (char) => map[char] || char);

    return convertedStr
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
