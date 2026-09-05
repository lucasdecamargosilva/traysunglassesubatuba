# Provador Virtual — Sunglasses Ubatuba

Widget do Provou Levou preparado para a loja Tray `927097`.

> ✅ **Provador no ar.** O widget está ativo (`WIDGET_ENABLED = true` no topo
> de `widget-sunglasses-ubatuba.js`). Para tirar do ar sem quebrar a tag
> `<script>` da loja, basta mudar a flag para `false`.

## Arquivo de instalação

`widget-sunglasses-ubatuba.js`

URL publicada:

`https://lucasdecamargosilva.github.io/traysunglassesubatuba/widget-sunglasses-ubatuba.js`

O widget foi adaptado ao tema **Sunglasses Theme 1.0.2** e reconhece:

- páginas de produto Tray;
- galeria `.product-images` / `.product-gallery`;
- nome em `h1.product-name`;
- preço em `.product-price .current-price`;
- compra em `#button-buy.botao-comprar`;
- recomendações em `.section-product-related .product`.

## Configuração

- Domínio: `https://www.sunglassesubatuba.com.br`
- Store ID: `927097`
- WhatsApp: `5512996642840`
- Logo: imagem oficial hospedada na CDN da Tray
- Limite: `https://n8n.segredosdodrop.com/webhook/sunglassesubatuba-check-limit`

O cadastro no Provou Levou e o workflow `sunglassesubatuba-check-limit` foram provisionados em 04/09/2026. Para instalar manualmente no tema ou no GTM, use:

```html
<script src="https://lucasdecamargosilva.github.io/traysunglassesubatuba/widget-sunglasses-ubatuba.js" defer></script>
```
