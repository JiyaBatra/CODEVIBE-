# Secure Containerized Code Execution

## Overview
CodeVibe uses a Strategy-based Execution Engine to safely run user-submitted code in multiple programming languages. The execution engine dynamically selects between Local execution (for development) and Docker execution (for production) based on environment configuration.

## Architecture
The execution engine is split into three main parts:
- **CompilerService**: Handles strategy selection and normalizes the execution result.
- **LocalExecutionStrategy**: Uses `child_process.spawn` to run code on the host machine. Vulnerable to resource abuse.
- **DockerExecutionStrategy**: Uses `dockerode` to spin up ephemeral, highly constrained Docker containers for every code execution request.

### Strategy Selection
Strategy is determined by the `EXECUTION_MODE` environment variable:
- `EXECUTION_MODE=local` (default): Uses `LocalExecutionStrategy`.
- `EXECUTION_MODE=docker`: Uses `DockerExecutionStrategy`.

## Security Model (Docker Strategy)
The Docker execution strategy ensures maximum isolation to prevent malicious users from compromising the host server or other tenants. 

Each container runs with the following strict constraints:
1. **Memory Limits**: Max `256MB` RAM per container.
2. **CPU Quotas**: Restricted to `0.5` CPU share.
3. **PID Limits**: Maximum `100` processes (prevents fork bombs).
4. **Read-only Filesystem**: The root filesystem is set to read-only (`ReadonlyRootfs: true`).
5. **No Privileged Mode**: Containers run entirely unprivileged.
6. **Network Isolation**: Networking is disabled (`NetworkMode: "none"`).
7. **Timeout Constraint**: Hard execution timeout of `5 seconds`. Containers taking longer are force-killed (`SIGKILL`) and destroyed.
8. **Ephemeral Storage**: Code is mounted from a temporary host directory that is wiped completely in a `finally` block after execution.

## Docker Requirements
To use the Docker execution strategy:
1. The host running the Node.js server must have the Docker daemon installed and running.
2. The Node.js process must have permissions to access `/var/run/docker.sock` (or the equivalent on Windows/Mac).
3. The server requires internet access the *first time* a language is executed to pull the respective image (`python:3.12-alpine`, `gcc:latest`, `openjdk:17-alpine`, `node:20-alpine`). Subsequent runs use the cached image.

## Resource Limits configuration
If you need to change resource limits, edit the configuration object passed to `docker.createContainer` in `server/services/compiler/strategies/DockerExecutionStrategy.js`:
```javascript
HostConfig: {
    Memory: 256 * 1024 * 1024,
    NanoCPUs: 500000000,
    PidsLimit: 100
}
```

## Troubleshooting
**Error: `connect ENOENT /var/run/docker.sock`**
- Docker is not running or the Node.js process lacks permission to access the socket. Start Docker or run Node.js with appropriate permissions.

**Error: `pull access denied`**
- Check your internet connection. The application is trying to download a runtime image (e.g., `python:3.12-alpine`) but cannot reach Docker Hub.
