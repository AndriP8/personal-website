import { Flex, FlexProps, IconButton, Text } from '@chakra-ui/react';
import { MdMenu } from 'react-icons/md';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height={20}
      alignItems="center"
      backgroundColor="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<MdMenu />}
      />

      <Text
        fontSize="2xl"
        marginLeft="8"
        fontFamily="monospace"
        fontWeight="bold"
      >
        CMS
      </Text>
    </Flex>
  );
};

export default MobileNav;
