export const slugify = (str: string) => {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, '')  // Remove leading/trailing hyphens
        .replace(/-{2,}/g, '-');  // Replace consecutive hyphens with a single hyphen
}
