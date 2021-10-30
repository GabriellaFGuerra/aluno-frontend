import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import moment from 'moment';
import './index.css';

interface IStudent {
    id: number;
    name: string;
    ra: string;
    birthdate: Date;
    enrolled: boolean;
    created_at: Date;
    updated_at: Date;
}

const Students: React.FC = () => {

    const [students, setStudents] = useState<IStudent[]>([])
    const history = useHistory()

    useEffect(() => {
        loadStudents()
    }, [])

    async function loadStudents() {
        const response = await api.get('/students')
        console.log(response);
        setStudents(response.data)
    }

    function formatDate(date: Date) {
        return moment(date).format('DD/MM/YYYY')
    }

    function newStudent() {
        history.push('/novoaluno')
    }

    function editStudent(id: number) {
        history.push(`/aluno/${id}`)
    }

    function viewStudent(id: number) {
        history.push(`/alunos/${id}`)
    }

    async function notEnrolledStudent(id: number) {
        await api.patch(`/students/${id}`)
        loadStudents()
    }

    async function deleteStudent(id: number) {
        await api.delete(`/students/${id}`)
        loadStudents()
    }

    return (

        <div className="container">
            <br />
            <div className="student-header">
                <h1>Alunos</h1>
                <Button variant="dark" size="sm" onClick={newStudent}>Cadastrar Aluno</Button>
            </div>
            <br />
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>RA</th>
                        <th>Nome</th>
                        <th>Data de Nascimento</th>
                        <th>Data de Atualização</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map(student => (
                            <tr key={student.id}>
                                <td>{student.ra}</td>
                                <td>{student.name}</td>
                                <td>{formatDate(student.birthdate)}</td>
                                <td>{formatDate(student.updated_at)}</td>
                                <td>{student.enrolled ? "Matriculado" : "Não matriculado"}</td>
                                <td>
                                    <Button size="sm" variant="primary" onClick={() => editStudent(student.id)}>Editar</Button>{' '}
                                    <Button size="sm" variant="success" disabled={student.enrolled == false} onClick={() => notEnrolledStudent(student.id)}>Encerrar matrícula</Button>{' '}
                                    <Button size="sm" variant="warning" onClick={() => viewStudent(student.id)}>Visualizar</Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => deleteStudent(student.id)}>Remover</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Students;