import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import {useRouter} from "next/navigation";
import { motion } from "framer-motion";
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';

const PersonalizeEnergy = () => {
    const theme = useTheme();
    const router = useRouter();

    const handleSetup = (type) => {
        router.push(`/user/personalization/${type}`);
    };

    return (
        <Box sx={{ py: 8, px: 3 }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ textAlign: "center", mb: 8 }}>
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{
                            fontWeight: 700,
                            background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                            backgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        Personalize Your Energy Monitoring
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 4,
                            maxWidth: "800px",
                            mx: "auto",
                            lineHeight: 1.6,
                            color: '#FFF',
                        }}
                    >
                        Configure your home or business for real-time energy insights tailored to your needs. Monitor, analyze, and optimize like never before.
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ textTransform: "none", px: 4, py: 1.5 }}
                            onClick={() => handleSetup("home")}
                            endIcon={<HomeIcon sx={{color: '#FFF', fontSize: '60px'}} />}
                        >
                            Set Up Home
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            sx={{ textTransform: "none", px: 4, py: 1.5 }}
                            onClick={() => handleSetup("business")}
                            endIcon={<BusinessIcon  sx={{color: '#FFF', fontSize: '60px'}} />}
                        >
                            Set Up Business
                        </Button>
                    </Box>
                </Box>
            </motion.div>
        </Box>
    );
};

export default PersonalizeEnergy;