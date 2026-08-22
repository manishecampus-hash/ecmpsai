#!/usr/bin/env python3
import subprocess
import sys
import os

# ANSI color codes
GREEN = "\033[92m"
YELLOW = "\033[93m"
RED = "\033[91m"
BOLD = "\033[1m"
RESET = "\033[0m"

def run_command(command, stream_output=False, ignore_errors=False):
    print(f"{BOLD}Running:{RESET} {' '.join(command)}")
    try:
        if stream_output:
            # Streams stdout and stderr in real-time
            process = subprocess.Popen(
                command,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1
            )
            for line in process.stdout:
                print(line, end="")
            process.wait()
            if process.returncode != 0 and not ignore_errors:
                print(f"{RED}{BOLD}Command failed with return code {process.returncode}{RESET}")
                sys.exit(process.returncode)
        else:
            result = subprocess.run(
                command,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            if result.returncode != 0 and not ignore_errors:
                print(f"{RED}{BOLD}Command failed:{RESET}")
                print(result.stderr)
                sys.exit(result.returncode)
            return result
    except Exception as e:
        if not ignore_errors:
            print(f"{RED}{BOLD}Exception occurred:{RESET} {e}")
            sys.exit(1)

def main():
    # Make sure we run in the directory of deploy.py
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Check if .env file exists
    if not os.path.exists(".env"):
        print(f"{YELLOW}{BOLD}Warning:{RESET} .env file not found in current directory. Docker run might fail if it relies on environment variables.")

    # 1. Docker build
    print(f"\n{GREEN}{BOLD}[1/4] Building Docker Image (ecampusupdateai)...{RESET}")
    run_command(["docker", "build", "-t", "ecampusupdateai", "."], stream_output=True)

    # 2. Docker stop
    print(f"\n{GREEN}{BOLD}[2/4] Stopping existing container if running...{RESET}")
    run_command(["docker", "stop", "ecampusupdateai"], ignore_errors=True)

    # 3. Docker rm
    print(f"\n{GREEN}{BOLD}[3/4] Removing existing container...{RESET}")
    run_command(["docker", "rm", "ecampusupdateai"], ignore_errors=True)

    # 4. Docker run
    print(f"\n{GREEN}{BOLD}[4/4] Starting new Docker container...{RESET}")
    run_command([
        "docker", "run", "-d",
        "--name", "ecampusupdateai",
        "-p", "4001:3000",
        "--env-file", ".env",
        "--restart", "unless-stopped",
        "ecampusupdateai"
    ])

    print(f"\n{GREEN}{BOLD}Deployment completed successfully!{RESET}")
    print(f"{BOLD}Access the website at:{RESET} http://localhost:4001")

if __name__ == "__main__":
    main()
