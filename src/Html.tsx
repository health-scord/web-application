import * as React from "react";

export const Html = ({ content, state }) => {
  return (
    <html>
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="stylesheet" href="https://use.typekit.net/kod8qec.css" />
        <link
          href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/public/server.css" />
        <link rel="icon" href="/public/favicon.ico" />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              "\\u003c"
            )};`,
          }}
        />
        <script type="application/javascript" src="/public/client.js" />
      </body>
    </html>
  );
};
