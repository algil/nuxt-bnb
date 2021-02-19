export default function (context, inject) {
  inject('maps', {
    showMap,
  })

  let mapLoaded = false
  let mapInfo = null

  addScript()

  function addScript() {
    const script = document.createElement('script')
    const mapsApi = context.$config.googleMapsApiKey
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApi}&libraries=places&callback=initMap`
    script.async = true
    window.initMap = initMap
    document.head.appendChild(script)
  }

  function initMap() {
    mapLoaded = true

    if (mapInfo) {
      renderMap(mapInfo)
      mapInfo = null
    }
  }

  function showMap(canvas, ltd, lng) {
    mapInfo = { canvas, ltd, lng }
    if (mapLoaded) {
      renderMap(mapInfo)
      mapInfo = null
    }
  }

  function renderMap({ canvas, ltd, lng }) {
    const position = new window.google.maps.LatLng(ltd, lng)
    const mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUI: true,
      zoomControl: true,
    }
    const map = new window.google.maps.Map(canvas, mapOptions)
    const marker = new window.google.maps.Marker({ position })
    marker.setMap(map)
  }
}
