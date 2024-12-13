'use client';
import React, {useState, useEffect} from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Tabs,
    Tab,
    Menu,
    MenuItem,
    TextField,
    Card,
    CardContent,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Collapse,
    Tooltip,
    useTheme,
    CircularProgress,
    Chip,
    Button,
    Divider, ListItemIcon, alpha,
} from '@mui/material';
import {
    Search as SearchIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Lightbulb as LightbulbIcon,
    Calculate as CalculateIcon,
    Info as InfoIcon,
    WbSunny as SunIcon,
    Battery90 as BatteryIcon,
    ElectricBolt as VoltageIcon, ArrowBack as BackIcon,
} from '@mui/icons-material';
import {motion, AnimatePresence} from 'framer-motion';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '@/server/db/fireStore';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import {useRouter} from "next/navigation";
import Grid from "@mui/material/Grid2"

const MotionBox = motion.create(Box);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DetailedCalculator = ({type, data, onCalculate}) => {
    const [values, setValues] = useState({});
    const theme = useTheme();

    const calculators = {
        solar_sizing: (
            <Box sx={{p: 2}}>
                <Typography variant="subtitle2" gutterBottom>
                    Solar System Sizing Calculator
                </Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs:12,  sm: 6}}>
                        <TextField
                            label="Daily Energy Need (kWh)"
                            type="number"
                            size="small"
                            fullWidth
                            onChange={(e) => setValues({...values, daily: e.target.value})}
                        />
                    </Grid>
                    <Grid size={{ xs:12,  sm: 6}}>
                        <TextField
                            label="Sun Hours"
                            type="number"
                            size="small"
                            fullWidth
                            defaultValue="5.5"
                            onChange={(e) => setValues({...values, sunHours: e.target.value})}
                        />
                    </Grid>
                </Grid>
                {values.daily && (
                    <Box sx={{mt: 2}}>
                        <Typography variant="body2" color="primary" gutterBottom>
                            Recommended System:
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemText
                                    primary={`Solar Array: ${(values.daily * 1.3).toFixed(1)}kW`}
                                    secondary="Including 30% system losses"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={`Battery Bank: ${(values.daily * 1.5).toFixed(1)}kWh`}
                                    secondary="1.5 days backup capacity"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={`Inverter Size: ${(values.daily * 1.2).toFixed(1)}kVA`}
                                    secondary="20% overhead for surge handling"
                                />
                            </ListItem>
                        </List>
                    </Box>
                )}
            </Box>
        ),
        // Add more calculator types...
    };

    return calculators[type] || null;
};

const VisualAidChart = ({data, type}) => {
    const theme = useTheme();

    if (type === 'comparison_chart') {
        return (
            <Box sx={{width: '100%', height: 300}}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="appliance"/>
                        <YAxis/>
                        <RechartsTooltip/>
                        <Bar dataKey="watts" fill={theme.palette.primary.main}/>
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        );
    }

    return null;
};

const BandCalculator = ({bandDetails}) => {
    const [selectedBand, setSelectedBand] = useState('');
    const [amount, setAmount] = useState('');
    const [result, setResult] = useState(null);

    const calculateUnits = () => {
        if (!selectedBand || !amount) return;
        const band = bandDetails.find((b) => b.band === selectedBand);
        if (band) {
            const rate = parseFloat(band.rate.replace(/₦/g, ''));
            const units = parseFloat(amount) / rate;
            setResult({
                band: band.band,
                units: units.toFixed(2),
                rate: band.rate,
            });
        }
    };

    return (
        <Paper sx={{p: 3, mt: 4, borderRadius: 3, boxShadow: '0 8px 20px rgba(0,0,0,0.1)'}}>
            <Typography variant="h6" gutterBottom>
                Electricity Purchase Calculator
            </Typography>
            <Grid container spacing={2}>
                <Grid size={{ xs:12,  sm: 6}}>
                    <TextField
                        select
                        fullWidth
                        label="Select Band"
                        value={selectedBand}
                        onChange={(e) => setSelectedBand(e.target.value)}
                    >
                        {bandDetails.map((band, index) => (
                            <MenuItem key={index} value={band.band}>
                                {band.band} - {band.rate} per kWh
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{ xs:12,  sm: 6}}>
                    <TextField
                        label="Amount (₦)"
                        type="number"
                        fullWidth
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </Grid>
                <Grid size={{ xs:12 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={calculateUnits}
                        disabled={!selectedBand || !amount}
                    >
                        Calculate
                    </Button>
                </Grid>
            </Grid>

            {result && (
                <Box sx={{mt: 4}}>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            color: '#333',
                            mb: 1,
                        }}
                    >
                        For <strong style={{color: '#FF9800'}}> {result.band}</strong>
                        (<strong>{result.rate}</strong>), your purchase of
                        <strong style={{color: '#4CAF50'}}> ₦{amount}</strong> will provide you with
                        <strong style={{color: '#4CAF50'}}> {result.units} kWh</strong>
                        of electricity.
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#757575',
                            fontStyle: 'italic',
                        }}
                    >
                        Plan your energy usage wisely to maximize the value of your purchase.
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};


// render BandDetails
const BandDetails = ({bandDetails}) => {
    return (
        <Box sx={{mt: 3}}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
                Band Details:
            </Typography>
            <Grid container spacing={2}>
                {bandDetails.map((band, index) => (
                    <Grid size={{ xs:12, sm:6}} key={index}>
                        <Paper sx={{p: 2, background: "#f9f9f9", borderRadius: 2}}>
                            <Typography variant="h6" sx={{color: "#4CAF50", fontWeight: 600}}>
                                {band.band}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                <strong>Supply:</strong> {band.supply}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                <strong>Rate:</strong> {band.rate}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>Characteristics:</strong>
                            </Typography>
                            <List dense>
                                {band.characteristics.map((characteristic, idx) => (
                                    <ListItem key={idx}>
                                        <ListItemIcon>
                                            <InfoIcon color="primary" fontSize="small"/>
                                        </ListItemIcon>
                                        <ListItemText primary={characteristic}/>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};


const TermCard = ({
                      term,
                      definition,
                      detailedExplanation,
                      examples,
                      calculator,
                      visualAids,
                      subCategories,
                      bandDetails
                  }) => {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();

    return (
        <Card sx={{mb: 2}}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div">
                        {term}
                    </Typography>
                    <IconButton onClick={() => setExpanded(!expanded)}>
                        {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                    {definition}
                </Typography>
                <Collapse in={expanded}>
                    <Box sx={{mt: 2}}>
                        {detailedExplanation && (
                            <>
                                <Typography variant="subtitle2" color="primary" gutterBottom>
                                    Detailed Explanation:
                                </Typography>
                                <Typography variant="body2" paragraph>
                                    {detailedExplanation}
                                </Typography>
                            </>
                        )}

                        {examples && (
                            <>
                                <Typography variant="subtitle2" color="primary" gutterBottom>
                                    Examples:
                                </Typography>
                                <List dense>
                                    {examples.map((example, index) => (
                                        <ListItem key={index}>
                                            <ListItemIcon>
                                                <LightbulbIcon color="primary" fontSize="small"/>
                                            </ListItemIcon>
                                            <ListItemText primary={example}/>
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        )}

                        {subCategories && Object.entries(subCategories).map(([key, value]) => (
                            <Box key={key} sx={{mt: 3}}>
                                <Typography variant="subtitle2" color="primary" gutterBottom>
                                    {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}:
                                </Typography>
                                <Grid container spacing={2}>
                                    {value.map((item, index) => (
                                        <Grid size={{ xs:12,  sm: 6}} key={index}>
                                            <Paper sx={{p: 2}}>
                                                {Object.entries(item).map(([itemKey, itemValue]) => (
                                                    <Typography key={itemKey} variant="body2" paragraph>
                                                        <strong>{itemKey.replace('_', ' ').toUpperCase()}:</strong>{' '}
                                                        {Array.isArray(itemValue) ? itemValue.join(', ') : itemValue}
                                                    </Typography>
                                                ))}
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        ))}

                        {visualAids && (
                            <Box sx={{mt: 3}}>
                                <Typography variant="subtitle2" color="primary" gutterBottom>
                                    Visual Comparison:
                                </Typography>
                                <VisualAidChart {...visualAids} />
                            </Box>
                        )}

                        {calculator && <DetailedCalculator {...calculator} />}

                        {bandDetails && (
                            <>
                                <BandDetails bandDetails={bandDetails}/>
                                <BandCalculator bandDetails={bandDetails}/>
                            </>
                        )}
                    </Box>
                </Collapse>
            </CardContent>
        </Card>
    );
};

export default function EnergyTerminology() {
    const [categories, setCategories] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const theme = useTheme();

    useEffect(() => {
        const fetchTerminology = async () => {
            try {
                const docRef = doc(db, 'energyTerminology', 'mainData');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setCategories(data.categories || []);
                } else {
                    console.error('No terminology data found');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching terminology:', error);
                setLoading(false);
            }
        };

        fetchTerminology();
    }, []);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const filteredTerms = searchTerm
        ? categories.filter(category => {
            const terms = category.terms.filter(
                term =>
                    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return terms.length > 0;
        })
        : categories;

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress/>
            </Box>
        );
    }

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
                    variant="h5"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                        mb: 4,
                    }}
                >
                    Energy Terminology Guide
                </Typography>

                <Box sx={{mb: 4}}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search terms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon sx={{mr: 1, color: 'text.secondary'}}/>,
                        }}
                    />
                </Box>

                {!searchTerm && (
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{mb: 4}}
                    >
                        {categories.map((category) => (
                            <Tab
                                key={category.id}
                                label={category.label}
                                icon={category.icon === 'WbSunny' ? <SunIcon/> :
                                    category.icon === 'Battery90' ? <BatteryIcon/> :
                                        <VoltageIcon/>}
                                iconPosition="start"
                            />
                        ))}
                    </Tabs>
                )}

                <AnimatePresence mode="wait">
                    <MotionBox
                        key={activeTab}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -20}}
                        transition={{duration: 0.5}}
                    >
                        {filteredTerms.map((category, index) => (
                            (!searchTerm && activeTab !== index ? null : (
                                <Box key={category.id} sx={{mb: 4}}>
                                    <Typography variant="h5" gutterBottom sx={{color: theme.palette.primary.main}}>
                                        {category.label}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {category.description}
                                    </Typography>
                                    {(category.terms || []).map((term) => (
                                        <TermCard key={term.id} {...term} />
                                    ))}
                                </Box>
                            ))
                        ))}
                    </MotionBox>
                </AnimatePresence>
            </Container>
        </>
    );
}
