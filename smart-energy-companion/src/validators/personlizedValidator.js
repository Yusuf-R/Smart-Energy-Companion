import { z } from "zod";

export const homeValidator = z.object({
    name: z.string().nonempty("Home Name is required"),
    address: z.string().nonempty("Address is required"),
    type: z.string().nonempty("Apartment Type is required"),
    rooms: z
        .array(
            z.object({
                name: z.string().nonempty("Room Name is required"),
                type: z.string().nonempty("Room Type is required"),
                appliances: z
                    .array(
                        z.object({
                            name: z.string().nonempty("Appliance Name is required"),
                            wattage: z.number().positive("Wattage must be greater than 0"),
                            qty: z.number().int().positive().default(1),
                        })
                    )
                    .nonempty("At least one appliance is required"),
            })
        )
        .nonempty("At least one room is required"),
    energyBill: z.object({
        amount: z.string().regex(/^\d+$/, "Energy bill must be a valid number"),
        startDate: z.string().nonempty("Start Date is required"),
        endDate: z.string().nonempty("End Date is required"),
        band: z.enum(["A", "B", "C", "D", "E"], {
            errorMap: () => ({ message: "Please select a valid energy band" }),
        }),
    }),
});
