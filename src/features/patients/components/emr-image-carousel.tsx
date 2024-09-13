//emr-image-carousel
import { useState } from "react";
import { Image, Modal, RemoveScroll, ScrollArea } from "@mantine/core";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { Images } from "../types";

export const EMRImageCarousel = ({
  images,
  isOpen,
  close,
  initialSlide,
}: {
  images: Images;
  isOpen: boolean;
  close: () => void;
  initialSlide: number;
}) => {
  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | null>(null);
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);

  const slides = images?.map((image) => (
    <Carousel.Slide key={image.id}>
      <Image src={image?.imageUrl} h={600} fit="contain" />
    </Carousel.Slide>
  ));

  return (
    <>
      <Modal
        opened={isOpen}
        size="100%"
        padding={0}
        transitionProps={{ duration: TRANSITION_DURATION }}
        withCloseButton={false}
        onClose={close}
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Carousel
          className={RemoveScroll.classNames.fullWidth}
          loop
          getEmblaApi={setEmbla}
          controlSize={37}
          initialSlide={initialSlide}
        >
          {slides}
        </Carousel>
      </Modal>
    </>
  );
};
