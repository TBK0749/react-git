import { Textarea, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { StudentsContext } from "../context/StudentsContext";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function CreateStudents() {
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

    const { students, setStudents } = useContext(StudentsContext);
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

                            const id = students.length + 1;
                            const name = newStudent.values.name;
                            const bio = newStudent.values.bio;

                            setStudents([...students, { id, name, bio }]);
                            setCreated(true);

                            newStudent.setFieldValue('name', "");
                            newStudent.setFieldValue('bio', "");
                            newStudent.setFieldValue('showConfirm', false);

                            // router.redirect('/students')

                            console.log(students);
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