<?php
    $last_accessed = fileatime("status");
    $now = time();
    if ($now - $last_accessed <= 60) {
        echo "true";
    } else {
        echo "false";
    }
?>