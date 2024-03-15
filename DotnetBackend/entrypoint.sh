#!/bin/bash
set -e  # Stop on error

# Run database migration
dotnet ef database update

# Start the application
exec dotnet DotnetBackend.dll