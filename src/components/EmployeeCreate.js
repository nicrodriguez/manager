import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from "../actions";
import { Card, CardSection, Input, Button } from "./common";

const PickerDays = [
    { label: 'Monday', value: 'Monday'},
    { label: 'Tuesday', value: 'Tuesday'},
    { label: 'Wednesday', value: 'Wednesday'},
    { label: 'Thursday', value: 'Thursday'},
    { label: 'Friday', value: 'Friday'},
    { label: 'Saturday', value: 'Saturday'},
    { label: 'Sunday', value: 'Sunday'}];

class EmployeeCreate extends Component {

    componentWillMount() {
        this.props.employeeUpdate({ prop: 'shift', value: PickerDays[0].value });
    }

    onButtonPress() {
        const { name, phone, shift } = this.props;
        this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
    }

    renderPickerOptions() {
       // const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        return PickerDays.map(day => {
            return <Picker.Item key={day.label} label={day.label} value={day.value} />;
        });
    }

    render() {

        const { name, phone } = this.props;
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Jane"
                        value={name}
                        onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="555-555-5555"
                        onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })}
                        value={phone}
                    />

                </CardSection>

                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={styles.pickerLabelStyle}>Shift</Text>
                    <Picker
                        selectedValue={this.props.shift}
                        onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value})}

                    >
                        {this.renderPickerOptions()}
                    </Picker>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>

                </CardSection>

            </Card>
        );

    }
}

const styles = {
    pickerLabelStyle: {
        fontSize: 18,
        paddingLeft: 20
    }
};

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
};



export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(EmployeeCreate);
