import { getPortfolioItems } from '$lib/server/db/cruds/portfolioItems';
import type { IPortfolioItem } from '$lib/types/portfolio';
import type { Actions, PageServerLoad } from './$types';
import nodemailer from 'nodemailer';
import { fail } from '@sveltejs/kit';
import { SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER } from '$env/static/private';

export const load = (async () => {
    const data = (await getPortfolioItems()).sort((a, b) => {
        return b.visiblePriority - a.visiblePriority;
    });

    const portfolioItems = data.map(pItem => {
        return {
            id: pItem.id,
            type: pItem.type,
            title: pItem.title,
            description: pItem.description,
            image: pItem.upload?.image,
            articleContent: pItem.articleContent
        } as IPortfolioItem
    })

    return { portfolioItems: portfolioItems };
}) satisfies PageServerLoad;

export const actions: Actions = {
    sendmail: async ({ request }) => {
        const formData = await request.formData();
        const formDataObject = Object.fromEntries(formData);
        const { name, email, message } = formDataObject as {
            name: string,
            email: string,
            message: string
        };

        if (!name || !email || !message) {
            return fail(400, { success: false, message: 'Naam, emailadres en bericht zijn verplicht.' })
        }

        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            secure: true,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS
            },
            tls: {
                rejectUnauthorized: true
            }
        });

        const mailOptions = {
            from: `Portfolio Contact Form <${SMTP_USER}>`,
            replyTo: email,
            to: SMTP_USER,
            subject: `Portfolio Contact Inquiry by ${name}`,
            text: message
        }

        try {
            await transporter.sendMail(mailOptions);
            return { success: true, message: "Gelukt! We nemen zo snel mogelijk contact met je op." }
        } catch (e) {
            const error = e as Error;
            console.log(error);
            return fail(500, { success: false, message: "Er ging iets mis. Probeer later opnieuw." });
        }
    }
}