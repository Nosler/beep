#!/bin/bash

# Usage: ./run-tauri-instances.sh <number_of_instances> <start_port>
# Example: ./run-tauri-instances.sh 3 3001

usage() {
    echo "Usage: $0 <number_of_instances> <start_port>"
    echo "Example: $0 3 3001"
    exit 1
}

NUM_INSTANCES=${1:-1} # Default to 2 instances if not provided
START_PORT=${2:-1420} # Default starting port is 1420

if ! [[ "$NUM_INSTANCES" =~ ^[0-9]+$ ]] || ! [[ "$START_PORT" =~ ^[0-9]+$ ]]; then
    echo "Error: Arguments must be numeric."
    usage
fi

# Array to keep track of process IDs
declare -a PIDS

# Function to handle SIGINT (CTRL-C)
cleanup() {
    echo "Caught SIGINT. Terminating all instances..."
    for PID in "${PIDS[@]}"; do
        echo "Killing process $PID"
        kill -TERM -- -$PID 2>/dev/null
    done
    rm ".env.dev-"*
    exit 0
}

trap cleanup SIGINT
trap cleanup ERR
trap cleanup EXIT

# Function to start a Tauri instance and prefix its output
start_instance() {
    local index=$1
    local port=$2
    local env_file=".env.dev-${port}"

    # Create the .env file for this instance
    echo "VITE_PORT=${port}" >$env_file

    # Start the Tauri app with the environment file and prefix output with index
    (
        setsid dotenv -e $env_file -- pnpm tauri dev --port ${port} 2>&1 |
            while IFS= read -r line; do
                echo "[$index] $line"
            done
    ) &
    local pid=$!
    PIDS+=($pid)
    echo "Started Tauri instance ${index} on port ${port} with PID ${pid}"
}

# Function to monitor all subprocesses
monitor_processes() {
    while true; do
        for pid in "${PIDS[@]}"; do
            if ! kill -0 $pid 2>/dev/null; then
                echo "Process $pid has terminated. Cleaning up..."
                cleanup
            fi
        done
        sleep 1
    done
}

# Start instances
for ((i = 0; i < $NUM_INSTANCES; i++)); do
    PORT=$((START_PORT + i))
    start_instance $((i + 1)) $PORT
done

echo "All instances started. Press CTRL-C to stop."

# Monitor processes
monitor_processes
