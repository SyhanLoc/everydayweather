/* global $ APIKEY c*/
/*global backgroundImg location currentTemp icon*/

//appid=b2ce7b897c33473165e45bfae65201f2


$(function(){
    /*global API*/
            var C = false;
            var apiData;
            
            
            backgroundImg = [
                /*thunderstom*/"https://dsx.weather.com//util/image/w/thunderstormasthma.jpg?v=at&w=1280&h=720&api=7db9fe61-7414-47b5-9871-e17d87b8b6a0",
                /*drizzle rain*/"https://www.eastbaytimes.com/wp-content/uploads/2016/10/sjm-morerain-1017-23.jpg?w=620",
                /*rain*/"https://images.gmanews.tv/webpics/2015/09/640_rainfall_2015_09_14_11_23_49.jpg",
                /*snow storm*/"http://i2.wp.com/www.bikinginmpls.com/wp-content/uploads/2015/11/winter.jpeg?resize=858%2C488",
                /*foggy*/"https://www.theaa.com/~/media/the-aa/article-summaries/driving-advice/fog.jpg?h=400&w=640&hash=685991001A7B12CF60994E0655CA3B7638BF5BBC&la=en",
                /*clear sky*/"https://i0.wp.com/snehaschoice.com/wp-content/uploads/2016/03/clear-sky-on-a-sunny-day-1255-1366x768.jpg",
                "http://allswalls.com/images/cloudy-sky-wallpaper-7.jpg",
                ]
                
            /*
            backgroundImg = [
                  'url("images/thunder-storm.jpg")',
                  'url("images/lightrain.jpg")',
                  'url("images/heavy-rain.jpg")',
                  'url("images/snow.jpg")',
                  'url("images/foggy.jpg")',
                  'url("images/clearsky.jpg")',
                  'url("images/cloudy-sky.jpg")',
                ];
            */
            
            /*this will display the temperature but not from the API, if C is a false which is the defaul, if C is true it will give us the degree in Celsius. It is looking for integer
            */
            function displayTemp (F,C){
                if(C) return Math.round((F-32)*(5/9)) + "&deg; C";
                return Math.round(F) + "&deg; F";
            }
            /*where it's going to display */
            function render (data, C){
                var currentWeather = data.weather[0].description;
                var currentTemp = displayTemp(data.main.temp,C);/*displayTemp is looking for my degree and F, I can feed the information to function displayTemp by putting ()*/
                var icon = data.weather[0].icon;
                
            /*overwrite the html*/    
                $("#currentTemp").html(currentTemp);
                $("#currentWeather").html(currentWeather);
                
                var apiIcon = "https://openweathermap.org/img/w/" + icon + ".png"; /*get icon code and insert onto end of html + .png to get correnct img icon*/
                $("#currentTemp").prepend("<img src =" + apiIcon + ">");
            }
            /* get JSON location from freegeoip, once it's done, run a function, take one argument called location*/
            
            $.getJSON("https://freegeoip.net/json/").done(function(location){
            //     console.log(location); 
                        $("#country").html(location.country_name);
                        $("#city").html(location.city);
                        $("#latitude").html(location.latitude);
                        $("#longitude").html(location.longitude);
                        
    /*concatnate a string to make it a variable. 
    I have to feed them witht he weather. API and then a ? to say there is a data coming. Use imerial because we want farenheit. after api, create a functio with data*/
            $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat='+location.latitude+'&lon='+location.longitude+'&units=imperial&appid=b2ce7b897c33473165e45bfae65201f2', function(data)
            {
                apiData=data;
                // console.log(apiData); it works!
                /*taking 2 things in the render apiData and C*/
                // render(apiData, C);
                /*Toggle button, I want to wait for it to click, when it click i want to run a function, everytime I click this, 
                I want to take C and I want to toggle it from true to false. rerun the function - render(data,C) */
                $("#toggle").click(function(){
                 C = !C
                  render(data,C);
                })
                
                var id = data.weather[0].id,
                    bgIndex,
                    backgroundId =[299,499,599,699,799,800];
                    
                    
                backgroundId.push(id); //console.log(backgroundId);
                bgIndex = backgroundId.sort().indexOf(id);
                
                $('body').css('background-image', 'url(' + backgroundImg[bgIndex] + ')');
                
                
            }) 

            })
    
    
    
    
})

/****************************************code to follow**************************************************************************** */

// $(function(){
  
//     var api="http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=c66ce389498685b7e056d6e9f86891f7"; 
//     var apiKey = 'c66ce389498685b7e056d6e9f86891f7';
//   //var lat;
//   //var long;
//   var cel =false; //default in F therefore cel = false
//   var apiData;
//   var data;
//   var id;

  
  
//   function displayTemp(fTemp, c){
//     if (c) return Math.round((fTemp-32)*(5/9)) + '&deg; C';//if c===true "cel" being passed into fuction "c"
//     return Math.round(fTemp) + '&deg; F'
//   }
  
// function render(data, cel){
//              var currentLocation=data.name;
//               var currentWeather=data.weather[0].description;
//               var currentTemp= displayTemp (data.main.temp,cel);
//               var high=data.main.temp_max;
//               var low= data.main.temp_min;
//               var icon=  data.weather[0].icon
//               var apiData=data;
                              
//               $('#currentTemp').html(currentTemp);
//               $('#currentWeather').html(currentWeather);
                 
//               var iconSrc= "http://openweathermap.org/img/w/" + icon + ".png"; // get icon code and insert onto end of html +.png to get correct img
                
//               $('#currentTemp').prepend('<img src=' + iconSrc + '>') //Prepend to add icon
// }
  
  
//  backgroundImg = [
//           'http://cdn.wallpapersafari.com/38/38/gIQnTC.jpg', 
//           'http://cdn.wallpapersafari.com/45/71/kU3rqZ.jpg',
//           'http://cdn.wallpapersafari.com/42/35/tSNz6n.jpg',
//           'https://i.ytimg.com/vi/RuqVnqNPyC0/maxresdefault.jpg',
//           'https://static.pexels.com/photos/5230/road-fog-foggy-mist.jpg',
//           'http://cdn.wallpapersafari.com/31/12/HdVCQF.jpg',
//           'http://wall-papers.info/images/cloudy-sky-wallpaper/cloudy-sky-wallpaper-2.jpg',
//   ];
  
  
  
//  $.getJSON('https://freegeoip.net/json/') 
//      .done (function(location)
//      {
//          $('#country').html(location.country_name);
//           $('#country_code').html(location.country_code);
//           $('#region').html(location.region_name);
//           $('#region_code').html(location.region_code);
//           $('#city').html(location.city);
//           $('#latitude').html(location.latitude);
//           $('#longitude').html(location.longitude);
//           $('#timezone').html(location.time_zone);
//           $('#ip').html(location.ip);
          
          
   
//          // lat=location.latitude; don't need separate avriables/redundant
//           //long=location.longitude;
    
//           //console.log(lat);
   
//               $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat='+location.latitude+'&lon='+location.longitude+'&units=imperial&appid=9376beae156137001bb4cf7ce56b7e40', 
//               function(data){//--->USE HTTPS^

//                 //console.log(data);//Success!!!

//                 apiData=data;
                
//                 render (apiData,cel);
                
//                 $('#toggle').click(function(){
//                     cel = !cel;
//                     render(data,cel);          
//                 })
               
//                 var  id = data.weather[0].id,
//                     bgIndex,
//                   backgroundId = [299, 499, 599, 699, 799, 800]; // beats if else loops! corisponds to index numbers from api
                
//                   backgroundId.push(id);
//                   bgIndex = backgroundId.sort().indexOf(id);
                    
//               console.log(id);
//                 $('body').css('background-image', 'url(' + backgroundImg[bgIndex] + ')'); //this works with munual input...
                
//               });
   
   
   
//   //alert(location.region_name); // test information

   
//      });
  
          
  
// });