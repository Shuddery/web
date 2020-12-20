import React from 'react';
import Form from './form';
import Table from './table';
import Result from './totalAverage';

class Main extends React.Component {

    Id = 6;

    state = {
        students: [],
        headerItems: ['Name', 'Surname', 'Age', 'Average', 'Delete', 'Edit'],
        iStudent: {},
        edit: false
    }

    onAdd = (object) => {
        this.setState(state => {
            const student = this.createStudent(object);
            return { students: [...state.students, student]}
        });
    }

    onDelete = (id) => {
        this.setState(state => {
            const index = state.students.findIndex(student => student.id === id);
            const students = [
                ...state.students.slice(0, index),
                ...state.students.slice(index + 1)
            ];
            return {students};
        });
    }

    refreshStudent = (object) => {
        this.setState(state => {
        const { id } = object;
        const old = this.state.students.concat();
        const index = old.findIndex(student => student.id === id);
        const students = [
            ...state.students.slice(0, index),
            object,
            ...state.students.slice(index + 1)
        ];
        return { students, edit: false }
        });

        console.log(this.state.students);
    }


    async componentDidMount() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/Shuddery/web/master/newstudents.json');
            const data = await response.json();
            const students = data.map(item => ({
                name: item.first_name,
                surname: item.last_name,
                id: item.id,
                average: +(Math.random() * 10).toFixed(1),
                age: +(item.id * Math.random()*10 +1).toFixed(0)
            }));
            this.setState({ students })
        } catch(error) {
            console.log(error);
        }
    }

    onChange = (id) => {
        const students = this.state.students.concat();
        const iStudent = students.find(student => student.id === id);
        console.log(this.state.students);
        this.setState({
            iStudent,
            edit: true
        })
    }

    createStudent({ name, surname, age, average }) {
        return {
          id: ++this.Id,
          name,
          surname,
          age,
          average
        };
    }


    render() {

        const { headerItems, students, iStudent, edit } = this.state;
        const totalAverage = students.reduce((acc, current) => {
            acc += +current.average;
            return acc;
        }, 0);

        return (
            <div>
                <Form 
                    onAdd={this.onAdd}
                    iStudent={iStudent}
                    refreshStudent={this.refreshStudent}
                    edit={edit}/>

                <Table 
                    headerItems={headerItems} 
                    students={students} 
                    onDelete={this.onDelete}
                    onChange={this.onChange}
                    edit={edit}/>

                <Result 
                    totalAverage={(totalAverage / students.length).toFixed(1)}/>
            </div>
        );
    }
}

export default Main;