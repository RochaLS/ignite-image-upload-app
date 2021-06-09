import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
  Flex,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxH="900px" maxW="600px" bgColor="pGray.800">
        <ModalBody p={0}>
          <Image src={imgUrl} width="100%" height="100%" />
        </ModalBody>
        <ModalFooter>
          <Flex w="100%" justifyContent="left">
            <Link isExternal href={imgUrl}>
              Abrir original
            </Link>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
