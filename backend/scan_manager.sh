#!/bin/sh
echo 'Starting network scan...'

mkfifo signalpipe


## calling the airodump instance and the function to get the data from the pipe
tmux attach -t session

expect scan_manager.exp 
# 


