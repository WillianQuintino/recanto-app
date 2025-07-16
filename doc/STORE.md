### ✅ Gerenciamento de estado com Redux Toolkit (Redux Toolkit modular state management)

> Use **Redux Toolkit (RTK)** para centralizar e organizar o estado global da aplicação com **fatias modulares (`slices`)**, **tipagem forte com TypeScript**, e **hooks reutilizáveis** para acesso simplificado e seguro ao estado.

---

## 🧠 Por que Redux Toolkit?

Redux Toolkit é a forma **recomendada oficialmente** de usar Redux desde 2019. Ele reduz a verbosidade do Redux tradicional e oferece:

* ✅ Sintaxe mais concisa (`createSlice`, `createAsyncThunk`)
* ✅ Melhor integração com TypeScript
* ✅ Fluxo de ações mais previsível
* ✅ Middleware e DevTools embutidos

---

## 🧱 Estrutura recomendada

```
store/
├── slices/
│   ├── authSlice.ts
│   ├── productSlice.ts
│   └── ...
├── hooks.ts          ← Ganchos customizados para Redux com tipagem
└── index.ts          ← Criação da store e configuração global
```

---

## 📦 `store/index.ts` — Criação da store Redux

```ts
// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## 🪝 `store/hooks.ts` — Ganchos tipados

Facilita o uso de `useSelector` e `useDispatch` com autocompletar e verificação de tipos:

```ts
// store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

---

## 🍰 Exemplo de uma slice: `store/slices/productSlice.ts`

```ts
// store/slices/productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductState {
  list: Product[];
  loading: boolean;
}

const initialState: ProductState = {
  list: [],
  loading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.list = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setProducts, setLoading } = productSlice.actions;
export default productSlice.reducer;
```

---

## 🧪 Usando no componente com os hooks:

```tsx
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setProducts } from "@/store/slices/productSlice";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.list);

  useEffect(() => {
    fetchProducts().then((data) => dispatch(setProducts(data)));
  }, [dispatch]);

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
};
```

---

## 🔥 Vantagens dessa abordagem

| Vantagem                  | Resultado                                          |
| ------------------------- | -------------------------------------------------- |
| 🧩 Modulado por recurso   | Cada slice cuida de uma funcionalidade específica  |
| 🧠 Tipagem forte          | Segurança, autocompletar e documentação automática |
| ♻️ Reutilização de lógica | Ganchos genéricos e funções puras                  |
| ✅ Previsibilidade         | Estado global 100% controlado e rastreável         |
| 🧪 Testável               | Fácil de testar reducers e ações                   |

---

## 📌 Dica extra: `createAsyncThunk` para requisições assíncronas

```ts
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await apiClient.get<Product[]>("/products");
  return response.data;
});
```

---

## ✅ Em resumo

A arquitetura com Redux Toolkit modular:

* Organiza o estado por **slices isoladas e coerentes**
* Usa **tipagem forte com TypeScript**
* Permite acesso ao estado com **hooks reutilizáveis (`useAppSelector`, `useAppDispatch`)**
* Escala naturalmente com o projeto