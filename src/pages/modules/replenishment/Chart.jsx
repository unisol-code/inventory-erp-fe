import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const Chart = () => {
  const data = [
    {
      name: "2019",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "2020",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "2021",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "2022",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "2023",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "2024",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "2025",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <div>
      <LineChart width={600} height={200} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default Chart;
