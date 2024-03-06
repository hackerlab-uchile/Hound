# Hound
An application made to detect hidden IoT devices (work in progress)

## Requirements


## Setup
1. The first step is to notice that the app needs to run a hotspot to connect to the cellphone.

On the provided RPI set up it is only neccesary to run:
```console
 nmcli con up PI_AGER_AP   
```

If you want to set up your own hotspot use the following configuration

```console
 nmcli con add type wifi ifname wlan1 mode ap con-name <Name_of_connection> ssid <name_of_hotspot>
 nmcli con modify <Name_of_connection> 802-11-wireless.band bg
 nmcli con modify <Name_of_connection> 802-11-wireless.channel 1
 nmcli con modify <Name_of_connection> 802-11-wireless-security.key-mgmt wpa-psk
 nmcli con modify <Name_of_connection> 802-11-wireless-security.psk <password>
 nmcli con modify <Name_of_connection> ipv4.addr 10.42.0.1
 nmcli con modify <Name_of_connection> ipv4.method shared
 nmcli con up <Name_of_connection>
```

We do it like this to avoid security measures that requires certain types of authentication that mobile devices cannot provide. The authentication doesnt work otherwise. Other reason to do this is that doing this we set the ipv4 address to the required one by Caddy (`10.42.0.1`). 

## Usage
The aplication needs a frontend and a backend running simultaneosuly. To achieve this:

- For frontend on Windows
```console
$ cd frontend
$ npm start

```

- For backend on Windows
```
$ uvicorn main:app --reload 
```

- For frontend on RPi is not necessary to do anything. The frontend is running as an static page on Caddy, so it works on boot.  

- For backend on RPI
```
$ uvicorn main:app --reload --host 0.0.0.0 --root-path /api/
```

