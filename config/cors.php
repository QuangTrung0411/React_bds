<?php

return [
    'paths' => ['api/*'],
    'allowed_origins' => ['http://localhost:*', 'http://127.0.0.1:*'],  // Chấp nhận mọi port
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];