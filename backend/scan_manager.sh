#!/bin/sh
echo 'Starting network scan...'

mkfifo signalpipe


## calling the airodump instance and the function to get the data from the pipe
uuid="(uuidgen)" && tmux new -d -s "$uuid"
tmux splitw -h -t "${uuid}:0.0"
tmux send-keys -t "${uuid}.0" "expect scan_manager.exp" ENTER
tmux send-keys -t "${uuid}.1" "python -c 'import scan_manager; scan_manager.get_scannings()'" ENTER

