import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate } from "../actions/EmployeeActions";
import { Card, CardSection, Input, Button } from "./common";


class EmployeeCreate extends Component {

    static renderPickerOptions() {
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
                        value={this.props.name}
                        oneChangeText={value => this.props.employeeUpdate({ prop: 'name', value})}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="555-555-5555"
                        value={this.props.value}
                        onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })}
                    />

                </CardSection>

                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={styles.pickerLabelStyle}>Shift</Text>
                    <Picker
                        selectValue={this.props.shift}
                        onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value})}
                    >
                        {EmployeeCreate.renderPickerOptions()}
                    </Picker>
                </CardSection>

                <CardSection>
                    <Button>Create</Button>

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



export default connect(mapStateToProps, { employeeUpdate })(EmployeeCreate);
