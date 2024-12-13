import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from "zod";

export const feProfileUpdateValidator = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .optional()
        .or(z.literal(null)), // Allow null for optional fields
    middleName: z
        .string()
        .min(2, "Middle name must be at least 2 characters")
        .optional()
        .or(z.literal(null)),
    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .optional()
        .or(z.literal(null)),
    phoneNumber: z.string()
        .nullable()
        .refine((value) => {
            if (!value) {
                return true;
            } // Allow null/empty
            return isValidPhoneNumber(value);
        }, { message: 'Invalid phone number' }),
    address: z.string().min(5, "Address must be at least 5 characters").optional().or(z.literal(null)),
});


