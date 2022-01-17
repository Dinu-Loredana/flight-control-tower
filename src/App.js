import {useState} from "react";
import 'antd/dist/antd.css';
import {Modal, Table as TableAntd} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {Title} from "./components/UI";
import {eventTypes, statusTypes} from "./helpers";
import AddNewFlightModal from "./components/AddNewFlightModal";
import CheckStatusFlightModal from "./components/CheckStatusFlightModal";
import EditingFlightModal from "./components/EditingFlightModal";



const Table = styled(TableAntd)`
  width: 90%;
  margin: 0 auto
`


const defaultFlightsList = [
    {id: 'F123', model: '123', origin: 'London', destination: 'Paris', event: eventTypes.refuel, timestamp: 1642406037000, fuel: 300, uniqueId:`f123${Math.random().toFixed( 4)}`},
    {id: 'F123', model: '123', origin: 'London', destination: 'Paris', event:eventTypes.takeOff, timestamp: 1642406038000, fuel: 0, uniqueId:`f123${Math.random().toFixed( 4)}`},
    {id: 'F123', model: '123', origin: 'London', destination: 'Paris', event:eventTypes.land, timestamp: 1642406039000, fuel: -80, uniqueId:`f123${Math.random().toFixed( 4)}`},
    {id: 'L100', model: '100', origin: 'Bucharest', destination: 'London', event: eventTypes.refuel, timestamp: 1642406037000, fuel: 100, uniqueId:`l100${Math.random().toFixed( 4)}`},
    {id: 'R200', model: '200', origin: 'Berlin', destination: 'Paris', event: eventTypes.refuel, timestamp: 1642406037000, fuel: 180, uniqueId:`r200${Math.random().toFixed( 4)}`},
]


function App() {

    const [showModal, setShowModal] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editingFlight, setEditingFlight] = useState(null)
    const [flightsList, setFlightsList] = useState(defaultFlightsList)
    const [dateModalVisible, setDateModalVisible] = useState(false)
    const [inputDate, setInputDate] = useState('')
    const [selectedDate, setSelectedDate] = useState(1642406039000)


    const columnsFlights = [
        {
            title: 'Plane ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Plane Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Origin',
            dataIndex: 'origin',
            key: 'origin',
        },
        {
            title: 'Destination',
            dataIndex: 'destination',
            key: 'destination',
        },
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
        },
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            key: 'timestamp',
            render:(_, record) => {
                const options = {year: 'numeric', month: 'short', day: 'numeric',
                                hour: 'numeric', minute: 'numeric', second: 'numeric',};
                return new Intl.DateTimeFormat('en-GB', options).format(record.timestamp)
            }
        },
        {
            title: 'Fuel',
            dataIndex: 'fuel',
            key: 'fuel',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => {
                return (
                <>
                    <EditOutlined onClick={() => onEditFlight(record)}/>
                    <DeleteOutlined onClick={() => onDeleteFlight(record.id)}
                        style={{color: 'red', marginLeft: '1em'}}/>
                </>
                )
            }
        },
    ]


    const columnsStatusFlights = [
        {
            title: 'Plane ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Flight Status',
            dataIndex: 'status',
            key: 'event',
        },
        {
            title: 'Last known fuel level',
            dataIndex: 'fuel',
            key: 'fuel',
        },
]

    const showForm = () => {
        setShowModal(true)
    }


    const hideForm = () => {
        setShowModal(false)
    }

    const onAddFlight = (enteredFlight) => {
        setFlightsList(prevState => [enteredFlight, ...prevState])
        hideForm()
    }

    const onDeleteFlight = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete it?',
            okText: 'Yes',
            okType: 'danger',
            onOk: () => {
                setFlightsList((prevState) => prevState.filter(flight => flight.id !== id)
                );
            }
        })
    }

    const onEditFlight = (record) => {
        setIsEditing(true)
        setEditingFlight({...record})
    }


    const resetEditing = () => {
        setIsEditing(false)
        setEditingFlight(null)
    }


    const getFlightStatusFromEvents  = (events) => {
        const sortedEvents = events.sort((a,b) => b.timestamp - a.timestamp)
        const latestEvent  = sortedEvents[0]


        switch (latestEvent.event) {
            case eventTypes.land:
                return statusTypes.landed
            case eventTypes.takeOff:
                return statusTypes.inFlight
            case eventTypes.refuel:
                return statusTypes.awaitingTakeOff
            default:
                return "n/a"
        }
    }


    const getFuelLevelFromEvents = (events) => {
        return events.reduce((acc, item) => {
            return item.fuel ? acc + item.fuel : acc
        },0)
    }

    const getFilteredResults = () => {
        const filteredFlightListsByDate = flightsList.filter(it => it.timestamp <= selectedDate)
        const eventsByFlightId = filteredFlightListsByDate.reduce((acc, item) => {
                return {
                    ...acc,
                    [item.id]: acc[item.id] ?  [...acc[item.id], item] : [item]
                }
        }, {})


        return Object.values(eventsByFlightId).map(events => {
            return {
                id: events[0].id,
                status: getFlightStatusFromEvents(events),
                fuel: getFuelLevelFromEvents(events)
            }
        })
    }


  return (
      <>
         <Title>Flights Control Tower</Title>
         <AddNewFlightModal showForm={showForm} hideForm={hideForm}
                            showModal={showModal} onAddFlight={onAddFlight}/>
         <Table rowKey="uniqueId" bordered size='middle' title={() => 'Flights Control Tower'}
                 dataSource={flightsList}
                 columns={columnsFlights}/>
         <EditingFlightModal isEditing={isEditing} resetEditing={resetEditing}
                              setFlightsList={setFlightsList}
                              editingFlight={editingFlight} setEditingFlight={setEditingFlight}/>
         <CheckStatusFlightModal setDateModalVisible={setDateModalVisible} dateModalVisible={dateModalVisible}
                                  setSelectedDate={setSelectedDate}
                                  inputDate={inputDate} setInputDate={setInputDate}/>
         <Table rowKey="id" bordered size='middle'
                 dataSource={getFilteredResults()}
                 columns={columnsStatusFlights}
                 title={() => `Flights Status for: ${selectedDate}`}/>

      </>
  );
}




export default App;









