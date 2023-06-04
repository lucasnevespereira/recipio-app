import {PUBLIC_PB_ADMIN_URL} from '$env/static/public'

export const getImageURL = (collectionId: string, recordId: string, filename: string, size = '0x0') => {
    return `${PUBLIC_PB_ADMIN_URL}/api/files/${collectionId}/${recordId}/${filename}?thumb=${size}`
}