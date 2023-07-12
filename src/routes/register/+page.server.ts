import type { Actions } from './$types';

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();
        console.log(data);
        return {success: true}
    }
} satisfies Actions;