# FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
# WORKDIR /app
# EXPOSE 5290

# FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# WORKDIR /src
# COPY ["DotnetBackend.csproj", "./"]
# RUN dotnet restore "DotnetBackend.csproj"
# COPY . .
# RUN dotnet build "DotnetBackend.csproj" -c Release -o /app/build

# # Install necessary tools
# RUN apt-get update && apt-get install -y curl unzip

# # Download and prepare the Elastic APM Agent
# ARG AGENT_VERSION=1.19.0
# WORKDIR /elastic_apm
# RUN curl -L -o elastic_apm_profiler_${AGENT_VERSION}.zip https://github.com/elastic/apm-agent-dotnet/releases/download/v${AGENT_VERSION}/elastic_apm_profiler_${AGENT_VERSION}.zip \
#     && unzip elastic_apm_profiler_${AGENT_VERSION}.zip \
#     && rm elastic_apm_profiler_${AGENT_VERSION}.zip

# FROM build AS publish
# WORKDIR /src
# RUN dotnet publish "DotnetBackend.csproj" -c Release -o /app/publish

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# COPY --from=build /elastic_apm /elastic_apm

# # Set environment variables for the Elastic APM Agent
# ENV CORECLR_ENABLE_PROFILING="1"
# ENV CORECLR_PROFILER="{FA65FE15-F085-4681-9B20-95E04F6C03CC}"
# ENV CORECLR_PROFILER_PATH="/elastic_apm/ElasticApmProfiler.so"
# ENV ELASTIC_APM_PROFILER_HOME="/elastic_apm"
# ENV ELASTIC_APM_PROFILER_INTEGRATIONS="/elastic_apm/integrations.yml"

# CMD ["dotnet", "DotnetBackend.dll"]



FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5290

FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["DotnetBackend.csproj", "./"]
RUN dotnet restore "DotnetBackend.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "DotnetBackend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DotnetBackend.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# Instead of using entrypoint.sh, directly use CMD to start your application
CMD ["dotnet", "DotnetBackend.dll"]
