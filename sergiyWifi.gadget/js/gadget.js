var wireless = System.Network.Wireless;
var status;

//Checking network details
function networkInfo()
{
	var ssid = wireless.ssid;
	var Strength = wireless.signalStrength;
	var ip = wireless.address;
	var primaryDNS = wireless.primaryDNSAddress;
	var security = wireless.secureConnection;

	//If connected display, the network information, if there's an SSID then you are connected
	if (ssid != "")
	{
		status = true;
		document.getElementById('networkSsid').innerText = ssid;
		document.getElementById('networkSignalPercent').innerText = Strength + "%";
	}
	//If not connected, then display the filler
	else
	{	
		status = false;
		document.getElementById('networkSsid').innerText = "Disconnected";
		document.getElementById('networkSignalPercent').innerText = "n/a";
	}
	
	//Checking the signal strength and security and displaying the appropriate image
	//If connected to a network, then display the proper signal status image
	if (status == true)
	{	
		if (Strength > 85)
		{
			document.getElementById('networkSignal').src = "/img/Signal/060.png";
		}
		else if (Strength > 65)
		{
			document.getElementById('networkSignal').src = "/img/Signal/059.png";
		}
		else if (Strength > 45)
		{
			document.getElementById('networkSignal').src = "/img/Signal/058.png";
		}
		else if (Strength > 25)
		{
			document.getElementById('networkSignal').src = "/img/Signal/057.png";
		}
		else if (Strength > 5)
		{
			document.getElementById('networkSignal').src = "/img/Signal/056.png";
		}
		else
		{
			document.getElementById('networkSignal').src = "/img/Signal/055.png";
		}
	}
	//If disconencted, then show disconnected status image
	else
	{
		document.getElementById('networkSignal').src = "/img/Signal/054.png";
	}

	//Refresh network information when changing network
	wireless.connectionChanged = networkInfo;

	//Refresh network information when signal strength changes
	wireless.signalStrengthChanged = networkInfo;
}


//Opening the flyout details box
function showFlyout()
{
	System.Gadget.Flyout.file = "flyout.htm";
	System.Gadget.Flyout.show = true;
}



