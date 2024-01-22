<?php 
  session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>View my code</title>
  <link rel="stylesheet" href="./styles/style.css">
</head>
<body>
  <?php
    $files = shell_exec("find ./files/ -type f ");
    $files = str_replace("./files/","",$files);
    $files = explode("\n",$files,PHP_INT_MAX);
    $files = array_filter($files);
  ?> 
  <div class="searchBox">
      <div class="searchBar">
        <input type="search" id="query"  placeholder="Search" value="<?php //echo $_SESSION['query'];?>">
        <button><img src="img/search.PNG" alt=""></button>
      </div>
      <div class="hidden suggestionBox" id="suggestionBox">
        <?php
          foreach ($files as $file) {
          //echo "<li class=\"hidden\"><a href=\"./display.php?f=$file\">$file</a></li>\n";
          echo "<li class=\"hidden\">$file</li>\n";
          }
        ?>
      </div>
  </div>

  <script src="./js/script.js"></script>
</body>
</html>
