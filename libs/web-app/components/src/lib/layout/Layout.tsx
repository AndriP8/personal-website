import { Flex, VStack } from '@chakra-ui/react';
import React from 'react';

import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    // TODO: check minHeight on the mobile browser when already deploy
    <VStack
      alignItems="normal"
      minHeight="100vh"
      bgColor="gray.200"
      paddingInline="15vw"
    >
      <Navbar />
      <Flex direction="column" gap={82} marginBlock={82}>
        {children}
      </Flex>
      <Footer />
    </VStack>
  );
};

export default Layout;
