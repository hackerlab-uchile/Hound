#!/bin/sh
echo 'Iniciando escaneo de red'

#mkfifo signalpipe

# 'a' to toggle the scanning instance on airodump where they are set on the following order: AP+STA; AP+STA+ACK; AP only; STA only
airodump-ng wlan1 
# 2>&1 > fifo1 

sleep 5

xdotool key --delay 500 'a'
xdotool key --delay 500 'a'
xdotool key --delay 500 'a'
