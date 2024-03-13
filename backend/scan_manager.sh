#!/bin/sh
echo 'Starting network scan...'

mkfifo signalpipe


## calling the airodump instance and the function to get the data from the pipe
tmux new -d session

tmux send -Rt 0 expect SPACE scan_manager.exp ENTER
 

# 


