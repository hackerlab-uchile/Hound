#!/bin/sh

echo 'Stopping scan...'

tmux send-keys -t "$(uuid).0" C-c

echo 'Scan stopped'