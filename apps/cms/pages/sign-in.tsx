import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { PasswordField } from '@personal-website/cms/component';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type SignInResponse = {
  token: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const SignIn = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const toast = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post<SignInResponse>(`${BASE_URL}users/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        toast({
          title: 'Sign in successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        router.push('/');
      })
      .catch((error: unknown) => {
        if (error instanceof AxiosError) {
          toast({
            title: 'Sign in error',
            description: error.response?.data.errors,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        }
      });
  };
  return (
    <Box backgroundColor="gray.100" minHeight="100vh" height="full">
      <Container
        maxW="lg"
        py={{ base: '12', md: '24' }}
        px={{ base: '0', sm: '8' }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading size={{ base: 'md', md: 'lg', lg: 'xl' }}>
                Sign In to your account
              </Heading>
              <Text color="fg.muted">
                Don&lsquo;t have an account?{' '}
                <Link href="/sign-up">Sign Up</Link>
              </Text>
            </Stack>
          </Stack>
          <form onSubmit={handleSubmit}>
            <Box
              py={{ base: '4', sm: '8' }}
              px={{ base: '4', sm: '10' }}
              mx={{ base: '2', sm: '0' }}
              bg="white"
              boxShadow={{ base: 'none', sm: 'md' }}
              borderRadius={{ base: 'md', sm: 'xl' }}
            >
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <PasswordField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Stack>
                <Box>
                  <Button type="submit" width="full">
                    Sign In
                  </Button>
                </Box>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignIn;
