#!/bin/sh
echo 'Starting network scan...'

mkfifo signalpipe


## calling the airodump instance and the function to get the data from the pipe
tmux new -d 

tmux send -Rt 0 cd SPACE Hound ENTER
tmux send -Rt 0 cd SPACE backend ENTER

tmux send -Rt 0 expect SPACE scan_manager.exp ENTER
 
python -c 'import scan_manager; scan_manager.get_scanings()'


# 


