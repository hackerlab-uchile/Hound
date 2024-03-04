#!/bin/sh
echo 'Iniciando escaneo de red'

mkfifo signalpipe

# 'a' to toggle the scanning instance on airodump where they are set on the following order: AP+STA; AP+STA+ACK; AP only; STA only
airodump-ng wlan1 2>&1 > fifo1 && xdotool key a && xdotool key a && xdotool key a 


python3 scan_manager.py