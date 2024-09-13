import { FileButton, Image, SimpleGrid, Text } from "@mantine/core";
import { Button } from "@/components";
import { RiFileUploadLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { toast } from "@/libs/mantine-toast";
import { useState } from "react";
import { queryClient } from "@/libs/react-query";
import { useDisclosure } from "@mantine/hooks";
import { EMRImageCarousel } from "../../components";
import { useDeleteChildEmr, useUplaodChildEmr } from "../api";
import { Images } from "../../types";

export const UploadPhoto = ({ images }: { images: Images }) => {
  const [edit, setEdit] = useState(false);
  const [clickedImageIndex, setClickedImageIndex] = useState(0);
  const { setValue } = useForm<{
    uploads: File | null;
  }>();

  const [isOpen, { open, close }] = useDisclosure();

  const { mutate: uploadEmr } = useUplaodChildEmr();

  const handleFileChange = (file: File | null) => {
    setValue("uploads", file);
    const formData = new FormData();

    if (file) {
      formData.append("uploads", file);
      const id = "66c40f7ed27a52001501ddc8";
      uploadEmr(
        { id, file: formData },
        {
          onSuccess: () => {
            toast.success({
              title: "Success",
              message: "Emr photo has uploaded successfully.",
            });

            queryClient.invalidateQueries({
              queryKey: ["childPatient"],
            });
          },
        },
      );
    }
  };

  const handleEditPhoto = () => {
    setEdit(!edit);
  };

  const { mutate: deleteEmr } = useDeleteChildEmr();

  // need to add loading in deleting
  const handleDeletePhoto = (id: string) => {
    const photoId = id;
    deleteEmr(
      { patientId: "66c40f7ed27a52001501ddc8", photoId: photoId },
      {
        onSuccess: () => {
          toast.success({
            title: "Success",
            message: "Photo has deleted successfully.",
          });
          queryClient.invalidateQueries({
            queryKey: ["childPatient"],
          });
        },
      },
    );
  };

  const handleClickImage = (index: number) => {
    setClickedImageIndex(index);
    open();
  };

  return (
    <>
      <div className="flex items-center gap-x-2 my-6">
        <Text>Photos</Text>
        {images?.length > 0 && (
          <Button
            className="bg-gray-200 hover:bg-gray-100"
            onClick={handleEditPhoto}
          >
            <CiEdit size={25} color="black" />
          </Button>
        )}

        {!edit && (
          <FileButton
            onChange={(file) => handleFileChange(file)}
            accept="image/png, image/jpg"
          >
            {(props) => (
              <Button {...props}>
                <RiFileUploadLine size="20" className="mr-2" /> Upload Photo(s)
              </Button>
            )}
          </FileButton>
        )}
      </div>
      <div>
        <SimpleGrid cols={{ base: 3, xs: 4, sm: 5, md: 6, lg: 8 }} spacing="xs">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="flex flex-col items-center w-[120px]"
            >
              <div className="w-full h-[100px]">
                <Image
                  src={image.imageUrl}
                  alt={`Uploaded image ${image.id}`}
                  onClick={() => handleClickImage(index)}
                  className="w-full h-full object-cover"
                />
              </div>
              {edit && (
                <Button
                  onClick={() => handleDeletePhoto(image.id)}
                  className="mt-2 bg-gray-200 hover:bg-gray-100 text-black hover:text-black"
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
        </SimpleGrid>
      </div>
      {/* loading state */}
      {/* {isUploading && (
          <div className="my-6">
            <Skeleton height={80} mb="xl" radius="sm" width="20%" />
          </div>
        )} */}
      <EMRImageCarousel
        isOpen={isOpen}
        close={close}
        initialSlide={clickedImageIndex}
        images={images}
      />
    </>
  );
};
