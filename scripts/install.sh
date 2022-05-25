printf "\n>Preparando diretórios\n"

printf "\n>Instalando backend\n"
cd ./back-end
npm install --prefer-dedupe

printf "\n>Voltando a raiz do projeto\n"
cd ..

printf "\n>Instalando frontend\n"
cd ./front-end
npm install --prefer-dedupe

