# 📱 Como usar o MonitoraFluxoSaúde no celular

## 🚀 FORMA MAIS FÁCIL - Deploy Online (Grátis)

### **Vercel (Recomendado)**

1. **Acesse:** https://vercel.com
2. **Faça login** (pode usar conta Google/GitHub)
3. **Clique em** "Add New" → "Project"
4. **Importe** este projeto ou faça upload dos arquivos
5. **Deploy automático!** Vercel detecta Vite automaticamente
6. **Você receberá um link** tipo: `monitora-fluxo-saude.vercel.app`

### **Usando no celular:**
- Abra o link no navegador do celular
- **Android (Chrome):** Menu (⋮) → "Adicionar à tela inicial"
- **iPhone (Safari):** Botão Compartilhar → "Adicionar à Tela de Início"
- O app aparecerá como ícone na tela inicial do celular!

---

## 🎯 Outras opções de deploy grátis:

### **Netlify**
1. Acesse: https://netlify.com
2. Arraste a pasta do projeto
3. Pronto! Link automático

### **GitHub Pages**
1. Suba o código para o GitHub
2. Vá em Settings → Pages
3. Ative GitHub Pages
4. Link: `seu-usuario.github.io/monitora-fluxo-saude`

---

## 💻 Testar localmente (sem deploy)

### **Pré-requisitos:**
- Node.js instalado (https://nodejs.org)

### **Comandos:**

```bash
# 1. Instalar dependências
npm install

# 2. Executar em modo desenvolvimento
npm run dev

# 3. Acessar no navegador
# Abra: http://localhost:5173
```

### **Acessar do celular (mesma WiFi):**

```bash
# 1. Descobrir IP do computador
# Windows: ipconfig
# Mac/Linux: ifconfig

# 2. No celular, abra:
http://192.168.1.XXX:5173
# (substitua XXX pelo seu IP)
```

---

## 📦 Build de Produção

```bash
# Gerar versão otimizada
npm run build

# Pasta 'dist' será criada
# Pode hospedar em qualquer servidor web
```

---

## ✅ Checklist para funcionamento completo:

- [ ] Deploy feito em HTTPS (Vercel, Netlify já fazem isso)
- [ ] Celular com GPS ativado
- [ ] Permissão de localização concedida ao navegador
- [ ] Navegador atualizado (Chrome, Safari, Firefox, Edge)
- [ ] Internet ativa

---

## 🎯 Como funciona no celular:

1. **Usuário abre o app** no navegador
2. **App pede permissão** de localização
3. **Se próximo a uma unidade** (100m): Aparece pergunta rápida
4. **Se longe**: Apenas visualiza tempos de espera
5. **Usuário responde** perguntas em 3 cliques
6. **Dados são salvos** e média é atualizada

---

## 🔧 Configurações importantes:

### **Raio de detecção:**
- Atualmente: **100 metros**
- Para alterar: `/src/hooks/useGeolocation.ts` → linha com `isNearLocation(..., 100)`

### **Unidades cadastradas:**
- UPA Cidade Tiradentes
- UPA Itaquera  
- Hospital Cidade Tiradentes

### **Adicionar mais unidades:**
- Edite: `/src/app/data/mockData.ts`
- Adicione coordenadas GPS da nova unidade

---

## ❓ Problemas comuns:

**Pergunta rápida não aparece:**
- ✅ Verifique se está a menos de 100m da unidade
- ✅ Ative GPS no celular
- ✅ Permita localização no navegador
- ✅ Use HTTPS (Vercel/Netlify fazem automaticamente)

**App não instala na tela inicial:**
- ✅ Use HTTPS (localhost não funciona)
- ✅ Certifique-se que manifest.json está carregando

**Geolocalização não funciona:**
- ✅ HTTPS é obrigatório para GPS
- ✅ Verifique permissões do navegador

---

## 📞 Próximos passos:

- [ ] Conectar banco de dados real (Supabase, Firebase)
- [ ] Adicionar notificações push
- [ ] Implementar autenticação de usuários
- [ ] Adicionar mais unidades de saúde
- [ ] Criar painel administrativo

---

## 🌐 Links úteis:

- Vercel: https://vercel.com
- Netlify: https://netlify.com  
- Node.js: https://nodejs.org
- Documentação Vite: https://vitejs.dev

---

**Pronto! Seu app está pronto para ser usado no celular! 📱✨**
