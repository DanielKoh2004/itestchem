"use client";

import { useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ease: Easing = [0.33, 1, 0.68, 1];

const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
};

const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease, delay: 0.15 } },
};

const mapCenter = { lat: 1.506, lng: 110.411 };

const markers = [
    { position: { lat: 1.553, lng: 110.359 }, title: "Kuching HQ" },
    { position: { lat: 1.458, lng: 110.463 }, title: "Kota Samarahan Technical Center" },
];

const darkModeStyles: google.maps.MapTypeStyle[] = [
    { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#94a3b8" }],
    },
    {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#0a2e1f" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#1e293b" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#334155" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#1e3a2f" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#064e3b" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6ee7b7" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#1e293b" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#0c1929" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#334155" }],
    },
];

export default function InteractiveMapDirectory() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
    });

    const mapOptions: google.maps.MapOptions = useMemo(
        () => ({
            disableDefaultUI: true,
            zoomControl: true,
            styles: darkModeStyles,
            backgroundColor: "#0f172a",
        }),
        []
    );

    return (
        <div className="relative w-full h-full min-h-[800px] bg-slate-navy">
            {/* Google Map */}
            {isLoaded ? (
                <GoogleMap
                    mapContainerClassName="w-full h-full absolute inset-0"
                    center={mapCenter}
                    zoom={11}
                    options={mapOptions}
                >
                    {markers.map((m) => (
                        <Marker key={m.title} position={m.position} title={m.title} />
                    ))}
                </GoogleMap>
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                            Loading Map...
                        </span>
                    </div>
                </div>
            )}

            {/* Floating Directory Cards */}
            <div className="absolute inset-0 z-10 pointer-events-none p-6 flex flex-col justify-end gap-4">
                {/* Kuching HQ Card */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={slideInLeft}
                    className="pointer-events-auto bg-slate-900/85 backdrop-blur-md text-white border border-slate-700 p-5 max-w-sm shadow-2xl"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-borneo-green flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold">Kuching HQ</h3>
                            <p className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold">
                                Headquarters
                            </p>
                        </div>
                    </div>
                    <address className="not-italic text-xs text-slate-300 leading-relaxed mb-3 border-l-2 border-borneo-green pl-3">
                        1st Floor, Sublot 6<br />
                        Contempo Commercial Centre<br />
                        Mile 8, Kuching-Serian Road<br />
                        93250 Kuching, Sarawak, Malaysia
                    </address>
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Ms. Koh Yew Ping: 013-8183876</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <Mail className="w-3.5 h-3.5 text-emerald-400" />
                            <span>itestchem@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <Clock className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Mon – Fri, 8:00 AM – 5:00 PM</span>
                        </div>
                    </div>
                </motion.div>

                {/* Kota Samarahan Card */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={slideInRight}
                    className="pointer-events-auto bg-slate-900/85 backdrop-blur-md text-white border border-slate-700 p-5 max-w-sm self-end shadow-2xl"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-emerald-700 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold">Kota Samarahan</h3>
                            <p className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold">
                                Technical Center
                            </p>
                        </div>
                    </div>
                    <address className="not-italic text-xs text-slate-300 leading-relaxed mb-3 border-l-2 border-emerald-700 pl-3">
                        Unit 12-14, Block A<br />
                        Samarahan Industrial Park<br />
                        94300 Kota Samarahan<br />
                        Sarawak, Malaysia
                    </address>
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <Clock className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Mon – Fri, 8:00 AM – 5:00 PM</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
