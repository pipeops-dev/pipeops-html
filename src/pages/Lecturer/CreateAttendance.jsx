import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  useToast,
  Button,
  Text,
  Heading,
} from "@chakra-ui/react";
import {MdGraphicEq} from 'react-icons/md'
import { useNavigate, useParams } from "react-router-dom";
import { useAddNewAttendanceMutation } from "../../features/attendance/lecturerAttendanceApiSlice";
import { useEffect, useState } from "react";
export default function createAttendance() {
  const { id, lecturerId } = useParams();
  const toast = useToast();
  const [
    addNewAttendance,
    { isLoading: isLoadingAttendance, isSuccess: isSuccessAttendance },
  ] = useAddNewAttendanceMutation();

  const handleClick = async (size) => {
    setSelectedSize(size);
  };

  const handleSubmit = async () => {
    console.log(id);
    try {
      await addNewAttendance({ attendanceTabId: id, lecturerId });
      console.log(lecturerId, id);
      onOpen();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccessAttendance) {
      toast({
        position: "top-right",
        title: "Attendance Created",
        description: `The attendance has been created successfully.`,
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    }
  }, [isSuccessAttendance]);
  const [sliderValue, setSliderValue] = useState(0);
   console.log(sliderValue)
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  return (
    <>
      <Card>
        <CardHeader>
          <Heading>Create an attendance</Heading>
        </CardHeader>
        <CardBody>
          <Text>attendance </Text>
          <Box p={4} pt={6}>
            <Slider
              aria-label="slider-ex-6"
              onChange={(val) => setSliderValue(val)} defaultValue={0}
              min={0} max={100} step={25}
            >
              <SliderMark value={25} {...labelStyles}>
                small
              </SliderMark>
              <SliderMark value={50} {...labelStyles}>
                medium
              </SliderMark>
              <SliderMark value={75} {...labelStyles}>
                large
              </SliderMark>

              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6}>
    <Box color='blue' as={MdGraphicEq} />
  </SliderThumb>
            </Slider>
          </Box>
        </CardBody>
        <CardFooter>
          {!isLoadingAttendance ? (
            <Button onClick={handleSubmit}>Create</Button>
          ) : (
            <Button isLoading>Loading</Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
