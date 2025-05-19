import type { PageServerLoad, Actions } from '../../cms/users/$types';
import { createUser, deleteUser, getUsers, updateUser } from '$lib/server/db/cruds/users';
import { fail } from '@sveltejs/kit';
import { sha256 } from "@oslojs/crypto/sha2";

export const load: PageServerLoad = (async () => {
    const users = await getUsers();
    
    return {
        users: users
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        const { username, newPassword, securityQuestion, securityQuestionAnswer } = formData as {
            username: string,
            newPassword: string,
            securityQuestion: string,
            securityQuestionAnswer: string
        };

        const user = {
            username: username,
            password: sha256(Buffer.from(newPassword)),
            securityQuestion: securityQuestion,
            securityQuestionAnswer: securityQuestionAnswer
        }

        try {
            const newUser = await createUser(user);

            return {
                succes: true,
                userId: newUser.id
            };
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(422, { error: error.message });
        }
    },

    update: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        const { id, username, currentPassword, newPassword, securityQuestion, securityQuestionAnswer } = formData as {
            id: string,
            username: string,
            currentPassword: string,
            newPassword: string,
            securityQuestion: string,
            securityQuestionAnswer: string
        }

        const update = {
            username: username,
            password: newPassword.length ? sha256(Buffer.from(newPassword)) : undefined,
            securityQuestion: securityQuestion,
            securityQuestionAnswer: securityQuestionAnswer
        }

        try {
            const updatedUser = await updateUser(id, update, currentPassword);

            return {
                succes: true,
                userId: updatedUser.id
            };
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(422, { error: error.message });
        }
    },

    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id') as string;

        try {
            await deleteUser(id);

            return {
                succes: true
            };
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(422, { error: error.message });
        }
    }
} satisfies Actions;