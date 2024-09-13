import { useState } from "react";
import { FileButton, Image, SimpleGrid, Text } from "@mantine/core";
import { Button } from "@/components";
import { RiFileUploadLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { useDeleteEmr, useUploadEmr } from "../api";
import { toast } from "@/libs/mantine-toast";
import { Images } from "../../types";
import { queryClient } from "@/libs/react-query";
import { EMRImageCarousel } from "../../components";
import { useDisclosure } from "@mantine/hooks";

export const UploadMotherEmr = ({ images }: { images: Images }) => {
  const [edit, setEdit] = useState(false);
  const { setValue } = useForm<{
    uploads: File | null;
  }>();

  const [isOpen, { open, close }] = useDisclosure();
  const [clickedImageIndex, setClickedImageIndex] = useState(0);

  const { mutate: uploadEmr } = useUploadEmr();

  const handleFileChange = (file: File | null) => {
    setValue("uploads", file);
    const formData = new FormData();

    if (file) {
      formData.append("uploads", file);
      const id = "66b9b9114a6b34001532ebec";
      uploadEmr(
        { id, file: formData },
        {
          onSuccess: () => {
            toast.success({
              title: "Success",
              message: "Emr photo has uploaded successfully.",
            });

            queryClient.invalidateQueries({
              queryKey: ["motherPatient"],
            });
          },
        },
      );
    }
  };

  const handleEditPhoto = () => {
    setEdit(!edit);
  };

  const { mutate: deleteEmr } = useDeleteEmr();

  const handleDeletePhoto = (id: string) => {
    const photoId = id;
    deleteEmr(
      { patientId: "66b9b9114a6b34001532ebec", photoId: photoId },
      {
        onSuccess: () => {
          toast.success({
            title: "Success",
            message: "Photo has deleted successfully.",
          });
          queryClient.invalidateQueries({
            queryKey: ["motherPatient"],
          });
        },
      },
    );
  };

  const handleImageClick = (index: number) => {
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
                  onClick={() => handleImageClick(index)}
                  className="w-full h-full object-cover"
                />
              </div>
              {edit && (
                <Button
                  onClick={() => handleDeletePhoto(image.id)}
                  className="mt-2 bg-gray-200 hover:bg-gray-100 text-black hover:text-black "
                >
                  Delete
                </Button>
              )}
            </div>
          ))}
        </SimpleGrid>
      </div>
      <EMRImageCarousel
        images={images}
        isOpen={isOpen}
        close={close}
        initialSlide={clickedImageIndex}
      />
    </>
  );
};
