#!/bin/sh

echo 'Stopping scan...'

uuid="(uuidgen)"
tmux send-keys -t "$(uuid).0" C-c
tmux send-keys -t "$(uuid).0" "exit" ENTER
tmux send-keys -t "$(uuid).1" "exit" ENTER
fclose(signalpipe)

echo 'Scan stopped'