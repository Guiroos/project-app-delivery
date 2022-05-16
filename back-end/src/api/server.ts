const port = process.env.PORT || 3001;
const appLive = require('./app.ts');

appLive.listen(port);
console.log(`Api rodando na porta ${port}`);
