import { toastStore} from "@skeletonlabs/skeleton";
import type { ToastSettings } from '@skeletonlabs/skeleton';
export const sendToast = (message: string, type = 'success') => {
    let toastColor = 'variant-filled-success';
    if (type == 'warning') {
        toastColor = 'variant-filled-warning';
    } else if (type == 'error') {
        toastColor = 'variant-filled-error';
    }

    const t: ToastSettings = { message, background: toastColor };

    toastStore.trigger(t);
};