#!/bin/sh
echo 'Starting network scan...'

mkfifo signalpipe

# 'a' to toggle the scanning instance on airodump where they are set on the following order: AP+STA; AP+STA+ACK; AP only; STA only
expect scan_manager.exp
# 


