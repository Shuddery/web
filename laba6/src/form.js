import React from 'react';

class FormData extends React.Component {

    state = {
        name: '',
        surname: '',
        age: 0,
        average: 0
    }

    onChangeName = (e) => {
        this.setState({ name: e.target.value })
    }

    onChangeSurname = (e) => {
        this.setState({ surname: e.target.value })
    }

    onChangeAge = (e) => {
        this.setState({ age: e.target.value })
    }

    onChangeAverage = (e) => {
        this.setState({ average: e.target.value })
    }

    submitH = (e) => {
        e.preventDefault();
        const { name, surname, age, average } = this.state;
        if (name.length < 3 && surname.length < 3) {
            return;
        }
        this.setState({
            name: '',
            surname: '',
            age: 0,
            average: 0
        })
        const itemAdded = this.props.onAdd || (() => {});
        itemAdded({
            name,
            surname,
            age,
            average
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.iStudent !== prevProps.iStudent) {
            const { name, surname, age, average } = this.props.iStudent;
    
            this.setState({
                name, 
                surname,
                age,
                average
            })
        }
    }

    changeStudent = () => {
        const { name, surname, age, average } = this.state;
        const { id } = this.props.iStudent;
        const itemAdded = this.props.refreshStudent || (() => {});
        itemAdded({
            name,
            surname,
            age,
            average,
            id
        });

        this.setState({
            name: '',
            surname: '',
            age: 0,
            average: 0
        })
    }

    render() {

        return (
            <form id="form" onSubmit={this.submitH}>
            <label htmlFor="name">
                Введите Имя
                <input type="text" id="name" name="name" onChange={this.onChangeName} value={this.state.name}/>
            </label>
            <br />
            <label htmlFor="surname">
                Введите Фамилию
                <input type="text" id="surname" name="surname" onChange={this.onChangeSurname} value={this.state.surname}/>
            </label>
            <br />
            <label htmlFor="age">
                Введите Возраст
                <input type="text" id="age" name="age" onChange={this.onChangeAge} value={this.state.age}/>
            </label>
            <br />
            <label htmlFor="average">
                Введите Средний Балл
                <input type="text" id="average" name="average" onChange={this.onChangeAverage} value={this.state.average}/>
            </label>
            <br />
            <button type="submit" disabled={this.props.edit ? true : false}>Добавить студента</button>
            <button type="button" disabled={this.props.edit ? false : true} onClick={this.changeStudent}>Закончить редактирование</button>
        </form>
        );
    }
};

export default FormData;