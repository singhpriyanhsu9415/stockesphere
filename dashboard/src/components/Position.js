import React,{useState,useEffect} from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
//import { positions } from "../Data/data";


const Positions = () => {
  const [allPositions,setallPositions]=useState([]);

  useEffect(()=>{
        axios.get("http://localhost:3003/allPositions").then((res)=>{
         console.log(res.data);
         setallPositions(res.data);
        })
  },[]);

  // for making vertical graph using chart.js
  const labels = allPositions.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allPositions.map((stock) => stock.price),
        backgroundColor: "rgba(32, 151, 50, 0.69)",
      },
    ],
  };
  
  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table ">
        <table>
          <thead>
            
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </thead>
          <tbody>
            {allPositions.map((stock,index)=>{
              const isProfit=stock.price*stock.qty-stock.avg*stock.qty;
              const profitClass=isProfit>=0?"profit":"loss";
              const daychange=stock.isLoss?"loss":"profit";

              return(
                <tr>
                  <td >{stock.name} </td>
                  <td>{stock.qty} </td>
                  <td>{stock.avg.toFixed(2)} </td>
                  <td>{stock.price.toFixed(2)} </td>
                  <td className={profitClass}>{isProfit.toFixed(2)}</td>
                  <td className={daychange}>{stock.day}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <VerticalGraph data={data}></VerticalGraph>
    </>
  );
};

export default Positions;