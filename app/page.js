"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";

export const iconPerson = new L.Icon({
    iconUrl: require("../public/marker2.png").default.src,
    iconRetinaUrl: require("../public/marker2.png").default.src,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(55, 55),
    className: "leaflet-div-icon transparent",
});

function DraggableMarkerMabda(props) {
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [draggable, setDraggable] = useState(props.mabda);

    useEffect(() => {
        const successCallback = (position) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
        };

        const errorCallback = (error) => {
            console.log(error);
        };

        navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback
        );
    }, []);

    const markerRef = useRef(null);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    console.log(markerRef.current._latlng);
                }
            },
        }),
        []
    );

    if (!lat && !lng) return <h1>Loading...</h1>;

    return (
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={[lat, lng]}
            ref={markerRef}
            icon={iconPerson}
        ></Marker>
    );
}

function DraggableMarkerMaghsad() {
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();

    useEffect(() => {
        const successCallback = (position) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
        };

        const errorCallback = (error) => {
            console.log(error);
        };

        navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback
        );
    }, []);

    const markerRef = useRef(null);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    console.log(markerRef.current._latlng);
                }
            },
        }),
        []
    );

    if (!lat && !lng) return <h1>Loading...</h1>;

    return (
        <Marker
            draggable={true}
            eventHandlers={eventHandlers}
            position={[lat, lng]}
            ref={markerRef}
            icon={iconPerson}
        ></Marker>
    );
}

export default function Home() {
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [mabda, setMabda] = useState(true);
    const [maghsad, setMaghsad] = useState(false);

    useEffect(() => {
        const successCallback = (position) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
        };

        const errorCallback = (error) => {
            console.log(error);
        };

        navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback
        );
    }, []);

    const acceptTheMabda = () => {
        setMabda(false);
        setMaghsad(true);
    };

    if (!lat && !lng) return <h1>Loading...</h1>;

    return (
        <>
            <main
                style={{
                    width: "80%",
                    height: "80vh",
                    margin: "20px",
                    border: "2px solid white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <MapContainer
                    center={[lat, lng]}
                    zoom={18}
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <DraggableMarkerMabda mabda={mabda} />
                    {maghsad && <DraggableMarkerMaghsad />}
                </MapContainer>
            </main>
            <button
                style={{ padding: "1rem 1rem", cursor: "pointer" }}
                onClick={acceptTheMabda}
            >
                Mabda
            </button>
        </>
    );
}
