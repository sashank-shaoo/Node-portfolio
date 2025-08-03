const map = new mapboxgl.Map({
  container: "map", // container ID
  config: {
    basemap: {
      theme: "monochrome",
      lightPreset: "night",
    },
  },
  center: [86.5135, 20.8122], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 8, // starting zoom
});
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [86.5135, 20.8122],
      },
    },
  ],
};
const el = document.createElement("div");
el.className = "marker";
for (const feature of geojson.features) {
  new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
}
