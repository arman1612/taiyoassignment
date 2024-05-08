import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import axios from 'axios'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Chart from 'chart.js/auto';
import "leaflet/dist/leaflet.css"
import Heading  from "./Heading";
import Sidebar from "./Sidebar";

interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
  };
  active: number;
  recovered: number;
  deaths: number;
}


const fetchChartData = async () => {
  return await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
};

const ChartsAndMaps = () => {
  const [chartData, setChartData] = useState({});
  const [countryData, setCountryData] = useState([]);


const fetchCountryData = async () => {
    const res = await axios.get('https://disease.sh/v3/covid-19/countries');
    const data = res.data;
  
    const countryData = data.map((country:CountryData) => ({
      name: country.country,
      lat: country.countryInfo.lat,
      long: country.countryInfo.long,
      active: country.active,
      recovered: country.recovered,
      deaths: country.deaths,
    }));
  
    setCountryData(countryData);
  };

useEffect(()=>{
  fetchChartData().then((res)=>setChartData({
    labels:Object.keys(res.data.cases),
    datasets:[
      {
        label:"COVID-19 Cases",
        data:Object.values(res.data.cases),
        backgroundColor:"red",
      }
    ]
  }))
  fetchCountryData()
},[])


useEffect(() => {
  const chartConfig:any = {
    type: 'line',
    data: chartData,
  };

  const chartElement:any = document.getElementById('myChart');
  if (chartElement) {
    const myChart = new Chart(chartElement, chartConfig);
    
    return () => {
      myChart.destroy();
    };
  }
}, [chartData]);

  return (
    <div >
        <Heading title="Charts and Maps"/>
        <div id="charts_page_div" className='flex'>
             <Sidebar />

            <Box padding={"30px"}   w={"79%"} boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} border={"1px solid gray"}>
            <h2 className='text-2xl	mb-4 font-bold flex items-center justify-center'>COVID-19 Dashboard</h2>
             <Box >
                {window.innerWidth>900?<canvas id="myChart" width="800" height="300"></canvas>:<canvas id="myChart" width="400" height="300"></canvas>}
             </Box>
             <br />
             <br />
             <Box>
                <MapContainer center={[0, 0]} zoom={2} className='h-[70vh] w-[100%]' >
                <TileLayer
                    attribution="Google Maps"
                    url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                    />
                   {countryData.map((country:any) => (
                       <Marker key={country.name} position={[country.lat, country.long]}>
                          <Popup>
                            <h4>Name: {country.name}</h4>
                            <p>Active Cases: {country.active}</p>
                            <p>Recovered Cases: {country.recovered}</p>
                            <p>Deaths: {country.deaths}</p>
                          </Popup>
                        </Marker>
                    ))}
                </MapContainer>
             </Box> 
            </Box> 

       </div>
    </div>
    
  )
}

export default ChartsAndMaps

