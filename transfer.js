

transferOrbit("Earth", "Mars", julianDate(20, 7, 2020), 207);

function transferOrbit(planetOne, planetTwo, date, travelTime){
	
	var positionOne = transfer(planetOne, date );
	var positionTwo = transfer(planetTwo, date + travelTime);
	
	var GM = 3.964016e-14;
	
	var r1 = positionOne[0];
	var r2 = positionTwo[0];
	
	var x1 = positionOne[1];
	var x2 = positionTwo[1];
	
	var y1 = positionOne[2];
	var y2 = positionTwo[2];
	
	var z1 = positionOne[3];
	var z2 = positionTwo[3];
	
	var delTrueAnomaly = Math.acos((x1 * x2 + y1 * y2) / (r1 * r2));
	
	var kvar = r1 * r2 * (1 - Math.cos(delTrueAnomaly));
	var lvar = r1 + r2;
	var mvar = r1 * r2 * (1 + Math.cos(delTrueAnomaly));
	var dvar = r1 * r2 / 2 * (1 - Math.cos(delTrueAnomaly));

	var paraTimeMax = - kvar * lvar * dvar / ((2 * mvar - lvar * lvar) * dvar - mvar * kvar);
	
	var Pi = kvar / (lvar + Math.pow(2 * mvar, 0.5));
	var Pii = kvar / (lvar - Math.pow(2 * mvar, 0.5));
	
	if (delTrueAnomaly < Math.PI){
		var parameter1 = (paraTimeMax + Pii) / 2 ;
		var parameter2 = (paraTimeMax + 2 * Pii) / 3;
	} else {
		parameter1 = (Pi + Pii) / 2;
		parameter2 = (Pi + 2 * Pii) / 3;
	}
	
	var smAxis = mvar * kvar * paraTimeMax / ((2 * mvar - lvar * lvar) * paraTimeMax * paraTimeMax + 2 * kvar * lvar * paraTimeMax - kvar * kvar);
	var fvar = 1 - r2 / paraTimeMax * (1 - Math.cos(delTrueAnomaly));
	var gvar = r1 * r2 * Math.sin(delTrueAnomaly) / Math.pow(GM * paraTimeMax, 0.5);
	var delEccAnomaly = Math.acos(1 - r1 / smAxis * (1 - fvar));
	
	var timeMax = (gvar + Math.pow(Math.pow(smAxis, 3) / GM, 0.5) * Math.PI) / 86400;

	var smAxis = mvar * kvar * paraTimeMax / ((2 * mvar - lvar * lvar) * paraTimeMax * paraTimeMax + 2 * kvar * lvar * paraTimeMax - kvar * kvar);
	var fvar = 1 - r2 / paraTimeMax * (1 - Math.cos(delTrueAnomaly));
	var gvar = r1 * r2 * Math.sin(delTrueAnomaly) / Math.pow(GM * paraTimeMax, 0.5);
	var delEccAnomaly = Math.acos(1 - r1 / smAxis * (1 - fvar));
	
	smAxis = mvar * kvar * (Pi + 1e-8) / ((2 * mvar - lvar * lvar) * (Pi + 1e-8) * (Pi + 1e-8) + 2 * kvar * lvar * (Pi + 1e-8) - kvar * kvar);
	fvar = 1 - r2 / (Pi + 1e-8) * (1 - Math.cos(delTrueAnomaly));
	gvar = r1 * r2 * Math.sin(delTrueAnomaly) / Math.pow(GM * (Pi + 1e-8), 0.5);
	delEccAnomaly = Math.acos(1 - r1 / smAxis * (1 - fvar));
	
	var timew1 = (gvar + Math.pow(Math.pow(smAxis, 3) / GM, 0.5) * (delEccAnomaly - Math.sin(delEccAnomaly))) / 86400;


	smAxis = mvar * kvar * (Pii - 1e-8) / ((2 * mvar - lvar * lvar) * (Pii - 1e-8) * (Pii - 1e-8) + 2 * kvar * lvar * (Pii - 1e-8) - kvar * kvar);
	fvar = 1 - r2 / (Pii - 1e-8) * (1 - Math.cos(delTrueAnomaly));
	gvar = r1 * r2 * Math.sin(delTrueAnomaly) / Math.pow(GM * (Pii - 1e-8), 0.5);
	delEccAnomaly = Math.acos(1 - r1 / smAxis * (1 - fvar));
	
	var timew2 = (gvar + Math.pow(Math.pow(smAxis, 3) / GM, 0.5) * (delEccAnomaly - Math.sin(delEccAnomaly))) / 86400;
	
	
	
	for(var i = 0; i <20; i++){

		if((travelTime < timew1 && travelTime < timew2) || travelTime > timeMax){
			return ["----","----"];
		}

			
		smAxis = mvar * kvar * parameter1 / ((2 * mvar - lvar * lvar) * parameter1 * parameter1 + 2 * kvar * lvar * parameter1 - kvar * kvar);
		fvar = 1 - r2 / parameter1 * (1 - Math.cos(delTrueAnomaly));
		gvar = r1 * r2 * Math.sin(delTrueAnomaly) / Math.pow(GM * parameter1, 0.5);
		delEccAnomaly = Math.acos(1 - r1 / smAxis * (1 - fvar));
		
		var time1 = (gvar + Math.pow(Math.pow(smAxis, 3) / GM, 0.5) * (delEccAnomaly - Math.sin(delEccAnomaly))) / 86400;

		smAxis = mvar * kvar * parameter2 / ((2 * mvar - lvar * lvar) * parameter2 * parameter2 + 2 * kvar * lvar * parameter2 - kvar * kvar);
		fvar = 1 - r2 / parameter2 * (1 - Math.cos(delTrueAnomaly));
		gvar = r1 * r2 * Math.sin(delTrueAnomaly) / Math.pow(GM * parameter2, 0.5);
		delEccAnomaly = Math.acos(1 - r1 / smAxis * (1 - fvar));
	
		var time2 = (gvar + Math.pow(Math.pow(smAxis, 3) / GM, 0.5) * (delEccAnomaly - Math.sin(delEccAnomaly))) / 86400;

		if(Math.abs(time1 - time2) < 1e-10){
			break;
		} else {
			
		var parameterTemp = parameter1;
		parameter1 = parameter2 + (travelTime - time2)  * (parameter2 - parameter1) / (time2 - time1);
		

		
			if (delTrueAnomaly < Math.PI){
				if(parameter1 < paraTimeMax){
					parameter1 = (paraTimeMax + parameterTemp) / 2;
				}
	
			}
			
			if (parameter1 > Pii){
				parameter1 = (Pii + parameterTemp) / 2;
			}
			
			parameter2 = parameterTemp;	
		}
	}
	
	var fdot = -Math.pow(GM * smAxis, 0.5) / r1 / r2 * Math.sin(delEccAnomaly);
	var gdot = 1 - smAxis / r2 * (1 - Math.cos(delEccAnomaly));
	
	var vel1 = [(x2 - fvar * x1) / gvar, (y2 - fvar * y1) / gvar, (z2 - fvar * z1) / gvar];
	var vel2 = [fdot * x1 + gdot * vel1[0], fdot * y1 + gdot * vel1[1], fdot * z1 + gdot * vel1[2]];
	
	var Vsp1 = [vel1[0] * 1.495978707e11 - positionOne[4], vel1[1] * 1.495978707e11 - positionOne[5], vel1[2] * 1.495978707e11 - positionOne[6]];
	var Vsp2 = [vel2[0] * 1.495978707e11 - positionTwo[4], vel2[1] * 1.495978707e11 - positionTwo[5], vel2[2] * 1.495978707e11 - positionTwo[6]];

	var Vinfty1 = Math.pow( Vsp1[0] * Vsp1[0] + Vsp1[1] * Vsp1[1] + Vsp1[2] * Vsp1[2], 0.5)
	var Vinfty2 = Math.pow( Vsp2[0] * Vsp2[0] + Vsp2[1] * Vsp2[1] + Vsp2[2] * Vsp2[2], 0.5)
	
	console.log(Vinfty1, Vinfty2, x1, y1, z1, smAxis)
	
	return [Vinfty1, Vinfty2, x1, y1, z1, smAxis];
	

}

function julianDate(day, month, year){
	if(month == 1 || month == 2){
	    year -= 1;
	    month += 12;
	}

	var A = Math.floor(year / 100);
	var B = 2 - A + Math.floor(A / 4);
	return Math.floor(365.25 * year) + Math.floor(30.6001 * (month + 1)) + day + 1720994.5 + B;
}

function transfer(planet, date){
	var coef = {
		"Mercury": {
			meanLong: [178.179078,149474.07078,0.0003011,0],
			smAxis: [0.3870986,0,0,0],
			ecc: [0.20561421,0.00002046,-0.00000003,0],
			inc: [7.002881,0.0018608,-0.0000183,0],
			argPerihelion: [28.753753,0.3702806,0.0001208,0],
			longAscNode: [47.145944,1.1852083,0.0001739,0],
			dt: 1
		},
		"Venus": {
			meanLong: [342.767053,58519.21191,0.0003097,0],
			smAxis: [0.7233316,0,0,0],
			ecc: [0.00682069,-0.00004774,0.000000091,0],
			inc: [3.393631,0.0010058,-0.000001,0],
			argPerihelion: [54.384186,0.5081861,-0.0013864,0],
			longAscNode: [75.779647,0.89985,0.00041,0],
			dt: 2
		},
		"Earth": {
			meanLong: [99.69668,36000.76892,0.0003025,0],
			smAxis: [1.0000002,0,0,0],
			ecc: [0.01675104,-0.0000418,-0.000000126,0],
			meanAnomaly: [358.47583,35999.04975,-0.00015,-0.0000033],
			inc: [0,0,0,0],
			argPerihelion: [0,0,0,0],
			longAscNode: [0,0,0,0],
			dt: 4
		},
		"Mars": {
			meanLong: [293.737334,19141.69551,0.0003107,0],
			smAxis: [1.5236883,0,0,0],
			ecc: [0.0933129,0.000092064,-0.000000077,0],
			inc: [1.850333,-0.000675,0.0000126,0],
			argPerihelion: [285.431761,1.0697667,0.0001313,0.00000414],
			longAscNode: [48.786442,0.7709917,-0.0000014,-0.00000533],
			dt: 10
		},
		"Jupiter": {
			meanLong: [238.049257,3036.301986,0.0003347,-0.00000165],
			smAxis: [5.202561,0,0,0],
			ecc: [0.04833475,0.00016418,-0.0000004676,-0.0000000017],
			inc: [1.308736,-0.0056961,0.0000039,0],
			argPerihelion: [273.277558,0.5594317,0.00070405,0.00000508],
			longAscNode: [99.443414,1.01053,0.00035222,-0.00000851],
			dt: 40
		},
		"Saturn": {
			meanLong: [266.564377,1223.509884,0.0003245,-0.0000058],
			smAxis: [9.554747,0,0,0],
			ecc: [0.05589232,-0.0003455,-0.000000728,0.00000000074],
			inc: [2.492519,-0.0039189,-0.00001549,0.00000004],
			argPerihelion: [338.3078,1.0852207,0.00097854,0.00000992],
			longAscNode: [112.790414,0.8731951,-0.00015218,-0.00000531],
			dt: 100
		},
		"Uranus": {
			meanLong: [244.19747,429.863546,0.000316,-0.0000006],
			smAxis: [19.21814,0,0,0],
			ecc: [0.0463444,-0.00002658,0.000000077,0],
			inc: [0.772464,0.0006253,0.0000395,0],
			argPerihelion: [98.071581,0.985765,-0.0010745,-0.00000061],
			longAscNode: [73.477111,0.4986678,0.0013117,0],
			dt: 300,
		},
		"Neptune": {
			meanLong: [84.457994,219.885914,0.0003205,-0.0000006],
			smAxis: [30.10957,0,0,0],
			ecc: [0.00899704,0.00000633,-0.000000002,0],
			inc: [1.779242,-0.0095436,-0.0000091,0],
			argPerihelion: [276.045975,0.3256394,0.00014095,0.000004113],
			longAscNode: [130.681389,1.098935,0.00024987,-0.000004718],
			dt: 600
		}};
	
			var centTime = (date - 2415020) / 36525;

			var meanLong = coef[planet].meanLong[0] + coef[planet].meanLong[1] * centTime + 
								coef[planet].meanLong[2] * Math.pow(centTime, 2) + 
								coef[planet].meanLong[3] * Math.pow(centTime, 3);
								
			var smAxis = coef[planet].smAxis[0] + 
								coef[planet].smAxis[1] * centTime + 
								coef[planet].smAxis[2] * Math.pow(centTime, 2) + 
								coef[planet].smAxis[3] * Math.pow(centTime, 3);
			
			var ecc = 	coef[planet].ecc[0] + 
								coef[planet].ecc[1] * centTime + 
								coef[planet].ecc[2] * Math.pow(centTime, 2) + 
								coef[planet].ecc[3] * Math.pow(centTime, 3);
			
			var inc = 	coef[planet].inc[0] + 
								coef[planet].inc[1] * centTime + 
								coef[planet].inc[2] * Math.pow(centTime, 2) + 
								coef[planet].inc[3] * Math.pow(centTime, 3);
								
			var argPerihelion = coef[planet].argPerihelion[0] + 
								coef[planet].argPerihelion[1] * centTime + 
								coef[planet].argPerihelion[2] * Math.pow(centTime, 2) + 
								coef[planet].argPerihelion[3] * Math.pow(centTime, 3);
								
			var longAscNode = 	coef[planet].longAscNode[0] + 
								coef[planet].longAscNode[1] * centTime + 
								coef[planet].longAscNode[2] * Math.pow(centTime, 2) + 
								coef[planet].longAscNode[3] * Math.pow(centTime, 3);

			if (planet == "Earth"){
			    var meanAnomaly = 	coef[planet].meanAnomaly[0] + 
			    					coef[planet].meanAnomaly[1] * centTime + 
			    					coef[planet].meanAnomaly[2] * Math.pow(centTime, 2) + 
			    					coef[planet].meanAnomaly[3] * Math.pow(centTime, 3);
			    var longPerihelion = meanLong - meanAnomaly;
			} else {
    			longPerihelion = argPerihelion + longAscNode;
    			longPerihelion -= Math.floor(longPerihelion / 360) * 360;
    			meanAnomaly = meanLong - longPerihelion;
			}
			
			longPerihelion = (longPerihelion / 360 - Math.floor(longPerihelion / 360)) * 2 * Math.PI;
			meanAnomaly = (meanAnomaly / 360 - Math.floor(meanAnomaly / 360)) * 2 * Math.PI;
			meanLong = (meanLong / 360 - Math.floor(meanLong / 360)) * 2 * Math.PI;
			inc = (inc / 360 - Math.floor(inc / 360)) * 2 * Math.PI;
			argPerihelion = (argPerihelion / 360 - Math.floor(argPerihelion / 360)) * 2 * Math.PI;
			longAscNode = (longAscNode / 360 - Math.floor(longAscNode / 360)) * 2 * Math.PI;
		
			var eccAnomaly = meanAnomaly;
			
			for (var i = 0; i < 100; i++){
				var F = meanAnomaly + ecc * Math.sin(eccAnomaly) - eccAnomaly;
				var dF = ecc * Math.cos(eccAnomaly) - 1;
				eccAnomaly -= F / dF;
				
				if (Math.abs(F) < 1e-16){
					break;
				}
			}
			
			eccAnomaly -= Math.floor(eccAnomaly / 2 / Math.PI) * 2 * Math.PI;
			
			var trueAnomaly = 2 * Math.atan(Math.pow(((1 + ecc) / (1 - ecc)), 0.5) * Math.tan(eccAnomaly / 2));
			trueAnomaly -= Math.floor(trueAnomaly / 2 / Math.PI) * 2 * Math.PI;
			
			var r = smAxis * (1 - ecc * Math.cos(eccAnomaly));
			
			var argLat = meanLong + trueAnomaly - meanAnomaly - longAscNode;
			argLat -= Math.floor(argLat / 2 / Math.PI) * 2 * Math.PI;
			
			var lambdaMinusOmega = Math.atan(Math.cos(inc) * Math.tan(argLat));
			
			var eclipticLong = lambdaMinusOmega + longAscNode + (Math.floor(argLat / (Math.PI / 2)) - Math.floor(lambdaMinusOmega / (Math.PI / 2))) * Math.PI / 2;

			var eclipticLat = Math.asin(Math.sin(argLat) * Math.sin(inc));

			var y = r * Math.cos(eclipticLat) * Math.sin(eclipticLong);
			var x = r * Math.cos(eclipticLat) * Math.cos(eclipticLong);
			var z = r * Math.sin(eclipticLat);

			var angMom =  Math.pow(3.964016e-14 * smAxis * (1 - ecc * ecc), 0.5);
			var velPla = Math.pow(2 * 3.964016e-14 * (1 / r - 1 / 2 / smAxis), 0.5);
			
			var flightAngle = Math.atan2(y, x) + Math.asin(angMom / velPla / r);
			
			var vx = velPla * Math.cos(flightAngle) * Math.cos(Math.sin(flightAngle - longAscNode) * inc) * 1.495978707e11;
			var vy = velPla * Math.sin(flightAngle) * Math.cos(Math.sin(flightAngle - longAscNode) * inc) * 1.495978707e11;
			var vz = velPla * Math.sin(Math.sin(flightAngle -longAscNode) * inc) * 1.495978707e11;
			
		    return [r, x, y, z, vx, vy, vz];
}