import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import './index.css';
import api from '../../../services/api';
import moment from 'moment';

interface IStudent {
    id: number;
    name: string;
    ra: string;
    enrolled: boolean;
    birthdate: Date;
    created_at: Date;
    updated_at: Date;
}

const Detail: React.FC = () => {

    const history = useHistory()
    const { id } = useParams<{ id: string }>()
    const [student, setStudent] = useState<IStudent>()

    function back() {
        history.goBack()
    }

    async function findStudent() {
        const response = await api.get<IStudent>(`/students/${id}`)
        console.log(response)
        setStudent(response.data)
    }

    // Quando o param "id" mudar/receber um novo valor, o useEffect será executado chamando o findStudent
    useEffect(() => {
        findStudent()
    }, [id])

    return (
        <div className="container">
            <br />
            <div className="student-header">
                <h1>Dados do Aluno</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{student?.name}</Card.Title>

                    <Card.Text>
                        <strong>RA: </strong>
                        {student?.ra}
                        <br />
                        {student?.enrolled ? "Matriculado" : "Não matriculado"}
                        <br />
                        <strong>Data de Nascimento: </strong>
                        {moment(student?.birthdate).format('DD/MM/YYYY')}
                        <br />
                    </Card.Text>
                </Card.Body>
            </Card>

        </div>
    );
}

export default Detail;