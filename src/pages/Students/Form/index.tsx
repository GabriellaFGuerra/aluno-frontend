import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import './index.css';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

interface IStudent {
    name: string;
    ra: string;
    birthdate: Date;
    enrolled: boolean;
    address: string;
    age: number;
}

const Students: React.FC = () => {

    const history = useHistory()
    const { id } = useParams<{ id: string }>()

    const [model, setModel] = useState<IStudent>({
        name: '',
        ra: '',
        address: '',
        age: 0,
        enrolled: true,
        birthdate: new Date(),
    })

    useEffect(() => {
        console.log(id)
        if (id != undefined) {
            findStudent(id)
        }
    }, [id])

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id != undefined) {
            const response = await api.put(`/students/${id}`, model)
        }
        else {
            const response = await api.post('/students', model)
        }
        back()
    }

    function back() {
        history.goBack()
    }

    async function findStudent(id: string) {
        const response = await api.get(`students/${id}`)
        console.log(response)
        setModel({
            name: response.data.name,
            ra: response.data.ra,
            birthdate: response.data.birthdate,
            address: response.data.address,
            age: response.data.age,
            enrolled: response.data.enrolled
        })
    }

    return (

        <div className="container">
            <br />
            <div className="task-header">
                <h1>Novo Aluno</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nome completo</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={model.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>RA</Form.Label>
                        <Form.Control
                            type="text"
                            name="ra"
                            value={model.ra}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthdate"
                            value={moment(model.birthdate).format('YYYY-MM-DD')}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                    </Form.Group>

                    <Button variant="dark" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Students;