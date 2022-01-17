import {Button} from "./UI";
import {DatePicker, Modal} from "antd";


const CheckStatusFlightModal = (props) => {

    return (
        <>
            <Button auto="true" type="primary" onClick={() => props.setDateModalVisible(true)}>Check Status Flight</Button>
            <Modal title="Select date"
                visible={props.dateModalVisible}
                onCancel={() => props.setDateModalVisible(false)}
                onOk={() => {
                    props.setSelectedDate(props.inputDate)
                    props.setDateModalVisible(false)
                }}
            >
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"  value={props.inputDate} onChange={(e) => props.setInputDate(e)} />
            </Modal>
        </>
    )
}


export default CheckStatusFlightModal