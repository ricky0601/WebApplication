// 카카오맵 api
let container = $('#map')[0];
let options = {
    center: new kakao.maps.LatLng(37.340356, 126.691024),
    level: 4
};

let map = new kakao.maps.Map(container, options);

let marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(37.3457042, 126.6875516)
});
let marker2 = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(37.336014, 126.690949)
});
let marker3 = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(37.343707, 126.695507)
});
let marker4 = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(37.340562, 126.688153)
});