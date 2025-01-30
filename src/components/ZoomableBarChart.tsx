import { useState, useEffect, useRef } from "react";
import { ResponsiveBar } from "@nivo/bar";

const ZoomableBarChart = () => {
    const [zoomLevel, setZoomLevel] = useState(1);
    const [showLabels, setShowLabels] = useState(false);
    const chartContainerRef = useRef<HTMLDivElement>(null);

    // Sample dataset with MORE data
    const data = [
        { label: "January", value: 130 },
        { label: "February", value: 90 },
        { label: "March", value: 150 },
        { label: "April", value: 200 },
        { label: "May", value: 80 },
        { label: "June", value: 170 },
        { label: "July", value: 140 },
        { label: "August", value: 120 },
        { label: "September", value: 180 },
        { label: "October", value: 160 },
        { label: "November", value: 110 },
        { label: "December", value: 190 },
        { label: "Extra 1", value: 175 },
        { label: "Extra 2", value: 145 },
        { label: "Extra 3", value: 130 },
        { label: "Extra 4", value: 200 },
        { label: "Extra 5", value: 95 },
        { label: "Extra 6", value: 115 },
        { label: "Extra 7", value: 155 },
        { label: "Extra 8", value: 125 },
        { label: "Extra 9", value: 135 },
        { label: "Extra 10", value: 185 },
        { label: "Extra 11", value: 190 },
        { label: "Extra 12", value: 170 },
        { label: "Extra 13", value: 180 },
        { label: "Extra 14", value: 160 },
        { label: "Extra 15", value: 140 },
        { label: "Extra 16", value: 130 },
        { label: "Extra 17", value: 120 },
        { label: "Extra 18", value: 110 },
        { label: "Extra 19", value: 100 },
        { label: "Extra 20", value: 90 },
    ];

    // Increase zoom levels (up to 15x now)
    const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev * 1.5, 15));
    const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev / 1.5, 0.5));

    // Dynamically set chart width based on data length
    const chartWidth = Math.max(1000, 80 * data.length * zoomLevel); // Scale width based on number of bars

    // Check if the chart width is greater than the screen width
    useEffect(() => {
        if (chartContainerRef.current) {
            const containerWidth = chartContainerRef.current.clientWidth;
            setShowLabels(chartWidth > containerWidth);
        }
    }, [chartWidth]);

    return (
        <div style={{ width: "100%", textAlign: "center" }}>
            {/* Zoom Buttons */}
            <div style={{ marginBottom: "10px" }}>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut} style={{ marginLeft: "10px" }}>Zoom Out</button>
            </div>

            {/* Scrollable container that expands beyond screen width */}
            <div
                ref={chartContainerRef}
                style={{
                    overflowX: "auto",
                    width: "100%",
                    border: "1px solid #ddd",
                    padding: "10px",
                    whiteSpace: "nowrap",
                }}
            >
                <div style={{ width: chartWidth, height: "400px" }}>
                    <ResponsiveBar
                        data={data}
                        keys={["value"]}
                        indexBy="label"
                        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                        padding={Math.max(0.08 / zoomLevel, 0.02)} // Adjust bar thickness dynamically
                        layout="vertical"
                        enableGridX={false}
                        enableGridY={true}
                        colors={{ scheme: "nivo" }}
                        axisBottom={{
                            tickRotation: zoomLevel > 3 ? 45 : 0, // Rotate labels when zoomed in
                            tickSize: showLabels ? 5 : 0, // Hide ticks if labels are off
                            tickPadding: showLabels ? 5 : 0, // Hide padding if labels are off
                            format: showLabels ? undefined : () => "", // Hide labels when not zoomed in
                        }}
                        axisLeft={{
                            legend: "Value",
                            legendPosition: "middle",
                            legendOffset: -40,
                        }}
                        labelSkipWidth={showLabels ? 0 : 100} // Hide labels when zoomed out
                        labelSkipHeight={showLabels ? 0 : 100}
                        animate={true}
                       motionConfig={{ damping: 15 }}
                        
                        /* TOOLTIP: Shows label + value when hovering */
                        tooltip={({  value, label }) => (
                            <div
                                style={{
                                    background: "white",
                                    padding: "5px 10px",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
                                    fontSize: "14px",
                                    color: "#333",
                                    fontWeight: "bold"
                                }}
                            >
                                {label}: {value}
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default ZoomableBarChart;
