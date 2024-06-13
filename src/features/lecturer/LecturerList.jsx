import { useGetLecturersQuery } from "./lecturersApiSlice";
import Lecturer from "./Lecturer";
import { Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";

const LecturerList = () => {
  const {
    data: lecturers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLecturersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = lecturers;

    const tableContent = ids?.length
      ? ids.map((lecturerId) => (
          <Lecturer key={lecturerId} lecturerId={lecturerId} />
        ))
      : null;

    content = (
      <Table variant="simple" >
        <Thead>
          <Tr>
            <Th >Lecturer Firstname</Th>
            <Th>Lecturer Lastname</Th>
            <Th>Lecturer email</Th>
          </Tr>
        </Thead>
        <Tbody>{tableContent}</Tbody>
      </Table>
    );
  }

  return content;
};
export default LecturerList;
