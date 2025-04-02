<?php

return [
    'paths' => ['*'], // Áp dụng CORS cho tất cả route
    'allowed_methods' => ['*'], // GET, POST, v.v.
    'allowed_origins' => ['http://localhost:5173'], // Cho phép React
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Tất cả header
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];