import "babel-polyfill";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {addOffset, addTilelayer, getAddress, validateIp} from "./helpers";
import icon from "../images/icon-location.svg"

const   ipInput = document.querySelector(".search-bar__input"),
        btn = document.querySelector("button");

const   ipInfo = document.querySelector("#ip"),
        locationInfo = document.querySelector("#location"),
        timezoneInfo = document.querySelector("#timezone"),
        ispInfo = document.querySelector("#isp");
        
btn.addEventListener("click", getData);
ipInput.addEventListener('keydown', handleKey);

const   mapArea = document.querySelector(".map"),
        map = L.map(mapArea, {
            center: [51.505, -0.09],
            zoom: 13,
            zoomControl: false,
        }),
        markerIcon = L.icon({
            iconUrl: icon,
            iconSize: [30, 40],
            
            
        });

addTilelayer(map);

L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);

function getData() {
    if (validateIp(ipInput.value)) {
        getAddress(ipInput.value)
        .then(data => setInfo(data))
    }
}

function handleKey(e) {
    if (e.key === "Enter") {
        getData();
    }
}

function setInfo(mapData) {
    console.log(mapData)
    const {lat, lng, country, region, timezone} = mapData.location;

    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = country + ' ' + region;
    timezoneInfo.innerText = timezone;
    ispInfo.innerText = mapData.isp;

    map.setView([lat, lng]);
    L.marker([lat, lng], {icon: markerIcon}).addTo(map);

    if (matchMedia("(max-width: 1023px)").matches) {
        addOffset(map);
    } 
}

document.addEventListener("DOMContentLoaded", () => {
    getAddress('102.22.22.11').then(setInfo)
});