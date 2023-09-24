import { Box } from '@chakra-ui/react';
import React from 'react';

import Sidebar from '../sidebar/Sidebar';

export function Layout(props: React.PropsWithChildren) {
  return (
    <Box minHeight="100vh" backgroundColor="gray.100">
      <Sidebar />
      <Box
        marginLeft={{ base: 0, md: 60 }}
        paddingBlock={6}
        paddingInline={{ base: 7, md: 20 }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default Layout;
