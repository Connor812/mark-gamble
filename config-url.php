<?php
$environment = "sandbox";

if ($environment === "production") {
    define("URL", "http://markgamble.ca/");
    define("ACCESS_TOKEN", "EAAAlqQHK7QOiKjSSjH72a1pCclEvPcClPkKuAzDnvUFHsiSZ6XeC7wg8EmRQJcj");
    define("SEVERNAME", "");
    define("USERNAME", "");
    define("PASSWORD", "");
    define("DBNAME", "");
} else {
    define("URL", "https://localhost/mark-gamble/");
    define("ACCESS_TOKEN", "EAAAlyWFexO1fcGLwQjO79TXF4ydUy0OEJZQNP9IS5Hcct9Fq_5RqG6lrSQy4-Q8");
    define("SEVERNAME", "localhost");
    define("USERNAME", "root");
    define("PASSWORD", "");
    define("DBNAME", "mark_gamble");
}

define("ENVIRONMENT", $environment);
