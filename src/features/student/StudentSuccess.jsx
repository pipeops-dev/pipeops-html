import { Alert, AlertIcon, AlertTitle, AlertDescription, Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetStudentsQuery } from "./studentsApiSlice";

export default function StudentSuccess() {
    const navigate = useNavigate();
    const { data: students, isLoading, isSuccess, isError, error } = useGetStudentsQuery();
    let content;

    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    } else if (isSuccess) {
        content = students?.ids?.map(studentId => (
            <Button key={studentId} onClick={() => handleSubmit(studentId)}>
                Go to student {studentId}
            </Button>
        ));
    }

    const handleSubmit = (studentId) => {
        navigate(`/pin/${studentId}`);
    };

    return (
        <div>
            <Alert
                status='success'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
            >
                {content}
            </Alert>
        </div>
    );
}