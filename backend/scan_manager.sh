#!/bin/sh
echo 'Starting network scan...'

mkfifo signalpipe


## calling the airodump instance and the function to get the data from the pipe

expect scan_manager.exp&
python -c 'import scan_manager; scan_manager.get_scannings()'&
# 


