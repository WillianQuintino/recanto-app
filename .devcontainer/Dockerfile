# Usar uma imagem Node.js com Nix
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-18

# Instalação de pacotes extras (npx, adb)
RUN apt-get update && \
    apt-get install -y adb && \
    npm install -g expo-cli

# Definir o usuário padrão
USER node
