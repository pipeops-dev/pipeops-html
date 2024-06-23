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
  Divider,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import {MdGraphicEq} from 'react-icons/md'
import { useNavigate, useParams } from "react-router-dom";
import { useAddNewAttendanceMutation } from "../../features/attendance/lecturerAttendanceApiSlice";
import { useEffect, useState } from "react";
export default function createAttendance() {
  const { id, lecturerId } = useParams();
  const navigate = useNavigate();
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
      navigate(`/lecturer/${lecturerId}`)
    }
  }, [isSuccessAttendance, navigate]);
  const [sliderValue, setSliderValue] = useState(0);
   console.log(sliderValue)
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  return (
    <>
      <Card m={3}>
        <CardHeader>
          <Heading>Creating an attendance</Heading>
        </CardHeader>
        <CardBody>
          <Text pb={2}>An attendance is about to be created. Do remember to open the attendance tab so your student can submit 
            their attendance and close it afterwards
             </Text>
             <Divider />
             <Text pt={4}>Please specify the lecture hall size you are currently using, below:</Text>
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
          <Spacer />
          {!isLoadingAttendance ? (
            <Button onClick={handleSubmit} colorScheme="red">Create</Button>
          ) : (
            <Button isLoading>Loading</Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
