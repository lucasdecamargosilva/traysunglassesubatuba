# Provador Virtual — Sunglasses Ubatuba

Widget do Provou Levou preparado para a loja Tray `927097`.

## Arquivo de instalação

`widget-sunglasses-ubatuba.js`

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

Antes de publicar, cadastre a chave do widget na base do Provou Levou e ative o workflow `sunglassesubatuba-check-limit`. Depois hospede o JS e injete a URL resultante em **Minha Loja > Design da Loja > Incluir código HTML** ou pela API de scripts da Tray.
