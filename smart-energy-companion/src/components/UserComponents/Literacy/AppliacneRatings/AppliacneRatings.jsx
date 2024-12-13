'use client';
import React, {useState} from "react";
import {
    Alert,
    Box,
    Button,
    Container,
    alpha,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    ElectricBolt as WattIcon,
    PieChart as PieChartIcon,
    SaveAlt as SaveIcon,
    Timeline as TimelineIcon,
    TipsAndUpdates as TipsIcon,
    ArrowBack as BackIcon,
} from "@mui/icons-material";
import {motion} from "framer-motion";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    XAxis,
    YAxis,
} from "recharts";
import {toast} from "sonner";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/navigation";


const MotionBox = motion.create(Box);


function ApplianceRatings() {
    const [activeTab, setActiveTab] = useState(0);
    const [wattage, setWattage] = useState("");
    const [hours, setHours] = useState("");
    const [quantity, setQuantity] = useState("");
    const [appliances, setAppliances] = useState([]);
    const [applianceName, setApplianceName] = useState("");
    const [purchasingPower, setPurchasingPower] = useState("");
    const [selectedBand, setSelectedBand] = useState("");
    const [totalUnits, setTotalUnits] = useState(null);
    const [showCharts, setShowCharts] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAppliancesList, setShowAppliancesList] = useState(false);
    const router = useRouter();

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    const bands = [
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

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setShowCharts(false);
        setAppliances([]);
    };

    const calculateTotalUnits = () => {
        if (!purchasingPower || !selectedBand) {
            toast.error("Please select a band and enter your purchasing power.");
            return;
        }
        const band = bands.find(b => b.name === selectedBand);
        const units = (parseFloat(purchasingPower) / band.costPerKWh).toFixed(2);
        setTotalUnits(units);
    };

    const addAppliance = () => {
        if (!applianceName || !wattage || !hours || !quantity) {
            toast.error("Please fill in all fields.");
            return;
        }

        const dailyKWh = (wattage * hours * quantity) / 1000;
        const weeklyKWh = dailyKWh * 7;
        const monthlyKWh = dailyKWh * 30;

        const newAppliance = {
            name: applianceName,
            wattage: parseFloat(wattage),
            hours: parseFloat(hours),
            quantity: parseInt(quantity),
            dailyKWh,
            weeklyKWh,
            monthlyKWh,
        };

        setAppliances([...appliances, newAppliance]);
        setApplianceName("");
        setWattage("");
        setHours("");
        setQuantity("");
    };

    const removeAppliance = (index) => {
        setAppliances(appliances.filter((_, i) => i !== index));
    };

    const getTotalConsumption = () => {
        return appliances.reduce(
            (acc, curr) => ({
                daily: acc.daily + curr.dailyKWh,
                weekly: acc.weekly + curr.weeklyKWh,
                monthly: acc.monthly + curr.monthlyKWh,
            }),
            {daily: 0, weekly: 0, monthly: 0}
        );
    };

    const getChartData = () => {
        return appliances.map((app) => ({
            name: app.name,
            daily: app.dailyKWh,
            weekly: app.weeklyKWh,
            monthly: app.monthlyKWh,
        }));
    };

    const getPieChartData = () => {
        return appliances.map((app) => ({
            name: app.name,
            value: app.monthlyKWh,
        }));
    };

    const getConsumptionAnalysis = () => {
        if (appliances.length === 0) {
            toast.error(" Please add appliances to view analysis.");
            return null;
        }
        const total = getTotalConsumption();
        const highestConsumer = [...appliances].sort((a, b) => b.monthlyKWh - a.monthlyKWh)[0];
        const percentageOfTotal = ((highestConsumer.monthlyKWh / total.monthly) * 100).toFixed(2);

        return (
            <Alert
                severity="info"
                sx={{
                    mt: 6,
                    mb: 2,
                    p: 3,
                    borderRadius: 3,
                    backgroundColor: "rgba(33, 150, 243, 0.1)", // Light blue background
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "1px solid rgba(33, 150, 243, 0.3)", // Slight border for emphasis
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        sx={{
                            color: "#2196F3", // Info blue color
                            fontWeight: 600,
                            fontSize: "1.2rem",
                        }}
                    >
                        <strong>Energy Consumption Analysis:</strong>
                    </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography
                        variant="body2"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "1rem",
                            color: "#424242", // Neutral text color
                        }}
                    >
                        <span style={{ marginRight: "8px", color: "#2196F3", fontSize: "1.5rem" }}>•</span>
                        Your total monthly consumption is{" "}
                        <strong style={{ marginLeft: "5px", color: "#FF5722" }}>
                            {total.monthly.toFixed(2)} kWh
                        </strong>
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "1rem",
                            color: "#424242",
                            mt: 1,
                        }}
                    >
                        <span style={{ marginRight: "8px", color: "#2196F3", fontSize: "1.5rem" }}>•</span>
                        <strong style={{ marginRight: "5px" }}>{highestConsumer.name}</strong> is your
                        highest energy consumer at{" "}
                        <strong style={{ marginLeft: "5px", color: "#FF9800" }}>
                            {percentageOfTotal}% of total usage
                        </strong>
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "1rem",
                            color: "#424242",
                            mt: 1,
                        }}
                    >
                        <span style={{ marginRight: "8px", color: "#2196F3", fontSize: "1.5rem" }}>•</span>
                        Consider using energy-efficient alternatives for{" "}
                        <strong style={{ marginLeft: "5px", marginRight: '5px',  color: "#2196F3" }}>
                            {highestConsumer.name} </strong> {" "} to reduce consumption.
                    </Typography>
                </Box>
            </Alert>
        );
    };

    const getBudgetAnalysis = () => {
        if (!totalUnits || appliances.length === 0) {
            toast.error("Please calculate your total units and add appliances to view analysis.");
            return null;
        }

        const total = getTotalConsumption();
        const daysLeft = (totalUnits / total.daily).toFixed(1);

        return (
            <Alert severity="info" sx={{mt: 2, mb: 2}}>
                <Typography variant="subtitle1" gutterBottom>
                    <strong>Budget Analysis:</strong>
                </Typography>
                <Typography variant="body2">
                    • Your ₦{purchasingPower} purchase in Band {selectedBand} gives you {totalUnits} units
                </Typography>
                <Typography variant="body2">
                    • Based on your current usage, this will last approximately {daysLeft} days
                </Typography>
                <Typography variant="body2">
                    • To extend this period, consider reducing usage of high-consumption appliances
                </Typography>
            </Alert>
        );
    };

    const handleApplianceSelect = (appliance) => {
        setApplianceName(appliance.name);
        setWattage(appliance.wattage.toString());
        setShowAppliancesList(false);
    };

    const filteredAppliances = appliancesList.filter(appliance =>
        appliance.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getEnergyEfficiencyTips = (appliance) => {
        const tips = {
            "Refrigerator": "Keep your refrigerator at optimal temperature (3-4°C) and ensure door seals are tight.",
            "Air Conditioner": "Set temperature to 24-26°C for optimal efficiency. Clean filters regularly.",
            "LED Light Bulb": "Replace old bulbs with LED for up to 90% energy savings.",
            "Washing Machine": "Use full loads and cold water when possible.",
            "Television": "Enable power-saving mode and adjust brightness based on room lighting.",
            "Desktop Computer": "Use sleep mode when inactive and consider upgrading to energy-efficient components.",
            "Water Heater": "Insulate your water heater and pipes to reduce heat loss.",
            "Electric Iron": "Iron multiple items in one session to avoid reheating.",
            "Ceiling Fan": "Use fans to supplement cooling and reduce air conditioning usage.",
            "Oven": "Set the oven to a lower temperature and consider using an electric range.",
            "Gaming Console": "Unplug unused controllers and save battery life.",
            "Hair Dryer": "Use a hair dryer attachment for drying hair longer than 10 minutes.",
            "Electric Blender": "Blend foods with a blender attachment to reduce water consumption.",
            "Vacuum Cleaner": "Use a vacuum cleaner attachment for cleaning clothes or linens.",
            "Heater": "Use a heat source with a built-in thermostat to maintain optimal temperature.",
        };
        return tips[appliance] || "Consider using energy-efficient models and optimal usage times.";
    };

    const getApplianceAnalysis = (appliance) => {
        const monthlyKWh = (appliance.wattage * appliance.hours * appliance.quantity * 30) / 1000;
        const selectedBandData = bands.find(b => b.name === selectedBand);
        const monthlyCost = selectedBandData ? monthlyKWh * selectedBandData.costPerKWh : 0;

        return {
            monthlyKWh,
            monthlyCost,
            tip: getEnergyEfficiencyTips(appliance.name)
        };
    };

    const getDetailedConsumptionAnalysis = () => {
        if (appliances.length === 0) {
            toast.error("Please add appliances to view analysis.");
            return null;
        }

        const total = getTotalConsumption();
        const applianceAnalyses = appliances.map(app => ({
            ...app,
            ...getApplianceAnalysis(app)
        }));

        const highestConsumer = applianceAnalyses.sort((a, b) => b.monthlyCost - a.monthlyCost)[0];
        const totalMonthlyCost = applianceAnalyses.reduce((sum, app) => sum + app.monthlyCost, 0);

        return (
            <Box sx={{ mt: 6, px: 3 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    sx={{
                        mb: 4,
                        fontWeight: 700,
                        background: "linear-gradient(90deg, #4CAF50, #2196F3)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    Detailed Energy Analysis
                </Typography>

                <Grid container spacing={4}>
                    {/* Monthly Cost Breakdown Section */}
                    <Grid size={{ xs:12, md:6}}>
                        <Paper
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                                background: "rgba(255, 255, 255, 0.95)",
                            }}
                        >
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ color: "#4CAF50", fontWeight: 600 }}
                            >
                                Monthly Cost Breakdown
                            </Typography>
                            <Stack spacing={2}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                                        pb: 2,
                                    }}
                                >
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        Total Monthly Cost:
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: "#FF5722",
                                        }}
                                    >
                                        ₦{totalMonthlyCost.toFixed(2)}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                                        pb: 2,
                                    }}
                                >
                                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                        Highest Cost Appliance:
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 700,
                                            color: "#FF9800",
                                        }}
                                    >
                                        {highestConsumer.name}
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 500,
                                            color: "text.secondary",
                                            mt: 2,
                                            fontStyle: "italic",
                                        }}
                                    >
                                        {getEnergyEfficiencyTips(highestConsumer.name)}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>

                    {/* Energy Saving Opportunities Section */}
                    <Grid size={{ xs:12, md:6}}>
                        <Paper
                            sx={{
                                p: 4,
                                borderRadius: 3,
                                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                                background: "rgba(255, 255, 255, 0.95)",
                            }}
                        >
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ color: "#FF9800", fontWeight: 600 }}
                            >
                                Energy Saving Opportunities
                            </Typography>
                            <List
                                dense
                                sx={{
                                    maxHeight: 300,
                                    overflowY: "auto",
                                    "&::-webkit-scrollbar": {
                                        width: "8px",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        background: "#4CAF50",
                                        borderRadius: "10px",
                                    },
                                }}
                            >
                                {applianceAnalyses.map((app, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{
                                            background: "rgba(0, 0, 0, 0.05)",
                                            borderRadius: 2,
                                            mb: 1,
                                        }}
                                    >
                                        <ListItemIcon>
                                            <TipsIcon sx={{ color: "#4CAF50" }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    variant="body1"
                                                    sx={{ fontWeight: 600, color: "#4CAF50" }}
                                                >
                                                    {app.name}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography variant="body2" color="text.secondary">
                                                    {getEnergyEfficiencyTips(app.name)}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    };

    const applianceSearchSection = (
        <Paper sx={{p: 2, mb: 4}}>
            <Typography variant="subtitle1" gutterBottom>
                Select from Common Appliances
            </Typography>
            <TextField
                fullWidth
                label="Search Appliances"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{mb: 2}}
            />
            <Grid container spacing={1}>
                {filteredAppliances.map((appliance, index) => (
                    <Grid size={{ xs:12, sm:6,  md:4 }} key={index}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => handleApplianceSelect(appliance)}
                            sx={{
                                justifyContent: 'flex-start',
                                textTransform: 'none',
                                mb: 1,
                            }}
                        >
                            {appliance.name} ({appliance.wattage}W)
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );

    return (
        <>
        <Container maxWidth="lg" sx={{py: 4}}>
            <Box mb={1}>
                <IconButton
                    onClick={() => router.back()}
                    sx={{
                        mb: 1,
                        color: '#FF00CC',
                        '&:hover': { bgcolor: alpha('#46F0F9', 0.1) },
                    }}
                >
                    <BackIcon />
                </IconButton>
            </Box>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    background: "linear-gradient(45deg, #2196F3, #4CAF50)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    mb: 4,
                }}
            >
                Energy Appliances Calculator
            </Typography>

            <Paper sx={{mb: 4}}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    centered
                    sx={{
                        "& .MuiTab-root": {
                            minWidth: {xs: "auto", sm: 160},
                            px: {xs: 1, sm: 3},
                        },
                    }}
                >
                    <Tab
                        icon={<TimelineIcon/>}
                        label="Usage Calculator"
                        iconPosition="start"
                    />
                    <Tab
                        icon={<WattIcon/>}
                        label="Budget Planner"
                        iconPosition="start"
                    />
                </Tabs>
            </Paper>

            {activeTab === 1 && (
                <Grid container spacing={2} sx={{mb: 4}}>
                    <Grid size={{ xs:12,  md:6 }}>
                        <TextField
                            fullWidth
                            label="Purchasing Power (₦)"
                            value={purchasingPower}
                            onChange={(e) => setPurchasingPower(e.target.value)}
                            type="number"
                        />
                    </Grid>
                    <Grid size={{ xs:12,  md:6 }}>
                        <TextField
                            select
                            fullWidth
                            label="Select Band"
                            value={selectedBand}
                            onChange={(e) => setSelectedBand(e.target.value)}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option value="">Select Band</option>
                            {bands.map((band) => (
                                <option key={band.name} value={band.name}>
                                    {band.name} (₦{band.costPerKWh}/kWh)
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs:12 }}>
                        <Button
                            variant="contained"
                            onClick={calculateTotalUnits}
                            fullWidth
                            sx={{mt: 1}}
                        >
                            Calculate Units
                        </Button>
                    </Grid>
                </Grid>
            )}

            {(activeTab === 0 || totalUnits) && (
                <>
                    {applianceSearchSection}
                    <Grid container spacing={2} sx={{mb: 4}}>
                        <Grid size={{ xs:12,  sm: 6, md:3 }}>

                            <TextField
                                fullWidth
                                label="Appliance Name"
                                value={applianceName}
                                onChange={(e) => setApplianceName(e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs:12,  sm: 6, md:3 }}>
                            <TextField
                                fullWidth
                                label="Wattage"
                                value={wattage}
                                onChange={(e) => setWattage(e.target.value)}
                                type="number"
                                InputProps={{
                                    endAdornment: <WattIcon color="action"/>,
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs:12,  sm: 6, md:3 }}>
                            <TextField
                                fullWidth
                                label="Hours per Day"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                type="number"
                            />
                        </Grid>
                        <Grid size={{ xs:12,  sm: 6, md:3 }}>
                            <TextField
                                fullWidth
                                label="Quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                type="number"
                            />
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper} sx={{mb: 4}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Appliance</TableCell>
                                    <TableCell align="right">Wattage</TableCell>
                                    <TableCell align="right">Hours/Day</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Daily (kWh)</TableCell>
                                    <TableCell align="right">Weekly (kWh)</TableCell>
                                    <TableCell align="right">Monthly (kWh)</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {appliances.map((appliance, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{appliance.name}</TableCell>
                                        <TableCell align="right">{appliance.wattage}</TableCell>
                                        <TableCell align="right">{appliance.hours}</TableCell>
                                        <TableCell align="right">{appliance.quantity}</TableCell>
                                        <TableCell align="right">
                                            {appliance.dailyKWh.toFixed(2)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {appliance.weeklyKWh.toFixed(2)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {appliance.monthlyKWh.toFixed(2)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => removeAppliance(index)}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{display: 'flex', justifyContent: 'center', mb: 4}}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon/>}
                            onClick={addAppliance}
                            sx={{
                                background: 'linear-gradient(45deg, #2196F3, #4CAF50)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #1976D2, #388E3C)',
                                },
                            }}
                        >
                            Add Appliance
                        </Button>
                    </Box>

                    {appliances.length > 0 && (
                        <>
                            <Button
                                variant="outlined"
                                startIcon={showCharts ? <SaveIcon/> : <PieChartIcon/>}
                                onClick={() => setShowCharts(!showCharts)}
                                sx={{mb: 4}}
                            >
                                {showCharts ? "Hide Visualizations" : "Show Visualizations"}
                            </Button>

                            {showCharts && (
                                <MotionBox
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{duration: 0.5}}
                                >
                                    <Grid container spacing={4}>
                                        <Grid size={{ xs:12,  md:8 }}>
                                            <Paper sx={{p: 2, height: 500}}>
                                                <Typography variant="h6" gutterBottom>
                                                    Energy Consumption Over Time
                                                </Typography>
                                                <ResponsiveContainer>
                                                    <BarChart data={getChartData()} margin={{ bottom: 20 }}>
                                                        <CartesianGrid strokeDasharray="3 3"/>
                                                        <XAxis dataKey="name"/>
                                                        <YAxis/>
                                                        <RechartsTooltip/>
                                                        <Legend/>
                                                        {/* I need to render a space here before the Bar data*/}
                                                        <Bar dataKey="daily" name="Daily (kWh)" fill="#8884d8"/>
                                                        <Bar dataKey="weekly" name="Weekly (kWh)" fill="#82ca9d"/>
                                                        <Bar dataKey="monthly" name="Monthly (kWh)" fill="#ffc658"/>
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </Paper>
                                        </Grid>
                                        <Grid size={{ xs:12,  md:4 }}>
                                            <Paper sx={{p: 2, height: 500}}>
                                                <Typography variant="h6" gutterBottom>
                                                    Monthly Usage Distribution
                                                </Typography>
                                                <ResponsiveContainer>
                                                    <PieChart margin={{ bottom: 20 }}>
                                                        <Pie
                                                            data={getPieChartData()}
                                                            dataKey="value"
                                                            nameKey="name"
                                                            cx="50%"
                                                            cy="50%"
                                                            outerRadius={100}
                                                            label
                                                        >
                                                            {getPieChartData().map((entry, index) => (
                                                                <Cell
                                                                    key={`cell-${index}`}
                                                                    fill={COLORS[index % COLORS.length]}
                                                                />
                                                            ))}
                                                        </Pie>
                                                        <RechartsTooltip/>
                                                        <Legend/>
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </Paper>
                                        </Grid>
                                    </Grid>

                                    {activeTab === 0 && getConsumptionAnalysis()}
                                    {activeTab === 1 && getBudgetAnalysis()}
                                    {getDetailedConsumptionAnalysis()}
                                </MotionBox>
                            )}
                        </>
                    )}
                </>
            )}
        </Container>
            </>
    );
}

export default ApplianceRatings;
