import React, { useState, useEffect } from "react";
import axios from 'axios';
import { VerticalGraph } from "./VerticalGraph";

//  import { holdings } from "../Data/data";

const Holdings = () => {
   const [allHoldings,setallHoldings]=useState([]);

   useEffect(()=>{
         axios.get("http://localhost:3003/allHoldings").then((res)=>{
          console.log(res.data);
          setallHoldings(res.data);
         })
   },[]);


   const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 133, 0.81)",
      },
    ],
  };

  return (
    <>
      <div className="order-table">
        <h3>Holdings({allHoldings.length})</h3>
      <table >
         <thead>
          
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          
          </thead>
        
          <tbody>
          {allHoldings.map((stock,index)=>{
             const curValue = stock.price * stock.qty;
             const isProfit = curValue - stock.avg * stock.qty >= 0.0;
             const profitClass = isProfit ? "profit" : "loss";
             const dayClass = stock.isLoss ? "loss" : "profit";

             return( 
            <tr key={index}>
              <td>{stock.name}</td>
              <td>{stock.qty}</td>
              <td>{stock.avg.toFixed(2)}</td>
              <td>{stock.price.toFixed(2)}</td>
              <td>{curValue.toFixed(2)}</td>
              <td className={profitClass}>{(curValue - stock.avg * stock.qty).toFixed(2)}</td>
              
              <td className={profitClass}>{stock.net}</td>
              <td className={dayClass}>{stock.day} </td>
             </tr>
             );
          })}
          </tbody>
          
        </table>
        </div>
      <div className="row">
        <div className="col">
          <h5>
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data}></VerticalGraph>
    </>
  );
};

export default Holdings;