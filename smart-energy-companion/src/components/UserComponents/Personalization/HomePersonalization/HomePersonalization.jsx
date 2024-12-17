"use client";
import React, {useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    IconButton,
    MenuItem,
    Paper,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {CurrencyExchange, FlashOn, Home, Star} from "@mui/icons-material";
import {motion} from "framer-motion";
import {toast} from 'sonner';
import {Controller, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {homeValidator} from "@/validators/personlizedValidator";
import {FormControl} from "@mui/material/";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const apartmentTypes = [
    "Apartment",
    "Single Room",
    "Self Contained",
    "2 bedRoom Apartment",
    "3 bedroom Apartment",
    "Duplex",
    "Bungalow",
    "Condominium",
    "Penthouse",
    "Studio",
    "Townhouse",
    "Villa",
    "Cottage",
    "Loft",
    "Mansion",
    "Dormitory",
    "Flat",
    "Chalet",

];
const roomTypes = [
    "Foyer/Entrance Hall",
    "Sitting Room",
    "Kitchen Room",
    "Family Room",
    "Dining Room",
    "Living Room",
    "Master Bedroom",
    "Bathroom (combined)",
    "Laundry Room",
    "Guest Room",
    "Home Office",
    "Library",
    "Kids Bedroom",
    "Playroom",
    "Home Theatre Room",
    "Gym Room",
    "Basement",
    "Garage",
    "Walk-in Closet",
    "Pantry",
    "Gaming Room",
    "Attic",
    "Storage Room",
    "Music Room",
    "Wine Cellar",
    "Home Bar",
    "Meditation Room",
    "Powder Room (Toilet)",
];
const tariffBands = [
    {name: "Band A", costPerKWh: 225},
    {name: "Band B", costPerKWh: 63},
    {name: "Band C", costPerKWh: 50},
    {name: "Band D", costPerKWh: 43},
    {name: "Band E", costPerKWh: 40},
];
const appliancesList = [
    {name: "Refrigerator", wattage: 200},
    {name: "Air Conditioner", wattage: 1500},
    {name: "LED Light Bulb", wattage: 10},
    {name: "Microwave", wattage: 1200},
    {name: "Ceiling Fan", wattage: 75},
    {name: "Electric Iron", wattage: 1000},
    {name: "Washing Machine", wattage: 500},
    {name: "Television", wattage: 200},
    {name: "Desktop Computer", wattage: 300},
    {name: "Laptop", wattage: 65},
    {name: "Mobile Charger", wattage: 5},
    {name: "Printer", wattage: 200},
    {name: "Electric Kettle", wattage: 1500},
    {name: "Toaster", wattage: 800},
    {name: "Water Heater", wattage: 3000},
    {name: "Hair Dryer", wattage: 1200},
    {name: "Electric Blender", wattage: 350},
    {name: "Vacuum Cleaner", wattage: 1200},
    {name: "Heater", wattage: 1500},
    {name: "Oven", wattage: 2000},
    {name: "Gaming Console", wattage: 250},
];


function HomePersonalization (userProfile)  {
    const steps = ["Home Details", "Room Setup", "Billing Information", "Summary"];
    const {control, handleSubmit, setValue, formState: {errors}, reset, getValues, watch} = useForm({
        mode: "onTouched",
        resolver: zodResolver(homeValidator),
        reValidateMode: "onChange",
        defaultValues: {
            rooms: [], // Ensure rooms are initialized as an empty array
            energyBill: {
                amount: "",
                startDate: "",
                band: "",
            },
        },
    });
    const [activeStep, setActiveStep] = useState(0);
    const [currentHome, setCurrentHome] = useState({
        name: "",
        address: "",
        type: "",
        rooms: [],
        energyBill: {amount: 0, startDate: "", band: "", units: 0},
    });

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const calculateTotalWattage = (rooms) => {
        return rooms.reduce((total, room) => {
            const roomTotal = room.appliances.reduce((acc, appliance) => acc + (appliance.wattage * appliance.qty), 0);
            return total + roomTotal;
        }, 0);
    };

    const renderSummary = () => {
        const {totalWattage} = calculateSummary();

        const bandInfo = tariffBands.find(b => b.name === currentHome.energyBill.band);
        const units = bandInfo ? Math.floor(currentHome.energyBill.amount / bandInfo.costPerKWh) : 0;

        return (
            <Paper sx={{p: 3, borderRadius: 4, boxShadow: 3}}>
                <Typography variant="h6" sx={{fontWeight: 'bold', mb: 2}}>Summary</Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                            <Home sx={{color: 'primary.main', mr: 1}}/>
                            <Typography>Total Wattage:</Typography>
                        </Box>
                        <Typography variant="subtitle1"
                                    sx={{fontWeight: 'bold', color: 'green'}}>{totalWattage} W</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                            <CurrencyExchange sx={{color: 'primary.main', mr: 1}}/>
                            <Typography>Planned Billing:</Typography>
                        </Box>
                        <Typography variant="subtitle1" sx={{
                            fontWeight: 'bold',
                            color: 'blue'
                        }}>₦{currentHome.energyBill.amount}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                            <Star sx={{color: 'primary.main', mr: 1}}/>
                            <Typography>Selected Energy Band:</Typography>
                        </Box>
                        <Typography variant="subtitle1" sx={{
                            fontWeight: 'bold',
                            color: 'orange'
                        }}>{currentHome.energyBill.band}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                            <FlashOn sx={{color: 'primary.main', mr: 1}}/>
                            <Typography>Estimated Units:</Typography>
                        </Box>
                        <Typography variant="subtitle1"
                                    sx={{fontWeight: 'bold', color: 'purple'}}>{units} kWh</Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
    };

    const addRoom = () => {
        const newRoom = {name: '', type: '', appliances: []};
        setValue('rooms', [...rooms, newRoom]);
    };

    const removeRoom = (index) => {
        setValue('rooms', rooms.filter((_, i) => i !== index));
    };

    const addAppliance = (roomIndex) => {
        const newAppliance = {name: '', wattage: 0, qty: 1};
        const updatedRooms = [...rooms];
        updatedRooms[roomIndex].appliances.push(newAppliance);
        setValue('rooms', updatedRooms);
    };

    const removeAppliance = (roomIndex, applianceIndex) => {
        const updatedRooms = [...rooms];
        updatedRooms[roomIndex].appliances = updatedRooms[roomIndex].appliances.filter(
            (_, i) => i !== applianceIndex
        );
        setValue('rooms', updatedRooms);
    };

    // Appliance Handling
    const handleApplianceChange = (roomIndex, applianceIndex, key, value) => {
        const updatedRooms = [...rooms];
        updatedRooms[roomIndex].appliances[applianceIndex][key] = value;

        if (key === "name" && value !== "Custom") {
            const appliance = appliancesList.find(a => a.name === value);
            if (appliance) {
                updatedRooms[roomIndex].appliances[applianceIndex].wattage = appliance.wattage;
            }
        }
        setValue("rooms", updatedRooms);
    };

    const calculateSummary = () => {
        let totalWattage = 0;
        const summary = rooms.map((room) => {
            const roomTotal = room.appliances.reduce((acc, app) => acc + (app.wattage * (app.qty || 1)), 0);
            totalWattage += roomTotal;
            return {roomName: room.name, roomTotal};
        });
        return {summary, totalWattage};
    };
    // Apartment Type
    const getApartment = () => {
        return apartmentTypes.map((type) => (
            <MenuItem key={type} value={type} sx={{color: '#000', backgroundColor: '#FFF',}}>
                {type}
            </MenuItem>
        ));
    };
    const handleApartment = (event) => {
        event.preventDefault();
        setValue('homeType', event.target.value);
    }

    // Disable "Next" Button If Invalid
    const isNextDisabled = () => {
        const values = getValues();
        const validationResult = homeValidator.safeParse(values);
        return !validationResult.success;
    };

    // Updated Submit Function
    const submitData = (data) => {
        const validationResult = homeValidator.safeParse(data);
        if (!validationResult.success) {
            toast.error("Please fix the errors in the form before submission.");
            return null;
       }
        // save to db, and save to firstore
    };

    const calculateEnergyInsights = () => {
        const {totalWattage} = calculateSummary();
        const band = tariffBands.find(b => b.name === currentHome.energyBill.band);

        if (!band) return {costPerDay: 0, estimatedUnits: 0};

        const units = Math.floor(currentHome.energyBill.amount / band.costPerKWh);
        const costPerDay = (totalWattage / 1000) * band.costPerKWh;

        return {units, costPerDay};
    };

    const rooms = watch("rooms");

    const renderError = (field) => {
        if (errors[field]) {
            return <Typography color="error">{errors[field].message}</Typography>;
        }
        return null;
    };

    // check for errors
    Object.keys(errors).forEach((key) => {
        if (errors[key]) {
            console.log(errors[key].message);
                toast.error("Form Error, Please fix the errors in the form before submission.");
        }
    });

    const handleBandChange = (event) => {
        event.preventDefault();
        setValue('energyBill.band', event.target.value);
    }

    return (
        <FormProvider {...{control, handleSubmit}}>
            <Box sx={{py: 6, px: 4}} component="form" onSubmit={handleSubmit(submitData)} noValidate>
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        mb: 4,
                        background: "linear-gradient(45deg, #ff4081, #3f51b5)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Home Personalization
                </Typography>
                <Paper sx={{p: 4, borderRadius: 4}}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Divider sx={{my: 3}}/>

                    {activeStep === 0 && (
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}>
                            <Typography variant="h5" sx={{mb: 3}}>Enter Home Details</Typography>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Controller
                                        name="homeName"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Home Name"
                                                fullWidth
                                                error={!!errors.homeName}
                                                helperText={errors.homeName ? errors.homeName.message : ''}
                                            />
                                        )}
                                    />
                                    {renderError('name')}
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Controller
                                        name="address"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <TextField
                                                {...field}
                                                label="Address"
                                                fullWidth
                                                error={!!errors.address}
                                                helperText={errors.address ? errors.address.message : ''}
                                            />
                                        )}
                                    />
                                    {renderError('address')}
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name="homeType"
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    {...field}
                                                    select
                                                    value={field.value || ''}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        handleApartment(e);
                                                    }}
                                                    required
                                                    error={!!errors.apartmentType}
                                                    helperText={errors.apartmentType ? errors.apartmentType.message : ''}
                                                >
                                                    <MenuItem value="">Select Apartment Type</MenuItem>
                                                    {getApartment()}
                                                </TextField>
                                            )}
                                        />
                                    </FormControl>
                                    {renderError('apartmentType')}
                                </Grid>
                            </Grid>
                        </motion.div>
                    )}

                    {activeStep === 1 && (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 0.5}}
                        >
                            <Typography variant="h5" sx={{mb: 3}}>
                                Add Rooms
                            </Typography>
                            {rooms.map((room, roomIndex) => (
                                <Accordion key={roomIndex} sx={{mb: 2}}>
                                    <AccordionSummary expandIcon={<ExpandMore/>}>
                                        <Typography>{room.name || `Room ${roomIndex + 1}`}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <Controller
                                                    name={`rooms.${roomIndex}.name`}
                                                    control={control}
                                                    render={({field}) => (
                                                        <TextField {...field} label="Room Name" fullWidth/>
                                                    )}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <Controller
                                                    name={`rooms.${roomIndex}.type`}
                                                    control={control}
                                                    render={({field}) => (
                                                        <TextField {...field} select label="Room Type" fullWidth>
                                                            {roomTypes.map((type, idx) => (
                                                                <MenuItem key={idx} value={type}>
                                                                    {type}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    )}
                                                />
                                            </Grid>
                                            {room.appliances.map((appliance, applianceIndex) => (
                                                <Grid container spacing={2} sx={{mt: 2}} key={applianceIndex}>
                                                    <Grid size={{ xs: 12, md: 6 }}>
                                                        <TextField
                                                            select
                                                            value={appliance.name}
                                                            onChange={(e) =>
                                                                handleApplianceChange(roomIndex, applianceIndex, "name", e.target.value)
                                                            }
                                                            label="Appliance Name"
                                                            fullWidth
                                                        >
                                                            <MenuItem value="">Custom</MenuItem>
                                                            {appliancesList.map((applianceOption, idx) => (
                                                                <MenuItem key={idx} value={applianceOption.name}>
                                                                    {applianceOption.name}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                        {appliance.name === "" && (
                                                            <>
                                                                <TextField
                                                                    label="Custom Appliance Name"
                                                                    fullWidth
                                                                    sx={{mt: 2}}
                                                                    onChange={(e) =>
                                                                        handleApplianceChange(
                                                                            roomIndex,
                                                                            applianceIndex,
                                                                            "name",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                                <TextField
                                                                    label="Custom Appliance Wattage"
                                                                    type="number"
                                                                    fullWidth
                                                                    sx={{mt: 2}}
                                                                    onChange={(e) =>
                                                                        handleApplianceChange(
                                                                            roomIndex,
                                                                            applianceIndex,
                                                                            "wattage",
                                                                            parseInt(e.target.value, 10) || 0
                                                                        )
                                                                    }
                                                                />
                                                            </>
                                                        )}
                                                    </Grid>
                                                    <Grid size={{ xs: 12, md: 3 }}>
                                                        <TextField
                                                            type="number"
                                                            value={appliance.wattage}
                                                            onChange={(e) =>
                                                                handleApplianceChange(
                                                                    roomIndex,
                                                                    applianceIndex,
                                                                    "wattage",
                                                                    parseInt(e.target.value, 10) || 0
                                                                )
                                                            }
                                                            label="Wattage"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid size={{ xs: 12, md: 3 }}>
                                                        <TextField
                                                            type="number"
                                                            value={appliance.qty || 1}
                                                            onChange={(e) =>
                                                                handleApplianceChange(
                                                                    roomIndex,
                                                                    applianceIndex,
                                                                    "qty",
                                                                    parseInt(e.target.value, 10) || 1
                                                                )
                                                            }
                                                            label="Quantity"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid
                                                    size={{ xs: 12, md: 2 }}
                                                        sx={{display: "flex", alignItems: "center"}}
                                                    >
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => removeAppliance(roomIndex, applianceIndex)}
                                                        >
                                                            <DeleteOutline/>
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            ))}

                                            <Button
                                                variant="outlined"
                                                startIcon={<AddCircleOutline/>}
                                                onClick={() => addAppliance(roomIndex)}
                                                sx={{mt: 2}}
                                            >
                                                Add Appliance
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                startIcon={<DeleteOutline/>}
                                                onClick={() => removeRoom(roomIndex)}
                                                sx={{mt: 2}}
                                            >
                                                Delete Room
                                            </Button>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddCircleOutline/>}
                                onClick={addRoom}
                                sx={{mt: 4}}
                            >
                                Add Room
                            </Button>
                        </motion.div>
                    )}

                    {activeStep === 2 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography variant="h5" sx={{ mb: 3 }}>
                                Energy Billing Information
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Controller
                                        name="energyBill.amount"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Monthly Energy Bill (in ₦)"
                                                fullWidth
                                                value={field.value || ''}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setValue("energyBill.amount", e.target.value);
                                                    setCurrentHome((prev) => ({
                                                        ...prev,
                                                        energyBill: {
                                                            ...prev.energyBill,
                                                            amount: e.target.value,
                                                        },
                                                    }));
                                                }}
                                                error={!!errors.energyBill?.amount}
                                                helperText={errors.energyBill?.amount?.message || ""}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Controller
                                        name="energyBill.startDate"
                                        control={control}
                                        defaultValue={currentHome.energyBill.startDate || ""}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Start Date"
                                                type="date"
                                                fullWidth
                                                value={field.value || ''}
                                                slotProps={{
                                                    inputLabel: {
                                                        shrink: true,
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setValue("energyBill.startDate", e.target.value);
                                                    setCurrentHome((prev) => ({
                                                        ...prev,
                                                        energyBill: {
                                                            ...prev.energyBill,
                                                            startDate: e.target.value,
                                                        },
                                                    }));
                                                }}
                                                error={!!errors.energyBill?.startDate}
                                                helperText={errors.energyBill?.startDate?.message || ""}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Controller
                                        name="energyBill.band"
                                        control={control}
                                        defaultValue={currentHome.energyBill.band || ""}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                select
                                                label="Select Energy Band"
                                                value={field.value || ''}
                                                fullWidth
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setValue("energyBill.band", e.target.value);
                                                    setCurrentHome((prev) => ({
                                                        ...prev,
                                                        energyBill: {
                                                            ...prev.energyBill,
                                                            band: e.target.value,
                                                        },
                                                    }));
                                                }}
                                                error={!!errors.energyBill?.band}
                                                helperText={errors.energyBill?.band?.message || ""}
                                            >
                                                {tariffBands.map((band) => (
                                                    <MenuItem key={band.name} value={band.name}>
                                                        {band.name} ({band.costPerKWh} ₦/kWh)
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </motion.div>
                    )}



                    {activeStep === 3 && renderSummary()}

                    <Box sx={{display: "flex", justifyContent: "space-between", mt: 4}}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            variant="outlined"
                        >
                            Back
                        </Button>
                        {activeStep < 3 ? (
                            <Button onClick={handleNext} variant="contained">
                                Next
                            </Button>
                        ) : (
                            <Button type='submit' variant="contained">
                                Save Home
                            </Button>
                        )}
                    </Box>
                </Paper>
            </Box>
        </FormProvider>
    );
};

export default HomePersonalization;
