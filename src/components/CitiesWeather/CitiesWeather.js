import React,{ Component } from 'react';
import { FaTemperatureLow, FaLevelUpAlt, FaEquals } from 'react-icons/fa';

import './CitiesWeather.scss';

class CitiesWeather extends Component {

    constructor(props) {
    	super(props);
    }

	render() {
		return (
			<div className="cities-weather">
				<h1>Weather</h1>
				<div className="cities-weather__inner">
				 <div className="cities-weather__block-l">
					{
						this.props.weather.map((item, index) => {
							return (
               <div key={index}>

  							 <div className="cities-weather__info" >
    								<div>
    									<p><img src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`} alt=""/></p>
    								    <h5>{item.main}</h5>
    									<p>{item.description}</p>
    								</div>
  							  </div>

                </div>

							)
						})
					}
				  </div>
				  <div className="cities-weather__block-r">
				  	{
				  		this.props.mainInfo.map((item, index) => {
				  			return (
				  				<div className="cities-weather__list" key={index}>
				  					<div>
				  						<div><FaTemperatureLow /></div>
                      <div>Temperature: {item.temp}</div>
				  					</div>
				  					<div>
				  						<div><FaLevelUpAlt /></div>
                      <div>Sea Level: {item.sea_level}</div>
				  					</div>
				  					<div>
				  						<div><FaEquals /></div>
                      <div>Pressure: {item.pressure}</div>
				  					</div>
				  				</div>
				  			)
				  		})
				  	}
				  </div>
				</div>
			</div>
		)
	}
}

export default CitiesWeather;
