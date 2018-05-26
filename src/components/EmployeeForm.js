import React, { Component } from 'react';
import { CardSection, Input } from "./common";
import { connect } from 'react-redux';
import { employeeUpdate } from "../actions";
import { Picker, Text, View } from "react-native";


class EmployeeForm extends Component {



    renderPickerOptions() {
        // const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        return PickerDays.map(day => {
            return <Picker.Item key={day.label} label={day.label} value={day.value} />;
        });
    }

    render() {
        const { name, phone, shift } = this.props;
        return (
            <View>
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
                        selectedValue={shift}
                        onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value})}
                    >
                        {this.renderPickerOptions()}
                    </Picker>
                </CardSection>
            </View>
        );
    }
}

const PickerDays = [
    { label: 'Monday', value: 'Monday'},
    { label: 'Tuesday', value: 'Tuesday'},
    { label: 'Wednesday', value: 'Wednesday'},
    { label: 'Thursday', value: 'Thursday'},
    { label: 'Friday', value: 'Friday'},
    { label: 'Saturday', value: 'Saturday'},
    { label: 'Sunday', value: 'Sunday'}];

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

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);