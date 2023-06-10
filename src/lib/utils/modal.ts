import { Modal, modalStore } from '@skeletonlabs/skeleton';
import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

export const sendConfirmModal = (title: string, body: string, func: any) => {
    const modal: ModalSettings = {
        type: 'confirm',
        title: title,
        body: body,
        response: (r: boolean) => {
            if (r) {
                func()
            }
        },
    };
    modalStore.trigger(modal);
}