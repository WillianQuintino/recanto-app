### 🧩 **Componentes e UI**

#### ✅ [DaisyUI](https://daisyui.com)

* **Evite misturar componentes da UI com lógica complexa.** Extraia lógica para hooks.
* Use classes do DaisyUI **via constantes ou Tailwind Variants**, para evitar duplicação.
* Crie uma **pasta `components/ui/`** com wrappers padronizados se quiser adaptar ou extender.

#### ✅ [shadcn/ui](https://ui.shadcn.com)

* **Crie componentes adaptados em `components/ui/`**, com nomes de domínio da aplicação (ex: `ProductCard`, `UserDropdown`).
* Utilize o `className` e o `variant` pattern com `tailwind-variants` para manter consistência visual.
* Evite modificar os componentes diretamente; prefira wrappers com props estendidas.

#### ✅ [Lucide](https://lucide.dev)

* **Centralize os ícones usados em um único arquivo `icons/index.ts`** para padronização.
* Nomeie semanticamente (ex: `TrashIcon`, `EditIcon`) e não apenas pela aparência (`SquareIcon`).

#### ✅ [Hero UI](https://www.heroui.com)

* **Evite usar diretamente os exemplos de UI com lógica embutida**. Separe a visualização da lógica.
* Adapte os exemplos à sua arquitetura de componentes, mantendo consistência nos nomes e props.

---

### 💻 **Backend desktop & estado**

#### ✅ [Tauri](https://v2.tauri.app)

* Separe a lógica de chamadas com `invoke` em **arquivos isolados** (`src-tauri/api/xyz.rs`).
* Crie wrappers JS/TS para chamadas Tauri (ex: `tauriClient.ts`) e mantenha tipagem entre camadas.
* Use um adaptador entre o React e o Tauri para manter o React desacoplado do `window.__TAURI__`.

#### ✅ [Jotai](https://jotai.org)

* Organize os átomos em uma pasta `state/` por recurso: `authAtom.ts`, `themeAtom.ts`.
* Evite criar um átomo para cada valor. Prefira **objetos atômicos** e use `atomWithStorage` para persistência.
* Use **atom selectors (`atom(get => ...)`)** para derivar estado sem duplicar lógica.

---

### 🔗 **HTTP e validação**

#### ✅ [Axios](https://axios-http.com)

* Crie um único `apiClient.ts` com interceptadores, tratamento de erros e baseURL global.
* Evite chamadas diretas ao `axios.get()` dentro dos componentes. Prefira services como `productService.getAll()`.
* Tipagem sempre com generics: `axios.get<Product[]>("/products")`.

#### ✅ [Zod](https://zod.dev)

* Centralize esquemas por recurso: `schemas/productSchema.ts`, `schemas/userSchema.ts`.
* **Integre com React Hook Form** e `SWR` para validações automáticas.
* Crie schemas compostos (ex: `LoginSchema.extend({ rememberMe: z.boolean() })`).

#### ✅ [React Hook Form](https://www.react-hook-form.com)

* Prefira `useForm({ resolver: zodResolver(schema) })` com `Zod` para validação tipada.
* **Crie componentes de formulário reutilizáveis** com `useFormContext()` para inputs comuns.
* Nomeie campos com clareza (`user.email`, `product.price`) e use tipagem `FormValues` com Zod.

#### ✅ [SWR](https://swr.vercel.app/pt-BR)

* Armazene fetchers nomeados como `productFetcher`, `userFetcher` em `services/`.
* Use `useSWR(key, fetcher)` com chaves semânticas (`"/products"` → `"/products?search=laptop"`).
* Integre com Jotai ou Zustand para **revalidação otimista e cache compartilhado.**

---

### 📁 **Upload, estilo, senhas e persistência**

#### ✅ [react-dropzone](https://react-dropzone.js.org)

* Separe o Dropzone em um componente isolado: `components/common/FileDropzone.tsx`.
* Exporte callbacks como `onDropAccepted`, `onDropRejected` e evite lógica inline.
* Valide tipos de arquivos com `Zod` antes de subir.

#### ✅ [Tailwind Variants](https://www.tailwind-variants.org)

* Crie **componentes com variantes nomeadas** (ex: `button({ variant: "primary" })`).
* Centralize configurações em `styles/variants/`, evite misturar com JSX diretamente.
* Reutilize variantes em DaisyUI/ShadCN sem repetir classes.

#### ✅ [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)

* **Nunca use diretamente nos componentes.** Crie uma abstração `utils/hash.ts`.
* Sempre compare senhas com `await bcrypt.compare()` e salve com `await bcrypt.hash(...)`.
* Para Tauri, use do lado Rust (mais seguro) via `argon2` ou `bcrypt` do lado nativo.

#### ✅ [sqlite3 (Node)](https://www.npmjs.com/package/sqlite3)

* Crie um **repositório (ex: `userRepository.ts`)** com métodos de leitura/escrita, e não chame SQL direto na UI.
* Use DDL (migrations) e centralize no `database/` ou `db/schema.sql`.
* Nunca misture SQL com lógica visual; separe em camadas: `db → service → ui`.

#### ✅ [localForage](https://localforage.github.io/localForage/)

* Crie um `storage.ts` para wrappers como:

  ```ts
  export const saveToken = async (token: string) => localforage.setItem("token", token);
  ```
* Prefira usar dentro de effects, contextos ou hooks, e não diretamente nos componentes.
* Combine com `Zod` para validar os dados ao carregar do armazenamento.

---

### 📚 **Documentação e testes**

#### ✅ [storybook](https://storybook.js.org)

* Crie `*.stories.tsx` para cada componente em `components/ui/` ou `components/common/`.
* Mantenha stories pequenos e representativos (um por variação visual).
* Use **args** + **controls** para simular diferentes estados, evitando lógica complexa nos stories.

---

## ✅ Resumo geral: princípios de *Clean Code* aplicáveis a todos

| Princípio                          | Aplicação                                                                  |
| ---------------------------------- | -------------------------------------------------------------------------- |
| **Separação de responsabilidades** | Cada ferramenta faz apenas uma coisa (UI ≠ lógica ≠ API)                   |
| **Nomeação clara**                 | Evite nomes genéricos: use `AuthForm`, `ProductCard`, `getUserById`        |
| **Componentização**                | Divida grandes partes em pequenos blocos reutilizáveis                     |
| **Evite duplicações**              | Crie helpers, constantes e utilitários                                     |
| **Tipagem forte**                  | Com Zod, TS e generics no Axios/SWR                                        |
| **Arquitetura modular**            | Pasta por recurso (ex: `features/products`) com hooks, componentes, slices |
| **Código testável**                | Separe lógica para ser usada fora da UI, use hooks e services isolados     |
