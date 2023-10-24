import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navItemData = [
  {
    title: 'Home',
    href: '/',
    index: true,
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
      <nav>
        <ul
          style={{
            display: 'flex',
            justifyItems: 'start',
            justifyContent: 'start',
            columnGap: '24px',
            paddingBlock: '24px',
            borderBottom: '1.5px solid #1A202C',
          }}
        >
          {navItemData.map((item) => (
            <li
              key={item.title}
              style={{
                listStyle: 'none',
                fontSize: '20px',
                color:
                  (item.index && page === '/') || page === item.href
                    ? '#000000'
                    : '#4A5568',
                fontWeight: 500,
              }}
            >
              <Link href={item.href}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </Box>
  );
};

export default Navbar;
