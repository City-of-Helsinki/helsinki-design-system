# noscript support

Helsinki city web services require Javascript to function as intended. If the web browser has disabled or doesn't support JavaScript it should fall back gracefully by notifying the user to enable JavaScript. This is implemented by adding the `<noscript>` tag content below at the end of contents inside the `<body>` tag. It will display the text to the user if JavaScript is disabled. Include [core styles](packages/core/README.md) to display the text as a [Notification component](https://hds.hel.fi/components/notification).

```html
<noscript>
    <style>
        .hds-noscript-text {
            display: none;
        }
        :not(html:lang(sv)) .hds-noscript-text:lang(fi),
        :not(html:lang(en)) .hds-noscript-text:lang(fi) {
            display: block;
        }
        html:lang(sv) .hds-noscript-text:lang(sv) {
            display: block;
        }
        html:lang(sv) .hds-noscript-text:lang(fi) {
            display: none;
        }
        html:lang(en) .hds-noscript-text:lang(en) {
            display: block;
        }
        html:lang(en) .hds-noscript-text:lang(fi) {
            display: none;
        }
    </style>
    <section aria-label="Notification" class="hds-notification hds-notification--alert">
        <div class="hds-notification__content">
            <div class="hds-notification__label" role="heading" aria-level="2">
                <span class="hds-icon hds-icon--alert-circle-fill" aria-hidden="true"></span>
                <span class="hds-noscript-text" lang="fi">Ota JavaScript k&auml;ytt&ouml;&ouml;n selaimessasi</span>
                <span class="hds-noscript-text" lang="sv">Aktivera JavaScript i din webbl&auml;sare</span>
                <span class="hds-noscript-text" lang="en">Enable JavaScript in your browser</span>
            </div>
            <div class="hds-notification__body">
                <div class="hds-noscript-text" lang="fi">Ole hyv&auml; ja ota JavaScript k&auml;ytt&ouml;&ouml;n selaimessasi varmistaaksesi palvelun t&auml;yden toiminnallisuuden ja tarkoitetun k&auml;ytt&ouml;kokemuksen.</div>
                <div class="hds-noscript-text" lang="sv">V&auml;nligen aktivera JavaScript i din webbl&auml;sare f&ouml;r att garantera full funktionalitet och avsedd anv&auml;ndarupplevelse.</div>
                <div class="hds-noscript-text" lang="en">Please enable JavaScript in your browser to guarantee the full functionality and intended user experience.</div>
            </div>
        </div>
    </section>
</noscript>
```
