import {Button} from "./UI";
import {Modal} from "antd";
import FormFlight from "./FormFlight";



const AddNewFlightModal = (props) => {

    return (
        <>
            <Button auto="true" type="primary" onClick={props.showForm}>Add New flight</Button>
            <Modal visible={props.showModal} footer={null} onCancel={props.hideForm}>
                <FormFlight onSubmit={props.onAddFlight}/>
            </Modal>
        </>

    )
}

export default AddNewFlightModal