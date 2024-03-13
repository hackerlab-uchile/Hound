#!/bin/sh

echo 'Stopping scan...'

tmux send-keys -t "$(uuid).0" C-c
sleep 1
tmux send-keys -t "$(uuid).0" "exit" ENTER
tmux send-keys -t "$(uuid).1" "exit" ENTER


echo 'Scan stopped'