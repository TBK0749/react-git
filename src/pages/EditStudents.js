import { Textarea, Button, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { useForm } from "@mantine/hooks";
import axios from "axios";


export default function EditStudents() {
    const [students, setStudents] = useState([])

    useEffect(() => {

        axios.get("http://localhost:3001/students").then((res) => {
            setStudents(res.data);
        })

        // editStudent.setFieldValue('name', student.name);
        // editStudent.setFieldValue('bio', student.bio);

    }, [])

    const { studentId } = useParams();
    const student = students.find(student => student.id === Number(studentId));
    const history = useHistory();
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        if (!edited) {
            return;
        }

        history.push('/students');
    }, [edited])

    const editStudent = useForm({
        initialValues: {
            name: '',
            bio: '',
        },

        validationRules: {
            name: (value) => (value),
            bio: (value) => (value),
        },
    });


    return (
        <div>
            <form onSubmit={editStudent.onSubmit(() => {
                const { name, bio } = editStudent.values;
                const edited = { id: student.id, name, bio };

                const cloneStudents = [...students];
                const findId = (element) => element.id === student.id;
                const editToIndex = cloneStudents.findIndex(findId);
                cloneStudents.splice(editToIndex, 1, edited);

                setStudents(cloneStudents);
                setEdited(true);

                editStudent.setFieldValue('name', "");
                editStudent.setFieldValue('bio', "");

                console.log(student.id)
            })}>
                <h1 className="my-4 text-3xl flex justify-center">Edit Student</h1>
                <div className="my-4">
                    <TextInput
                        label="Name"
                        required
                        error={editStudent.errors.name && "Please enter your name !"}
                        value={editStudent.values.name}
                        onChange={(event) => editStudent.setFieldValue('name', event.currentTarget.value)}
                    />
                </div>
                <div className="my-4">
                    <Textarea
                        placeholder="Your Bio"
                        label="Bio"
                        error={editStudent.errors.bio && "Please enter your bio !"}
                        radius="xs"
                        required
                        value={editStudent.values.bio}
                        onChange={(event) => editStudent.setFieldValue('bio', event.currentTarget.value)}
                    />
                </div>
                <div className="flex justify-between">
                    <Link to="/students"><Button>Back</Button></Link>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
}