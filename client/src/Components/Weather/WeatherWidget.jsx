import { Box, Card, CardMedia, Grid, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";



function WeatherCard({dailyForecast}) {
    const {date, day, iconUrl, maxTemp, minTemp, conditionText} = dailyForecast
    return (
        <Tooltip title={conditionText}>
            <Card  
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#2F0E5A",
                    height: "13em",
                    width:"13em",
                    borderRadius: "10%",
                    mx: 1,
                    alignItems: "center"
                }}
            >
                <Typography variant="h6" sx={{color:"white"}}>{day}</Typography>
                <CardMedia component="img" image={iconUrl} height="100" sx={{width:"100px"}}/>
                <Typography sx={{color:"white"}}>High Temp: {maxTemp} {"\u00B0"}C</Typography>
                <Typography sx={{color:"white"}}>Low Temp: {minTemp} {"\u00B0"}C</Typography>
            </Card>
        </Tooltip>)

}


export default function WeatherWidget() {
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState([]);
    useEffect(()=>{
        fetch("https://api.ipify.org/?format=json", {
            method: "GET",
        })
        .then((response) => response.json())
        .then((responseJSON) => {
            setLocation(responseJSON.ip);
        });
    },[]);
    useEffect(()=>{
        if(location !== "") {
            fetch("http://localhost:3001/weather/"+location,{
            method: "GET",
            })
            .then((response) => response.json())
            .then((responseJSON) => {
                setWeatherData(responseJSON);
            });
        }
    },[location]);
    const todaysWeather = weatherData?.[0];
    const next3Hours = weatherData.filter((item) => !!item?.hour)
    return (
        <Grid container spacing={2} sx={{paddingBottom:2}}>
            <Grid item xs={6}> 
                <Typography sx={{color:"white"}} variant="h5">Today's Forecast:</Typography>
                <Card sx={{
                    backgroundColor: "#2F0E5A",
                    borderRadius: "10px",
                    height: "13em",
                    p:1
                }}>
                    <Grid container>
                        <Tooltip title={todaysWeather?.conditionText}>
                            <Grid item xs={6} sx={{display: "flex", flexDirection: "column", alignItems:"center"}}>
                                <Typography sx={{color:"white"}} variant="h6">{new Date(parseFloat(todaysWeather?.date?.split("-")?.[0]), parseFloat(todaysWeather?.date?.split("-")?.[1])-1, parseFloat(todaysWeather?.date?.split("-")?.[2]), 12, 0, 0, 0).toDateString()}</Typography>
                                <CardMedia component="img" image={todaysWeather?.iconUrl} height="100" sx={{width:"100px"}}/>
                                <Typography sx={{color:"white"}}>High Temp: {todaysWeather?.maxTemp} {"\u00B0"}C</Typography>
                                <Typography sx={{color:"white"}}>Low Temp: {todaysWeather?.minTemp} {"\u00B0"}C</Typography>
                            </Grid>
                        </Tooltip>
                        <Grid item xs={6} sx={{display: "flex", flexDirection: "column", alignItems:"center"}}>
                            <Typography sx={{color:"white", width: "100%", alignSelf: "flex-start"}} variant="h6">Next 3 hours:</Typography>
                            {next3Hours.map((hour)=>(
                                <Tooltip key={hour.hour} title={hour.conditionText} placement="right">
                                <Box  sx={{display:"flex", width:"100%", alignItems:"center"}}>
                                    <Typography sx={{color:"white", flex:1}}><b>{hour.hour}: </b> <br/> Temp: {parseFloat(hour.temp).toFixed(0)}{"\u00B0"}C Rain: {parseFloat(hour.precip_mm).toFixed(0)} mm</Typography>
                                    <CardMedia component="img" image={hour.iconUrl} height="50" sx={{width:"50px"}}/>
                                </Box>
                                </Tooltip>))}
                        </Grid>
                    </Grid>
                    
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h5">Forecast For The Next 2 Days:</Typography>
                <Box sx={{display:"flex", justifyContent:"space-around"}}>
                    {weatherData.filter((i, idx)=> idx >= weatherData.length - 2).filter((item)=>!!item?.day).map((dailyForecast) => (<WeatherCard key={dailyForecast.date} dailyForecast={dailyForecast}/>))}
                </Box>
            </Grid>
        </Grid>
        )
}