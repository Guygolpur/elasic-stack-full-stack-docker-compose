# FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
# WORKDIR /app
# EXPOSE 5290

# ENV ASPNETCORE_URLS=http://+:5290

# USER app
# FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# ARG configuration=Release
# WORKDIR /src
# COPY ["DotnetBackend.csproj", "./"]
# RUN dotnet restore "DotnetBackend.csproj"
# COPY . .
# WORKDIR "/src/."
# RUN dotnet build "DotnetBackend.csproj" -c $configuration -o /app/build

# FROM build AS publish
# ARG configuration=Release
# RUN dotnet publish "DotnetBackend.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

# FROM base AS final
# WORKDIR /app
# COPY --from=publish /app/publish .
# COPY entrypoint.sh .
# RUN chmod +x entrypoint.sh
# ENTRYPOINT ["./entrypoint.sh"]

# #


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
