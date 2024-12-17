import { z } from "zod";

const tariffBands = [
    { name: "Band A", costPerKWh: 225 },
    { name: "Band B", costPerKWh: 63 },
    { name: "Band C", costPerKWh: 50 },
    { name: "Band D", costPerKWh: 43 },
    { name: "Band E", costPerKWh: 40 },
];

export const homeValidator = z.object({
    homeName: z.string().nonempty("Home Name is required"),
    address: z.string().nonempty("Address is required"),
    homeType: z.string().nonempty("Apartment Type is required"),
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
        band: z.string().nonempty("Band Name is required"),
    }),
});
