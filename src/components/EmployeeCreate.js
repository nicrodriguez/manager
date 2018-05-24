import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from "../actions";
import { Card, CardSection, Input, Button } from "./common";


class EmployeeCreate extends Component {

    onButtonPress() {
        const { name, phone, shift } = this.props;
        this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
    }

    renderPickerOptions() {
        const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        return weekDays.map(day => {
            return <Picker.Item key={day} label={day} value={day} />;
        });
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Jane"
                        oneChangeText={value => this.props.employeeUpdate({ prop: 'name', value})}
                        value={this.props.name}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="555-555-5555"
                        onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })}
                        value={this.props.value}
                    />

                </CardSection>

                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={styles.pickerLabelStyle}>Shift</Text>
                    <Picker
                        onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value})}
                        selectValue={this.props.shift}
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
