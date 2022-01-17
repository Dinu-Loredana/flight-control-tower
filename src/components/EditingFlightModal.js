import {DatePicker, InputNumber, Modal, Select} from "antd";
import {eventTypes} from "../helpers";

const { Option } = Select;


const EditingFlightModal = (props) => {

    return (
        <>
            <Modal title="Edit Flight"
                okText="Save"
                visible={props.isEditing}
                onCancel={() => props.resetEditing()}
                onOk={() => {
                    props.setFlightsList((prevList) => {
                        return prevList.map(flight => {
                            if(flight.uniqueId === props.editingFlight.uniqueId) {
                                return props.editingFlight
                            } else {
                                return flight
                            }
                        })
                    })
                    props.resetEditing()
                }}>

                <Select value={props.editingFlight?.event} onChange={(e) => {
                    const eventFormatted = e[0].toUpperCase() + e.slice(1)
                    props.setEditingFlight((prev) => {
                        return {...prev, event: eventFormatted}
                    })
                }}>
                    {Object.entries(eventTypes).map(([key, value]) => {
                        return <Option key={key} value={value}>{value}</Option>
                    })}
                </Select>

                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"  onChange={(e) => {
                    props.setEditingFlight((prev) => {
                        return {...prev, timestamp: e}
                    })
                }}/>

                <InputNumber value={props.editingFlight?.fuel} onChange={(e) => {
                    props.setEditingFlight((prev) => {
                        return {...prev, fuel: e}
                    })
                }}/>
            </Modal>
        </>
    )
}



export default EditingFlightModal