'use client';

import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack  from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import ConstructionIcon from '@mui/icons-material/Construction';

const UnderConstruction = () => {
    const router = useRouter();

    return (
        <Container maxWidth="md" sx={{ textAlign: 'center', py: 6 }}>
            <Stack spacing={4} alignItems="center">
                <ConstructionIcon sx={{ fontSize: 80, color: '#FF9800' }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'gold' }}>
                    🚧 Page Under Construction 🚧
                </Typography>
                <Typography variant="body1" sx={{ color: '#FFF' }}>
                    We&apos;re working hard to bring this feature to life. Please check back soon!
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => router.back()}
                    sx={{
                        mt: 2,
                        bgcolor: '#cc00FF',
                        '&:hover': { bgcolor: '#00AACC' },
                    }}
                >
                    Go Back
                </Button>
            </Stack>
        </Container>
    );
};

export default UnderConstruction;
