import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home';
import Students from './pages/Students';
import StudentsForm from './pages/Students/Form';
import StudentsDetail from './pages/Students/Detail';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/alunos" exact component={Students} />
            <Route path="/novoaluno" exact component={StudentsForm} />
            <Route path="/aluno/:id" exact component={StudentsForm} />
            <Route path="/alunos/:id" exact component={StudentsDetail} />
        </Switch>
    );
}

export default Routes;
