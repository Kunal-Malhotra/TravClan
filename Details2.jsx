import { DetailsList, SelectionMode } from "@fluentui/react";
import React from "react";

const Details2 = (props) => {
    const previousLocationDetails =
    props.location.state === undefined
      ? null
      : Object.keys(props.location.state.details).length === 0
        ? null
        : props.location.state.details;
    const Table = [
      
        {
          key: "id",
          name: "ID",
          fieldName: "id",
          dataIndex: "id",
          minWidth: 60,
          maxWidth: 80,
        },
        {
          name: "Car Name",
          dataIndex: "carTitle",
          minWidth: 150,
          maxWidth: 200,
          key: "carTitle",
          fieldName: "carTitle",
          onRender: (items) => {
            return <span>{items.carTitle == null ? "-" : items.carTitle}</span>;
          },
        },
        {
          name: "Amount",
          dataIndex: "amount",
          minWidth: 150,
          maxWidth: 200,
          key: "amount",
          fieldName: "amount",
          onRender: (items) => {
            return <span>{items.amount == null ? "-" : items.amount}</span>;
          },
        },
        {
            name: "Date",
            dataIndex: "created",
            minWidth: 150,
            maxWidth: 200,
            key: "created",
            fieldName: "created",
            onRender: (items) => {

              return <span>{items.created == null ? "-" : items.created}</span>;
            },
          },
      ];
  return (
    <div>
      <div style={{display: "flex",justifyContent: "space-evenly",marginTop: "30px"}}>
       <img style={{height: "250px",
                    width: "250px",
                    backgroundColor: "#bbb",
                    borderRadius: "50%",}} src={previousLocationDetails.data.avatarUrl} alt="Avtar2" />
        <div style={{textAlign:"center"}}>
            <h2 style={{textAlign: "center",textTransform: "uppercase"}}>{previousLocationDetails.data.firstname} {previousLocationDetails.data.lastname}</h2>
            <h2 style={{textAlign: "center",textTransform: "uppercase"}}>{previousLocationDetails.data.email}</h2>
            <h2 style={{textAlign: "center",textTransform: "uppercase"}}>{previousLocationDetails.data.phone}</h2>
        </div>
      </div>
      <h2 style={{textAlign: "center",textTransform: "uppercase", color:"black",}}>Bid's List</h2>
      <div style={{ width:"calc(100% - 50px)",display:"flex",justifyContent:"center",height: "300px"}} data-is-scrollable='true' >    
          <DetailsList 
            items={previousLocationDetails.data.bids}
            columns={Table}
            isHeaderVisible={true}
            selectionMode={SelectionMode.none}
          />
      </div>
    </div>
  )
}

export default Details2;