/* Provador Virtual — Sunglasses Ubatuba (Tray 927097). */
(function () {
    // ─── KILL SWITCH ─────────────────────────────────────────────────────────
    // Provador tirado do ar a pedido do lojista. Enquanto WIDGET_ENABLED for
    // false o script continua hospedado (a tag <script> da loja não quebra),
    // mas nada é renderizado: sem selo/SEO badge, sem botão e sem modal.
    // Para religar o provador, basta voltar este valor para true.
    var WIDGET_ENABLED = true;
    if (!WIDGET_ENABLED) return;

    function toJpeg(file){return new Promise(function(res){try{var img=new Image();var u=URL.createObjectURL(file);img.onload=function(){URL.revokeObjectURL(u);var w=img.naturalWidth||img.width,h=img.naturalHeight||img.height;if(!w||!h){res(file);return;}var sc=Math.min(1,1280/Math.max(w,h));var cw=Math.round(w*sc),ch=Math.round(h*sc);var c=document.createElement('canvas');c.width=cw;c.height=ch;c.getContext('2d').drawImage(img,0,0,cw,ch);c.toBlob(function(b){res(b||file);},'image/jpeg',0.92);};img.onerror=function(){URL.revokeObjectURL(u);res(file);};img.src=u;}catch(e){res(file);}});}

    function isValidBRPhone(nums) {
        function setErr(msg) {
            var el = document.getElementById('q-phone-error');
            if (el) el.textContent = msg;
        }
        if (nums.length < 10) { setErr('N\u00famero incompleto — informe DDD + n\u00famero'); return false; }
        if (nums.length > 11) { setErr('N\u00famero longo demais'); return false; }
        if (!/^[1-9][1-9]/.test(nums)) { setErr('DDD inv\u00e1lido'); return false; }
        if (nums.length === 11 && nums[2] !== '9') { setErr('Celular deve come\u00e7ar com 9 ap\u00f3s o DDD'); return false; }
        var local = nums.length === 11 ? nums.slice(3) : nums.slice(2);
        if (/^(\d)\1+$/.test(local)) { setErr('N\u00famero n\u00e3o parece real — confira'); return false; }
        if (/(\d)\1{5,}/.test(local)) { setErr('N\u00famero n\u00e3o parece real — confira'); return false; }
        // so 1-2 digitos distintos = fake (99996666, 54545454, 56565656)
        if (new Set(local).size <= 2) { setErr('N\u00famero n\u00e3o parece real — confira'); return false; }
        if (/^(?:01234567|12345678|23456789|34567890|98765432|87654321|76543210|0123456789|1234567890)/.test(local)) { setErr('N\u00famero n\u00e3o parece real — confira'); return false; }
        return true;
    }


    // ─── SEO BACKLINK BADGE (mini logo discreto pro crawler do Google) ───
    (function() {
        function injectPLBadge() {
            try {
                if (document.querySelector('.pl-seo-badge')) return;
                var path = window.location.pathname;
                if (path.toLowerCase().includes('/lentes')) return;
                var isProduct = path.includes('/produto/') || path.includes('/produtos/') || path.includes('/products/') || path.includes('/p/') || document.querySelector('meta[property="og:type"][content="product"]');
                if (!isProduct) return;
                var b = document.createElement('div');
                b.className = 'pl-seo-badge';
                b.style.cssText = 'text-align:center;padding:4px 0;margin:0;opacity:0.5;line-height:1;';
                var a = document.createElement('a');
                a.href = 'https://provoulevou.com.br?utm_source=widget&utm_medium=lojista&utm_campaign=sunglassesubatuba';
                a.target = '_blank';
                a.rel = 'noopener';
                a.title = 'Provador Virtual de Óculos — Provou Levou';
                a.style.cssText = 'display:inline-block;text-decoration:none;border:0;outline:0;';
                var img = document.createElement('img');
                img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOUAAAAoCAMAAAA2Yc1OAAAAYFBMVEUAAAB2Muz18f18DvaRWfFsZ/wAAP8AAAAAAAAAAAB8Oe17Ou3/AP+pVP+0jvTJr/dVVaqHO/t/AH+AO/R/P7+AO/SAO/QAAAB7Oe0AAACDPfp9O/V7Oe17OOwAAAB7OezQS/HyAAAAIHRSTlNg6f8E/gMBry/Sr08BA//+AyMCawTFlQD8+/4Kki6QcnVUoNsAAAaeSURBVHja3ZoJc9sqEIBFEKADOc7RhyyE9P//ZXeX21frmcZvEqbjRIBcPu29SmPSEPZoqiGsMD9jNAlJwoe2gochLKfpn0QpgcZ9DGwuBhtWZwzXTz6RlF9FCWIbf83LspSUcLn8Gn+EOBuvlnyoCTPpwM3xmQeyML6EkhvLrjISJ3NPlKY1+7Ksxv57Sq7vQALmbCX//pTCDHcgUZr2KL875QRfXGMx+ldg7rDpe1NKac9k176+vBzqKWv0/0Ap0BN5nwDxO59AQ1CnmDPZz8laHmfzFi5qG2usGWtRti84Xs+EaZ9OGV2evOX70rz4owiac6tkry8tm+GjskxDz6aBYUy39X2vms4UU41S6K27TdFaXgmjgwu8oaF7ty5NlhsqSkxT9nXdITE5Gu3cmzUyZA32zTkJs3xch2H9wNQF1uxb2sKdc6K2yzOFZS8vDAV6YJcqu51OPX74QSdUaaqhi7x2wpU4cKUzTR/XFSHTpB/4FSWlCGnKMrPRfGoI5yxYzQRiWQZw+yNbaMwrN9yaNSqBJCRneEnpzs0SpMhaFGgxHKUGcBSVIE+nzR9fNQGsP5VrW8GAyMo0xToulZRNTYkukVIx/FyNRAfpz00MyyiBal58pMOQzv9EeSWMgG3WwWQkL+sJ+6YDDc3iQ7heqa6Pa0G04TlEho4gFW6gx3FPlgL9/jKMzo1gT+1OZN45WIl+xIYN1rqdYp19mBJMszLLmnLLBz8FJe2j/qlyTfmDJ71OWu6/SN2h5KBg8IPGSmIklX03ProjTt4AAPjro5QoSXaLMtlaQ4dWaeqUofxak6i6eBllS8p9hxKPPJjJCixxGUCQAPHgOiAAOzsKqzX38f5BWTIfSWqzLCiz3yR5qDjVVGt9EJ7KRleItngMN7wP/JfujWO8tHxHMXLmVRYVdmHCshTeNCdDfYSSUUrQHiBglpwFpan8Zj57eeSwM23vETcrdHhE221KlFyOoXMQFcYzUtidXKYL6XXQ4QcoD16MHpbdp4wkfXnM0t10QbzduTMK4LcpUQf3NOjMxAWn8MzwGFiMjlaSfv8tJSlrm34/QExh55T9LUp1SellGKPEI5RriCEhIOKZJUMZWogpQGTGHD+NNQ9Qevllt8MO2Tz/gvKKLONcj3zdo5RzHa8N4VnUzpEuWMS4pOS3KNl8bovA/BqnrmpsH+wyU9Z22QVV7fzKI3aJRmjLIaJvtVjvci/LUA5OZ3apS1lyO8lM2QbBtW2KJq9RvLd9bJ8pr/hYnxlFcd/3sercLtlFbo5uR4akwWcGAVOQw11zmu8Spa9dAmUqtlpvmGih5HyCqd6Kl1umNJdrwSJ7j189BhXjZZMfWUFJxxSThjFN7r919zkP6CV0NRwGFAw1nKpe8e5CBF1WTdmRTvkgiPVjhKdBlG1W1gNCJci5pZmbuU9XUG55rTtFKeFclOEpi87nSV1WYnW6iJcrtoglF2Zt28F8SlJWB9mcfAdxMUTGkgsKM8wQuDdOaCRPFh8FUYJUF9R9jZTgZ1LUQJ+D4bJloWfAGHKXeSzWE10EzpRkp4rKsPwwwh35uWDR1akA3FeJbZn7eGnQ8FnP0XwSjU8GPnEWvRBleJTjFrfsS9BYzpEX0mCsSSBvhajhR8h9WhYnUJnxHhE1NpcVylSUXVlyqHKuyF7L2qwsUs5yH+q3jVZzt3qxkrktvgh8RzXFqngHBbUjZevCV5Ahv/eUPqTg7VBfstAeCD0C5m0zT+FVUV+qsvCqfEqnqqIsCbhKb/3ou3qiqSsvbhzDwooxLKwGTt01LXBuoOft+45xAyKhZs9Ui4GTGpagsQPMtSN2RLC2ObzCOOCIGfvBixd/xK8O7r5R6EE3L6Bm24ooSEuwlkMKrjflBirTmuoG3N/574my5NQHT0WyjN0SrCwn/zYgbVgGi80CoddwvXsfxelZgCg1byZSfJZGSgqKGbCAz8vI/yUvSWJjAxykWwfGBmx4yLgGnY7YTUwb6GWOX3cfK3RIQKVhX8wJ3ixlBVywu+1YVPvwSujrKfPQvHobd2+Dfvc/j+dtL0N2JpBSXO0WXKm7nkOZG45HK+T7ZItETQpRNq1wgzwWb12hVIPOpcZOZdpHTc0GM6T1fm99jU3nZ8ryX79BkJO89woBXFzUme9MCRoubksTIKU2P4DSaG32+cb7y93ktwdVI/n7vXGHZNCuRd2a6teVUogf89cTE+ZKO3Tk81j38c087W3Xc/5GRF9932P5T4A0vwEkzAGPQIFmHAAAAABJRU5ErkJggg==';
                img.alt = 'Provador Virtual de Óculos — Provou Levou';
                img.style.cssText = 'height:12px;width:auto;border:0;display:block;';
                a.appendChild(img);
                b.appendChild(a);
                document.body.appendChild(b);
            } catch(e) {}
        }
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectPLBadge);
        else injectPLBadge();
        setTimeout(injectPLBadge, 2500);
    })();



    // ─── 0. CONFIG — Sunglasses Ubatuba (Tray store 927097) ───────────────────
    const apiKey = '708bcc23873bb1bf0bf05b7daac3219e7318b9c7918768e2f15272e4853239dc';
    window.PROVOU_LEVOU_API_KEY = apiKey;

    let BUTTON_MODE = 'both';   // selo na foto + botão inline acima do "Comprar com Grau"
    const STORE_ID = '927097';
    const API_HOST = 'https://lojista.provoulevou.com.br';
    const WEBHOOK_PROVA = 'https://n8n.segredosdodrop.com/webhook/gerador-oculos';
    const WEBHOOK_CHECK_LIMIT = 'https://n8n.segredosdodrop.com/webhook/sunglassesubatuba-check-limit';
    const WEBHOOK_BUY_CLICK = 'https://n8n.segredosdodrop.com/webhook/pl-provador-buy-click';
    const STORE_WHATSAPP = '5512996642840'; // WhatsApp da loja (12) 99664-2840
    const WEBHOOK_PIX = 'https://n8n.segredosdodrop.com/webhook/cacife-pix';
    const WEBHOOK_PIX_STATUS = 'https://n8n.segredosdodrop.com/webhook/cacife-pix-status';
    const STORE_LOGO = 'https://images.tcdn.com.br/files/927097/themes/27/img/settings/logo-site2.png?aad54a79e3189d32cb182a5f29804b4e';
    const PROVOU_LOGO = 'data:image/png;base64,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';
    const STAMP_SRC = 'https://cdn.shopify.com/s/files/1/0636/6334/1746/files/logo_provador.png?v=1772494793';

    // ─── 1. DESIGN FETCH ─────────────────────────────────────────────────────────
    var _fetchedDesign = null;
    var CACHE_KEY = 'pl_design_' + STORE_ID;
    var CACHE_TTL = 5 * 60 * 1000;

    function getCachedDesign() {
        try {
            var c = localStorage.getItem(CACHE_KEY);
            if (c) { var p = JSON.parse(c); if (Date.now() - p.timestamp < CACHE_TTL) return p.data; }
        } catch (e) {}
        return null;
    }

    function cacheDesign(data) {
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data: data, timestamp: Date.now() })); } catch (e) {}
    }

    function loadGoogleFont(family) {
        if (!family || family === 'Inter') return;
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = 'https://fonts.googleapis.com/css2?family=' + family.replace(/ /g, '+') + ':wght@400;500;600;700;800&display=swap';
        document.head.appendChild(l);
    }

    function applyDesignToElement(el, design, isPhotoButton) {
        if (!el || !design) return;
        if (design.backgroundColor) el.style.setProperty('background-color', design.backgroundColor, 'important');
        if (design.textColor) el.style.setProperty('color', design.textColor, 'important');
        var bw = design.borderWidth !== undefined ? design.borderWidth : 1;
        el.style.setProperty('border', bw + 'px solid ' + (design.borderColor || '#000'), 'important');
        if (design.borderRadius !== undefined) el.style.setProperty('border-radius', design.borderRadius + 'px', 'important');
        if (design.fontFamily) el.style.setProperty('font-family', design.fontFamily + ', sans-serif', 'important');
        if (design.fontSize) el.style.setProperty('font-size', design.fontSize + 'px', 'important');
        if (design.fontWeight) el.style.setProperty('font-weight', design.fontWeight, 'important');
        if (design.textTransform) el.style.setProperty('text-transform', design.textTransform, 'important');
        if (design.letterSpacing !== undefined) el.style.setProperty('letter-spacing', design.letterSpacing + 'px', 'important');
        if (design.height !== undefined) {
            el.style.setProperty('height', design.height + 'px', 'important');
            if (isPhotoButton) el.style.setProperty('width', design.height + 'px', 'important');
        }
        if (design.shadow) {
            el.style.setProperty('box-shadow', '0 4px 12px rgba(0,0,0,' + (design.shadowIntensity || 0.15) + ')', 'important');
        } else {
            el.style.setProperty('box-shadow', 'none', 'important');
        }
        if (isPhotoButton) el.style.setProperty('filter', 'none', 'important');
        if (design.gradient) {
            el.style.setProperty('background', 'linear-gradient(' + design.gradient.direction + ',' + design.gradient.colors[0] + ',' + design.gradient.colors[1] + ')', 'important');
        }
        if (design.customCSS) el.style.cssText += ';' + design.customCSS;
    }

    function applyDesignToButtons() {
        if (!_fetchedDesign) return;
        var d = _fetchedDesign;

        var buyBtn = document.querySelector('.q-btn-inline-provador');
        if (buyBtn && d.buy_button) {
            applyDesignToElement(buyBtn, d.buy_button, false);
            if (d.buy_button.label) {
                var tn = buyBtn.lastChild;
                if (tn && tn.nodeType === 3) tn.textContent = d.buy_button.label;
            }
        }

        var photoBtn = document.querySelector('.q-btn-trigger-ia');
        if (photoBtn && d.photo_button) {
            applyDesignToElement(photoBtn, d.photo_button, true);
            photoBtn.style.setProperty('position', 'absolute', 'important');
            photoBtn.style.setProperty('top', '15px', 'important');
            photoBtn.style.setProperty('right', '15px', 'important');
            photoBtn.style.setProperty('z-index', '9999', 'important');
        }

        if (d.button_mode) BUTTON_MODE = d.button_mode;
        if (BUTTON_MODE === 'image') {
            var ib = document.querySelector('.q-btn-inline-provador');
            if (ib) ib.style.display = 'none';
        } else if (BUTTON_MODE === 'buy') {
            var pb = document.querySelector('.q-btn-trigger-ia');
            if (pb) pb.style.display = 'none';
        }

        if (d.custom_logo) {
            var logoEl = document.querySelector('#q-header-provador img');
            if (logoEl) logoEl.src = d.custom_logo;
        }

        // Na vitrine da Sunglasses Ubatuba, o provador deve funcionar como uma
        // ação secundária: sem preenchimento e com contorno fino da marca.
        if (buyBtn) {
            buyBtn.style.setProperty('background', 'transparent', 'important');
            buyBtn.style.setProperty('background-color', 'transparent', 'important');
            buyBtn.style.setProperty('color', '#a9545a', 'important');
            buyBtn.style.setProperty('border', '1px solid #feb3b6', 'important');
        }
    }

    function fetchDesignFromAPI() {
        if (!STORE_ID || !API_HOST) return Promise.resolve(null);
        var cached = getCachedDesign();
        if (cached) return Promise.resolve(cached);
        return fetch(API_HOST + '/api/design/' + STORE_ID)
            .then(function(r) { return r.ok ? r.json() : null; })
            .then(function(data) {
                if (!data) return null;
                cacheDesign(data);
                if (data.photo_button && data.photo_button.fontFamily) loadGoogleFont(data.photo_button.fontFamily);
                if (data.buy_button && data.buy_button.fontFamily) loadGoogleFont(data.buy_button.fontFamily);
                return data;
            })
            .catch(function() { return null; });
    }

    fetchDesignFromAPI().then(function(d) {
        if (!d) return;
        _fetchedDesign = d;
        applyDesignToButtons();
    });

    // ─── 2. UTILS ─────────────────────────────────────────────────────────────────
    let currentProduct = { category: 'top', fit: 'regular' };

    function detectProduct(name) {
        const n = name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        if (/tailoring/.test(n) || /calca|bermuda|sweatpant/.test(n)) return { category: 'bottom', fit: 'tailoring' };
        if (/boxy.*(hoodie|crewneck)/.test(n)) return { category: 'top', fit: 'boxyHoodie' };
        if (/puffer|jacket/.test(n)) return { category: 'top', fit: 'puffer' };
        if (/vest/.test(n)) return { category: 'top', fit: 'vest' };
        if (/(hoodie|half zip|crewneck)/.test(n) && !/oversized|boxy/.test(n)) return { category: 'top', fit: 'hoodie' };
        if (/oversized/.test(n)) return { category: 'top', fit: 'oversized' };
        return { category: 'top', fit: 'regular' };
    }

    // ─── 3. SCROLL LOCK ──────────────────────────────────────────────────────────
    let scrollY = 0;
    function lockBodyScroll() {
        scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = '-' + scrollY + 'px';
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflowY = 'scroll';
    }
    function unlockBodyScroll() {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflowY = '';
        window.scrollTo(0, scrollY);
    }

    // ─── 4. ESTILOS (design Califa) ───────────────────────────────────────────────
    const styles = `
/* PL: borda arredondada do modal */@media(min-width:768px){.q-card-ia,.q-card,#q-card-ia,#q-card,.q-modal-card{border-radius:16px !important;overflow:hidden;}}
        /* ── Fontes ── */
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');

        :root {
            --c-bg: #ffffff;
            --c-surface: #fff7f7;
            --c-ink: #171717;
            --c-muted: #7f7475;
            --c-line: #f1dadd;
            --c-primary: #feb3b6;
            --c-primary-hover: #f59fa4;
            --c-accent: #feb3b6;
            --c-danger: #cc3333;
            --font-display: 'Montserrat', sans-serif;
            --font-body: 'Montserrat', sans-serif;
        }

        /* ── Trigger (selo sobre foto) ── */
        @keyframes q-shake { 0%,50%,100%{transform:rotate(0deg)} 10%,30%{transform:rotate(-10deg)} 20%,40%{transform:rotate(10deg)} }
        .q-btn-trigger-ia {
            position: absolute; top: 14px; right: 70px; z-index: 10;
            background: none; border: none; padding: 0; cursor: pointer;
            width: 70px; height: 70px;
            display: flex; align-items: center; justify-content: center;
            filter: drop-shadow(0 3px 10px rgba(0,0,0,0.22));
            animation: q-shake 3s infinite;
            transition: filter 0.2s;
        }
        .q-btn-trigger-ia:hover { filter: drop-shadow(0 6px 18px rgba(0,0,0,0.32)); }
        .q-btn-trigger-ia img { width: 100%; height: 100%; object-fit: contain; }
        @media (min-width: 768px) { .q-btn-trigger-ia { width: 70px; height: 70px; } }

        /* Fonte da loja (Montserrat) nos controles do modal — input/button/select não herdam */
        #q-modal-ia, #q-modal-ia input, #q-modal-ia button, #q-modal-ia select, #q-modal-ia textarea { font-family: 'Montserrat', sans-serif; }

        /* ── Inline button ── */
        .q-btn-inline-provador {
            display: flex; align-items: center; justify-content: center; gap: 7px;
            width: 100%; padding: 13px 16px;
            background: transparent; color: var(--c-ink);
            border: 1.5px solid var(--c-ink); border-radius: 14px;
            font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
            cursor: pointer; transition: opacity 0.2s;
            margin: 10px 0; box-sizing: border-box;
        }
        .q-btn-inline-provador:hover { opacity: 0.6; }
        .q-btn-inline-provador svg { width: 14px; height: 14px; flex-shrink: 0; }

        /* ── Resultado: info do produto + comprar agora (igual Univisão) ── */
        .q-result-prodinfo { text-align: left; margin-bottom: 10px; }
        .q-result-prodname { font-family: var(--font-body); font-size: 20px; font-weight: 700; color: var(--c-ink); line-height: 1.25; margin-bottom: 6px; }
        .q-result-prodprice { font-family: var(--font-display); font-size: 28px; letter-spacing: .5px; font-weight: 700; color: var(--c-ink); line-height: 1; }
        .q-result-installment { font-family: var(--font-body); font-size: 12px; color: var(--c-muted); margin-top: 4px; letter-spacing: .2px; }
        .q-seals { display: flex; justify-content: flex-start; gap: 30px; margin: 8px 0; padding: 12px 0; border-top: 1px solid var(--c-line); border-bottom: 1px solid var(--c-line); }
        .q-seal { display: flex; align-items: center; gap: 9px; }
        .q-seal > i { font-size: 24px; color: var(--c-primary, #111111); flex-shrink: 0; }
        .q-seal span { font-family: var(--font-body); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .6px; line-height: 1.25; color: var(--c-ink); text-align: left; }
        .q-btn-buy-now {
            width: 100%; padding: 16px 18px; margin-bottom: 10px;
            background: var(--c-primary, #111111); color: #fff; border: 1px solid var(--c-primary, #111111);
            border-radius: 14px; font-family: var(--font-body);
            font-weight: 700; font-size: 15px; letter-spacing: .3px; cursor: pointer;
            display: flex; align-items: center; justify-content: center; gap: 8px;
            transition: opacity .2s; box-sizing: border-box; line-height: 1.2; text-decoration: none;
        }
        .q-btn-buy-now:hover { opacity: .85; }
        #q-buy-success { display: none; flex-direction: column; gap: 10px; }
        .q-buy-ok-msg {
            display: flex; align-items: center; justify-content: center; gap: 8px;
            background: #e8f5e9; color: #1b7e2e; border: 1px solid #b6e0bd;
            border-radius: 14px; padding: 14px 16px; font-family: var(--font-body);
            font-weight: 700; font-size: 14.5px; line-height: 1.3; text-align: center;
        }
        .q-buy-ok-msg i { font-size: 20px; }
        /* Resultado enxuto: só comprar (esconde voltar/tentar) */
        .q-card-ia.is-result #q-btn-back,
        .q-card-ia.is-result #q-retry-btn { display: none !important; }

        /* ── Modal overlay ── */
        @keyframes q-modal-in { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        #q-modal-ia {
            display: none; position: fixed; inset: 0; z-index: 999999;
            background: rgba(250,226,228,0.96);
            font-family: var(--font-body);
            overflow-y: auto; box-sizing: border-box;
        }
        #q-modal-ia * { box-sizing: border-box; }

        /* ── Card ── */
        .q-card-ia {
            width: 100%; min-height: 100vh;
            background: var(--c-bg); color: var(--c-ink);
            display: flex; flex-direction: column; position: relative;
            animation: q-modal-in 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        @media (min-width: 768px) {
            #q-modal-ia { display: none; align-items: center; justify-content: center; }
            .q-card-ia {
                width: 440px; max-width: 92vw; min-height: auto;
                max-height: 96vh; border: none;
                box-shadow: 0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06);
                overflow: hidden;
            }
        }

        /* ── Close ── */
        .q-close-ia {
            position: absolute; top: 18px; right: 18px;
            background: none; border: none;
            font-size: 26px; font-weight: 300; color: var(--c-muted);
            cursor: pointer; z-index: 10; line-height: 1; padding: 4px 6px;
            transition: color 0.2s;
        }
        .q-close-ia:hover { color: var(--c-ink); }

        /* ── Content scroll ── */
        .q-content-scroll {
            flex: 1; padding: 0; overflow-y: auto;
            text-align: left; display: flex; flex-direction: column;
        }
        .q-content-scroll::-webkit-scrollbar { width: 3px; }
        .q-content-scroll::-webkit-scrollbar-thumb { background: var(--c-line); }

        @media (max-width: 767px) {
            #q-modal-ia { display:none; overflow-y:auto; align-items:flex-start; justify-content:center; }
            #q-modal-ia[style*="flex"] { display:flex !important; }
            .q-card-ia { width:100%; border:none; margin:0; min-height:100svh; }
            .q-content-scroll { flex: 1; }
        }

        /* ── Header strip ── */
        #q-header-provador {
            padding: 28px 28px 0;
            display: flex; flex-direction: column; align-items: center;
            text-align: center; gap: 10px;
            border-bottom: 1px solid var(--c-line);
            padding-bottom: 22px; margin-bottom: 0;
        }
        #q-header-provador h1 {
            margin: 0;
            font-family: var(--font-display);
            font-size: 19px; letter-spacing: 2px;
            color: var(--c-ink); text-transform: uppercase;
            font-weight: 700; line-height: 1;
        }

        /* ── Main step ── */
        #q-step-photo {
            display: flex; flex-direction: column; padding: 28px 28px 32px;
            gap: 0; align-items: stretch;
        }

        /* ── Labels & inputs ── */
        .q-field-label {
            display: block; font-size: 10px; font-weight: 600;
            letter-spacing: 2px; text-transform: uppercase;
            color: var(--c-muted); margin-bottom: 8px;
        }
        .q-phone-wrap { margin-bottom: 28px; }
        .q-input {
            display: block; width: 100%; height: 52px;
            padding: 0 16px; margin: 0;
            background: var(--c-surface); border: 1.5px solid var(--c-line);
            border-radius: 26px;
            font-size: 16px; font-family: var(--font-body); font-weight: 400;
            color: var(--c-ink); outline: none;
            -webkit-appearance: none; appearance: none; transition: border-color 0.2s;
        }
        .q-input:focus { border-color: var(--c-ink); background: #fff; }
        .q-input::placeholder { color: #bbb; }
        .q-status-msg {
            display: none; font-size: 11px; color: var(--c-danger);
            font-weight: 500; margin-top: 6px; letter-spacing: 0.3px;
        }

        /* ── Contador de provas restantes (pílula com fundo) ── */
        .q-provas-msg {
            display: table; margin: -8px auto 18px;
            font-size: 12px; font-weight: 600; letter-spacing: .3px;
            color: var(--c-ink); text-align: center;
            background: var(--c-surface); border: 1px solid var(--c-line);
            border-radius: 999px; padding: 5px 14px;
        }
        .q-provas-msg:empty { display: none; }

        /* ── Section label ── */
        .q-section-label {
            font-family: var(--font-display);
            font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase;
            color: var(--c-ink); margin: 0 0 14px; font-weight: 600;
            text-align: center;
        }

        /* ── Tip ── */
        .q-tip-box {
            display: flex; align-items: center; gap: 9px;
            background: var(--c-surface);
            padding: 11px 14px; margin-bottom: 20px;
            font-size: 11.5px; color: var(--c-muted); line-height: 1.45;
            border-radius: 6px;
        }
        .q-tip-box i { color: var(--c-ink); font-size: 15px; flex-shrink: 0; }

        /* ── Face frame ── */
        @keyframes q-frame-pulse { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
        .q-face-frame {
            position: relative; width: 200px; height: 260px;
            margin: 0 auto 24px; cursor: pointer;
            display: flex; align-items: center; justify-content: center;
            overflow: hidden; background: var(--c-surface);
            border-radius: 4px;
            transition: transform 0.2s;
        }
        .q-face-frame:hover { transform: scale(1.015); }
        .q-face-frame img { width: 100%; height: 100%; object-fit: cover; display: none; }
        .q-face-placeholder { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .q-face-placeholder i { font-size: 72px; color: #d0d0d0; }
        /* Corner marks — clean editorial style */
        .q-face-corner {
            position: absolute; width: 20px; height: 20px;
            border-color: var(--c-ink); border-style: solid;
            transition: border-color 0.2s;
        }
        .q-face-corner-tl { top: 0; left: 0; border-width: 2px 0 0 2px; }
        .q-face-corner-tr { top: 0; right: 0; border-width: 2px 2px 0 0; }
        .q-face-corner-bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
        .q-face-corner-br { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

        /* ── Upload buttons ── */
        .q-upload-btns {
            display: grid; grid-template-columns: 1fr 1fr;
            gap: 8px; width: 100%; margin-bottom: 24px;
        }
        .q-upload-btn {
            display: flex; align-items: center; justify-content: center; gap: 7px;
            padding: 12px 8px;
            border: 1.5px solid var(--c-line);
            background: transparent; color: var(--c-ink);
            font-family: var(--font-body); font-size: 12px; font-weight: 500;
            cursor: pointer; transition: border-color 0.2s, background 0.2s; border-radius: 14px;
        }
        .q-upload-btn:hover { border-color: var(--c-ink); background: var(--c-surface); }
        .q-upload-btn i { font-size: 16px; }

        /* ── Terms ── */
        .q-terms-row {
            display: flex; align-items: flex-start; gap: 10px;
            font-size: 11.5px; color: var(--c-muted); cursor: pointer;
            line-height: 1.5; margin-bottom: 20px;
            justify-content: center; text-align: center;
        }
        .q-terms-row input { margin-top: 3px; cursor: pointer; accent-color: var(--c-ink); flex-shrink: 0; }
        .q-terms-row a { color: var(--c-ink); text-decoration: underline; text-underline-offset: 2px; }

        /* ── CTA buttons ── */
        .q-btn-black {
            width: 100%; height: 52px;
            background: var(--c-ink); color: #fff;
            border: none; border-radius: 14px;
            font-family: var(--font-display); font-size: 14px;
            letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600;
            cursor: pointer; transition: opacity 0.2s; box-sizing: border-box;
        }
        .q-btn-black:hover:not(:disabled) { opacity: 0.82; }
        .q-btn-black:disabled { background: #ccc; cursor: not-allowed; }
        .q-btn-outline {
            width: 100%; height: 52px;
            background: transparent; color: var(--c-ink);
            border: 1.5px solid var(--c-line); border-radius: 14px;
            font-family: var(--font-display); font-size: 17px;
            letter-spacing: 3px; text-transform: uppercase;
            cursor: pointer; transition: border-color 0.2s, background 0.2s; box-sizing: border-box;
        }
        .q-btn-outline:hover { border-color: var(--c-ink); background: var(--c-surface); }

        /* ── PIX screen ── */
        #q-step-pix {
            display: none; text-align: center;
            padding: 36px 28px; flex-direction: column; gap: 16px; align-items: center;
        }
        #q-step-pix h2 {
            font-family: var(--font-display); font-size: 24px;
            letter-spacing: 3px; text-transform: uppercase; margin: 0; font-weight: 400;
        }
        .q-pix-subtitle { font-size: 13px; color: var(--c-muted); margin: 0; line-height: 1.6; }
        .q-pix-qr { width: 180px; height: 180px; border: 1px solid var(--c-line); padding: 6px; margin: 0 auto; }
        .q-pix-qr img { width: 100%; height: 100%; }
        .q-pix-copiacola { display: flex; gap: 8px; width: 100%; max-width: 320px; margin: 0 auto; }
        .q-pix-copiacola input {
            flex: 1; height: 40px; padding: 0 12px; border: 1px solid var(--c-line);
            background: var(--c-surface); font-size: 11px; font-family: var(--font-body);
            outline: none; min-width: 0;
        }
        .q-pix-copiacola button {
            height: 40px; padding: 0 14px; background: var(--c-ink); color: #fff;
            border: none; font-size: 10px; font-weight: 600; letter-spacing: 1px;
            text-transform: uppercase; cursor: pointer;
        }
        .q-pix-status { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--c-muted); }
        @keyframes q-pix-pulse { 0%,100%{opacity:.4} 50%{opacity:1} }
        .q-pix-waiting { animation: q-pix-pulse 1.5s infinite ease-in-out; color: #d97706; }
        .q-pix-approved { color: #16a34a; }
        .q-pix-cancel { font-size: 11px; color: var(--c-muted); text-decoration: underline; cursor: pointer; margin-top: 4px; }

        /* ── Loading ── */
        @keyframes q-slide { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        @keyframes q-alt-show { 0%,5%{opacity:0;transform:translateY(6px)} 15%,45%{opacity:1;transform:translateY(0)} 55%,100%{opacity:0;transform:translateY(-6px)} }
        @keyframes q-alt-hide { 0%,55%{opacity:0;transform:translateY(6px)} 65%,95%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-6px)} }
        #q-loading-box {
            display: none; padding: 28px;
            text-align: center; flex: 1; flex-direction: column;
            align-items: center; justify-content: center; min-height: 60vh;
        }
        .q-loading-texts {
            position: relative; height: 36px; width: 100%;
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 24px;
        }
        .q-loading-t1, .q-loading-t2 {
            position: absolute; width: 100%;
            display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .q-loading-t1 {
            font-family: var(--font-display); font-size: 13px; letter-spacing: 2.5px;
            text-transform: uppercase; color: var(--c-ink);
            animation: q-alt-show 3.6s ease-in-out infinite;
        }
        .q-loading-t2 {
            animation: q-alt-hide 3.6s ease-in-out infinite;
            text-decoration: none; opacity: 0;
        }
        .q-loading-t2 span {
            font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
            color: var(--c-muted); font-family: var(--font-body);
        }
        .q-loading-t2 img { height: 17px; width: auto; opacity: 0.7; }
        .q-loading-bar { height: 3px; background: var(--c-line); width: 100%; position: relative; overflow: hidden; border-radius: 2px; }
        .q-loading-bar > div {
            position: absolute; top: 0; left: 0; height: 100%; width: 100%;
            background: var(--c-ink); border-radius: 2px;
            transform: scaleX(0); transform-origin: left;
            transition: transform 0.3s ease-out;
        }

        /* ── Result ── */
        #q-step-result { display: none; flex-direction: column; gap: 0; align-items: stretch; }

        .q-res-title {
            display: block;
            font-family: var(--font-display); font-size: 18px;
            letter-spacing: 3px; text-transform: uppercase;
            color: var(--c-ink); padding: 20px 28px 16px; margin: 0;
            border-bottom: 1px solid var(--c-line);
            text-align: center;
        }
        .q-res-subtitle, .q-res-note { display: none; }

        #q-result-img-col {
            width: 100%; max-height: 72vh; background: var(--c-surface);
            overflow: hidden; display: flex; align-items: center; justify-content: center;
        }
        #q-result-img-col img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }

        #q-result-actions-col {
            display: flex; flex-direction: column; gap: 10px;
            padding: 20px 28px 0;
        }
        .q-res-mobile-only { margin: 0; }

        /* ── Related products ── */
        #q-related-products { padding: 0 28px 28px; }
        #q-related-products h4 {
            font-family: var(--font-display); font-size: 13px;
            letter-spacing: 3px; text-transform: uppercase;
            color: var(--c-muted); margin: 20px 0 12px; font-weight: 400;
        }
        .q-related-grid {
            display: flex; gap: 10px; overflow-x: auto; padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
        }
        .q-related-grid::-webkit-scrollbar { display: none; }
        .q-related-card {
            flex: 0 0 calc(33.333% - 7px); min-width: 88px;
            text-decoration: none; color: var(--c-ink);
            display: flex; flex-direction: column; gap: 6px;
        }
        .q-related-card img {
            width: 100%; aspect-ratio: 1/1; object-fit: cover;
            border: 1px solid var(--c-line); display: block; border-radius: 3px;
        }
        .q-related-card-name {
            font-size: 10px; font-weight: 500; line-height: 1.4; color: var(--c-ink);
            overflow: hidden; display: -webkit-box;
            -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        }

        /* Desktop result split */
        @media (min-width: 768px) {
            .q-card-ia.is-result { width: 780px !important; max-width: 90vw !important; max-height: 92vh !important; }
                /* .q-powered-footer always visible */
            .q-card-ia.is-result .q-content-scroll {
                padding: 0 !important; overflow-y: auto !important;
                display: flex !important; flex-direction: column !important;
            }
            .q-card-ia.is-result #q-step-result {
                display: flex !important; flex-direction: row !important;
                flex-wrap: wrap !important; width: 100%; align-items: stretch; gap: 0;
            }
            .q-card-ia.is-result .q-res-title {
                flex-basis: 100%; order: -1;
                font-size: 16px; letter-spacing: 3px;
                padding: 16px 24px; border-bottom: 1px solid var(--c-line);
            }
            .q-card-ia.is-result #q-result-img-col {
                width: 44% !important; min-height: 360px !important;
                border-right: 1px solid var(--c-line); flex-shrink: 0;
            }
            .q-card-ia.is-result #q-result-img-col img {
                width: 100% !important; height: 100% !important;
                object-fit: cover !important; object-position: top center !important;
            }
            .q-card-ia.is-result #q-result-actions-col {
                width: 56% !important; padding: 28px 24px !important;
                display: flex !important; flex-direction: column !important;
                justify-content: flex-start; gap: 12px;
                overflow-y: auto;
            }
            .q-card-ia.is-result .q-btn-black,
            .q-card-ia.is-result .q-btn-outline { height: 58px !important; font-size: 15px !important; }
            .q-card-ia.is-result #q-related-products { padding: 0; margin-top: 4px; }
            .q-card-ia.is-result .q-res-mobile-only { display: flex !important; }
        }

        /* ── Error screen ── */
        #q-step-error {
            display: none; flex-direction: column; gap: 20px;
            align-items: center; text-align: center;
            padding: 52px 28px;
        }
        #q-step-error h2 {
            font-family: var(--font-display); font-size: 22px;
            letter-spacing: 3px; text-transform: uppercase; margin: 0; font-weight: 400;
        }
        #q-step-error p { font-size: 13px; color: var(--c-muted); margin: 0; line-height: 1.6; }

        /* ── Footer ── */
        .q-powered-footer {
            background: var(--c-surface); padding: 14px 20px;
            display: flex; align-items: center; justify-content: center; gap: 9px;
            flex-shrink: 0; border-top: 1px solid var(--c-line); text-decoration: none;
        }
        .q-powered-footer span { font-size: 9.5px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--c-muted); }
        /* ── Sunglasses Ubatuba: rosa da marca + branco ── */
        :root {
            --c-surface: #fff7f7;
            --c-line: #f1dadd;
            --c-primary: #feb3b6;
            --c-primary-hover: #f59fa4;
        }
        #q-header-provador { background: #fffafa; }
        .q-btn-inline-provador {
            background: transparent; color: #a9545a;
            border: 1px solid #feb3b6;
        }
        .q-btn-inline-provador:hover { background: transparent; color: #d87980; border-color: #f59fa4; opacity: 1; }
        .q-btn-black { background: #feb3b6 !important; color: #ffffff !important; }
        .q-btn-black:hover:not(:disabled) { background: #f59fa4 !important; opacity: 1; }
        .q-btn-black:disabled { background: #ead5d6 !important; color: #ffffff !important; }
        .q-btn-buy-now { background: #feb3b6 !important; border-color: #feb3b6 !important; }
        .q-btn-buy-now:hover { background: #f59fa4 !important; border-color: #f59fa4 !important; }
        .q-face-corner { border-color: #feb3b6 !important; }
        .q-terms-row input { accent-color: #feb3b6; }
        .q-terms-row a { color: #a9545a !important; }
        .q-upload-btn:hover { border-color: #feb3b6; color: #a9545a; background: #fff7f7; }
        .q-btn-outline:hover { border-color: #feb3b6; color: #a9545a; background: #fff7f7; }
        .q-input:focus { border-color: #feb3b6 !important; box-shadow: 0 0 0 3px rgba(254,179,182,0.2); }
        .q-loading-bar > div { background: #feb3b6 !important; }
        .q-tip-box { background: #fff7f7 !important; border-left-color: #feb3b6 !important; color: #5f5556 !important; }
        .q-tip-box i { color: #d87980 !important; }
        .q-seal > i { color: #d87980; }
        .q-powered-footer { background: #fff7f7; }
        #q-related-products h4 { color: #a9545a !important; }
        .q-quantic-logo { height: 20px; opacity: 0.7; }
    `;

    // ─── 5. INIT ──────────────────────────────────────────────────────────────────
    function init() {

        // Fonts + Phosphor Icons
        var fl = document.createElement('link');
        fl.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        fl.rel = 'stylesheet';
        document.head.appendChild(fl);
        if (!window.phosphorIconsLoaded) {
            var ph = document.createElement('script');
            ph.src = 'https://unpkg.com/@phosphor-icons/web';
            document.head.appendChild(ph);
            window.phosphorIconsLoaded = true;
        }

        // Styles
        var st = document.createElement('style');
        st.textContent = styles;
        document.head.appendChild(st);

        // Modal HTML — built via DOM (no innerHTML with untrusted input)
        var modal = document.createElement('div');
        modal.id = 'q-modal-ia';

        var card = document.createElement('div');
        card.className = 'q-card-ia';

        var closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'q-close-ia';
        closeBtn.id = 'q-close-btn';
        closeBtn.textContent = '×';
        card.appendChild(closeBtn);

        var scroll = document.createElement('div');
        scroll.className = 'q-content-scroll';

        // Header
        var header = document.createElement('div');
        header.id = 'q-header-provador';
        var h1 = document.createElement('h1');
        h1.textContent = 'Provador Virtual';
        header.appendChild(h1);
        var storeImg = document.createElement('img');
        storeImg.src = STORE_LOGO;
        storeImg.alt = 'Sunglasses Ubatuba';
        storeImg.style.cssText = 'height:68px;max-width:240px;width:auto;object-fit:contain;';
        storeImg.onerror = function() { this.style.display = 'none'; };
        header.appendChild(storeImg);
        scroll.appendChild(header);

        // Step upload — new design with face frame
        var stepUpload = document.createElement('div');
        stepUpload.id = 'q-step-photo';

        // Phone
        var phoneWrap = document.createElement('div');
        phoneWrap.className = 'q-phone-wrap';
        var phoneLbl = document.createElement('span');
        phoneLbl.className = 'q-field-label';
        phoneLbl.textContent = 'Seu WhatsApp';
        phoneWrap.appendChild(phoneLbl);
        var phoneInput = document.createElement('input');
        phoneInput.type = 'tel';
        phoneInput.id = 'q-phone';
        phoneInput.className = 'q-input';
        phoneInput.placeholder = '(11) 99999-9999';
        phoneInput.maxLength = 15;
        phoneWrap.appendChild(phoneInput);
        var phoneErr = document.createElement('div');
        phoneErr.id = 'q-phone-error';
        phoneErr.className = 'q-status-msg';
        phoneErr.textContent = 'Insira um número válido';
        phoneWrap.appendChild(phoneErr);
        stepUpload.appendChild(phoneWrap);

        // Contador "provas restantes hoje"
        var provasMsg = document.createElement('div');
        provasMsg.id = 'q-provas-restantes';
        provasMsg.className = 'q-provas-msg';
        stepUpload.appendChild(provasMsg);

        // Section label
        var sectionLbl = document.createElement('p');
        sectionLbl.className = 'q-section-label';
        sectionLbl.textContent = 'Envie sua foto';
        stepUpload.appendChild(sectionLbl);

        // Tip box
        var tipBox = document.createElement('div');
        tipBox.className = 'q-tip-box';
        var tipIcon = document.createElement('i');
        tipIcon.className = 'ph ph-lightbulb';
        var tipSpan = document.createElement('span');
        tipSpan.textContent = 'Use uma foto nítida, de frente, com boa iluminação.';
        tipBox.appendChild(tipIcon);
        tipBox.appendChild(tipSpan);
        stepUpload.appendChild(tipBox);

        // Face frame
        var faceFrame = document.createElement('div');
        faceFrame.className = 'q-face-frame';
        faceFrame.id = 'q-face-frame';
        ['tl','tr','bl','br'].forEach(function(c) {
            var corner = document.createElement('div');
            corner.className = 'q-face-corner q-face-corner-' + c;
            faceFrame.appendChild(corner);
        });
        var preImg = document.createElement('img');
        preImg.id = 'q-pre-img';
        preImg.alt = 'Sua foto';
        faceFrame.appendChild(preImg);
        var facePlaceholder = document.createElement('div');
        facePlaceholder.className = 'q-face-placeholder';
        facePlaceholder.id = 'q-face-placeholder';
        var faceIcon = document.createElement('i');
        faceIcon.className = 'ph ph-user-circle';
        faceIcon.style.cssText = 'font-size:80px;color:#d4d4d4;';
        facePlaceholder.appendChild(faceIcon);
        faceFrame.appendChild(facePlaceholder);
        stepUpload.appendChild(faceFrame);

        // Upload buttons
        var uploadBtns = document.createElement('div');
        uploadBtns.className = 'q-upload-btns';
        var cameraBtn = document.createElement('button');
        cameraBtn.className = 'q-upload-btn';
        cameraBtn.id = 'q-btn-camera';
        cameraBtn.type = 'button';
        var camI = document.createElement('i');
        camI.className = 'ph ph-camera';
        cameraBtn.appendChild(camI);
        cameraBtn.appendChild(document.createTextNode(' Tirar foto'));
        var galleryBtn = document.createElement('button');
        galleryBtn.className = 'q-upload-btn';
        galleryBtn.id = 'q-btn-gallery';
        galleryBtn.type = 'button';
        var galI = document.createElement('i');
        galI.className = 'ph ph-image';
        galleryBtn.appendChild(galI);
        galleryBtn.appendChild(document.createTextNode(' Da galeria'));
        var cameraInput = document.createElement('input');
        cameraInput.type = 'file';
        cameraInput.id = 'q-camera-input';
        cameraInput.accept = 'image/*';
        cameraInput.setAttribute('capture', 'user');
        cameraInput.style.display = 'none';
        var galleryInput = document.createElement('input');
        galleryInput.type = 'file';
        galleryInput.id = 'q-gallery-input';
        galleryInput.accept = 'image/*';
        galleryInput.style.display = 'none';
        uploadBtns.appendChild(cameraBtn);
        uploadBtns.appendChild(galleryBtn);
        uploadBtns.appendChild(cameraInput);
        uploadBtns.appendChild(galleryInput);
        stepUpload.appendChild(uploadBtns);

        // realInput alias for PIX compat
        var realInput = galleryInput;
        var trigUpload = { onclick: null }; // stub for compat

        var termsLabel = document.createElement('label');
        termsLabel.className = 'q-terms-row';
        termsLabel.style.cssText = 'margin-top:20px;margin-bottom:20px;';
        var termsCheck = document.createElement('input');
        termsCheck.type = 'checkbox';
        termsCheck.id = 'q-accept-terms';
        termsLabel.appendChild(termsCheck);
        var termsSpan = document.createElement('span');
        termsSpan.textContent = 'Concordo com os ';
        var termsLink = document.createElement('a');
        termsLink.href = 'http://provoulevou.com.br/termos.html';
        termsLink.target = '_blank';
        termsLink.textContent = 'Termos e Condições';
        termsSpan.appendChild(termsLink);
        termsLabel.appendChild(termsSpan);
        stepUpload.appendChild(termsLabel);

        var genBtn = document.createElement('button');
        genBtn.className = 'q-btn-black';
        genBtn.id = 'q-btn-generate';
        genBtn.disabled = true;
        genBtn.textContent = 'Provar óculos';
        stepUpload.appendChild(genBtn);
        scroll.appendChild(stepUpload);

        // PIX (prova extra)
        var stepPix = document.createElement('div');
        stepPix.id = 'q-step-pix';
        stepPix.style.cssText = 'display:none;text-align:center;padding:36px 28px;flex-direction:column;gap:16px;align-items:center;';
        var pixH2 = document.createElement('h2');
        pixH2.style.cssText = 'font-family:var(--font-display);font-size:24px;letter-spacing:3px;text-transform:uppercase;margin:0;font-weight:400;';
        pixH2.textContent = 'Prova Extra';
        stepPix.appendChild(pixH2);
        var pixSub = document.createElement('p');
        pixSub.className = 'q-pix-subtitle';
        var pixSubLine1 = document.createTextNode('Limite de 5 provas atingido.');
        pixSub.appendChild(pixSubLine1);
        pixSub.appendChild(document.createElement('br'));
        pixSub.appendChild(document.createTextNode('Pague R$1 via PIX para mais uma:'));
        stepPix.appendChild(pixSub);
        var pixQr = document.createElement('div');
        pixQr.className = 'q-pix-qr';
        var pixQrImg = document.createElement('img');
        pixQrImg.id = 'q-pix-qr-img';
        pixQrImg.alt = 'QR Code PIX';
        pixQr.appendChild(pixQrImg);
        stepPix.appendChild(pixQr);
        var pixCopia = document.createElement('div');
        pixCopia.className = 'q-pix-copiacola';
        var pixCode = document.createElement('input');
        pixCode.type = 'text';
        pixCode.id = 'q-pix-code';
        pixCode.readOnly = true;
        pixCode.placeholder = 'Código PIX...';
        var pixCopyBtn = document.createElement('button');
        pixCopyBtn.id = 'q-pix-copy-btn';
        pixCopyBtn.textContent = 'Copiar';
        pixCopia.appendChild(pixCode);
        pixCopia.appendChild(pixCopyBtn);
        stepPix.appendChild(pixCopia);
        var pixStatus = document.createElement('div');
        pixStatus.id = 'q-pix-status-msg';
        pixStatus.className = 'q-pix-status q-pix-waiting';
        pixStatus.textContent = 'Aguardando pagamento...';
        stepPix.appendChild(pixStatus);
        var pixCancel = document.createElement('p');
        pixCancel.id = 'q-pix-cancel';
        pixCancel.className = 'q-pix-cancel';
        pixCancel.textContent = 'Cancelar';
        stepPix.appendChild(pixCancel);
        scroll.appendChild(stepPix);

        // Loading
        var loadingBox = document.createElement('div');
        loadingBox.id = 'q-loading-box';
        loadingBox.style.display = 'none';
        // Alternating texts
        var loadingTexts = document.createElement('div');
        loadingTexts.className = 'q-loading-texts';
        var loadingT1 = document.createElement('div');
        loadingT1.className = 'q-loading-t1';
        loadingT1.textContent = 'Gerando Prova Virtual...';
        var loadingT2 = document.createElement('a');
        loadingT2.className = 'q-loading-t2';
        loadingT2.href = 'https://provoulevou.com.br?utm_source=widget&utm_medium=lojista&utm_campaign=sunglassesubatuba';
        loadingT2.target = '_blank';
        var t2Span = document.createElement('span');
        t2Span.textContent = 'Powered by';
        var t2Img = document.createElement('img');
        t2Img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOUAAAAoCAMAAAA2Yc1OAAAAYFBMVEUAAAB2Muz18f18DvaRWfFsZ/wAAP8AAAAAAAAAAAB8Oe17Ou3/AP+pVP+0jvTJr/dVVaqHO/t/AH+AO/R/P7+AO/SAO/QAAAB7Oe0AAACDPfp9O/V7Oe17OOwAAAB7OezQS/HyAAAAIHRSTlNg6f8E/gMBry/Sr08BA//+AyMCawTFlQD8+/4Kki6QcnVUoNsAAAaeSURBVHja3ZoJc9sqEIBFEKADOc7RhyyE9P//ZXeX21frmcZvEqbjRIBcPu29SmPSEPZoqiGsMD9jNAlJwoe2gochLKfpn0QpgcZ9DGwuBhtWZwzXTz6RlF9FCWIbf83LspSUcLn8Gn+EOBuvlnyoCTPpwM3xmQeyML6EkhvLrjISJ3NPlKY1+7Ksxv57Sq7vQALmbCX//pTCDHcgUZr2KL875QRfXGMx+ldg7rDpe1NKac9k176+vBzqKWv0/0Ap0BN5nwDxO59AQ1CnmDPZz8laHmfzFi5qG2usGWtRti84Xs+EaZ9OGV2evOX70rz4owiac6tkry8tm+GjskxDz6aBYUy39X2vms4UU41S6K27TdFaXgmjgwu8oaF7ty5NlhsqSkxT9nXdITE5Gu3cmzUyZA32zTkJs3xch2H9wNQF1uxb2sKdc6K2yzOFZS8vDAV6YJcqu51OPX74QSdUaaqhi7x2wpU4cKUzTR/XFSHTpB/4FSWlCGnKMrPRfGoI5yxYzQRiWQZw+yNbaMwrN9yaNSqBJCRneEnpzs0SpMhaFGgxHKUGcBSVIE+nzR9fNQGsP5VrW8GAyMo0xToulZRNTYkukVIx/FyNRAfpz00MyyiBal58pMOQzv9EeSWMgG3WwWQkL+sJ+6YDDc3iQ7heqa6Pa0G04TlEho4gFW6gx3FPlgL9/jKMzo1gT+1OZN45WIl+xIYN1rqdYp19mBJMszLLmnLLBz8FJe2j/qlyTfmDJ71OWu6/SN2h5KBg8IPGSmIklX03ProjTt4AAPjro5QoSXaLMtlaQ4dWaeqUofxak6i6eBllS8p9hxKPPJjJCixxGUCQAPHgOiAAOzsKqzX38f5BWTIfSWqzLCiz3yR5qDjVVGt9EJ7KRleItngMN7wP/JfujWO8tHxHMXLmVRYVdmHCshTeNCdDfYSSUUrQHiBglpwFpan8Zj57eeSwM23vETcrdHhE221KlFyOoXMQFcYzUtidXKYL6XXQ4QcoD16MHpbdp4wkfXnM0t10QbzduTMK4LcpUQf3NOjMxAWn8MzwGFiMjlaSfv8tJSlrm34/QExh55T9LUp1SellGKPEI5RriCEhIOKZJUMZWogpQGTGHD+NNQ9Qevllt8MO2Tz/gvKKLONcj3zdo5RzHa8N4VnUzpEuWMS4pOS3KNl8bovA/BqnrmpsH+wyU9Z22QVV7fzKI3aJRmjLIaJvtVjvci/LUA5OZ3apS1lyO8lM2QbBtW2KJq9RvLd9bJ8pr/hYnxlFcd/3sercLtlFbo5uR4akwWcGAVOQw11zmu8Spa9dAmUqtlpvmGih5HyCqd6Kl1umNJdrwSJ7j189BhXjZZMfWUFJxxSThjFN7r919zkP6CV0NRwGFAw1nKpe8e5CBF1WTdmRTvkgiPVjhKdBlG1W1gNCJci5pZmbuU9XUG55rTtFKeFclOEpi87nSV1WYnW6iJcrtoglF2Zt28F8SlJWB9mcfAdxMUTGkgsKM8wQuDdOaCRPFh8FUYJUF9R9jZTgZ1LUQJ+D4bJloWfAGHKXeSzWE10EzpRkp4rKsPwwwh35uWDR1akA3FeJbZn7eGnQ8FnP0XwSjU8GPnEWvRBleJTjFrfsS9BYzpEX0mCsSSBvhajhR8h9WhYnUJnxHhE1NpcVylSUXVlyqHKuyF7L2qwsUs5yH+q3jVZzt3qxkrktvgh8RzXFqngHBbUjZevCV5Ahv/eUPqTg7VBfstAeCD0C5m0zT+FVUV+qsvCqfEqnqqIsCbhKb/3ou3qiqSsvbhzDwooxLKwGTt01LXBuoOft+45xAyKhZs9Ui4GTGpagsQPMtSN2RLC2ObzCOOCIGfvBixd/xK8O7r5R6EE3L6Bm24ooSEuwlkMKrjflBirTmuoG3N/574my5NQHT0WyjN0SrCwn/zYgbVgGi80CoddwvXsfxelZgCg1byZSfJZGSgqKGbCAz8vI/yUvSWJjAxykWwfGBmx4yLgGnY7YTUwb6GWOX3cfK3RIQKVhX8wJ3ixlBVywu+1YVPvwSujrKfPQvHobd2+Dfvc/j+dtL0N2JpBSXO0WXKm7nkOZG45HK+T7ZItETQpRNq1wgzwWb12hVIPOpcZOZdpHTc0GM6T1fm99jU3nZ8ryX79BkJO89woBXFzUme9MCRoubksTIKU2P4DSaG32+cb7y93ktwdVI/n7vXGHZNCuRd2a6teVUogf89cTE+ZKO3Tk81j38c087W3Xc/5GRF9932P5T4A0vwEkzAGPQIFmHAAAAABJRU5ErkJggg==';
        t2Img.alt = 'Provou Levou';
        loadingT2.appendChild(t2Span);
        loadingT2.appendChild(t2Img);
        loadingTexts.appendChild(loadingT1);
        loadingTexts.appendChild(loadingT2);
        loadingBox.appendChild(loadingTexts);
        var loadingBar = document.createElement('div');
        loadingBar.className = 'q-loading-bar';
        var loadingFill = document.createElement('div');
        loadingBar.appendChild(loadingFill);
        loadingBox.appendChild(loadingBar);

        // ── Barra de progresso simulada (nao ha evento real de progresso do backend).
        // Desacelera perto de 92% e se auto-encerra sozinha quando a tela de loading
        // for escondida (sucesso, erro ou limite) - nao precisa de hook em cada saida. ──
        var _qProgressTimer = null;
        function startLoadingProgress() {
            if (_qProgressTimer) { clearInterval(_qProgressTimer); _qProgressTimer = null; }
            if (!loadingBox || !loadingFill) return;
            loadingFill.style.transition = 'none';
            loadingFill.style.transform = 'scaleX(0)';
            void loadingFill.offsetWidth;
            loadingFill.style.transition = 'transform 0.3s ease-out';
            var progress = 0;
            _qProgressTimer = setInterval(function () {
                if (loadingBox.style.display !== 'flex') { clearInterval(_qProgressTimer); _qProgressTimer = null; return; }
                var remaining = 92 - progress;
                progress += Math.max(remaining * 0.06, 0.15);
                if (progress > 92) progress = 92;
                loadingFill.style.transform = 'scaleX(' + (progress / 100) + ')';
            }, 200);
        }

        scroll.appendChild(loadingBox);

        // ── Botão "Comprar Agora" no resultado (Tray) ──────────────────────────────
        // Preço FINAL (com desconto). Tray: .current-price dentro de .price.display-cash;
        // fallback JSON-LD offers.price e por fim .product-price.
        // Converte texto de preço BR ("R$ 1.234,56") para número.
        function _priceToNum(t) {
            var m = String(t || '').replace(/[^\d.,]/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.');
            var n = parseFloat(m);
            return isNaN(n) ? 0 : n;
        }
        // Preço canônico via JSON-LD (offers.price) — fonte da verdade do produto principal.
        // Em kits "2 em 1" a página tem VÁRIOS .current-price (um por combinação); o querySelector
        // pegaria o primeiro (errado). O JSON-LD sempre reflete o produto/variação principal.
        function _getLdPrice() {
            try {
                var s = document.querySelectorAll('script[type="application/ld+json"]');
                for (var i = 0; i < s.length; i++) {
                    var j = JSON.parse(s[i].textContent);
                    var arr = Array.isArray(j) ? j : [j];
                    for (var k = 0; k < arr.length; k++) {
                        var o = arr[k] && arr[k].offers;
                        if (o) { var p = Array.isArray(o) ? o[0].price : o.price; if (p) return Number(p); }
                    }
                }
            } catch (e) {}
            return 0;
        }
        function getMainPrice() {
            var ld = _getLdPrice();
            if (ld > 0) return 'R$ ' + ld.toFixed(2).replace('.', ',');
            var el = document.querySelector('.product-price .current-price, .price.display-cash .current-price, .current-price');
            var t = el ? (el.textContent || '').trim() : '';
            if (t && /\d/.test(t)) return t.replace(/\s+/g, ' ');
            var pe = document.querySelector('.product-price');
            var pt = pe ? (pe.textContent || '').trim() : '';
            return /\d/.test(pt) ? pt.replace(/\s+/g, ' ') : '';
        }
        // Parcelamento amarrado ao PREÇO canônico: no kit clip-on "2 em 1" a página tem
        // vários parcelamentos (combinações diferentes) no DOM. Escolhe a parcela cujo
        // total (Nx × valor) casa com o preço do produto — assim nunca mostra a parcela de
        // outra combinação (ex.: 2x 94,95 = 189,90 quando o produto é 219,90 = 3x 73,30).
        function getInstallment() {
            var priceNum = _getLdPrice() || _priceToNum(getMainPrice());
            if (!priceNum || priceNum <= 0) return '';
            // Candidatos = elementos de parcela + o PAI de cada .txt-cadaparcelas. Na Tray
            // o "3x" (.txt-corparcelas) e o "R$ 24,00" (.txt-cadaparcelas) ficam em spans
            // IRMÃOS; só o span-pai tem o texto completo "3x de R$ 24,00 Sem juros". Sem
            // isso, produtos com parcela quebrada (ex.: kit 2 em 1) não mostravam nada.
            var cand = [];
            document.querySelectorAll('.product-installments, .txt-corparcelas, [class*="parcela"]').forEach(function (el) { cand.push(el.textContent || ''); });
            document.querySelectorAll('.txt-cadaparcelas').forEach(function (el) { if (el.parentElement) cand.push(el.parentElement.textContent || ''); });
            var tol = Math.max(0.5, priceNum * 0.02); // tolerância p/ arredondamento das parcelas
            for (var i = 0; i < cand.length; i++) {
                var t = cand[i].replace(/\s+/g, ' ').trim();
                var m = t.match(/(\d+)\s*x\s*(?:de\s*)?R?\$?\s*([\d.,]+)/i);
                if (!m) continue;
                var n = parseInt(m[1], 10), v = _priceToNum(m[2]);
                if (!n || !v) continue;
                var clean = t.replace(/^(ou|em at[ée])\s*/i, '').replace(/(sem juros|com juros).*/i, '$1').trim();
                if (Math.abs(n * v - priceNum) <= tol) return clean; // total casa com o preço -> essa é a certa
            }
            // nenhuma parcela bate com o preço: melhor não mostrar do que mostrar errada
            return '';
        }

        // ── Detecção de rosto: escolhe, entre as fotos do produto, a que mostra um
        //    ROSTO (modelo usando o óculos) como referência principal pro gerador.
        //    FaceDetector nativo (Chromium) primeiro; MediaPipe via CDN como fallback.
        //    Se nada rodar (CSP/sem suporte), devolve a ordem original — sem regressão.
        var _faceDet = null, _faceDetTried = false;
        async function getFaceDetector() {
            if (_faceDetTried) return _faceDet;
            _faceDetTried = true;
            try {
                if ('FaceDetector' in window) { _faceDet = { native: new window.FaceDetector({ fastMode: true, maxDetectedFaces: 1 }) }; return _faceDet; }
            } catch (e) {}
            try {
                var vision = await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/vision_bundle.mjs');
                var fileset = await vision.FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm');
                _faceDet = { mp: await vision.FaceDetector.createFromOptions(fileset, {
                    baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite' },
                    runningMode: 'IMAGE'
                }) };
            } catch (e) { _faceDet = null; }
            return _faceDet;
        }
        function _loadCorsImg(url) {
            return new Promise(function (resolve) {
                var img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = function () { resolve(img); };
                img.onerror = function () { resolve(null); };
                img.src = url;
            });
        }
        async function _imgHasFace(det, img) {
            try {
                if (det.native) { var f = await det.native.detect(img); return !!(f && f.length); }
                if (det.mp) { var r = det.mp.detect(img); return !!(r && r.detections && r.detections.length); }
            } catch (e) {}
            return false;
        }
        // Move a 1ª foto com rosto pra frente (vira o product_image principal do gerador).
        async function reorderFacePhotoFirst(urls) {
            try {
                if (!urls || urls.length < 2) return urls;
                var det = await getFaceDetector();
                if (!det) return urls;
                for (var i = 0; i < urls.length; i++) {
                    var img = await _loadCorsImg(urls[i]);
                    if (img && await _imgHasFace(det, img)) {
                        if (i > 0) { urls.unshift(urls.splice(i, 1)[0]); }
                        try { console.log('[PL Sunglasses Ubatuba] foto no rosto priorizada como referência'); } catch (e) {}
                        return urls;
                    }
                }
            } catch (e) {}
            return urls;
        }
        // Botão nativo de compra da loja (Tray) — submit do form_comprar.
        function findStoreBuyBtn() {
            return document.querySelector('#button-buy, .buy-button, .botao-comprar, .product-buy-button, [name="comprar"]');
        }
        // "Comprar Agora": marca carrinho_adicionado na prova (tracking por telefone, pro
        // funil "Clicou em comprar" do dashboard) e aciona o botão nativo da loja. Na Tray, o
        // #button-buy é um submit que trata a seleção de variação (kit) e redireciona pro
        // carrinho nativamente — por isso NÃO simulamos "adicionado" nem link /carrinho fixo.
        function buyNow() {
            try {
                var _pe = document.getElementById('q-phone') || document.getElementById('mc-phone') || document.querySelector('#q-modal-ia input[type=tel], input[type=tel]');
                var _tp = (_pe && _pe.value) || '';
                var _td = (document.querySelector('h1.product-name, h1.product__title, h1') || {}).innerText || document.title || '';
                fetch(WEBHOOK_BUY_CLICK, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone: _tp, origin: location.origin, produto: _td }) }).catch(function () {});
            } catch (e) {}
            var sb = findStoreBuyBtn();
            try { closeModal(); } catch (e) {}
            if (sb) { try { sb.click(); } catch (e) {} }
        }
        // Nome + preço + parcelamento + selos + botão (layout igual à Univisão).
        function populateBuyCta() {
            var btn = document.getElementById('q-btn-buy-now');
            if (!btn) return;
            var succ = document.getElementById('q-buy-success'); if (succ) succ.style.display = 'none';
            var price = getMainPrice();
            var prodName = (document.querySelector('h1.product-name, h1.product__title, h1')?.innerText || document.title || '').trim();
            var nameEl = document.getElementById('q-result-prodname'); if (nameEl) nameEl.textContent = prodName;
            var priceEl = document.getElementById('q-result-prodprice'); if (priceEl) priceEl.textContent = price || '';
            var instEl = document.getElementById('q-result-installment'); if (instEl) { var _i = getInstallment(); instEl.textContent = _i; instEl.style.display = _i ? 'block' : 'none'; }
            var info = document.getElementById('q-result-prodinfo'); if (info && (prodName || price)) info.style.display = 'block';
            var seals = document.getElementById('q-seals'); if (seals) seals.style.display = 'flex';
            btn.style.display = findStoreBuyBtn() ? 'flex' : 'none';
            btn.onclick = buyNow;
        }

        // Result
        var stepResult = document.createElement('div');
        stepResult.id = 'q-step-result';
        var resTitle = document.createElement('span');
        resTitle.className = 'q-res-title';
        resTitle.textContent = 'Veja como ficou em você';
        stepResult.appendChild(resTitle);
        var resultImgCol = document.createElement('div');
        resultImgCol.id = 'q-result-img-col';
        var finalImg = document.createElement('img');
        finalImg.id = 'q-final-view-img';
        resultImgCol.appendChild(finalImg);
        var resultActCol = document.createElement('div');
        resultActCol.id = 'q-result-actions-col';

        // Info do produto (nome + preço + parcelamento) — igual à Univisão
        var prodInfo = document.createElement('div');
        prodInfo.className = 'q-result-prodinfo';
        prodInfo.id = 'q-result-prodinfo';
        prodInfo.style.display = 'none';
        var prodNameEl = document.createElement('div');
        prodNameEl.className = 'q-result-prodname';
        prodNameEl.id = 'q-result-prodname';
        var prodPriceEl = document.createElement('div');
        prodPriceEl.className = 'q-result-prodprice';
        prodPriceEl.id = 'q-result-prodprice';
        var prodInstEl = document.createElement('div');
        prodInstEl.className = 'q-result-installment';
        prodInstEl.id = 'q-result-installment';
        prodInfo.appendChild(prodNameEl);
        prodInfo.appendChild(prodPriceEl);
        prodInfo.appendChild(prodInstEl);
        resultActCol.appendChild(prodInfo);

        // Contador "provas restantes" também no resultado
        var provasMsgResult = document.createElement('div');
        provasMsgResult.className = 'q-provas-msg';
        resultActCol.appendChild(provasMsgResult);

        // Selos de confiança
        var sealsEl = document.createElement('div');
        sealsEl.className = 'q-seals';
        sealsEl.id = 'q-seals';
        sealsEl.style.display = 'none';
        sealsEl.innerHTML = '<div class="q-seal"><i class="ph-fill ph-shield-check"></i><span>Compra<br>Segura</span></div>' +
            '<div class="q-seal"><i class="ph-fill ph-lock-key"></i><span>Pagamento<br>Seguro</span></div>';
        resultActCol.appendChild(sealsEl);

        // Botão comprar agora + sucesso
        var buyNowBtn = document.createElement('button');
        buyNowBtn.className = 'q-btn-buy-now';
        buyNowBtn.id = 'q-btn-buy-now';
        buyNowBtn.style.display = 'none';
        buyNowBtn.textContent = 'Comprar Agora';
        resultActCol.appendChild(buyNowBtn);

        var backBtn = document.createElement('button');
        backBtn.className = 'q-btn-outline';
        backBtn.id = 'q-btn-back';
        backBtn.textContent = 'Voltar ao Produto';
        resultActCol.appendChild(backBtn);
        var retryBtn = document.createElement('p');
        retryBtn.className = 'q-btn-black q-res-mobile-only';
        retryBtn.id = 'q-retry-btn';
        retryBtn.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:8px;';
        var retryIcon = document.createElement('i');
        retryIcon.className = 'ph ph-camera';
        retryBtn.appendChild(retryIcon);
        retryBtn.appendChild(document.createTextNode(' Tentar outra foto'));
        resultActCol.appendChild(retryBtn);

        // Related products section
        var relatedSection = document.createElement('div');
        relatedSection.id = 'q-related-products';
        relatedSection.style.display = 'none';
        var relatedH4 = document.createElement('h4');
        relatedH4.textContent = 'Veja também';
        var relatedGrid = document.createElement('div');
        relatedGrid.className = 'q-related-grid';
        relatedGrid.id = 'q-related-grid';
        relatedSection.appendChild(relatedH4);
        relatedSection.appendChild(relatedGrid);
        // "Veja também" removido do resultado a pedido do lojista: não anexamos a
        // seção ao DOM. loadRelatedProducts() já sai cedo quando não encontra os elementos.
        // resultActCol.appendChild(relatedSection);

        stepResult.appendChild(resultImgCol);
        stepResult.appendChild(resultActCol);
        scroll.appendChild(stepResult);

        // Error step
        var stepError = document.createElement('div');
        stepError.id = 'q-step-error';
        stepError.style.display = 'none';
        var errH2 = document.createElement('h2');
        errH2.textContent = 'Provador fora do ar';
        var errP = document.createElement('p');
        errP.textContent = 'Voltamos em breve 🙏';
        var errBtn = document.createElement('button');
        errBtn.className = 'q-btn-outline';
        errBtn.id = 'q-error-back';
        errBtn.textContent = 'Voltar ao Produto';
        stepError.appendChild(errH2);
        stepError.appendChild(errP);
        stepError.appendChild(errBtn);
        var errHelp = document.createElement('p');
        errHelp.style.cssText = 'font-size:12px;color:var(--c-muted);margin:14px 0 8px;';
        errHelp.textContent = 'Continua com problema? Fale direto com a Provou Levou:';
        var errWa = document.createElement('a');
        errWa.href = 'https://wa.me/5511938034714?text=' + encodeURIComponent('Olá! Tive um problema ao usar o provador.');
        errWa.target = '_blank'; errWa.rel = 'noopener noreferrer';
        errWa.style.cssText = 'display:inline-flex;align-items:center;gap:7px;background:#25D366;color:#fff;border-radius:14px;padding:10px 18px;font-family:inherit;font-weight:700;font-size:13px;text-decoration:none;';
        errWa.textContent = '💬 Falar com a Provou Levou';
        stepError.appendChild(errHelp);
        stepError.appendChild(errWa);
        scroll.appendChild(stepError);

        card.appendChild(scroll);

        // Footer
        var footer = document.createElement('a');
        footer.href = 'https://provoulevou.com.br?utm_source=widget&utm_medium=lojista&utm_campaign=sunglassesubatuba';
        footer.target = '_blank';
        footer.className = 'q-powered-footer';
        var footerSpan = document.createElement('span');
        footerSpan.textContent = 'Powered by';
        footer.appendChild(footerSpan);
        var footerLogo = document.createElement('img');
        footerLogo.src = PROVOU_LOGO;
        footerLogo.className = 'q-quantic-logo';
        footerLogo.alt = 'Provou Levou';
        footer.appendChild(footerLogo);
        card.appendChild(footer);

        modal.appendChild(card);
        document.body.appendChild(modal);

        // ── Trigger button (stamp na foto) ────────────────────────────────────────
        var openBtn = document.createElement('button');
        openBtn.className = 'q-btn-trigger-ia';
        openBtn.id = 'q-open-ia';
        openBtn.setAttribute('aria-label', 'Abrir Provador Virtual');
        var stampImg = document.createElement('img');
        stampImg.src = STAMP_SRC;
        stampImg.alt = 'Provador Virtual';
        stampImg.style.cssText = 'width:100%;height:100%;object-fit:contain;';
        openBtn.appendChild(stampImg);

        if (BUTTON_MODE === 'image' || BUTTON_MODE === 'both') {
            var imgSels = [
                '.frame_slider_principal', '.carousel_gallery', '.product_gallery',
                '.produto-imagem', '.product-image', '.product-images',
                '.image-show', '.box-gallery', '.product-colum-left',
                '.product__media-wrapper', '.product-gallery__media', '.product__media',
                '.product-image-main', '.product-media-container',
                '.product__media-item', '.product-gallery', '.product-single__media', '.media-gallery'
            ];
            var placed = false;
            for (var i = 0; i < imgSels.length; i++) {
                var imgEl = document.querySelector(imgSels[i]);
                if (imgEl) {
                    if (window.getComputedStyle(imgEl).position === 'static') imgEl.style.position = 'relative';
                    imgEl.appendChild(openBtn);
                    placed = true;
                    break;
                }
            }
            if (!placed) {
                openBtn.style.cssText = 'position:fixed;bottom:100px;right:20px;z-index:10;width:72px;height:72px;background:none;border:none;padding:0;cursor:pointer;';
                document.body.appendChild(openBtn);
            }

            // Esconde trigger quando algum modal/popup estiver visível
            (function _hideTriggerOnModal() {
                function anyOverlayOpen() {
                    var sels = ['.modal.show', '.modal.in', '.modal[style*="display: block"]',
                                '.popup-active', '.fancybox-container', '.swal2-container',
                                '[role="dialog"][aria-hidden="false"]', '.tray-modal-open',
                                'body.modal-open', 'body.no-scroll', 'body.popup-open'];
                    for (var i = 0; i < sels.length; i++) {
                        try { if (document.querySelector(sels[i])) return true; } catch(e) {}
                    }
                    return false;
                }
                function apply() { openBtn.style.visibility = anyOverlayOpen() ? 'hidden' : ''; }
                apply();
                try {
                    new MutationObserver(apply).observe(document.body, {
                        attributes: true, childList: true, subtree: true,
                        attributeFilter: ['class', 'style', 'aria-hidden']
                    });
                } catch(e) {}
            })();
        }

        // ── Inline button (acima do comprar) ──────────────────────────────────────
        if (BUTTON_MODE === 'buy' || BUTTON_MODE === 'both') {
            var inlineBtn = document.createElement('button');
            inlineBtn.className = 'q-btn-inline-provador';
            inlineBtn.type = 'button';
            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('stroke-width', '1.5');
            svg.setAttribute('stroke-linecap', 'round');
            svg.setAttribute('stroke-linejoin', 'round');
            var p1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            p1.setAttribute('d', 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2');
            var c1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            c1.setAttribute('cx', '12'); c1.setAttribute('cy', '7'); c1.setAttribute('r', '4');
            svg.appendChild(p1); svg.appendChild(c1);
            inlineBtn.appendChild(svg);
            inlineBtn.appendChild(document.createTextNode('Provador Virtual'));

            inlineBtn.addEventListener('click', function(e) {
                e.preventDefault(); e.stopPropagation();
                currentProduct = detectProduct(document.querySelector('h1.product-name, h1.product__title, .product-single__title, h1')?.innerText || document.title);
                openModal();
            });

            // O botão do provador deve ficar logo ABAIXO do botão "Comprar".
            function insertAfter(node, ref) { ref.parentNode.insertBefore(node, ref.nextSibling); }

            // 1º: âncora no próprio botão nativo de compra — insere logo depois dele.
            var buyBtnEl = document.querySelector('#button-buy, #botao-comprar, .botao-comprar, button[name="comprar"], button[name="buy"], input[name="buy"], .buy-button, .product-buy-button');
            if (buyBtnEl && buyBtnEl.parentNode) {
                insertAfter(inlineBtn, buyBtnEl);
            } else {
                // 2º: bloco "Comprar com Grau" (fica abaixo do comprar): insere antes dele
                // para o provador ficar entre o "Comprar" e o bloco de grau.
                // Os .btn-pay-wp são os botões do CARROSSEL de variações do kit — NÃO usar.
                var wpProd = [].slice.call(document.querySelectorAll('.wp-prod')).filter(function (b) { return b.offsetParent !== null; })[0];
                var grauBlock = wpProd ? (wpProd.closest('.content-wp-prod') || wpProd) : null;
                if (grauBlock && grauBlock.parentNode) {
                    grauBlock.parentNode.insertBefore(inlineBtn, grauBlock);
                } else {
                    // 3º: contêineres de ação de compra — insere depois do contêiner.
                    var buySels = [
                        '.frame_product_action_button', '[data-buy-action-button]', '.buy_action_button',
                        '.wrapper-btn-buy', '.button-buy', '#buy-button',
                        '.product-buy', '.btn-buy',
                        '.product-colum-right .box-buy', '.box-buy',
                        '.product-action', '.product-actions', '.add-to-cart', '#addToCart'
                    ];
                    for (var j = 0; j < buySels.length; j++) {
                        var bel = document.querySelector(buySels[j]);
                        if (bel) { insertAfter(inlineBtn, bel); break; }
                    }
                }
            }

            // Espelha o raio de borda do botão "Comprar" nativo da loja para que o
            // botão do provador tenha exatamente o mesmo formato de bordas do tema.
            (function matchBuyButtonRadius() {
                function apply() {
                    var buyBtn = document.querySelector('#button-buy, .botao-comprar, .buy-button, .product-buy-button, [name="comprar"]');
                    if (!buyBtn) return;
                    var r = window.getComputedStyle(buyBtn).borderRadius;
                    if (r && r !== '0px') inlineBtn.style.setProperty('border-radius', r, 'important');
                }
                // Reaplica algumas vezes para vencer o fetch de design assíncrono,
                // que reforça a borda do botão pouco depois da inserção.
                apply();
                [400, 900, 1800, 3200].forEach(function (t) { setTimeout(apply, t); });
            })();

            if (BUTTON_MODE === 'buy') {
                openBtn.style.display = 'none';
                document.body.appendChild(openBtn);
            }
        }

        applyDesignToButtons();

        // ── Eventos ───────────────────────────────────────────────────────────────
        // -- Tracking de abertura do provador (session anonima) - Provou Levou --
        var WEBHOOK_OPEN_PL = 'https://n8n.segredosdodrop.com/webhook/pl-provador-open';
        function plSid() { try { var s = localStorage.getItem('pl_sid'); if (!s) { s = 's' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10); localStorage.setItem('pl_sid', s); } return s; } catch (e) { return 'nostore'; } }
        function plTrackOpen() { try { fetch(WEBHOOK_OPEN_PL, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session_id: plSid(), origin: location.origin, botao: window.__plBtnSrc || null, produto: (document.querySelector('h1.product-name, h1.product__title, .product-single__title, h1') || {}).innerText || document.title || '' }) }).catch(function () {}); } catch (e) {} }
        function plTrackProved(rawPhone) { try { var d = (rawPhone || '').replace(/\D/g, ''); if (d.length > 11 && d.slice(0, 2) === '55') d = d.slice(2); fetch(WEBHOOK_OPEN_PL, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session_id: plSid(), proved: true, telefone_cliente: d || null }) }).catch(function () {}); } catch (e) {} }
        // ── Contador "provas restantes hoje" (debounced) ──
        var _provasDebounce;
        async function _checkProvasRestantes() {
            var els = document.querySelectorAll('.q-provas-msg');
            if (!els.length) return;
            var nums = (phoneInput.value || '').replace(/\D/g, '');
            // Telefone vazio/incompleto → manda '0' pra pegar só o ip_count.
            var phone = isValidBRPhone(nums) ? '55' + nums : '0';
            try {
                var r = await fetch(WEBHOOK_CHECK_LIMIT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone: phone }) });
                var d = await r.json();
                var limite = d.limit || 5;
                var usadas = Math.max(d.phone_count || 0, d.ip_count || 0, d.count || 0);
                var restantes = Math.max(0, limite - usadas);
                var txt = restantes > 0 ? (restantes + (restantes === 1 ? ' prova restante hoje' : ' provas restantes hoje')) : '';
                els.forEach(function (el) { el.textContent = txt; });
            } catch (_) { els.forEach(function (el) { el.textContent = ''; }); }
        }
        phoneInput.addEventListener('input', function () {
            clearTimeout(_provasDebounce);
            _provasDebounce = setTimeout(_checkProvasRestantes, 600);
        });

        function openModal()  {
            plTrackOpen(); modal.style.display = 'flex'; lockBodyScroll();
            try { _checkProvasRestantes(); } catch (e) {} }
        function closeModal() { modal.style.display = 'none'; unlockBodyScroll(); 
            // --- volta pra tela inicial ao fechar (pos-prova) + limpa input p/ 2a foto enviar ---
            try {
                var _qsr = document.getElementById('q-step-result'); if (_qsr) _qsr.style.display = 'none';
                var _qsp = (typeof photoStep !== 'undefined' && photoStep) ? photoStep : document.getElementById('q-step-photo');
                if (_qsp) _qsp.style.display = 'flex';
                var _qcard = document.querySelector('.q-card-ia'); if (_qcard) _qcard.classList.remove('is-result');
                if (typeof userPhoto !== 'undefined') userPhoto = null;
                if (typeof pixPaymentId !== 'undefined') pixPaymentId = null;
                if (typeof preImg !== 'undefined' && preImg) preImg.style.display = 'none';
                if (typeof facePlaceholder !== 'undefined' && facePlaceholder) facePlaceholder.style.display = 'flex';
                try { if (typeof cameraInput !== 'undefined' && cameraInput) cameraInput.value = ''; if (typeof galleryInput !== 'undefined' && galleryInput) galleryInput.value = ''; } catch (e) {}
                if (typeof checkFields === 'function') checkFields();
            } catch (e) {}
        }

        /* ── Fechar sem perder a foto ──────────────────────────────────────
           Fechar o provador depois de provar resetava tudo e a foto gerada
           sumia. Agora o resultado fica guardado: ao reabrir pelo selo ou
           pelo botao, o cliente volta direto na foto dele.
           Como a tela de resultado nao tinha saida (o #q-retry-btn e lido no
           JS mas nunca existiu no HTML), adicionamos "Provar outra foto" --
           sem isso o cliente ficaria preso no resultado. */
        function _plTemResultado() {
            var i = document.getElementById('q-final-view-img');
            return !!(i && i.getAttribute('src'));
        }

        function _plNovaProva() {
            var img = document.getElementById('q-final-view-img');
            if (img) img.removeAttribute('src');
            var s = document.getElementById('q-step-result');
            if (s) s.style.display = 'none';
            var p = document.getElementById('q-step-photo');
            if (p) p.style.display = 'flex';
            var c = document.querySelector('.q-card-ia');
            if (c) c.classList.remove('is-result');
            try { if (typeof userPhoto !== 'undefined') userPhoto = null; } catch (e) {}
            try { if (typeof pixPaymentId !== 'undefined') pixPaymentId = null; } catch (e) {}
            try { if (typeof preImg !== 'undefined' && preImg) preImg.style.display = 'none'; } catch (e) {}
            try { if (typeof facePlaceholder !== 'undefined' && facePlaceholder) facePlaceholder.style.display = 'flex'; } catch (e) {}
            try { if (typeof cameraInput !== 'undefined' && cameraInput) cameraInput.value = ''; } catch (e) {}
            try { if (typeof galleryInput !== 'undefined' && galleryInput) galleryInput.value = ''; } catch (e) {}
            try { if (typeof checkFields === 'function') checkFields(); } catch (e) {}
        }

        function _plMontaBotaoNovaProva() {
            var col = document.getElementById('q-result-actions-col');
            if (!col || document.getElementById('q-btn-nova-prova')) return;
            var b = document.createElement('button');
            b.type = 'button';
            b.id = 'q-btn-nova-prova';
            b.className = 'q-btn-outline';
            b.textContent = 'Provar outra foto';
            b.style.marginTop = '10px';
            b.onclick = _plNovaProva;
            col.appendChild(b);
        }

        var _plCloseOriginal = closeModal;
        closeModal = function () {
            if (_plTemResultado()) {
                try { modal.style.display = 'none'; } catch (e) {}
                try { unlockBodyScroll(); } catch (e) {}
                try { stopFakeBuy(); } catch (e) {}
                return;
            }
            return _plCloseOriginal.apply(this, arguments);
        };

        var _plOpenOriginal = openModal;
        openModal = function () {
            var _r = _plOpenOriginal.apply(this, arguments);
            try {
                _plMontaBotaoNovaProva();
                if (_plTemResultado()) {
                    ['q-step-photo', 'q-loading-box', 'q-step-error'].forEach(function (id) {
                        var el = document.getElementById(id);
                        if (el) el.style.display = 'none';
                    });
                    var s = document.getElementById('q-step-result');
                    if (s) s.style.display = 'flex';
                    var c = document.querySelector('.q-card-ia');
                    if (c) c.classList.add('is-result');
                }
            } catch (e) {}
            return _r;
        };


        openBtn.onclick = function(e) {
            if (e) { e.preventDefault(); e.stopPropagation(); }
            currentProduct = detectProduct(document.querySelector('h1.product-name, h1.product__title, .product-single__title, h1')?.innerText || document.title);
            openModal();
        };

        closeBtn.onclick = () => closeModal();
        backBtn.onclick  = () => closeModal();
        modal.addEventListener('click', function(e) { if (e.target === modal) closeModal(); });

        retryBtn.onclick = function() {
            try { if (typeof cameraInput !== 'undefined' && cameraInput) cameraInput.value = ''; if (typeof galleryInput !== 'undefined' && galleryInput) galleryInput.value = ''; } catch (e) {}
            stepResult.style.display = 'none';
            stepUpload.style.display = 'flex';
            card.classList.remove('is-result');
            userPhoto = null;
            if (preImg) preImg.style.display = 'none';
            var fp = document.getElementById('q-face-placeholder');
            if (fp) fp.style.display = 'flex';
            checkFields();
        };

        document.getElementById('q-btn-camera').onclick = function() { cameraInput.click(); };
        document.getElementById('q-btn-gallery').onclick = function() { galleryInput.click(); };
        document.getElementById('q-face-frame').onclick = function() { galleryInput.click(); };


        function loadRelatedProducts() {
            var grid = document.getElementById('q-related-grid');
            var section = document.getElementById('q-related-products');
            if (!grid || !section) return;

            // Tema Sunglasses Theme: .section-product-related .product.
            // Mantém os seletores da Tray padrão como fallback.
            var items = document.querySelectorAll('.section-product-related .product');
            if (!items.length) items = document.querySelectorAll('.section_related_products article.product-card, .showroom-swiper article.product-card, article.product-card');
            var products = [];

            items.forEach(function(item) {
                if (products.length >= 3) return;
                var nameEl = item.querySelector('.product-name, .name, h3, h4');
                var name = item.getAttribute('data-ga4-name') || (nameEl ? nameEl.textContent.trim() : '');
                var price = item.getAttribute('data-ga4-price') || '';
                if (price) price = 'R$ ' + parseFloat(price).toLocaleString('pt-BR', {minimumFractionDigits:2});
                // Image from .image-lazy-container data-src
                var imgContainer = item.querySelector('.image-lazy-container, .space-image img, .image img');
                var imgSrc = imgContainer ? (imgContainer.getAttribute('data-src') || imgContainer.getAttribute('data-original') || imgContainer.src || '') : '';
                // Link
                var linkEl = item.querySelector('a[href*="sunglassesubatuba"]');
                var link = linkEl ? linkEl.getAttribute('href') : '';
                if (name && imgSrc) {
                    products.push({ name: name, img: imgSrc, link: link });
                }
            });

            if (!products.length) return;

            while (grid.firstChild) grid.removeChild(grid.firstChild);
            products.forEach(function(p) {
                var a = document.createElement('a');
                a.className = 'q-related-card';
                a.href = p.link || '#';
                a.target = '_blank';
                var img = document.createElement('img');
                img.src = p.img;
                img.alt = p.name;
                img.loading = 'lazy';
                var nameEl = document.createElement('span');
                nameEl.className = 'q-related-card-name';
                nameEl.textContent = p.name;
                a.appendChild(img);
                a.appendChild(nameEl);
                grid.appendChild(a);
            });
            section.style.display = 'block';
        }

        function showError() {
            var lb = document.getElementById('q-loading-box');
            var su = document.getElementById('q-step-photo');
            var se = document.getElementById('q-step-error');
            if (lb) lb.style.display = 'none';
            if (su) su.style.display = 'none';
            if (se) se.style.display = 'flex';
        }
        var _eb = document.getElementById('q-error-back'); if (_eb) _eb.onclick = function() { closeModal(); };


        phoneInput.addEventListener('input', function(e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            checkFields();
        });

        var userPhoto = null;
        var pixPaymentId = null;
        var pixPollingTimer = null;

        function stopPixPolling() {
            if (pixPollingTimer) { clearInterval(pixPollingTimer); pixPollingTimer = null; }
        }
        function showPixScreen() {
            stepUpload.style.display = 'none';
            stepPix.style.display = 'flex';
            pixStatus.textContent = 'Aguardando pagamento...';
            pixStatus.className = 'q-pix-status q-pix-waiting';
        }
        function hidePixScreen() {
            stopPixPolling();
            stepPix.style.display = 'none';
        }
        async function createPixAndPoll() {
            /* LIMITE ATINGIDO: tela "fale com a consultora" no WhatsApp da loja (mesmo padrao da Cacife).
               PIX de prova extra segue desativado — o retorno abaixo impede o fluxo antigo de PIX. */
            try {
                var _ph = document.getElementById('q-step-photo'); if (_ph) _ph.style.display = 'none';
                var _lb = document.getElementById('q-loading-box'); if (_lb) _lb.style.display = 'none';
                var _pix = document.getElementById('q-step-pix');
                if (_pix) {
                    _pix.style.display = 'block'; _pix.style.textAlign = 'center';
                    // HTML 100% estatico (sem dado dinamico) — o href vai por propriedade DOM abaixo.
                    _pix.innerHTML = '<div style="width:72px;height:72px;border-radius:50%;background:var(--c-surface);border:1px solid var(--c-line);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--c-primary, #111111)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="15" r="3.2"/><circle cx="18" cy="15" r="3.2"/><path d="M9.2 15c0-1.2 1.2-2 2.8-2s2.8.8 2.8 2"/><path d="M2.8 13.5 4.6 8.8a2 2 0 0 1 1.9-1.3h1.2"/><path d="M21.2 13.5 19.4 8.8a2 2 0 0 0-1.9-1.3h-1.2"/></svg></div>'
                        + '<h2>Seu provador virtual agora &eacute; com nossa consultora!</h2>'
                        + '<p class="q-pix-subtitle" style="text-align:center;">Fale agora com nossa especialista e receba um teste personalizado com os modelos que mais valorizam seu rosto pelo WhatsApp!</p>'
                        + '<a id="q-limit-wa-link" href="#" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:#fff;border-radius:14px;padding:14px 22px;font-family:inherit;font-weight:700;font-size:15px;text-decoration:none;margin-top:16px;"><svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 2.1.55 4.06 1.6 5.8L2 22l4.44-1.65a9.9 9.9 0 0 0 5.6 1.72h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2zm5.8 14.15c-.24.68-1.4 1.3-1.94 1.34-.5.05-1.13.07-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.17-4.94-4.36-.15-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.77-.36l.55.01c.18.01.42-.07.66.5.24.59.83 2.04.9 2.18.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.15.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.66-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.12.07.71-.17 1.39z"/></svg> Quero meu teste personalizado</a>';
                    var _pn = ((document.querySelector('h1.product-name, h1.product__title, h1') || {}).innerText || '').trim();
                    var _waMsg = 'Olá! Usei o provador virtual' + (_pn ? (' e me interessei pelo ' + _pn) : '') + '.';
                    var _lk = document.getElementById('q-limit-wa-link');
                    if (_lk) {
                        _lk.href = 'https://wa.me/' + STORE_WHATSAPP + '?text=' + encodeURIComponent(_waMsg);
                        _lk.addEventListener('click', function () { try { fetch('https://n8n.segredosdodrop.com/webhook/pl-provador-limit-wa-click', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone: (document.getElementById('q-phone') || document.getElementById('mc-phone') || document.querySelector('#q-modal-ia input[type=tel], input[type=tel]') || {}).value || '', origin: location.origin, produto: _pn }) }).catch(function () {}); } catch (e) {} });
                    }
                }
            } catch (e) {}
            return;
            showPixScreen();
            try {
                var resp = await fetch(WEBHOOK_PIX, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone: '55' + phoneInput.value.replace(/\D/g, ''), email: 'cliente@provoulevou.com.br' })
                });
                var pix = await resp.json();
                if (!pix.payment_id || !pix.qr_code) throw new Error('PIX inválido');
                pixQrImg.src = 'data:image/png;base64,' + pix.qr_code_base64;
                pixCode.value = pix.qr_code;
                var attempts = 0;
                pixPollingTimer = setInterval(async function() {
                    attempts++;
                    if (attempts > 100) { stopPixPolling(); return; }
                    try {
                        var sr = await fetch(WEBHOOK_PIX_STATUS + '?payment_id=' + pix.payment_id);
                        var st = await sr.json();
                        if (st.status === 'approved') {
                            stopPixPolling();
                            pixStatus.textContent = 'Pagamento confirmado!';
                            pixStatus.className = 'q-pix-status q-pix-approved';
                            setTimeout(function() {
                                hidePixScreen();
                                pixPaymentId = pix.payment_id;
                                runGeneration();
                            }, 1200);
                        }
                    } catch (_) {}
                }, 3000);
            } catch (e) {
                hidePixScreen();
                stepUpload.style.display = 'flex';
                showError();
            }
        }
        pixCopyBtn.onclick = function() {
            navigator.clipboard.writeText(pixCode.value).then(function() {
                pixCopyBtn.textContent = 'Copiado!';
                setTimeout(function() { pixCopyBtn.textContent = 'Copiar'; }, 2000);
            });
        };
        pixCancel.onclick = function() {
            hidePixScreen();
            stepUpload.style.display = 'flex';
        };

        function checkFields() {
            var nums = phoneInput.value.replace(/\D/g, '');
            var phoneOk = nums.length >= 10 && nums.length <= 11;
            phoneErr.style.display = (phoneInput.value.length > 0 && !phoneOk) ? 'block' : 'none';
            phoneInput.style.borderColor = (phoneInput.value.length > 0 && !phoneOk) ? '#ef4444' : '';
            genBtn.disabled = !(userPhoto && phoneOk && termsCheck.checked);
        }

        termsCheck.onchange = checkFields;

        function handlePhotoSelected(file) {
            if (!file) return;
            userPhoto = file;
            var rd = new FileReader();
            rd.onload = function(ev) {
                preImg.src = ev.target.result;
                preImg.style.display = 'block';
                var fp = document.getElementById('q-face-placeholder');
                if (fp) fp.style.display = 'none';
                checkFields();
            };
            rd.readAsDataURL(file);
        }
        cameraInput.onchange = function(e) { handlePhotoSelected(e.target.files[0]); };
        galleryInput.onchange = function(e) { handlePhotoSelected(e.target.files[0]); };

        async function runGeneration() {
            if (runGeneration._busy) return;   // trava clique duplo: nao dispara 2 provas
            if (!userPhoto) return;
            var keyToUse = window.PROVOU_LEVOU_API_KEY;
            if (!keyToUse) { alert('Erro: API Key não configurada.'); return; }

            // Tray injeta window.dataLayer[0].urlImage com a imagem correta do produto
            var prodImg =
                (window.dataLayer && window.dataLayer[0] && window.dataLayer[0].urlImage) ||
                document.querySelector('meta[property="og:image"]')?.content ||
                '';
            var prodName = document.querySelector('h1.product-name, h1.product__title, .product-single__title, h1')?.innerText || document.title;

            stepUpload.style.display = 'none';
            loadingBox.style.display = 'flex';
            startLoadingProgress();

            runGeneration._busy = true;
            try {
                var fd = new FormData();
                fd.append('person_image', await toJpeg(userPhoto), 'person.jpg');
                fd.append('whatsapp', '55' + phoneInput.value.replace(/\D/g, ''));
                fd.append('phone_raw', phoneInput.value);
                fd.append('product_name', prodName);
                fd.append('product_url', window.location.href);
                fd.append('product_type', currentProduct.category);
                fd.append('product_fit', currentProduct.fit);
                fd.append('api_key', keyToUse);
                fd.append('height', '');
                fd.append('weight', '');
                if (pixPaymentId) fd.append('pix_payment_id', pixPaymentId);

                // Coleta até 4 fotos do produto: 1ª como binary (compat), 2ª-4ª como base64 text
                var allProdImgs = [];
                if (prodImg) allProdImgs.push(prodImg);
                try {
                    // Galerias Tray, incluindo o Sunglasses Theme.
                    var galSel = '.product-images img, .product-gallery img, .product_gallery img, .carousel_gallery img, .carousel_gallery_miniatures img, .product-image-magnify img, .product-zoom img, [data-zoom-image]';
                    var imgEls = document.querySelectorAll(galSel);
                    imgEls.forEach(function(el) {
                        var src = el.getAttribute('data-zoom-image') || el.getAttribute('data-src') || el.getAttribute('data-original') || el.src;
                        if (!src) return;
                        if (/data:image|placeholder|spacer|blank/i.test(src)) return;
                        // Filtra logo/badge/ícones — só aceita img_prod
                        if (!/img_prod\//i.test(src)) return;
                        // Upgrade Tray thumbs (90_nome.jpg → nome.jpg = full-res)
                        src = src.replace(/\/(\d{2,4})_([^/]+\.(jpg|jpeg|png|webp))/i, '/$2');
                        var clean = src.split('?')[0];
                        if (!allProdImgs.some(function(u){ return u.split('?')[0] === clean; })) {
                            allProdImgs.push(src);
                        }
                    });
                } catch (_) {}
                allProdImgs = allProdImgs.slice(0, 4);
                // Prioriza uma foto com rosto (modelo usando o óculos) como referência principal.
                allProdImgs = await reorderFacePhotoFirst(allProdImgs);
                console.log('[PL Sunglasses Ubatuba] Enviando', allProdImgs.length, 'fotos do produto');
                for (var _pi = 0; _pi < allProdImgs.length; _pi++) {
                    try {
                        var _b = await fetch(allProdImgs[_pi]).then(function(r) { return r.blob(); });
                        if (_pi === 0) {
                            fd.append('product_image', _b, 'product.jpg');
                        } else {
                            var _b64 = await new Promise(function(resolve, reject) {
                                var _r = new FileReader();
                                _r.onloadend = function() { resolve(_r.result.split(',')[1]); };
                                _r.onerror = reject;
                                _r.readAsDataURL(_b);
                            });
                            fd.append('product_image_' + (_pi+1) + '_b64', _b64);
                        }
                    } catch (_) {}
                }

                var res = await fetch(WEBHOOK_PROVA, { method: 'POST', body: fd });

                var ct = res.headers.get('content-type') || '';
                if (ct.includes('application/json')) {
                    var data = await res.json();
                    if (data.limited || data.error === 'limite_diario') {
                        try { document.getElementById('q-loading-box').style.display = 'none'; } catch (_) {}
                        try { loadingBox.style.display = 'none'; } catch (_) {}
                        createPixAndPoll();
                        return;
                    }
                    if (data.error) {
                        loadingBox.style.display = 'none';
                        stepUpload.style.display = 'flex';
                        showError();
                        return;
                    }
                }

                if (res.ok) {
                    var blob = await res.blob();
                    loadingBox.style.display = 'none';
                    finalImg.src = URL.createObjectURL(blob);
                    card.classList.add('is-result');
                    plTrackProved((document.getElementById('q-phone') || document.getElementById('mc-phone') || document.querySelector('input[type=tel]') || {}).value);
                    stepResult.style.display = 'flex';
                    populateBuyCta();
                    loadRelatedProducts();
                    try { _checkProvasRestantes(); } catch (e) {}   // atualiza "restantes" no resultado (já contou +1)
                } else if (res.status === 401 || res.status === 403) {
                    loadingBox.style.display = 'none';
                    stepUpload.style.display = 'flex';
                    showError();
                } else {
                    throw new Error('HTTP ' + res.status);
                }
            } catch (e) {
                loadingBox.style.display = 'none';
                stepUpload.style.display = 'flex';
                showError();
            } finally {
                runGeneration._busy = false;   // libera pra proxima prova
            }
        }

        genBtn.onclick = async function() {
            if (!userPhoto) return;
            var nums = phoneInput.value.replace(/\D/g, '');
            var phoneOk = isValidBRPhone(nums);
            if (!phoneOk) { phoneInput.focus(); return; }
            var phone = '55' + nums;
            genBtn.disabled = true;

            // Feedback imediato: mostra a animacao na hora; o check de limite roda enquanto ela ja aparece.
            try { stepUpload.style.display = 'none'; } catch (_) {}
            try { loadingBox.style.display = 'flex';
 startLoadingProgress(); } catch (_) {}

            try {
                var resp = await fetch(WEBHOOK_CHECK_LIMIT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone: phone })
                });
                var data = await resp.json();
                if (data.limited) {
                    try { loadingBox.style.display = 'none'; } catch (_) {}
                    genBtn.disabled = false;
                    createPixAndPoll();
                    return;
                }
            } catch (_) {
                // se o check falhar, deixa gerar (evita bloquear por erro de rede)
            }
            genBtn.disabled = false;
            runGeneration();
        };
    }

    // ─── 6. DETECÇÃO DE PÁGINA DE PRODUTO (Tray) ─────────────────────────────────
    function runWhenReady() {
        var path = window.location.pathname;
        // Não exibe o provador em páginas de lentes
        if (path.toLowerCase().includes('/lentes')) return;
        // Na Tray, classes como .botao-comprar também existem nas vitrines da home
        // e das categorias. O h1.product-name é o marcador estável da página de
        // detalhe deste tema e evita inicializar o modal fora de um produto.
        var isProduct =
            window.__MC_FORCE_INIT__ === true ||
            document.querySelector('h1.product-name') !== null;

        if (isProduct) {
            init();
        } else {
            var tries = 0;
            var iv = setInterval(function() {
                tries++;
                if (document.querySelector('h1.product-name') !== null) {
                    clearInterval(iv);
                    init();
                } else if (tries >= 10) {
                    clearInterval(iv);
                }
            }, 500);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runWhenReady);
    } else {
        runWhenReady();
    }

})();
