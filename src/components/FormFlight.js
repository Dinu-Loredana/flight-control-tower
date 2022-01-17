import {useState} from "react";
import {DatePicker, Form as FormAntd, Input, InputNumber, Select} from "antd";
import styled from "styled-components";
import {Button, Title} from "./UI";
import {eventTypes} from "../helpers";


const { Option } = Select;


const Form = styled(FormAntd)`
  padding: 1em;
`



const FormFlight = (props) => {

    const [form] = Form.useForm();
    const [flight, setFlight] = useState({
        id: "",
        model: "",
        origin: "",
        destination: "",
        event: "",
        timestamp: {date:"", time: ""},
        fuel: ""
    })

    const [errorForm, setErrorForm] = useState(false)

    const handleChange = (e) => {
        const value = e?.target?.value || e
        setFlight({
            ...flight,
            [e?.target?.name]: value
        });
    }


    const submitForm = (newFlight) => {
        const {timestamp} = newFlight
        const flightVal = Object.values(newFlight)
        const uniqueId = `${newFlight.id}${Math.random().toFixed(4)}`

        for(let i = 0; i < flightVal.length; i++) {
            if (typeof flightVal[i] === 'undefined') {
               setErrorForm(true)
               return
            }
        }

         props.onSubmit({
             id: newFlight.id[0].toUpperCase() + newFlight.id.slice(1),
             model: newFlight.model,
             origin: newFlight.origin[0].toUpperCase() + newFlight.origin.slice(1),
             destination: newFlight.destination[0].toUpperCase() + newFlight.destination.slice(1),
             event: newFlight.event[0].toUpperCase() + newFlight.event.slice(1),
             timestamp,
             fuel: newFlight.fuel,
             uniqueId
         })
            form.resetFields();
            setErrorForm(false)
    }

    return (
        <>
            <Title>add your flight</Title>
            <Form layout="horizontal" size="small" form={form} onFinish={submitForm}>
                <Form.Item label="Plane ID" name="id">
                    <Input value={flight.id} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Plane Model" name="model">
                    <InputNumber value={flight.model} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Origin" name="origin">
                    <Input value={flight.origin} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Destination" name="destination">
                    <Input value={flight.destination} onChange={handleChange}/>
                </Form.Item>
                <Form.Item label="Event Type" name="event">
                    <Select onChange={handleChange}>
                        {Object.entries(eventTypes).map(([key, value]) => {
                            return <Option key={key} value={value}>{value}</Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Timestamp" name="timestamp">
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" value={flight.timestamp} onChange={handleChange}/>
                </Form.Item>
                <Form.Item label="Fuel Delta" name="fuel">
                    <InputNumber value={flight.fuel} onChange={handleChange} />
                </Form.Item>

                {errorForm && <p style={{color: 'red'}}>Please complete all of the fields!</p>}

                <Button type="primary" htmlType="submit">Add</Button>
            </Form>
        </>
    )
}
export default FormFlight



