<?php
/*
 * Anfrageformular -> E-Mail.
 * Läuft auf jedem normalen PHP-Webhosting (all-inkl, Netcup, IONOS, Strato ...).
 *
 * VOR DEM LIVEGANG die zwei Adressen unten eintragen:
 *   $TO   – wohin die Anfragen gehen (Ihr Postfach)
 *   $FROM – Absender, MUSS eine Adresse auf Ihrer eigenen Domain sein,
 *           sonst landen die Mails im Spam oder werden abgewiesen.
 */
$TO   = 'lebedinets.antonio@gmail.com';
$FROM = 'website@IHRE-DOMAIN.de';

header('Content-Type: application/json; charset=utf-8');

function fail($code, $msg) {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $msg]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail(405, 'method');
if (strpos($FROM, 'IHRE-DOMAIN') !== false) fail(500, 'not configured');

// Honeypot: Menschen sehen das Feld nicht, Bots füllen es aus.
if (!empty($_POST['website'])) { echo json_encode(['ok' => true]); exit; }

// Eine Zeile: Zeilenumbrüche raus (verhindert Header-Injection), Länge begrenzen.
function line($k, $max = 200) {
    $v = isset($_POST[$k]) ? (string)$_POST[$k] : '';
    return mb_substr(trim(preg_replace('/[\r\n\t]+/', ' ', $v)), 0, $max);
}

$name    = line('name', 120);
$phone   = line('phone', 60);
$email   = line('email', 160);
$service = line('service', 120);
$address = line('address', 200);
$message = isset($_POST['message']) ? mb_substr(trim((string)$_POST['message']), 0, 5000) : '';

if ($name === '' || $message === '') fail(400, 'missing');
if ($phone === '' && $email === '')  fail(400, 'no contact');
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) fail(400, 'email');

$body = "Neue Anfrage über die Website\n"
      . "==============================\n\n"
      . "Name:     $name\n"
      . "Telefon:  " . ($phone   ?: '-') . "\n"
      . "E-Mail:   " . ($email   ?: '-') . "\n"
      . "Leistung: $service\n"
      . "Objekt:   " . ($address ?: '-') . "\n\n"
      . "Nachricht:\n$message\n";

$subject = '=?UTF-8?B?' . base64_encode("Website-Anfrage: $service – $name") . '?=';

$headers  = "From: Website <$FROM>\r\n";
if ($email !== '') $headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";

if (!mail($TO, $subject, $body, $headers, '-f' . $FROM)) fail(500, 'mail');

echo json_encode(['ok' => true]);
