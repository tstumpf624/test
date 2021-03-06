Flight21 = React.createClass({

	render(){
		return(
			<div className="col-xs-3 fixed bot-side">
				<div className="col-xs-2 fixed">
          		</div>
          		
				 <div className="col-xs-8 fixed">
		            <div className="btn-group-vertical btn-block">
		              <button type="button" className="btn btn-block buttonStyle" data-toggle="modal" data-target="#loadVehicleModal">Load Vehicle</button>
		              <button type="button" className="btn btn-block buttonStyle" data-toggle="modal" data-target="#flightControlModal">Flight Control</button>
		              <button type="button" className="btn btn-block buttonStyleNeg" onClick={this.props.handleInitiateBurn}>Initiate Burn</button>
		            </div>
		          </div>
		     
					<div id="loadVehicleModal" className="modal fade" role="dialog">
			            <div className="modal-dialog">
			              <div className="modal-content modalStyle">
			                <div className="modal-header">
			                  <button type="button" className="close" data-dismiss="modal">&times;</button>
			                  <h4 className="modal-title">Load Vehicle</h4>
			                  <div className="modal-body">
			                    <div>
			                    {this.props.vehicle.map( function(u) { return [u.name, u.state]; } ).map((data, i) =>
			                       <div key={i} className="btn-group btn-block">
			                           <button className="btn buttonStyle" style={{width: "50%"}} onClick={this.props.handleLoadVehicle.bind(null, data[0])} data-dismiss="modal">{data[0] + " - " + data[1][0] + ": " + data[1][1]}</button>
			                           <button className="btn buttonStyle" style={{width: "20%", marginLeft: "30%"}} onClick={this.props.handleDeleteVehicle.bind(null, data[0])}>Delete</button>
			                       </div>)}
			                    </div>
			                  </div>
			                  <div className="modal-footer">
			                    <button type="button" className="btn buttonStyle" data-dismiss="modal">Close</button>
			                  </div>
			                </div>
			              </div>
			            </div>
			          </div>
			          
			         <div id="flightControlModal" className="modal fade" role="dialog">
			            <div className="modal-dialog">
			              <div className="modal-content modalStyle">
			                <div className="modal-header">
			                  <button type="button" className="close" data-dismiss="modal">&times;</button>
			                  <h4 className="modal-title">Flight Control</h4>
			                  <div className="modal-body">
				                  <div className="btn-group btn-block">
	                           		<button className={this.props.maneuverConfig[0][0]} style={{width: "50%"}} onClick={this.props.handleConfigureManeuver.bind(null, 0)} disabled={this.props.maneuverConfig[0][1]}>Launch to Orbit</button>
	                        		<button className="btn buttonStyle" style={{width: "40%", marginLeft: "10%"}}>{this.props.maneuverValue} km</button>
	                    		 </div>
								<div className="btn-group btn-block">
	                           		<button className={this.props.maneuverConfig[1][0]} style={{width: "50%"}} onClick={this.props.handleConfigureManeuver.bind(null, 1)} disabled={this.props.maneuverConfig[1][1]}>Change apoapsis</button>
	                        		<input style={{width: "40%", marginLeft: "10%", backgroundColor: "#000", textAlign: "center"}} type="text" value={this.props.maneuverFormValue} onChange={this.props.handleManeuverValue} />
	                    		 </div>
	                    		 
	                    		 <div className="btn-group btn-block">
	                           		<button className={this.props.maneuverConfig[2][0]} style={{width: "50%"}} onClick={this.props.handleConfigureManeuver.bind(null, 2)} disabled={this.props.maneuverConfig[2][1]}>Change periapsis</button>
	                    		 </div>
	                    		 <div className="btn-group btn-block">
	                           		<button className={this.props.maneuverConfig[3][0]} style={{width: "50%"}} onClick={this.props.handleConfigureManeuver.bind(null, 3)} disabled={this.props.maneuverConfig[3][1]}>Attempt reentry</button>
	                    		 </div>
			                  </div>
			                  <div className="modal-footer">
			                    <button type="button" className="btn buttonStyle" data-dismiss="modal">Close</button>
			                  </div>
			                </div>
			              </div>
			            </div>
			         </div>

				<div className="col-xs-2 fixed">
          		</div>
			</div>
		);
	}
});
