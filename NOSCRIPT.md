# noscript support

Helsinki city web services require Javascript to function as intended. If the web browsers has disabled or doesn't support JavaScript it should fallback gracefully by notifying the user to enable JavaScript. This is implemented by adding the `<noscript>` tag content below at the end of contents inside the `<body>` tag. It will display the text to the user if JavaScript is disabled.

<noscript>
    <section aria-label="Notification" class="hds-notification hds-notification--alert">
        <div class="hds-notification__content">
            <div class="hds-notification__label" role="heading" aria-level="2">
                <span class="hds-icon hds-icon--alert-circle-fill" aria-hidden="true"></span>
                <span>Enable JavaScript in your browser</span>
            </div>
            <div class="hds-notification__body">Please enable JavaScript to guarantee full functionality and intended user experience.</div>
        </div>
    </section>
</noscript>
