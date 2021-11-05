import { Textarea, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function CreateStudents() {
    const [students, setStudents] = useState([])

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
            showConfirm: false,
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
                            newStudent.setFieldValue('showConfirm', false);
                        }}
                    >Back</Button>
                    <Button
                        onClick={() => {
                            // 1. ให้ default id เป็น 1
                            let id = 1;

                            // 2. ถ้า students array มีอย่างน้อย 1 element
                            if (students.length !== 0) {
                                // 3. ให้เซ็ต id เป็น id ของตัวสุดท้ายใน array
                                id = students[students.length - 1].id + 1;
                            }

                            const name = newStudent.values.name;
                            const bio = newStudent.values.bio;

                            setStudents([...students, { id, name, bio }]);
                            setCreated(true);

                            newStudent.setFieldValue('name', "");
                            newStudent.setFieldValue('bio', "");
                            newStudent.setFieldValue('showConfirm', false);

                            // router.redirect('/students')

                            console.log(id);
                        }}
                    >Confirm</Button>
                </div>
            </div>
        );
    }


    return (
        <div >
            {newStudent.values.showConfirm ? confirm() :
                <form onSubmit={newStudent.onSubmit((values) => {
                    newStudent.setFieldValue('showConfirm', true);
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