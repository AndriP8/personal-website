import { Box, Divider, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navItemData = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'About Me',
    href: '/about',
  },
];

const Navbar = () => {
  const router = useRouter();
  const page = router.pathname;

  return (
    <Box>
      <Flex justify="start" alignItems="center" gap={35} paddingBlock={4}>
        {navItemData.map((item) => (
          <nav
            key={item.title}
            style={{
              color: 'black',
              textDecoration: page === item.href ? 'underline' : 'none',
            }}
          >
            <Link href={item.href}>{item.title}</Link>
          </nav>
        ))}
      </Flex>
      <Divider backgroundColor="black" />
    </Box>
  );
};

export default Navbar;
