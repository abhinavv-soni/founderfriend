#!/bin/bash
set -e

echo "Starting container..."

# Configure tmux
cat > /root/.tmux.conf << 'EOL'
# Increase history limit
set -g history-limit 1000000

# Enable mouse support
set -g mouse on

# Update status bar more frequently
set -g status-interval 1

# Increase status right length
set -g status-right-length 400

# Enable 256 color support
set -g default-terminal screen-256color

# Disable wrap search
setw -g wrap-search off

# Set terminal overrides for wider display
set -g terminal-overrides 'xterm*:cols#500'
EOL

# Create log directory for supervisor
mkdir -p /var/log/supervisor

# Start supervisor
sudo service supervisor start
sudo supervisorctl reread
sudo supervisorctl update

tail -f /dev/null
/bin/sleep infinity
