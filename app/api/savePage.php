<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$file = "../../" . $_POST["pageName"];
$newFile = $_POST["html"];

if ($newFile && $file) {
    file_put_contents($file, $newFile);
} else {
    header("HTTP/1.0 400 Bad Request");
}