import type { PageServerLoad, Actions } from '../../cms/users/$types';
import { createUser, deleteUser, getUserById, getUserCount, getUsers, updateUser } from '$lib/server/db/cruds/users';
import { fail } from '@sveltejs/kit';
import { sha256 } from "@oslojs/crypto/sha2";
import { getPagingAndSortingParams } from '../shared/getPaginationAndSortingParams';
import type { UserType } from '$lib/types/users';

export const load: PageServerLoad = (async ({ url }) => {
    const { pageIndex, itemsPerPage, sortBy, sortDirection } = getPagingAndSortingParams(url);

    const [users, userCount] = await Promise.all([
        getUsers(itemsPerPage, pageIndex * itemsPerPage, undefined, sortBy, sortDirection),
        getUserCount()
    ]);

    return {
        users: users,
        userCount: userCount?.count ?? 0
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        const { username, newPassword, type, securityQuestion, securityQuestionAnswer } = formData as {
            username: string,
            newPassword: string,
            type: UserType,
            securityQuestion: string,
            securityQuestionAnswer: string
        };

        const user = {
            username: username,
            password: sha256(Buffer.from(newPassword)),
            type: type,
            securityQuestion: securityQuestion,
            securityQuestionAnswer: securityQuestionAnswer
        }

        try {
            const newUser = await createUser(user);

            return {
                userId: newUser.id,
                username: newUser.username,
            };
        } catch (e) {
            console.log(e);
            return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
        }
    },
    
    update: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        const { id, username, type, currentPassword, newPassword, securityQuestion, securityQuestionAnswer } = formData as {
            id: string,
            username: string,
            type: UserType,
            currentPassword: string,
            newPassword: string,
            securityQuestion: string,
            securityQuestionAnswer: string
        }

        const update = {
            username: username,
            password: newPassword.length ? sha256(Buffer.from(newPassword)) : undefined,
            type: type,
            securityQuestion: securityQuestion,
            securityQuestionAnswer: securityQuestionAnswer.length ? securityQuestionAnswer : undefined
        }

        try {
            const updatedUser = await updateUser(id, update, currentPassword);

            return {
                userId: updatedUser.id,
                username: updatedUser.username,
            };
        } catch (e) {
            console.log(e);
            return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
        }
    },

    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id') as string;

        try {
            const userToDelete = await getUserById(id);
            await deleteUser(id);

            return {
                itemName: userToDelete?.username,
            };
        } catch (e) {
            console.log(e);
            return fail(422, { error: e instanceof Error ? e.message : 'Unknown error occured.' });
        }
    }
} satisfies Actions;