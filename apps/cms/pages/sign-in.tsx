import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { PasswordField } from '@personal-website/cms/component';
import Link from 'next/link';

const SignIn = () => {
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
                  <Input id="email" type="email" />
                </FormControl>
                <PasswordField />
              </Stack>
              <Box>
                <Checkbox defaultChecked>Remember me</Checkbox>
              </Box>
              <Box>
                <Button width="full">Sign In</Button>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignIn;
