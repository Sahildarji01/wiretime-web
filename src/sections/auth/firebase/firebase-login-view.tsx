// import * as Yup from 'yup';
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

// import Link from '@mui/material/Link';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import LoadingButton from '@mui/lab/LoadingButton';
// import InputAdornment from '@mui/material/InputAdornment';
// import Button from '@mui/material/Button';
// import Icon from '@mui/material/Icon';
// import { Box, Grid } from '@mui/material';

// import { paths } from 'src/routes/paths';
// import { RouterLink } from 'src/routes/components';
// import { useRouter, useSearchParams } from 'src/routes/hooks';

// import { useBoolean } from 'src/hooks/use-boolean';
// import { useAuthContext } from 'src/auth/hooks';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// // import { auth } from 'src/auth/context/firebase/firebase-config';
// import { PATH_AFTER_LOGIN } from 'src/config-global';

// import Iconify from 'src/components/iconify';
// import FormProvider, { RHFTextField } from 'src/components/hook-form';
// import { auth } from 'src/auth/context/firebase/firebase-config';
// import axios from 'axios';

// // import { auth } from 'src/auth/hooks/use-auth-context';

// // ----------------------------------------------------------------------

// export default function FirebaseLoginView() {
//   const { login, loginWithGoogle, loginWithGithub, loginWithTwitter } = useAuthContext();
//   const router = useRouter();
//   const { user } = useAuthContext();
//   const [errorMsg, setErrorMsg] = useState('');
//   const searchParams = useSearchParams();
//   const returnTo = searchParams.get('returnTo') || paths.dashboard.user.create;
//   const password = useBoolean();

//   const LoginSchema = Yup.object().shape({
//     email: Yup.string().required('Email is required').email('Email must be a valid email address'),
//     password: Yup.string().required('Password is required'),
//   });

//   const defaultValues = {
//     email: '',
//     password: '',
//   };

//   const methods = useForm({
//     resolver: yupResolver(LoginSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const onSubmit = handleSubmit(async () => {
//     try { 
//       await loginWithGoogle?.();
//       router.push(paths.dashboard.user.create);
//     } catch (error) {
//       console.error(error);
//       reset();
//       setErrorMsg(typeof error === 'string' ? error : error.message);
//     }
//   });


// const handleGoogleLogin = async () => {
//   try {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;

//     const token = await user.getIdToken();
//     const email = user.email;
//     const userName = user.displayName;

//     console.log('User info:', user);
//     console.log('Token:', token);
//     console.log('Email:', email);
//     console.log('UserName:', userName);

//     sessionStorage.setItem('accessToken', token);
//     if (email) {
//       sessionStorage.setItem('userEmail', email);

//       const response = await axios.post('https://wiretime-api-drimossgwq-uc.a.run.app/account/add-user', {
//         userId: email,
//         emailId: email,
//         userName: userName,
//       });

//       console.log('API Response:', response.data);
//     } else {
//       console.error('Email is null');
//     }

//     router.push(returnTo);
//   } catch (error) {
//     console.error(error);
//     setErrorMsg(error.message);
//   }
// };

//   const handleGithubLogin = async () => {
//     try {
//       await loginWithGithub?.();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleTwitterLogin = async () => {
//     try {
//       await loginWithTwitter?.();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const GoogleLoginButton = () => (
//     <Button
//     variant="contained"
//     color="success"
//     startIcon={<Icon className="fab fa-google" />}
//     onClick={handleGoogleLogin}
//     sx={{
//       backgroundColor: '#FFFFFF',
//       color: '#000000',
//       textTransform: 'none',
//       boxShadow: 'none',
//       border: '1px solid #D9D9D9',
//       '&:hover': {
//         backgroundColor: '#F5F5F5',
//         boxShadow: 'none',
//       },
//     }}
//   >
//     Sign in with Google
//   </Button>
//   );

//   const renderHead = (
//     <Stack spacing={2} sx={{ mb: 5 }}>
//       <Typography variant="h4">Sign Into WireTime</Typography>
//       <Stack direction="row" spacing={0.5}>
//         <Typography variant="body2">New user?</Typography>
//         <Link component={RouterLink} href={paths.auth.firebase.register} variant="subtitle2">
//           Create an account
//         </Link>
//       </Stack>
//     </Stack>
//   );

//   const renderForm = (
//     <Stack spacing={2.5}>
//       <RHFTextField name="email" label="Email address" />
//       <RHFTextField
//         name="password"
//         label="Password"
//         type={password.value ? 'text' : 'password'}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={password.onToggle} edge="end">
//                 <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />
//       <Link
//         component={RouterLink}
//         href={paths.auth.firebase.forgotPassword}
//         variant="body2"
//         color="inherit"
//         underline="always"
//         sx={{ alignSelf: 'flex-end' }}
//       >
//         Forgot password?
//       </Link>
//       <LoadingButton
//         fullWidth
//         color="inherit"
//         size="large"
//         type="submit"
//         variant="contained"
//         onClick={handleGoogleLogin}
//       >
//         Login
//       </LoadingButton>
//     </Stack>
//   );

//   const renderLoginOption = (
//     <div>
//       {/* <Divider
//         sx={{
//           my: 2.5,
//           typography: 'overline',
//           color: 'text.disabled',
//           '&:before, :after': {
//             borderTopStyle: 'dashed',
//           },
//         }}
//       >
//         OR
//       </Divider> */}
//       <Stack direction="row" justifyContent="center" spacing={2}>
//         <GoogleLoginButton />
//         {/* <IconButton color="inherit" onClick={handleGithubLogin}>
//           <Iconify icon="eva:github-fill" />
//         </IconButton>
//         <IconButton onClick={handleTwitterLogin}>
//           <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
//         </IconButton> */}
//       </Stack>
//     </div>
//   );

//   return (
//     <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh', minHeight: '100vh' }}>
//       <Grid item xs={12} md={8} lg={6} container direction="column" alignItems="center">
//         {/* {renderHead} */}
//         {!!errorMsg && (
//           <Alert severity="error" sx={{ mb: 3 }}>
//             {errorMsg}
//           </Alert>
//         )}
//         {/* <FormProvider methods={methods} onSubmit={onSubmit}>
//           {renderForm}
//         </FormProvider> */}
//         {renderLoginOption}
//       </Grid>
//     </Grid>
//   );
// }
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { Box, Grid } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useAuthContext } from 'src/auth/hooks';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { auth } from 'src/auth/context/firebase/firebase-config';
import axios from 'axios';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

const GoogleLogoSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="20px"
    height="20px"
  >
    <path fill="#4285F4" d="M24 9.5c3.14 0 5.61 1.1 7.48 2.93l5.48-5.48C33.95 3.52 29.36 1.5 24 1.5c-6.58 0-12.1 3.8-14.7 9.34l6.02 4.66c1.37-3.98 5.07-6.84 9.68-6.84z" />
    <path fill="#34A853" d="M10.34 13.34c-1.09 2.07-1.72 4.41-1.72 6.99s.63 4.91 1.72 6.99l6.02-4.66c-.3-1.02-.47-2.11-.47-3.33s.17-2.31.47-3.33l-6.02-4.66z" />
    <path fill="#FBBC05" d="M24 37.5c-3.14 0-5.61-1.1-7.48-2.93l-5.48 5.48c2.94 2.93 7.53 4.95 12.96 4.95 6.58 0 12.1-3.8 14.7-9.34l-6.02-4.66c-1.37 3.98-5.07 6.84-9.68 6.84z" />
    <path fill="#EA4335" d="M43.62 20.3H24v7.4h11.16c-.9 2.45-2.47 4.51-4.45 6.06l6.02 4.66c3.61-3.33 5.77-8.25 5.77-13.46 0-1.29-.13-2.54-.35-3.76z" />
  </svg>
);

export default function FirebaseLoginView() {
  const { login, loginWithGoogle, loginWithGithub, loginWithTwitter } = useAuthContext();
  const router = useRouter();
  const { user } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState('');
  const { enqueueSnackbar } = useSnackbar(); 
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || paths.dashboard.user.create;
  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const checkEmailAndPostData = async (email: string, userName: string | null) => {
    try {
      const response = await axios.get(`https://wiretime-api-drimossgwq-uc.a.run.app/account/get-profile/${email}`);
      const profile = response.data;
      const basicInfo = profile.basicInfo;
  
      if (!basicInfo.userName && !basicInfo.emailId && !basicInfo.userId && !basicInfo.gender && !basicInfo.phone1) {
        await axios.post('https://wiretime-api-drimossgwq-uc.a.run.app/account/add-user', {
          userId: email,
          emailId: email,
          userName: userName,
        });
        console.log('Data posted to backend');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        await axios.post('https://wiretime-api-drimossgwq-uc.a.run.app/account/add-user', {
          userId: email,
          emailId: email,
          userName: userName,
        });
        console.log('Data posted to backend');
      } else {
        console.error('Error checking email availability or posting data:', error);
      }
    }
  };
  

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();
      const email = user.email;
      const userName = user.displayName;

      console.log('User info:', user);
      console.log('Token:', token);
      console.log('Email:', email);
      console.log('UserName:', userName);

      sessionStorage.setItem('accessToken', token);
      if (email) {
        sessionStorage.setItem('userEmail', email);

        await checkEmailAndPostData(email, userName);

        router.push(returnTo);
        enqueueSnackbar(`Welcome, ${userName}! You are now signed into WireTime.`, { variant: 'success' });
      } else {
        console.error('Email is null');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    }
  };

  const handleGithubLogin = async () => {
    try {
      await loginWithGithub?.();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTwitterLogin = async () => {
    try {
      await loginWithTwitter?.();
    } catch (error) {
      console.error(error);
    }
  };

  const GoogleLoginButton = () => (
    <Button
      variant="contained"
      color="success"
      size='large'
      startIcon={<GoogleLogoSVG />}
      onClick={handleGoogleLogin}
      sx={{
        backgroundColor: '#FFFFFF',
        color: '#000000',
        textTransform: 'none',
        boxShadow: 'none',
        border: '1px solid #D9D9D9',
        '&:hover': {
          backgroundColor: '#F5F5F5',
          boxShadow: 'none',
        },
      }}
    >
      Sign in with Google
    </Button>
  );

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      {/* <Typography variant="h4">Sign Into WireTime</Typography> */}
      <Stack direction="row" spacing={0.5}>
        {/* <Typography variant="body2">New user?</Typography> */}
        {/* <Link component={RouterLink} href={paths.auth.firebase.register} variant="subtitle2">
          Create an account
        </Link> */}
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="email" label="Email address" />
      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Link
        component={RouterLink}
        href={paths.auth.firebase.forgotPassword}
        variant="body2"
        color="inherit"
        underline="always"
        sx={{ alignSelf: 'flex-end' }}
      >
        Forgot password?
      </Link>
      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        onClick={handleGoogleLogin}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  const renderLoginOption = (
    <div>
      {/* <Divider
        sx={{
          my: 2.5,
          typography: 'overline',
          color: 'text.disabled',
          '&:before, :after': {
            borderTopStyle: 'dashed',
          },
        }}
      >
        OR
      </Divider> */}
      <Stack direction="row" justifyContent="center" spacing={2}>
        <GoogleLoginButton />
        {/* <IconButton color="inherit" onClick={handleGithubLogin}>
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton onClick={handleTwitterLogin}>
          <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
        </IconButton> */}
      </Stack>
    </div>
  );

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh', minHeight: '100vh' }}>
      <Grid item xs={12} md={8} lg={6} container direction="column" alignItems="center">
        {renderHead}
        {!!errorMsg && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMsg}
          </Alert>
        )}
        {/* <FormProvider methods={methods} onSubmit={onSubmit}>
          {renderForm}
        </FormProvider> */}
        {renderLoginOption}
      </Grid>
    </Grid>
  );
}
