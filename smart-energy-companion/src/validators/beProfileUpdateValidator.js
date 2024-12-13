import { z } from "zod";

export const beProfileUpdateValidator = z.object({
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
    phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/), // Basic regex for phone number without `react-phone-number-input`
    address: z.string().min(5, "Address must be at least 5 characters").optional().or(z.literal(null)),
});