

export const validateData = async (formData: FormData, schema: any) => {
    const body = Object.fromEntries(formData);

    try {
        const data = schema.parse(body);
        return {
            formData: data,
            errors: null
        };
    } catch (e: any) {
        console.error(e);
        const errors = e.flatten();
        return {
            formData: body,
            errors
        };
    }
};