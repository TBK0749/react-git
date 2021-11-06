import { Textarea, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function CreateStudents() {
    const [students, setStudents] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {

        axios.get("http://localhost:3001/students").then((res) => {
            setStudents(res.data);
        })

    }, [])

    const history = useHistory();
    const newStudent = useForm({
        initialValues: {
            name: '',
            bio: '',
        },

        validationRules: {
            name: (value) => (value),
            bio: (value) => (value),
        },
    });

    const [created, setCreated] = useState(false);

    useEffect(() => {
        if (!created) {
            return;
        }

        history.push('/students');
    }, [created])

    function confirm() {
        return (
            <div>
                <div>
                    <div className="my-4"><h1>Name:</h1>
                        {newStudent.values.name}</div>
                    <div className="my-4"><h1>Bio:</h1>
                        {newStudent.values.bio}</div>
                </div>
                <div className="flex justify-end justify-between">
                    <Button
                        onClick={() => {
                            setShowConfirm(false);
                        }}
                    >Back</Button>
                    <Button
                        onClick={() => {

                            let id = 1;
                            if (students.length !== 0) {
                                id = students[students.length - 1].id + 1;
                            }
                            const {name, bio} = newStudent.values;

                            axios.post("http://localhost:3001/students", {
                                id: id,
                                name: name,
                                bio: bio
                            }).then(() => {
                                setCreated(true);
                            }).catch((error) => {
                                console.log(error);
                            });

                            // router.redirect('/students')
                        }}
                    >Confirm</Button>
                </div>
            </div>
        );
    }


    return (
        <div >
            {showConfirm ? confirm() :
                <form onSubmit={newStudent.onSubmit((values) => {
                    setShowConfirm(true);
                    return confirm(values);
                })}>
                    <h1 className="my-4 text-3xl flex justify-center">Create students this here ^^</h1>
                    <div className="my-4">
                        <TextInput
                            label="Name"
                            required
                            error={newStudent.errors.name && "Please enter your name !"}
                            value={newStudent.values.name}
                            onChange={(event) => newStudent.setFieldValue('name', event.currentTarget.value)}
                        />
                    </div>
                    <div className="my-4">
                        <Textarea
                            placeholder="Your Bio"
                            label="Bio"
                            error={newStudent.errors.bio && "Please enter your bio !"}
                            radius="xs"
                            required
                            value={newStudent.values.bio}
                            onChange={(event) => newStudent.setFieldValue('bio', event.currentTarget.value)}
                        />
                    </div>
                    <Button type="submit">Create</Button>
                </form>
            }
        </div >
    );
}