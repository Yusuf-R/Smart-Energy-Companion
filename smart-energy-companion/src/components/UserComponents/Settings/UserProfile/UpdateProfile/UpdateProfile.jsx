'use client'
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useMediaQuery } from '@mui/material';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material";
import { Controller, useForm, FormProvider } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { feProfileUpdateValidator } from "@/validators/feProfileUpdateValidator";
import { FormControl } from "@mui/material/";
import MenuItem from "@mui/material/MenuItem";
import { toast } from 'sonner';
import PhoneInput, {
    formatPhoneNumber,
    formatPhoneNumberIntl,
    isPossiblePhoneNumber,
    isValidPhoneNumber
} from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import FormHelperText from '@mui/material/FormHelperText';
import dayjs from "dayjs";
import {
    txProps,
} from "@/utils/data"
import AdminUtils from '@/utils/AdminUtils';


function UpdateProfile({ userProfile }) {

    const [activeTab, setActiveTab] = useState('/user/settings/profile/update');
    const pathname = usePathname();
    const router = useRouter();
    const [dobDate, setDobDate] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [stateOfOrigin, setStateOfOrigin] = useState('');
    const [currStateResidence, setCurrStateResidence] = useState("")


    // Break Points
    const xSmall = useMediaQuery('(min-width:300px) and (max-width:389.999px)');
    const small = useMediaQuery('(min-width:390px) and (max-width:480.999px)');
    const medium = useMediaQuery('(min-width:481px) and (max-width:599.999px)');
    const large = useMediaQuery('(min-width:600px) and (max-width:899.999px)');
    const xLarge = useMediaQuery('(min-width:900px) and (max-width:1199.999px)');
    const isLargeScreen = useMediaQuery('(min-width:900px)');
    // state variables

    const isSmallScreen = useMediaQuery('(max-width:599.999px)');

    const { control, handleSubmit, setValue, formState: { errors }, reset, getValues } = useForm({
        mode: "onTouched",
        resolver: zodResolver(feProfileUpdateValidator),
        reValidateMode: "onChange",
        defaultValues: {
            dob: '',
        }
    });

    const phoneInputStyle = {
        '& .PhoneInput': {
            bgcolor: '#274e61',
            borderRadius: '10px',
            border: errors.phoneNumber ? '1px solid #ff4444' : errors.nextOfKinNumber ? '1px solid #ff4444' : '1px solid transparent',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
                bgcolor: '#2c5468',
            },
            '&:focus-within': {
                bgcolor: '#2c5468',
                boxShadow: '0 0 0 2px rgba(70, 240, 249, 0.3)',
            },
        },
        '& .PhoneInputInput': {
            bgcolor: '#051935',
            border: 'none',
            color: 'white',
            p: '8px 12px',
            fontSize: '16px',
            outline: 'none',
            width: '100%',
            height: '45px',
            '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px',
            },
            '&:focus': {
                outline: 'none',
                border: 'none',
            },
        },
        '& .PhoneInputCountry': {
            mr: '10px',
            p: '5px',
            display: 'flex',
            alignItems: 'center',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
        '& .PhoneInputCountryFlag': {
            width: '28px',
            height: '22px',
            mr: '8px',
        },
        '& .PhoneInputCountrySelect': {
            color: 'white',
            bgcolor: 'transparent',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            '&:focus': {
                outline: 'none',
            },
            '& option': {
                bgcolor: '#274e61',
                color: 'white',
            },
        },
        '& .PhoneInputCountrySelectArrow': {
            color: 'gold',
            opacity: 0.7,
            borderWidth: '2px',
            ml: '8px',
        },
    }


    useEffect(() => {
        if (pathname.includes('update')) {
            setActiveTab('/user/settings/profile/update');
        } else if (pathname.includes('avatar')) {
            setActiveTab('/user/settings/profile/avatar');
        } else {
            setActiveTab('/user/settings/profile');
        }
    }, [pathname]);

    useEffect(() => {
        if (userProfile) {
            reset({
                email: userProfile.email || '',
                firstName: userProfile.firstName || '',
                middleName: userProfile.middleName || '',
                lastName: userProfile.lastName || '',
                phoneNumber: userProfile.phoneNumber || '',
                address: userProfile.address || '',
            });
        }
    }, [userProfile, reset]);


    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: AdminUtils.updateUserProfile,
        mutationKey: ['UpdateUserProfile'],
    })

    const updateData = async (objData) => {
        try {
            setUpdating(true);
            const { success, data } = feProfileUpdateValidator.safeParse(objData);
            if (!success) {
                setUpdating(false);
                toast.error('Please fill all the required fields');
                return;
            }
            mutation.mutate(data, {
                onSuccess: () => {
                    toast.success('Profile updated successfully');
                    queryClient.invalidateQueries(['UserData']);
                    setUpdating(false);
                    router.refresh();
                    router.push('/user/settings/profile');
                },
                onError: (error) => {
                    console.error('An unexpected error happened:', error);
                    toast.error('An error occurred while updating profile');
                    setUpdating(false);
                }
            })
        } catch (error) {
            setUpdating(false);
            toast.error('An error occurred while updating profile');
            console.error('An unexpected error happened:', error);
        }
    }

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toast.error("Please fill all the required fields");
            console.log({errors})
            setUpdating(false);  // Ensure this is only called once per error change
        }
    }, [errors]);


    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    backgroundColor: "#1F2937",
                    width: '100%',
                    p: 0.5,
                    overflow: isSmallScreen ? 'auto' : 'visible',

                }}
            >
                {/* Navigation Tabs */}
                <Stack direction='row' spacing={2} sx={{
                    justifyContent: 'flex-start',
                }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        centered
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#46F0F9',
                            },
                        }}
                    >
                        <Tab
                            label="Profile"
                            component={Link}
                            href="/user/settings/profile"
                            value="/user/settings/profile"

                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                        <Tab
                            label="Edit-Biodata"
                            href="/user/settings/profile/update"
                            value="/user/settings/profile/update"
                            sx={{
                                color: "#FFF",
                                fontWeight: 'bold',
                                fontSize: xSmall || small || medium || large ? '0.6rem' : '0.9rem',
                                "&.Mui-selected": {
                                    color: "#46F0F9",
                                },
                            }}
                        />
                    </Tabs>
                </Stack>
                <br />
                <Box
                    component="form"
                    onSubmit={handleSubmit(updateData)}
                    noValidate
                    autoComplete="off"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'nowrap',
                        backgroundColor: "#1F2937",
                        minHeight: '100vh',
                        p: 0.5,
                        overflow: isSmallScreen ? 'auto' : 'visible',
                    }}
                >
                    <Grid container spacing={4}>
                        <Grid size={12}>
                            <Card sx={{
                                background: 'linear-gradient(to right, #000046, #1cb5e0)',
                                padding: '16px',
                                borderRadius: '10px'
                            }}>
                                <Typography variant="body1" sx={{
                                    color: '#FFF',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>
                                    Update BioData
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
                            <Card sx={{
                                background: 'linear-gradient(to right, #1d4350, #a43931)',
                                padding: '16px',
                                borderRadius: '10px'
                            }}>
                                <Typography variant="subtitle2"
                                    sx={{
                                        color: '#46F0F9',
                                        fontSize: '14px',
                                        mb: 1
                                    }}>
                                    FirstName
                                </Typography>
                                <FormControl fullWidth>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                error={errors.fullName ? true : false}
                                                helperText={errors.fullName ? errors.fullName.message : ''}
                                                value={field.value || ''}
                                                slotProps={{
                                                    input: {
                                                        sx: txProps,
                                                    },
                                                    inputLabel: {
                                                        sx: {
                                                            color: "#FFF",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }
                                                }}
                                                sx={{
                                                    color: "#46F0F9",
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
                            <Card sx={{
                                background: 'linear-gradient(to right, #1d4350, #a43931)',
                                padding: '16px',
                                borderRadius: '10px'
                            }}>
                                <Typography variant="subtitle2"
                                    sx={{
                                        color: '#46F0F9',
                                        fontSize: '14px',
                                        mb: 1
                                    }}>
                                    MiddleName
                                </Typography>
                                <FormControl fullWidth>
                                    <Controller
                                        name="middleName"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                error={errors.middleName ? true : false}
                                                helperText={errors.middleName ? errors.middleName.message : ''}
                                                value={field.value || ''}
                                                slotProps={{
                                                    input: {
                                                        sx: txProps,
                                                    },
                                                    inputLabel: {
                                                        sx: {
                                                            color: "#FFF",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }
                                                }}
                                                sx={{
                                                    color: "#46F0F9",
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
                            <Card sx={{
                                background: 'linear-gradient(to right, #1d4350, #a43931)',
                                padding: '16px',
                                borderRadius: '10px'
                            }}>
                                <Typography variant="subtitle2"
                                    sx={{
                                        color: '#46F0F9',
                                        fontSize: '14px',
                                        mb: 1
                                    }}>
                                    LastName
                                </Typography>
                                <FormControl fullWidth>
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                error={errors.lastName ? true : false}
                                                helperText={errors.lastName ? errors.lastName.message : ''}
                                                value={field.value || ''}
                                                slotProps={{
                                                    input: {
                                                        sx: txProps,
                                                    },
                                                    inputLabel: {
                                                        sx: {
                                                            color: "#FFF",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }
                                                }}
                                                sx={{
                                                    color: "#46F0F9",
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
                            <Card sx={{
                                background: 'linear-gradient(to right, #1d4350, #a43931)',
                                padding: '16px',
                                borderRadius: '10px'
                            }}>
                                <Typography variant="subtitle2"
                                    sx={{
                                        color: '#46F0F9',
                                        fontSize: '14px',
                                        mb: 1
                                    }}>
                                    Email
                                </Typography>
                                <FormControl fullWidth>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                error={errors.email ? true : false}
                                                helperText={errors.email ? errors.email.message : ''}
                                                value={field.value || ''}
                                                slotProps={{
                                                    input: {
                                                        sx: txProps,
                                                        readOnly: true
                                                    },
                                                    inputLabel: {
                                                        sx: {
                                                            color: "#FFF",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }
                                                }}
                                                sx={{
                                                    color: "#46F0F9",
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
                            <Card
                                sx={{
                                    background: 'linear-gradient(145deg, #1d4350, #a43931)',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        color: '#46F0F9',
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        mb: 1,
                                    }}
                                >
                                    Phone Number
                                </Typography>
                                <FormControl fullWidth>
                                    <Controller
                                        name="phoneNumber"
                                        control={control}
                                        render={({ field }) => (
                                            <Box sx={phoneInputStyle}>
                                                <PhoneInput
                                                    {...field}
                                                    international
                                                    defaultCountry="NG"
                                                    countryCallingCodeEditable={false}
                                                    value={field.value || ''}
                                                    onChange={(value) => {
                                                        field.onChange(value);
                                                        setValue('phoneNumber', value);
                                                    }}
                                                />
                                            </Box>
                                        )}
                                    />
                                    {errors.phoneNumber && (
                                        <FormHelperText
                                            sx={{
                                                color: '#ff4444',
                                                marginTop: 1,
                                                fontSize: '12px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {errors.phoneNumber.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Card>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
                            <Card sx={{
                                background: 'linear-gradient(to right, #1d4350, #a43931)',
                                padding: '16px',
                                borderRadius: '10px'
                            }}>
                                <Typography variant="subtitle2"
                                            sx={{
                                                color: '#46F0F9',
                                                fontSize: '14px',
                                                mb: 1
                                            }}>
                                    Address
                                </Typography>
                                <FormControl fullWidth>
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                variant="outlined"
                                                error={errors.address ? true : false}
                                                helperText={errors.address ? errors.address.message : ''}
                                                value={field.value || ''}
                                                slotProps={{
                                                    input: {
                                                        sx: txProps,
                                                    },
                                                    inputLabel: {
                                                        sx: {
                                                            color: "#FFF",
                                                            "&.Mui-focused": {
                                                                color: "white"
                                                            },
                                                        }
                                                    }
                                                }}
                                                sx={{
                                                    color: "#46F0F9",
                                                }}
                                            />
                                        )}
                                    />
                                </FormControl>
                            </Card>
                        </Grid>
                      

                    </Grid>
                    <br />
                    {/*Submitting button */}
                    <Stack direction='row' gap={3} sx={{ marginBottom: '75px', justifyContent: 'flex-start' }}>
                        <Link href="/user/settings/profile">
                            <Button variant="contained" color='success' aria-label="Go back to user profile"> Back </Button>
                        </Link>
                        <Button variant="contained" color='info' onClick={() => reset()} aria-label="Clear form"> Clear </Button>
                        <Button
                            variant="contained"
                            color="error"
                            type="submit"
                            aria-label="Submit form"
                            endIcon={updating && <CircularProgress size={20} color="inherit" />}
                            onClick={(e) => updating && e.preventDefault()} // Prevent default click if updating
                            sx={{
                                ...(updating && {
                                    pointerEvents: 'none',  // Disable interaction
                                    opacity: 1,             // Maintain original opacity
                                }),
                            }}
                        >
                            {updating ? 'Updating...' : 'Submit'}
                        </Button>
                    </Stack>

                </Box>
            </Box>
        </>
    )
}

export default UpdateProfile