const COUNTS = 11;

    var mymap = [];
    var lat = 40.712;
    var long = -74.013;
    var zoom = 15;
    var lastExpand = 1;
    var btns = Array.from(document.getElementsByClassName('mapBtn'))
  

start(lat,long,zoom);

function start(lat,long,zoom){
    for(i=0;i < COUNTS; i++){      
        init(i+1,lat,long+i*0.004*(20-zoom),zoom);
    }
}

function towhere(lat,long,zoom){

    start(lat,long,zoom);

    }

function towhereDIY(){
   
    var lat =parseFloat(document.getElementById('latDIY').value);
    var long =parseFloat(document.getElementById('lngDIY').value);
    var zoom = 15;
    console.log(lat,long)

    if (lat >= -90 && lat <= 90 && long >=-180 && long <= 180  ){start(lat,long,zoom);}

    else {alert('please type in *earth-friendly* latitude and longitude')}
    

    }

 function init(index,lat,long,z){
    if (mymap[index]!= undefined) {mymap[index].remove();}

    var mapid = 'mapid' + index;
    var mapinfo = 'mapinfo' + index;
    var mapbtn = 'mapbtn' + index;
    
    var array3 = new Array;
        array3.push(lat);
        array3.push(long);


    mymap[index] = L.map(mapid).setView(array3, z);
  
    L.tileLayer('https://api.mapbox.com/styles/v1/jessiehanvana/ckmieyrf52lvm17ozrefsp537/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamVzc2llaGFudmFuYSIsImEiOiJja2hxems4ZzIwc2FrMnhxbG9rOWFveWZlIn0.6vO6JLz3Q1lMesqL2VQ22w', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiamVzc2llaGFudmFuYSIsImEiOiJja2hxems4ZzIwc2FrMnhxbG9rOWFveWZlIn0.6vO6JLz3Q1lMesqL2VQ22w'
      }).addTo(mymap[index]);

      //show current location/zoom level
      zoom = mymap[index].getZoom(); 
      var latlng = mymap[index].getCenter();

      document.getElementById(mapinfo).innerHTML =`[` + latlng.lat.toFixed(3) + `,` + latlng.lng.toFixed(3) + `] <br> level:` + zoom;

      mymap[index].on('click', function(e) {
     
        zoom = mymap[index].getZoom();
        var latlng = mymap[index].getCenter();
        lat = latlng.lat
        long = latlng.lng

        document.getElementById(mapinfo).innerHTML = `[` + latlng.lat.toFixed(3) + `,` + latlng.lng.toFixed(3) + `]<br> level:` + zoom;
        
        //change right
        for(i = index; i < COUNTS;i++){
           
                init(i+1,lat,long+i*0.004*(20-zoom),zoom);
            }

      
        //change left
    //     for(i=index-1;i>1;i--){
           
    //        init(i,lat,long-i*0.02,zoom);
    //    }

    });

 }

 function expandColumn(index){
     var mapid = 'mapid' + index;
     var mapid_last = 'mapid' + lastExpand;

     document.getElementById(mapid).parentNode.classList.toggle("expand");
     document.getElementById(mapid_last).parentNode.classList.toggle("expand");

    //reload the map
     var zoom = mymap[index].getZoom();
     var latlng = mymap[index].getCenter();
     init(index,latlng.lat,latlng.lng,zoom);
     
     mymap[index].invalidateSize();
     mymap[lastExpand].invalidateSize();

     lastExpand = index;

 }
    