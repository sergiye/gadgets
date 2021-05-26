////////////////////////////////////////////////////////////////////////////////////
// Wireless Network Controller Gadget 2.1
//
// Author: David Taraso
// Date of Publication: July 2nd, 2007
// Published at: http://www.jcxp.net
//
// Copyright (C) 2007 David Taraso
//
// You may not modify and/or use any of the following code without first aquiring my
// authorization. If you wish to contact me, please do so by emailing me at 
// david.taraso@live.ca
////////////////////////////////////////////////////////////////////////////////////

var wireless = System.Network.Wireless;
var status;

//Checking network details
function networkDetails()
{
	var ssid = wireless.ssid;
	var Strength = wireless.signalStrength;
	var ip = wireless.address;
	var primaryDNS = wireless.primaryDNSAddress;
	var security = wireless.secureConnection;
	var dns = wireless.primaryDNSAddress;
	
	//If connected display, the network information, if there's an SSID then you are connected
	if (ssid != "")
	{
		status = true;
		document.getElementById('networkDetailsStatus').innerText = "Status: Connected";
		document.getElementById('networkDetailsssid').innerText = "SSID: " + ssid;
		document.getElementById('networkDetailsSignalPercent').innerText = "Signal: " + Strength + "%";
		document.getElementById('networkDetailsAddress').innerText = "Internal IP: " + wireless.address;
		if(security == true)
		{
			document.getElementById('networkDetailsSecurity').innerText = "Secured: Yes"
		}
		else
		{
			document.getElementById('networkDetailsSecurity').innerText = "Secured: No"
		}
		document.getElementById('networkDetailsDns').innerText = "Configure This Device";
		
	}
	//If not connected, then display the filler
	else
	{	
		status = false;
		document.getElementById('networkDetailsStatus').innerText = "Status: Disconnected";
		document.getElementById('networkDetailsssid').innerText = "SSID: --";
		document.getElementById('networkDetailsSignalPercent').innerText = "Signal: --";
		document.getElementById('networkDetailsAddress').innerText = "Internal IP: --";
		document.getElementById('networkDetailsSecurity').innerText = "Secured: --"
		document.getElementById('networkDetailsDns').innerText = "Connect To A Network";
	}
	if (status == true)
	{	
		if (Strength > 79)
		{
			document.getElementById('networkDetailsQuality').innerText = "Quality: Excellent";
		}
		else if (Strength > 59)
		{
			document.getElementById('networkDetailsQuality').innerText = "Quality: Very Good";
		}
		else if (Strength > 39)
		{
			document.getElementById('networkDetailsQuality').innerText = "Quality: Good";
		}
		else if (Strength > 19)
		{
			document.getElementById('networkDetailsQuality').innerText = "Quality: Low";
		}
		else if (Strength > 0)
		{
			document.getElementById('networkDetailsQuality').innerText = "Quality: Very Low";
		}
		else
		{
			document.getElementById('networkDetailsQuality').innerText = "Quality: Out of Range";
		}
	}
	else
	{
		document.getElementById('networkDetailsQuality').innerText = "Quality: --";
	}

	//Refresh network information when changing network
	wireless.connectionChanged = networkDetails;

	//Refresh network information when signal strength changes
	wireless.signalStrengthChanged = networkDetails;
}

//Getting the Device IPv4 DNS Address
function getDns()
{
	var ssid = wireless.ssid;
	if (ssid != "")
	{
		System.Shell.execute('http://' + wireless.primaryDNSAddress);
	}
	else
	{
		System.Shell.execute("::{20d04fe0-3aea-1069-a2d8-08002b30309d}\\::{21ec2020-3aea-1069-a2dd-08002b30309d}\\::{38A98528-6CBF-4CA9-8DC0-B1E1D10F7B1B}");
	}
}

// The Fin













































//Yes, that was a joke. I know, it's actually "La Fin". Now stop looking at my code.