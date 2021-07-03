import {  Toggle } from "@fluentui/react";
import { Avatar, Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import {makeStyles} from "@material-ui/styles"

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./details.css";

const Deatils = (props) => {
    const history = useHistory();
    const [loading,setLoading] = useState(false)
    const [dataList,setData] = useState([])
    const [status,setStatus] = useState(true)
    const [toggle,setToggle] = useState(true)
    const [status3,setStatus3] = useState(true)

    useEffect (()=> {
      DataApi(toggle);
      return () => {
          setData([]);
      };
    },[loading]);

    const View = (data) => {
      console.log(data);
      history.push('/details',{
        details : {
          data: data
        },
      });
    }

    let ascsort =  ((a,b) => a.amount - b.amount)
     
    let dessort = ((a,b) => b.amount - a.amount)
   
    const BidsData2 = () => {
      setStatus3(!status3)
      setStatus(!status)
      status ? DataApi2(toggle) : DataApi(toggle)
    }
    
    const BidsMinMax = () => {
      setToggle(!toggle)
      status3 ?  DataApi(!toggle) : DataApi2(!toggle)
    }
  
    const DataApi2 = (toggle) => {
      console.log("clicked2");
      setLoading(true);
      try {
          fetch(`https://intense-tor-76305.herokuapp.com/merchants `)
          .then(resp => resp.json())
          .then(resp => {
            resp.map((el) => {
              el.bids=el.bids.sort(ascsort)
              return el;
            })         
            // resp.sort()
         toggle === true ?
            resp.sort(function(a, b){return (!a.bids[0] || !b.bids[0])  ? 0 : b.bids[0].amount - a.bids[0].amount}) : 
            resp.sort(function(a, b){return (!a.bids[0] || !b.bids[0])  ? -1 : a.bids[0].amount - b.bids[0].amount})
            console.log(resp) 
            setData(resp) 
          }
            )
               setLoading(false)
           } 
        catch (error) {
             setLoading(false);
           }
          }
    const DataApi = (toggle) => {
      console.log("clicked"); 
      setLoading(true);
      try {
          fetch(`https://intense-tor-76305.herokuapp.com/merchants `)
          .then(resp => resp.json())
          .then(resp => {
            resp.map((el) => {
              el.bids=el.bids.sort(dessort)
              return el;
            })      
            toggle === true ? 
            resp.sort(function(a, b){return (!a.bids[0] || !b.bids[0])  ? 0 : b.bids[0].amount - a.bids[0].amount}) :
              resp.sort(function(a, b){return (!a.bids[0] || !b.bids[0])  ? -1 : a.bids[0].amount - b.bids[0].amount})
            setData(resp) 
          },          
            )
               setLoading(false)
           } 
        catch (error) {
             setLoading(false);
           }
    }
    const useStyles = makeStyles({
      root: {
        '.grid': {
          fontSize: "20px",
          color: "white"
        },
      },
    });
  
    const classes = useStyles();

    const datacolumns = [
          {
            headerName: "Custonmer Name",
            field: "firstname",
            width: 250,
            key: "firstname",
            headerClassName: 'grid',
            sortable: false,
            headerAlign: 'center',
            fieldName: "firstnamename",
            renderCell: (items) => (
               <div style={{display: "inline-flex",justifycontent: "space-between"}}>
                 <Avatar src={items.row.avatarUrl} alt="Avatar" />
                 <span style={{margin: "0px 5px"}}>{items.row.firstname == null ? "-" : items.row.firstname}</span> 
                 <span>{items.row.lastname == null ? "-" : items.row.lastname}</span>
                
               </div>
               )
          },
          {
            headerName: "Email",
            field: "email",
            width: 200,
            key: "email",
            headerClassName: 'grid',
            headerAlign: 'center',
            sortable: false,
            fieldName: "email",
            renderCell: (items) => (
              <span>{items.row.email == null ? "-" : items.row.email}</span> )
          },
          {
            headerName: "Phone Number",
            field: "phone",
            width: 350,
            type: 'number',
            key: "phone",
            headerClassName: 'grid',
            sortable: false,
            headerAlign: 'center',
            fieldName: "phone",
            renderCell: (items) => (
               <span>{items.row.phone == null ? "-" : items.row.phone}</span>)
          },
          {
            headerName: "Premium",
            sortable: false,
            field: "hasPremium",
            width: 200,
            key: "hasPremium",
            fieldName: "hasPremium",
            headerClassName: 'grid',
            headerAlign: 'center',
            renderCell: (items) => (
              <span>{items.row.hasPremium === true ? "Yes" : "false"}</span> )
          },
          {
            field: 'Bid Amount',
            width: 250,
            type: 'number',
            sortable: false,
            headerClassName: 'grid',
            headerAlign: 'center',
            renderHeader: () => (
              <div style={{display: "inline-flex",    marginTop:"13px"
            }}>
              <span>Bid Amount</span>
              <Toggle style={{margin: "20px 5px"}}  onText="Min" offText="Max"  onChange={() => BidsData2()}/>
              </div>
            ),
            renderCell: (items) => (
              
              <div style={{display: "inline-flex"}}>
                {items.row.bids[0] == null ? 0 :
                <div>{items.row.bids[0].amount}
                </div>
                
               }
              </div>
           
            )
          },
          {
            headerName: "Action",
            field: "action",
            width: 150,
            sortable: false,
            key: "action",
            headerClassName: 'grid',
            headerAlign: 'center',
            renderCell: (items) => (
              <div style={{display: "inline-flex"}}>
                <Button style={{background: "green",color: "rgb(249, 249, 249)",border: "1px solid grey",height: "unset",fontSize: "10px",padding: "5px",borderRadius: "5px",fontWeight: "100"}} type='link' onClick={() => View(items.row)}>
                View Details
              </Button>
              </div>
            )
          },
      ];

    return (
      <div style={{ height: 490, width: '100%' }}>
        <h1 style={{ padding: "60px",background: "rgb(197, 191, 191)",color: "white",fontSize: "30px",textAlign: "center",textTransform: "uppercase"}}>CUSTOMER LISTS</h1>
        <div style={{display: "flex",    marginTop:"13px",marginRight: "4px",justifyContent:"flex-end"}}>   
              <span>Sort Bid AS</span>   
                <Toggle style={{margin: "0px 5px"}}  onText="Asc" offText="Descending" default="Ascending" onChange={() => BidsMinMax()}/>  
                <span>Order</span>   
          </div>
         
                <DataGrid 
                      // items={dataList} 
                      rows={dataList} 
                      columns={datacolumns} 
                      pageSize={7}
                      className={classes.root}
                      pagination {...dataList}      
                  />
                  
      </div>
    )
}

export default Deatils;