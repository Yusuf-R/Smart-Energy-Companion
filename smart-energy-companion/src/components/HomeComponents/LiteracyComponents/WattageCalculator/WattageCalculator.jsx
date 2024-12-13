"use client";

import React, { useState } from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { Pie, Bar } from "recharts";
import { Add as AddIcon } from "@mui/icons-material";

const tariffBands = [
    { name: "Band A", costPerKWh: 225 },
    { name: "Band B", costPerKWh: 63 },
    { name: "Band C", costPerKWh: 50 },
    { name: "Band D", costPerKWh: 43 },
    { name: "Band E", costPerKWh: 40 },
];

const commonAppliances = [
    { name: "Refrigerator", wattage: 200 },
    { name: "Air Conditioner", wattage: 1500 },
    { name: "LED Light Bulb", wattage: 10 },
    { name: "Microwave", wattage: 1200 },
    { name: "Ceiling Fan", wattage: 75 },
];

function WattageCalculator() {
    const [appliances, setAppliances] = useState([]);
    const [selectedBand, setSelectedBand] = useState("Band A");
    const [results, setResults] = useState(null);

    const addAppliance = () => {
        setAppliances((prev) => [
            ...prev,
            { name: "", wattage: 0, quantity: 1, hours: 0 },
        ]);
    };

    const updateAppliance = (index, key, value) => {
        setAppliances((prev) => {
            const updated = [...prev];
            updated[index][key] = value;
            return updated;
        });
    };

    const calculateConsumption = () => {
        const costPerKWh = tariffBands.find((band) => band.name === selectedBand)?.costPerKWh || 0;
        let totalConsumption = 0;

        appliances.forEach((appliance) => {
            const { wattage, hours, quantity } = appliance;
            totalConsumption += (wattage * hours * quantity) / 1000; // Convert to kWh
        });

        const totalCost = totalConsumption * costPerKWh;
        const chartData = appliances.map((appliance) => ({
            name: appliance.name || "Unnamed Appliance",
            value: (appliance.wattage * appliance.hours * appliance.quantity) / 1000,
        }));

        setResults({ totalConsumption, totalCost, chartData });
    };

    return (
        <Box sx={{ py: 6, px: 3, background: "#f9f9f9", minHeight: "100vh" }}>
            <Typography
                variant="h4"
                align="center"
                sx={{ fontWeight: 700, mb: 4, color: "#4CAF50" }}
            >
                Wattage Calculator
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Add Appliances
                        </Typography>
                        {appliances.map((appliance, index) => (
                            <Stack key={index} spacing={2} direction="row" sx={{ mb: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel>Appliance</InputLabel>
                                    <Select
                                        value={appliance.name}
                                        onChange={(e) =>
                                            updateAppliance(index, "name", e.target.value)
                                        }
                                    >
                                        {commonAppliances.map((item) => (
                                            <MenuItem
                                                key={item.name}
                                                value={item.name}
                                                onClick={() =>
                                                    updateAppliance(index, "wattage", item.wattage)
                                                }
                                            >
                                                {item.name} ({item.wattage}W)
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField
                                    label="Hours"
                                    type="number"
                                    fullWidth
                                    value={appliance.hours}
                                    onChange={(e) => updateAppliance(index, "hours", e.target.value)}
                                />
                                <TextField
                                    label="Quantity"
                                    type="number"
                                    fullWidth
                                    value={appliance.quantity}
                                    onChange={(e) =>
                                        updateAppliance(index, "quantity", e.target.value)
                                    }
                                />
                            </Stack>
                        ))}
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={addAppliance}
                        >
                            Add Appliance
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Select Tariff Band
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel>Tariff Band</InputLabel>
                            <Select
                                value={selectedBand}
                                onChange={(e) => setSelectedBand(e.target.value)}
                            >
                                {tariffBands.map((band) => (
                                    <MenuItem key={band.name} value={band.name}>
                                        {band.name} ({band.costPerKWh} ₦/kWh)
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            sx={{ mt: 3 }}
                            onClick={calculateConsumption}
                        >
                            Calculate
                        </Button>
                    </Paper>
                </Grid>

                {results && (
                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Results
                            </Typography>
                            <Typography>
                                Total Consumption: {results.totalConsumption.toFixed(2)} kWh
                            </Typography>
                            <Typography>Total Cost: ₦{results.totalCost.toFixed(2)}</Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}

export default WattageCalculator;
