export function genLocation(location) {
    return location.map(item => Object.assign(item, {
        markers: [{
            id: 1,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath: '../../images/marker.png',
            width: 32,
            height: 32
        }]
    }))
}