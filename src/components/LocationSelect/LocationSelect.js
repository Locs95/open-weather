import React,{ Component } from 'react';
import CitiesWeather from '../CitiesWeather/CitiesWeather';
import axios from 'axios';

import './LocationSelect.scss';

class LocationSelect extends Component {

    constructor(props) {
    	super(props);
    	this.state = {
    		countries: [],
        // countries2: [],
    		cities: [],
    		citiesShow: false,
    		preloader: false,
        preloaderWeather: false,
    		weather: [],
    		mainInfo: [],
    		weatherShow: false,
        failSearch: false
    	}
    	this.selectCountry = this.selectCountry.bind(this);
    	this.selectCity = this.selectCity.bind(this);
    	this.renderWeather = this.renderWeather.bind(this);
    }

    componentWillMount() {
      // axios.get('https://api.hh.ru/areas/113')
      //       .then(response => {
      //            console.log(response.data.areas);
      //            this.setState({
      //               countries2: this.state.countries2.concat(response.data.areas)
      //            });
      //            this.state.countries2.map(item => {
      //               console.log('AREA',item.name);
      //               item.areas.map(city => {
      //                   console.log(city.name);
      //               });
      //            });
      //       });
    	axios.get('http://api.geonames.org/countryInfoJSON?username=locs95')
    	      .then(response => {
    	      	  // console.log('Country Info',response.data.geonames);
    	      	  this.setState({
    	      	  	 countries: response.data.geonames
    	      	  });
    	      });
    }

    selectCountry(e) {

    	console.log(e.target.value);
    	this.setState({
    		citiesShow: false,
    		preloader: true,
        weatherShow: false,
        failSearch: false
    	});

        // axios.get(`${e.target.value}`)
        //          .then(response => {
        //               console.log('CITIES', response.data.areas);
        //          });

        axios.get(`http://api.geonames.org/searchJSON?username=locs95&country=${e.target.value.toLowerCase()}&maxRows=1000&style=SHORT`)
    	          .then(response => {
                  	  console.log(response.data.geonames);
                  	  this.setState({
                  	  	 cities: response.data.geonames,
                  	  	 citiesShow: true,
                  	  	 preloader: false
                  	  });

                  });

    }

    selectCity(e) {
    	console.log('City - ',e.target.value);
        this.setState({
           preloaderWeather: true,
           weatherShow: false,
           failSearch: false
        });
    		axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${e.target.value.toLowerCase()}&APPID=20858166f54a29b6bd89545dd59831f3`)
    	 		.then(response => {
    	 			this.setState({
    	 				mainInfo: []
    	 			});
    	 		    this.setState({
    	 		    	weather: response.data.weather,
    	 		    	mainInfo: this.state.mainInfo.concat(response.data.main),
    	 		    	weatherShow: true,
                preloaderWeather: false
    	 		    });
    	 		    console.log('WEATHER',this.state.weather);
    	 		    console.log('MAIN INFO',this.state.mainInfo);
    	 		}).catch(error => {
    	 			console.log('NOT FOUND', error);
    	 			this.setState({
    	 				 weatherShow: false,
               preloaderWeather: false,
               failSearch: true
    	 			});
    	 		});



    }

    eachCountry(country, i) {

    	return (
    		<option
    			key={i}
    			index={i}
          value={country.countryCode}
          >
    			{ country.countryName }
    		</option>
    	)
    }

    eachCity(city, i) {
    	return (
    	   <option
    	   	  key={i}
    	   	  index={i}
    	   	  value={city.name+','+city.countryCode}
    	   >
    	   {city.name}
    	   </option>
    	)
    }

    renderCities() {

    	return (
    	   <select name="" id="" onChange={this.selectCity}>
    	   	 {
    	   	 	this.state.cities.map(this.eachCity)
    	   	 }
    	   </select>
    	)
    }

    eachWeather(item, i) {
    	return (
    	  <CitiesWeather
    	      key={item.id}
    		    weatherId={item.id}
    		/>
    	)
    }

    renderWeather() {
        return (
          this.state.weatherData.weather.map(this.eachWeather)
        )

    }


	render() {
		return (
			<div className="location-select">
				<h1>Location Select</h1>
				<div className="location-select__inner">
				   <div>
						<select name="" id="" onChange={this.selectCountry}>
						 <option disabled defaultValue>Select Country</option>
						 {
						 	this.state.countries.map(this.eachCountry)
						 }
						</select>
					</div>
					<div>
					  {
					  	 (this.state.citiesShow)
					  	 ? (this.renderCities())
					  	 : (this.state.preloader) ? <img className="location-select__preloader" src="./img/preloader.gif" /> : <span></span>
					  }
					</div>
				</div>
				<div className="location-select__cities-weather">
					{
						(this.state.weatherShow)
						? <CitiesWeather
							 weather={this.state.weather}
							 mainInfo={this.state.mainInfo}
						  />
						: (this.state.preloaderWeather) ? <img className="location-select__preloader" src="./img/preloader.gif" /> :
                                              (this.state.failSearch) ? <div className="location-select__notfound">No weather found for this city!</div> : <span></span>
					}
				</div>
			</div>
		)
	}
}

export default LocationSelect;
