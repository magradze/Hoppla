import * as z from 'zod';

const ChangePasswordScheme = z.object({
    newPassword: z.string().min(6, {
        message: 'პაროლი უნდა იყოს 6 სიმბოლოზე მეტი'
    }),
    confirmPassword: z.string().min(6, {
        message: 'პაროლი უნდა იყოს 6 სიმბოლოზე მეტი'
    })
});

export default ChangePasswordScheme;