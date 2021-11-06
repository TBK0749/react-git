import { Textarea, Button, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { useForm } from "@mantine/hooks";
import axios from "axios";

export default function EditStudents() {
    const { studentId } = useParams();
    const history = useHistory();
    const [edited, setEdited] = useState(false);
    const editStudent = useForm({
        initialValues: {
            name: "",
            bio: "",
        },

        validationRules: {
            name: (value) => (value),
            bio: (value) => (value),
        },
    });

    useEffect(() => {

        axios.get(`http://localhost:3001/students/${studentId}`).then((res) => {
            editStudent.setFieldValue('name', res.data.name);
            editStudent.setFieldValue('bio', res.data.bio);
        }).catch((error) => {
            console.log(error);
        });

    }, [])

    useEffect(() => {
        if (!edited) {
            return;
        }
        
        history.push('/students');
    }, [edited])


    return (
        <div>
            <form onSubmit={editStudent.onSubmit(() => {
                if (!window.confirm('Do you want to edit student ?')) {
                    return;
                }
                const { name, bio } = editStudent.values;

                axios.put(`http://localhost:3001/students/${studentId}`, {
                    name: name,
                    bio: bio
                }).then(() => {
                    setEdited(true);
                }).catch((error) => {
                    console.log(error);
                })

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