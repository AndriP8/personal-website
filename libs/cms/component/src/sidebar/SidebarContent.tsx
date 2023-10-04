import { Box, BoxProps, CloseButton, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { IconType } from 'react-icons';
import { MdHome, MdSettings, MdTrendingUp } from 'react-icons/md';

import NavItem from './SidebarItem';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: MdHome, href: '/' },
  { name: 'Blog', icon: MdTrendingUp, href: '/blog' },
  { name: 'Project', icon: MdSettings, href: '/project' },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const router = useRouter();
  return (
    <Box
      backgroundColor="white"
      borderRight={1}
      borderRightColor="gray.200"
      width={{ base: 'full', md: 60 }}
      pos="fixed"
      height="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          CMS
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          href={link.href}
          background={router.pathname === link.href ? 'gray.400' : 'white'}
          color={router.pathname === link.href ? 'white' : 'black'}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
