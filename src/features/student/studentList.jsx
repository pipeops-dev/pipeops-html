import { useGetStudentsQuery } from "./studentsApiSlice";
import Student from "./Student";
import { Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";

const StudentList = () => {
  const {
    data: students,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStudentsQuery(undefined, {
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
    const { ids } = students;

    const tableContent = ids?.length
      ? ids.map((studentId) => (
          <Student key={studentId} studentId={studentId} />
        ))
      : null;

    content = (
      <Table variant="simple" >
        <Thead>
          <Tr>
            <Th >Student Firstname</Th>
            <Th>Student Lastname</Th>
            <Th>Student email</Th>
          </Tr>
        </Thead>
        <Tbody>{tableContent}</Tbody>
      </Table>
    );
  }

  return content;
};
export default StudentList;
