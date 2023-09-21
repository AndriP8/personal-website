import { Flex, FlexProps, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { IconType } from 'react-icons';

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: string;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  return (
    <nav style={{ marginInline: 16, marginBlock: 4 }}>
      <Link href={href} style={{ textDecoration: 'none' }}>
        <Flex
          align="center"
          padding="3"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'gray.400',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              marginRight="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </nav>
  );
};

export default NavItem;
